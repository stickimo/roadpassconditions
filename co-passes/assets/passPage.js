import { getPrimaryPass, getPassById, getStateLabel } from './passes.js';
import { onReady, formatElevation, createList, formatTime, initTheme, setupThemeToggle } from './app.js';
import { getGridpointForecast } from './nws.js';

initTheme();

const LAST_CHECK_INTERVAL_MS = 30 * 1000;
const FETCH_INTERVAL_MS = 5 * 60 * 1000;
const RETRY_INTERVAL_MS = 60 * 1000;

let fetchTimeoutId;
let latestWeatherData = null;
let latestPassData = null;

function populateBasics(passData) {
  document.getElementById('pass-name').textContent = passData.name;
  document.getElementById('pass-highway').textContent = passData.route_label;
  document.getElementById('pass-elevation').textContent = formatElevation(passData.elevation_ft);
  document.getElementById('pass-state').textContent = getStateLabel(passData.state);
}

function setSnapshotSubtitle(passData) {
  const subtitleNode = document.getElementById('snapshot-subtitle');
  if (subtitleNode) {
    subtitleNode.textContent = '';
  }
}

function ensureMetaTag(selector, attr, key, content) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function ensureLinkTag(selector, rel, href) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function applyPassSeo(passData) {
  const elevationValue = Number(passData.elevation_ft);
  const elevationText = Number.isFinite(elevationValue) ? elevationValue.toLocaleString() : '—';
  const suffix = passData.state === 'CO' ? 'CO Pass Conditions' : 'Mountain Pass Conditions';
  const title = `${passData.name} Conditions | ${passData.route_label} ${elevationText} ft | ${suffix}`;
  const description = `Live conditions for ${passData.name} (${passData.route_label}, ${elevationText} ft): wind, precip chance, alerts, and travel/traction risk based on NWS forecasts.`
    .replace(/\s+/g, ' ')
    .trim();
  const primaryPass = getPrimaryPass();
  const isDefaultPass = primaryPass?.id && passData.id === primaryPass.id;
  const url = `${window.location.origin}${window.location.pathname}${isDefaultPass ? '' : `?pass=${encodeURIComponent(passData.id)}`}`;
  const imageUrl = `${window.location.origin}/favicon.ico`;

  document.title = title;
  ensureMetaTag('meta[name="description"]', 'name', 'description', description);
  ensureLinkTag('link[rel="canonical"]', 'canonical', url);

  ensureMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  ensureMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  ensureMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  ensureMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
  ensureMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);

  ensureMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
  ensureMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  ensureMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  ensureMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
}

function parseWindValue(value) {
  if (!value) return 0;
  const matches = value.match(/(\d+)/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

function parseGustFromText(text) {
  if (!text) return null;
  const match = text.match(/gusts? (?:as high as|up to) (\d+)\s?mph/i);
  return match ? Number(match[1]) : null;
}

function parseGustFromWindFields(windGust, windSpeed) {
  if (windGust) {
    const gustValue = parseWindValue(windGust);
    if (gustValue) return gustValue;
  }
  const speedText = windSpeed || '';
  return parseGustFromText(speedText);
}

function resolveGustMph(weatherData) {
  if (!weatherData) return null;
  const currentGust = parseGustFromWindFields(weatherData.windGust, weatherData.windSpeed);
  if (currentGust) return currentGust;

  const summaryGust = parseGustFromText(weatherData.currentSummary);
  if (summaryGust) return summaryGust;

  const hourlyGusts = (weatherData.next12Hours || [])
    .map((period) => parseGustFromText(period.shortForecast))
    .filter((value) => typeof value === 'number');
  if (hourlyGusts.length) return Math.max(...hourlyGusts);
  return null;
}

function extractPrecipProbability(text) {
  if (!text) return null;
  const directMatch = text.match(/Chance of precipitation is (\d+)%/i);
  if (directMatch) return Number(directMatch[1]);
  const altMatch = text.match(/(\d+)% chance of precipitation/i);
  return altMatch ? Number(altMatch[1]) : null;
}

function resolvePrecipProbability(weatherData) {
  const candidates = [];
  const fromSummary = extractPrecipProbability(weatherData?.currentSummary);
  if (typeof fromSummary === 'number') candidates.push(fromSummary);

  (weatherData?.next12Hours || []).forEach((period) => {
    const value = extractPrecipProbability(period?.shortForecast);
    if (typeof value === 'number') candidates.push(value);
  });

  return candidates.length ? Math.max(...candidates) : null;
}

function detectSnowSignals(weatherData) {
  const summary = (weatherData.currentSummary || '').toLowerCase();
  const hourlyTexts = (weatherData.next12Hours || []).map((p) => (p.shortForecast || '').toLowerCase());
  const combined = [summary, ...hourlyTexts].join(' ');
  const snowRegex = /(snow|sleet|freezing rain|wintry mix)/i;
  const heavySnowRegex = /(heavy snow|blizzard)/i;
  const snowFlag = snowRegex.test(combined);
  const heavySnowFlag = heavySnowRegex.test(combined);
  const snowHours = hourlyTexts.filter((text) => snowRegex.test(text)).length;
  return { snowFlag, heavySnowFlag, snowHours };
}

function mapScore(score) {
  const clamped = Math.max(0, Math.min(100, score));
  if (clamped >= 90) return 'Very High';
  if (clamped >= 70) return 'High';
  if (clamped >= 50) return 'Medium-High';
  if (clamped >= 30) return 'Medium';
  if (clamped >= 10) return 'Low';
  return 'Very Low';
}

function getTempF(signals) {
  const temp = typeof signals.temperature === 'number' ? signals.temperature : null;
  if (temp == null) return null;
  const unit = (signals.temperatureUnit || 'F').toUpperCase();
  if (unit === 'C') return (temp * 9) / 5 + 32;
  return temp;
}

function hasWinterRisk(signals) {
  const tempF = getTempF(signals);
  if (tempF != null && tempF <= 32) return true;
  if (signals.snowFlag || signals.heavySnowFlag) return true;
  if (tempF != null && tempF <= 36 && (signals.precipProbability ?? 0) >= 70) {
    return true;
  }
  return false;
}

function getMaxWindMph(signals) {
  const gust = typeof signals.windGust === 'number' ? signals.windGust : 0;
  const speed = typeof signals.windSpeed === 'number' ? signals.windSpeed : 0;
  return Math.max(gust, speed);
}

function hasIceRisk(signals) {
  const tempF = getTempF(signals);
  const precip = typeof signals.precipProbability === 'number' ? signals.precipProbability : 0;
  const nearFreezingWet = tempF != null && tempF <= 36 && precip >= 70;
  return Boolean(signals.snowFlag || signals.heavySnowFlag) || (tempF != null && tempF <= 32) || nearFreezingWet;
}

function buildActions(signals) {
  const winterRisk = hasWinterRisk(signals);
  const iceRisk = hasIceRisk(signals);
  const windMax = getMaxWindMph(signals);
  const highWind = windMax >= 45;
  const moderateWind = windMax >= 35;
  const blowingSnow = winterRisk && getMaxWindMph(signals) >= 35;
  const blowingNote = blowingSnow ? ' Blowing snow may reduce visibility.' : '';
  const windNote = highWind
    ? ' Expect strong crosswinds; high-profile vehicles use extra caution.'
    : moderateWind
      ? ' Gusty crosswinds possible; keep a firm grip and allow more room.'
      : '';
  const iceNote = iceRisk ? ' Slick roads and ice/sleet/freezing rain are possible.' : '';
  const travelMedium =
    'Slow speeds, build margin into your ETA, and stay alert for changes.' +
    iceNote +
    windNote +
    blowingNote;
  const travelHigh =
    'Strongly consider delaying or rerouting until conditions ease.' +
    iceNote +
    windNote +
    blowingNote;
  return {
    travel: {
      'Very Low': 'Normal travel conditions; re-check soon.',
      Low: 'Normal travel conditions; re-check soon.',
      Medium: travelMedium,
      'Medium-High': travelMedium,
      High: travelHigh,
      'Very High': travelHigh,
    },
    traction: winterRisk
      ? {
          'Very Low': 'All Season/Winter tires should be fine; keep AWD engaged if available.',
          Low: 'All Season/Winter tires should be fine; keep AWD engaged if available.',
          Medium: 'Expect slick/icy grades (snow/sleet/freezing rain possible); have traction devices ready.',
          'Medium-High': 'Expect slick/icy grades (snow/sleet/freezing rain possible); have traction devices ready.',
          High: 'Icy conditions likely; traction devices, awd, all season/winter tires may be required—avoid travel without proper setup.',
          'Very High': 'Icy conditions likely; traction devices, awd, all season/winter tires may be required—avoid travel without proper setup.',
        }
      : {
          'Very Low': 'Normal traction expected; keep normal spacing.',
          Low: 'Normal traction expected; keep normal spacing.',
          Medium: 'Expect slick spots in heavier rain; keep extra spacing.',
          'Medium-High': 'Expect slick spots in heavier rain; keep extra spacing.',
          High: 'Reduced traction likely; avoid abrupt braking and consider delaying.',
          'Very High': 'Very poor traction likely; consider delaying or rerouting.',
        },
    closure: {
      'Very Low': 'Closures unlikely.',
      Low: 'Closures unlikely shortly, but keep monitoring updates.',
      Medium: 'Closures possible; watch alerts and plan alternates.',
      'Medium-High': 'Closures possible; watch alerts and plan alternates.',
      High: 'High closure risk—stage an alternate route or wait it out.',
      'Very High': 'High closure risk—stage an alternate route or wait it out.',
    },
  };
}

function summarizeReasons(reasons) {
  const finalReasons = reasons.filter(Boolean).slice(0, 3);
  if (!finalReasons.length) {
    finalReasons.push('NWS data currently calm with no notable hazards.');
  }
  return finalReasons;
}

function computeSignals(weatherData) {
  const { snowFlag, heavySnowFlag, snowHours } = detectSnowSignals(weatherData);
  return {
    precipProbability: resolvePrecipProbability(weatherData),
    windSpeed: parseWindValue(weatherData.windSpeed),
    windGust: parseWindValue(weatherData.windGust),
    temperature: typeof weatherData.temperature === 'number' ? weatherData.temperature : null,
    temperatureUnit: weatherData.temperatureUnit || 'F',
    shortForecast: weatherData.currentSummary || '',
    snowFlag,
    heavySnowFlag,
    snowHours,
    alerts: weatherData.alerts || [],
    alertEvent: weatherData.alerts?.[0]?.event || '',
  };
}

function travelInference(signals, actions) {
  let score = 10;
  const reasons = [];
  const forecastText = (signals.shortForecast || '').toLowerCase();
  const tempF = getTempF(signals);
  const isWarm = tempF != null && tempF > 42;
  const isMixedTemp = tempF != null && tempF >= 33 && tempF <= 39;
  const isNight = forecastText.includes('night');
  let weatherReasonAdded = false;
  let criticalAdded = false;

  if (signals.alertEvent) {
    score += 12;
    reasons.push(`Active alert: ${signals.alertEvent}`);
  }

  if (signals.precipProbability != null) {
    if (signals.precipProbability >= 70) {
      score += 30;
      reasons.push(`Precip probability around ${signals.precipProbability}% per NWS.`);
    } else if (signals.precipProbability >= 40) {
      score += 18;
      reasons.push(`Moderate precip chance (~${signals.precipProbability}%).`);
    } else {
      reasons.push(`Low precip chance (~${signals.precipProbability}%).`);
    }
  } else {
    reasons.push('NWS summary did not include a precip percentage.');
  }

  if (signals.heavySnowFlag) {
    score += 25;
    reasons.push('Heavy snow/blizzard keywords in forecast.');
    weatherReasonAdded = true;
  } else if (signals.snowFlag) {
    score += 15;
    reasons.push('Snow or wintry mix referenced in near-term outlook.');
    weatherReasonAdded = true;
  } else {
    if (forecastText.includes('thunder')) {
      reasons.unshift('Thunderstorms in immediate forecast; expect sudden visibility drops.');
      weatherReasonAdded = true;
      criticalAdded = true;
    } else if (isWarm && signals.precipProbability != null && signals.precipProbability > 60) {
      reasons.push('Heavy rain/showers in immediate forecast.');
      weatherReasonAdded = true;
    } else if (forecastText.includes('heavy') && (forecastText.includes('rain') || forecastText.includes('shower'))) {
      reasons.unshift('Heavy downpours in immediate forecast; watch for hydroplaning.');
      weatherReasonAdded = true;
      criticalAdded = true;
    } else if (forecastText.includes('fog')) {
      reasons.unshift('Fog in immediate forecast; visibility may drop quickly.');
      weatherReasonAdded = true;
      criticalAdded = true;
    } else if (signals.precipProbability != null && signals.precipProbability > 0 && signals.precipProbability <= 30) {
      reasons.push('Isolated mountain showers possible.');
      weatherReasonAdded = true;
    } else if (signals.precipProbability === 0) {
      if (isWarm) {
        reasons.push('Clear skies; remember to use low gears on steep descents to save brakes.');
        weatherReasonAdded = true;
      } else {
        reasons.push('No rain or snow wording in immediate forecast.');
        weatherReasonAdded = true;
      }
    } else if (isWarm && signals.precipProbability != null && signals.precipProbability <= 0) {
      reasons.push('Clear skies; remember to use low gears on steep descents to save brakes.');
      weatherReasonAdded = true;
    }
  }

  if (isMixedTemp) {
    reasons.push('Mixed rain and snow possible; surfaces may freeze unexpectedly.');
    weatherReasonAdded = true;
  }

  if (signals.windGust >= 45) {
    score += 20;
    reasons.unshift(`Gusts near ${signals.windGust} mph.`);
    criticalAdded = true;
  } else if (signals.windSpeed >= 30) {
    score += 12;
    reasons.unshift(`Steady winds around ${signals.windSpeed} mph.`);
    criticalAdded = true;
  } else {
    reasons.push('Winds currently under 30 mph.');
  }

  const level = mapScore(score);
  if (level === 'Very Low' && isWarm && !weatherReasonAdded && !criticalAdded) {
    reasons.push('Dry conditions; check tire pressure and engine temp for steep climbs.');
  } else if (level === 'Very Low' && isNight && !weatherReasonAdded && !criticalAdded) {
    reasons.push('Clear night; watch for wildlife near the roadway.');
  }
  return { level, reasons: summarizeReasons(reasons), action: actions.travel[level] };
}

function tractionInference(signals, actions) {
  let score = 5;
  const reasons = [];
  const snowFactor = signals.snowHours >= 6 || signals.snowFlag;
  const snowTempPossible = signals.temperature != null && signals.temperature <= 40;
  const aboveSnowTemp = signals.temperature != null && signals.temperature > 40;
  const tempF = getTempF(signals);
  const isMixedTemp = tempF != null && tempF >= 33 && tempF <= 39;
  const forecastText = (signals.shortForecast || '').toLowerCase();
  let rainReasonAdded = false;

  if (forecastText.includes('thunder')) {
    reasons.unshift('Thunderstorms in immediate forecast; expect sudden visibility drops.');
  } else if (forecastText.includes('heavy') && (forecastText.includes('rain') || forecastText.includes('shower'))) {
    reasons.unshift('Heavy downpours in immediate forecast; watch for hydroplaning.');
  } else if (forecastText.includes('fog')) {
    reasons.unshift('Fog in immediate forecast; visibility may drop quickly.');
  }

  if (signals.snowHours >= 6) {
    score += 25;
    reasons.push(`${signals.snowHours} of the next 12 hours include snow/ice wording.`);
  } else if (signals.snowFlag) {
    score += 15;
    reasons.push('Snow or sleet mentioned soon.');
  } else if (snowTempPossible) {
    reasons.push('Limited snow mention in near-term hourly outlook.');
  } else if (aboveSnowTemp && signals.precipProbability != null) {
    reasons.push('Rain or wet roads possible.');
    rainReasonAdded = true;
  } else if (aboveSnowTemp) {
    reasons.push('No snow mention in near-term hourly outlook.');
  }

  if (isMixedTemp) {
    score += 15;
    reasons.push('Mixed rain and snow possible; surfaces may freeze unexpectedly.');
  }

  if (signals.temperature != null) {
    if (signals.temperature <= 10) {
      score += 20;
      reasons.push(`Surface temps near ${signals.temperature}°${signals.temperatureUnit}.`);
    } else if (signals.temperature <= 20) {
      score += 10;
      reasons.push(`Cold temps (${signals.temperature}°${signals.temperatureUnit}) may keep snow packed.`);
    } else {
      reasons.push(`Air temps near ${signals.temperature}°${signals.temperatureUnit}.`);
    }
  } else {
    reasons.push('Temperature not reported; conditions may vary by elevation and exposure.');
  }

  if (signals.precipProbability != null) {
    if (signals.precipProbability >= 70) {
      score += 15;
      reasons.push(`High precip probability (~${signals.precipProbability}%).`);
      if (!snowFactor && !rainReasonAdded) {
        reasons.push('Rain or wet roads likely.');
        rainReasonAdded = true;
      }
    } else if (signals.precipProbability <= 30) {
      reasons.push(`Low precip probability (~${signals.precipProbability}%).`);
    }
  }

  const level = mapScore(score);
  return { level, reasons: summarizeReasons(reasons), action: actions.traction[level] };
}

function closureInference(signals, actions) {
  let score = 5;
  const reasons = [];

  if (signals.alertEvent) {
    score += 25;
    reasons.push(`Active alert: ${signals.alertEvent}`);
  }

  if (signals.heavySnowFlag) {
    score += 30;
    reasons.push('Heavy snow/blizzard wording detected.');
  } else if (signals.snowHours >= 6) {
    score += 15;
    reasons.push('Several hours of upcoming snow/ice.');
  }

  if (signals.windGust >= 50) {
    score += 20;
    reasons.push(`Gusts near ${signals.windGust} mph could trigger closures.`);
  } else if (signals.windSpeed >= 35) {
    score += 10;
    reasons.push(`Sustained winds around ${signals.windSpeed} mph.`);
  }

  if (signals.precipProbability != null && signals.precipProbability >= 80) {
    score += 15;
    reasons.push(`Very high precip probability (~${signals.precipProbability}%).`);
  }

  const level = mapScore(score);
  return { level, reasons: summarizeReasons(reasons), action: actions.closure[level] };
}

function buildInference(weatherData) {
  const signals = computeSignals(weatherData);
  const actions = buildActions(signals);
  return {
    travel: travelInference(signals, actions),
    traction: tractionInference(signals, actions),
    closure: closureInference(signals, actions),
  };
}

function updateInferenceBlock(prefix, blockData, fallbackText) {
  const levelNode = document.getElementById(`${prefix}-level`);
  const reasonsNode = document.getElementById(`${prefix}-reasons`);
  const actionNode = document.getElementById(`${prefix}-action`);

  reasonsNode.innerHTML = '';

  if (!blockData) {
    levelNode.textContent = '--';
    const li = document.createElement('li');
    li.textContent = fallbackText;
    reasonsNode.appendChild(li);
    actionNode.textContent = '';
    return;
  }

  levelNode.textContent = blockData.level;
  blockData.reasons.forEach((reason) => {
    const li = document.createElement('li');
    li.textContent = reason;
    reasonsNode.appendChild(li);
  });
  actionNode.textContent = blockData.action;
}

function resolveDaytimeFlag(weatherData) {
  if (typeof weatherData?.isDaytime === 'boolean') return weatherData.isDaytime;
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
}

function resolveWeatherIcon(summaryText, isDaytime) {
  const text = (summaryText || '').toLowerCase();
  if (/thunder/.test(text)) return { icon: '⛈️', label: 'Thunderstorms' };
  if (/(snow|blizzard|flurries|sleet|wintry mix|ice)/.test(text)) return { icon: '🌨️', label: 'Snow' };
  if (/(rain|showers)/.test(text)) return { icon: '🌧️', label: 'Rain' };
  if (/fog/.test(text)) return { icon: '🌫️', label: 'Fog' };
  if (/(cloudy|overcast)/.test(text)) return { icon: '☁️', label: 'Cloudy' };
  if (/(clear|sunny)/.test(text)) {
    return isDaytime ? { icon: '☀️', label: 'Clear day' } : { icon: '🌙', label: 'Clear night' };
  }
  return { icon: '🌤️', label: 'Partly cloudy' };
}

function buildConditionsRows({ passData, weatherData, gustMph }) {
  const lastChecked = document.getElementById('last-checked')?.textContent || 'Never';
  const lastRefresh = document.getElementById('last-refresh')?.textContent || 'Never';
  const precipProbability = resolvePrecipProbability(weatherData);
  const alerts = weatherData?.alerts || [];
  const signals = weatherData ? computeSignals(weatherData) : null;
  const temperature = weatherData?.temperature;
  const temperatureUnit = weatherData?.temperatureUnit || 'F';
  const tempThreshold = temperature != null ? temperature <= 32 : false;
  const gustThreshold = typeof gustMph === 'number' ? gustMph >= 35 : false;
  const alertsThreshold = alerts.length > 0;
  const winterMode = Boolean(
    signals?.snowFlag ||
      signals?.heavySnowFlag ||
      (temperature != null && temperature <= 32),
  );
  const roughMode = Boolean(
    alertsThreshold || signals?.heavySnowFlag || (signals?.windGust ?? 0) >= 45 || (signals?.windSpeed ?? 0) >= 30,
  );
  const tone = winterMode && roughMode ? 'rough_winter' : roughMode ? 'rough_general' : 'calm';
  const alertHeadline = alerts[0]?.headline;
  const alertValue = alerts.length
    ? `${alerts.length}${alertHeadline ? ` — ${alertHeadline}` : ''}`
    : '0';

  return [
    ['Location', passData?.name || 'Monarch Pass'],
    ['Elevation', passData ? formatElevation(passData.elevation_ft) : '—'],
    ['Last checked', lastChecked],
    ['Last NWS refresh', lastRefresh],
    ['Temperature', temperature != null ? `${temperature}°${temperatureUnit}` : 'Not stated'],
    ['Wind sustained', weatherData?.windSpeed || 'Not stated'],
    ['Gusts', gustMph != null ? `${gustMph} mph` : 'Not stated'],
    ['Precip probability', precipProbability != null ? `${precipProbability}%` : 'Not stated'],
    ['Current shortForecast', weatherData?.currentSummary || 'Not stated'],
    ['Active alerts', alertValue],
    ['snowFlag', signals ? String(signals.snowFlag) : 'false'],
    ['winterMode', String(winterMode)],
    ['roughMode', String(roughMode)],
    ['tone selected', tone],
    ['temp<=32', String(tempThreshold)],
    ['gust>=35', String(gustThreshold)],
    ['alerts>0', String(alertsThreshold)],
  ];
}

function renderConditionsPanel({ passData, weatherData, gustMph }) {
  const grid = document.getElementById('conditions-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const rows = buildConditionsRows({ passData, weatherData, gustMph });
  rows.forEach(([key, value]) => {
    const keyNode = document.createElement('div');
    keyNode.className = 'conditions-key';
    keyNode.textContent = key;
    const valueNode = document.createElement('div');
    valueNode.className = 'conditions-value';
    valueNode.textContent = value;
    grid.appendChild(keyNode);
    grid.appendChild(valueNode);
  });
}

function renderInference(weatherData) {
  if (!weatherData || weatherData.error) {
    ['travel', 'traction', 'closure'].forEach((key) => {
      updateInferenceBlock(key, null, 'Inference unavailable until NWS data loads.');
    });
    return;
  }

  const inference = buildInference(weatherData);
  updateInferenceBlock('travel', inference.travel);
  updateInferenceBlock('traction', inference.traction);
  updateInferenceBlock('closure', inference.closure);
}

function renderWeather(weatherData, errorMessage = '') {
  const summaryNode = document.getElementById('weather-summary');
  const summaryTextNode = document.getElementById('weather-summary-text');
  const summaryIconNode = document.getElementById('weather-icon');
  const tempNode = document.getElementById('temp-line');
  const windNode = document.getElementById('wind-line');
  const gustNode = document.getElementById('gust-line');
  const precipNode = document.getElementById('precip-line');
  const hourlyNode = document.getElementById('hourly-forecast');
  const alertsNode = document.getElementById('alerts');
  const errorNode = document.getElementById('weather-error');

  if (!weatherData || weatherData.error) {
    if (summaryTextNode) {
      summaryTextNode.textContent = 'Weather unavailable.';
    } else {
      summaryNode.textContent = 'Weather unavailable.';
    }
    tempNode.textContent = 'Temperature: --';
    windNode.textContent = 'Wind: --';
    gustNode.textContent = 'Gusts: --';
    precipNode.textContent = 'Precip probability: --';
    hourlyNode.textContent = 'Hourly forecast not available.';
    alertsNode.textContent = 'No alert info available.';
    errorNode.textContent = errorMessage
      ? `Weather unavailable (last error: ${errorMessage})`
      : 'Weather unavailable.';
    if (summaryIconNode) {
      summaryIconNode.textContent = '—';
      summaryIconNode.setAttribute('aria-label', 'Weather icon unavailable');
    }
    renderConditionsPanel({ passData: latestPassData, weatherData: null, gustMph: null });
    return;
  }

  errorNode.textContent = '';
  const gustMph = resolveGustMph(weatherData);
  const isDaytime = resolveDaytimeFlag(weatherData);
  const icon = resolveWeatherIcon(weatherData.currentSummary, isDaytime);
  if (summaryTextNode) {
    summaryTextNode.textContent = weatherData.currentSummary;
  } else {
    summaryNode.textContent = weatherData.currentSummary;
  }
  if (summaryIconNode) {
    summaryIconNode.textContent = icon.icon;
    summaryIconNode.setAttribute('aria-label', icon.label);
  }
  tempNode.textContent = `Temperature: ${weatherData.temperature ?? '—'}°${weatherData.temperatureUnit || 'F'}`;
  windNode.textContent = `Wind: ${weatherData.windSpeed || 'Not reported'}`;
  gustNode.textContent = `Gusts: ${gustMph != null ? `${gustMph} mph` : 'Not stated'}`;
  const precipProbability = resolvePrecipProbability(weatherData);
  precipNode.textContent =
    precipProbability != null
      ? `Precip probability: ${precipProbability}%`
      : 'Precip probability: not stated.';

  if (weatherData.next12Hours?.length) {
    const items = weatherData.next12Hours.map(
      (period) => `${formatTime(period.name)}: ${period.temperature}° ${period.shortForecast} (${period.windSpeed || 'wind n/a'})`,
    );
    hourlyNode.innerHTML = '';
    hourlyNode.appendChild(createList(items));
  } else {
    hourlyNode.textContent = 'Hourly forecast not available.';
  }

  if (weatherData.alerts?.length) {
    const alertItems = weatherData.alerts.map((alert) => `${alert.event || 'Alert'}: ${alert.headline || ''}`);
    alertsNode.innerHTML = '';
    alertsNode.appendChild(createList(alertItems));
  } else {
    alertsNode.textContent = 'No active NWS alerts for this location.';
  }

  renderConditionsPanel({ passData: latestPassData, weatherData, gustMph });
}

function updateTimestamp(id, date) {
  const node = document.getElementById(id);
  node.textContent = date ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' }) : 'Never';
  renderConditionsPanel({ passData: latestPassData, weatherData: latestWeatherData, gustMph: resolveGustMph(latestWeatherData) });
}

function scheduleNextFetch(success) {
  const delay = success ? FETCH_INTERVAL_MS : RETRY_INTERVAL_MS;
  clearTimeout(fetchTimeoutId);
  fetchTimeoutId = setTimeout(fetchAndRenderWeather, delay);
}

async function fetchAndRenderWeather() {
  const passData = latestPassData || getPrimaryPass();
  try {
    const weatherData = await getGridpointForecast(passData.lat, passData.lon);
    latestWeatherData = weatherData;
    renderWeather(weatherData, '');
    renderInference(weatherData);
    updateTimestamp('last-refresh', new Date());
    scheduleNextFetch(true);
  } catch (error) {
    console.error(error);
    latestWeatherData = null;
    renderWeather(null, error.message);
    renderInference(null);
    scheduleNextFetch(false);
  }
}

function startLastCheckedTimer() {
  const update = () => updateTimestamp('last-checked', new Date());
  update();
  setInterval(update, LAST_CHECK_INTERVAL_MS);
}

onReady(() => {
  setupThemeToggle();
  const params = new URLSearchParams(window.location.search);
  const passParam = params.get('pass');
  const passData = getPassById(passParam) || getPrimaryPass();
  latestPassData = passData;
  populateBasics(passData);
  setSnapshotSubtitle(passData);
  applyPassSeo(passData);
  updateTimestamp('last-refresh', null);
  startLastCheckedTimer();
  renderInference(null);
  fetchAndRenderWeather();
});
