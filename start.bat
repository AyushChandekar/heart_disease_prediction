@echo off
echo Starting HridayVani application...

echo Starting Flask backend server...
start cmd /k "cd api-backend && python app.py"

echo Starting Next.js frontend server...
start cmd /k "npm run dev"

echo HridayVani servers are starting. Please wait a moment...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
echo Press any key to exit this window (servers will continue running)
pause > nul 