@echo off
setlocal

title Paris a Six — Vercel Deploy

echo.
echo  ============================================
echo    Paris a Six  ^|  Vercel Deploy
echo  ============================================
echo.

:: Move to the folder this script lives in
cd /d "%~dp0"

:: ── Check for Node / npm ─────────────────────
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: ── Install dependencies if needed ───────────
if not exist "node_modules\" (
    echo Installing dependencies...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo.
)

:: ── Check for Vercel CLI ──────────────────────
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing globally...
    echo.
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo [ERROR] Could not install Vercel CLI.
        pause
        exit /b 1
    )
    echo.
)

:: ── Deploy ────────────────────────────────────
echo Deploying to Vercel (production)...
echo.
call vercel --prod

echo.
if %errorlevel% equ 0 (
    echo  ============================================
    echo    Deployed successfully!
    echo  ============================================
) else (
    echo  [ERROR] Deployment failed. Check the output above.
)

echo.
pause
endlocal
