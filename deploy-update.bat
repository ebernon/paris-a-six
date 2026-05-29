@echo off
setlocal
title Paris a Six - Deploy Update

echo.
echo  ============================================
echo    Paris a Six  ^|  Deploy Update
echo  ============================================
echo.

cd /d "%~dp0"

:: ── Clear any stale git lock ──────────────────
if exist ".git\index.lock" (
    echo Clearing stale git lock...
    del /f /q ".git\index.lock" >nul 2>&1
    echo.
)

:: ── Set git identity (in case it isn't set) ──
git config user.email "ebernon@gmail.com"
git config user.name "Eric Bernon"

:: ── Show what's about to be committed ────────
echo Changes to deploy:
git status --short
echo.

:: ── Stage everything ──────────────────────────
echo Staging files...
git add -A
if %errorlevel% neq 0 (
    echo [ERROR] git add failed.
    pause
    exit /b 1
)
echo.

:: ── Commit ────────────────────────────────────
echo Committing...
git commit -m "Add splash screen, install prompt, and logo favicon"
if %errorlevel% neq 0 (
    echo [INFO] Nothing to commit, or commit failed. Continuing to push...
)
echo.

:: ── Push (triggers Vercel auto-deploy) ───────
echo Pushing to GitHub (this triggers Vercel deploy)...
echo (A login window may pop up - sign in with your GitHub account)
echo.
git push origin main

echo.
if %errorlevel% equ 0 (
    echo  ============================================
    echo    Pushed to GitHub successfully!
    echo    Vercel will auto-deploy in ~30-60 seconds.
    echo    Check: https://vercel.com/dashboard
    echo  ============================================
) else (
    echo  [ERROR] Push failed. See message above.
)

echo.
pause
endlocal
