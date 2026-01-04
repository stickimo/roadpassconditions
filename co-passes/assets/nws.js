const BASE_URL = 'https://api.weather.gov';
const DEFAULT_HEADERS = {
  Accept: 'application/geo+json',
};

async function fetchJson(url) {
  const response = await fetch(url, { headers: DEFAULT_HEADERS });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getGridpointForecast(lat, lon) {
  const pointData = await fetchJson(`${BASE_URL}/points/${lat},${lon}`);
  const { forecast, forecastHourly } = pointData.properties;

  if (!forecast || !forecastHourly) {
    throw new Error('NWS gridpoint missing forecast URLs');
  }

  const [forecastData, hourlyData, alertsData] = await Promise.all([
    fetchJson(forecast),
    fetchJson(forecastHourly),
    fetchJson(`${BASE_URL}/alerts/active?point=${lat},${lon}`),
  ]);

  const forecastPeriods = forecastData?.properties?.periods || [];
  const now = Date.now();
  const currentPeriod =
    forecastPeriods.find((period) => {
      const start = Date.parse(period.startTime);
      const end = Date.parse(period.endTime);
      return Number.isFinite(start) && Number.isFinite(end) && start <= now && now < end;
    }) || forecastPeriods[0];
  const hourlyPeriods = hourlyData?.properties?.periods || [];
  const next12Hours = hourlyPeriods.slice(0, 12).map((period) => ({
    name: period.startTime,
    temperature: period.temperature,
    shortForecast: period.shortForecast,
    windSpeed: period.windSpeed,
  }));

  const alerts = (alertsData.features || []).map((feature) => ({
    event: feature.properties?.event,
    headline: feature.properties?.headline,
  }));

  return {
    currentSummary: currentPeriod?.detailedForecast || currentPeriod?.shortForecast || 'Summary unavailable',
    temperature: currentPeriod?.temperature,
    temperatureUnit: currentPeriod?.temperatureUnit,
    windSpeed: currentPeriod?.windSpeed,
    windGust: currentPeriod?.windGust,
    isDaytime: currentPeriod?.isDaytime,
    next12Hours,
    alerts,
  };
}

// TODO: V2 - add caching or localStorage layer for forecast responses to reduce API load.
