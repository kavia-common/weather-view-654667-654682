# Weather Viewer Frontend

A modern React UI for viewing current weather and forecasts.

## Features
- Ocean Professional theme (Primary: #2563EB, Secondary: #F59E0B, Background: #f9fafb, Text: #111827)
- Header with app title and location search
- Current weather details card
- Forecast list as responsive cards
- Footer with credits
- Mock-ready weather API service (switches to real API when env vars are set)
- Clean component structure

## Project Structure
- src/theme.css — Theme and layout styles
- src/services/weatherService.js — API integration (mock by default)
- src/components/Header.js — Header with search
- src/components/WeatherDetails.js — Current weather card
- src/components/ForecastList.js — Forecast cards
- src/components/Footer.js — Footer credits
- src/App.js — Application container and data orchestration

## Environment Variables
Copy `.env.example` to `.env` and set values when using a real API:
- REACT_APP_WEATHER_API_URL
- REACT_APP_WEATHER_API_KEY

If these are not set, the app uses built-in mock data.

## Scripts
- npm start — Start dev server
- npm test — Run tests
- npm run build — Build production bundle

## Notes
- Do not hardcode API keys in the codebase. Use environment variables.
- The weatherService includes mapping helpers for future API payloads.
