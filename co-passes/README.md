RoadPassConditions.com
A high-utility, Programmatic SEO (pSEO) platform providing live weather intelligence for 109 major U.S. mountain passes. This project prioritizes speed, search engine crawlability, and expert-level weather heuristics without the overhead of heavy frameworks.

⚡ Key Features
Custom Weather Heuristics: Advanced logic to identify "Mixed Precip" transition zones (33°F–39°F) and context-aware safety tips (e.g., brake cooling on steep grades).

National Weather Service Integration: Live data via api.weather.gov including hourly forecasts and active alerts.

Search Engine Optimized: Fully dynamic metadata, canonical links, and a structured "Hub-and-Spoke" hierarchy for all 109 passes.

No-Build Architecture: Powered by vanilla JavaScript modules, static HTML, and CSS.

📂 Project Structure
Plaintext

/
├── index.html          # Homepage: National overview & global pass search
├── state.html          # State Hub: Lists passes by state (e.g., CO, CA, OR)
├── pass.html           # Detail Page: Live snapshot and travel inference
├── robots.txt          # Search engine crawl rules
├── sitemap.xml         # Static map of all 109 pass URLs
└── assets/
    ├── styles.css      # Shared responsive styling
    ├── passes.js       # Central metadata for all 109 passes
    ├── app.js          # DOM and formatting utilities
    ├── nws.js          # API adapter for National Weather Service
    └── passPage.js     # Core engine: Weather fetching, risk inference, and timers
🚀 Getting Started
Run Locally
Since this project uses ES Modules, you must serve it via a local web server:

Open your terminal in the project directory.

Start a Python server:

Bash

python3 -m http.server 8000
Open in your browser: http://localhost:8000

🛠 Technical Details
Data Fetching & Reliability
Frequency: NWS data refreshes every 5 minutes.

Status Check: The "Last Checked" timer updates every 30 seconds.

Error Handling: If an API request fails, the system displays an inline error and retries automatically after 60 seconds.

Heuristic Logic (A+ Readiness)
The system analyzes forecast variables to determine three distinct risk categories:

Travel Risk: Based on active alerts, wind gusts, and visibility.

Traction Risk: Intelligent logic that differentiates between rain and snow based on a 42°F threshold.

Closure Risk: Highlights potential pass closures based on NWS "Winter Storm Warnings" or "High Wind Warnings."

☁️ Deployment
This is a fully static asset and can be deployed anywhere:

GitHub Pages (Recommended)

Cloudflare Pages

Netlify

Note: Ensure your hosting provider is configured to point to the root directory. No build command is necessary.

⚖️ Disclaimer
Weather data is sourced from the National Weather Service. Risk indicators are heuristic estimates and should not be used as official road closure reports. Always consult state DOTs (e.g., CDOT, Caltrans) before traveling.