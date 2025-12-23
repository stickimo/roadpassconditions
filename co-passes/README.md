# CO Pass Conditions

Static V1 website focused on Monarch Pass. It lists the pass, shows live National Weather Service forecasts, and keeps
manual status text handy. No framework, no build step—just static HTML, CSS, and vanilla JS modules.

## Structure

```
co-passes/
  index.html       # Monarch Pass directory page
  pass.html        # Monarch pass details with refresh timers
  about.html       # About the project
  privacy.html     # Privacy policy
  contact.html     # Contact info
  assets/
    styles.css     # Shared styles
    passes.js      # Pass metadata (lat/lon, manual status)
    app.js         # Tiny DOM helpers
    nws.js         # National Weather Service adapter
    passPage.js    # Page logic for pass.html
    cotripStub.js  # Placeholder for future COtrip integration
```

## Run locally

From the `co-passes` directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/index.html` to view the Monarch snapshot. Stop the server with `Ctrl+C`.

## Deployment (Cloudflare Pages)

1. Create a new Cloudflare Pages project and connect this folder or upload the files.
2. Build command: `none` (leave blank) or `echo "Static"` if required.
3. Output directory: `/` (project root). If you choose to copy files to `public/`, update Cloudflare to point there.

Because the site is static, any host (S3, Netlify, GitHub Pages, etc.) works without extra configuration.

## NWS usage notes

- API: `https://api.weather.gov` (gridpoint forecasts + hourly + alerts).
- Each pass requests its point once per page load.
- Browser fetches include `Accept: application/geo+json` as recommended; User-Agent is left to the browser.
- TODO for V2: cache forecast responses (localStorage or small worker) to reduce API calls.

## Refresh behavior

- \"Last checked\" timestamp updates every 30 seconds.
- NWS fetch runs every 5 minutes, using the documented `points -> forecast/forecastHourly` flow.
- Failed requests show an inline error message and trigger a retry 60 seconds later.

## V2 hooks / TODOs

- Integrate the COtrip API into `cotripStub.js` for live pass status, incidents, and traction alerts.
- Add caching/batching for forecast data or move refreshes to a worker that can serve multiple passes again once scope expands.
