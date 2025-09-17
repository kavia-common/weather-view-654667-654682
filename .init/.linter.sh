#!/bin/bash
cd /tmp/kavia/workspace/code-generation/weather-view-654667-654682/weather_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

