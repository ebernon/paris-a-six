@echo off
setlocal
title Paris a Six — Push to GitHub

echo.
echo  ============================================
echo    Paris a Six  ^|  Push to GitHub
echo  ============================================
echo.

:: Move to the folder this script lives in
cd /d "%~dp0"

:: ── Initialize git if not already done ───────
if not exist ".git\" (
    echo Initializing git...
    git init
    echo.
)

:: ── Set git identity ─────────────────────────
git config --global user.email "ebernon@gmail.com"
git config --global user.name "Eric Bernon"
echo.

:: ── Make sure node_modules is ignored ────────
if not exist ".gitignore" (
    echo node_modules > .gitignore
    echo dist >> .gitignore
    echo .env >> .gitignore
)

:: ── Stage all files ───────────────────────────
echo Adding files...
git add .
echo.

:: ── Commit ────────────────────────────────────
echo Committing...
git commit -m "Paris a Six app - initial commit"
echo.

:: ── Point to GitHub ───────────────────────────
git remote remove origin 2>nul
git remote add origin https://github.com/ebernon/paris-a-six.git
git branch -M main

:: ── Push ──────────────────────────────────────
echo Pushing to GitHub...
echo (A login window may pop up — sign in with your GitHub account)
echo.
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo  ============================================
    echo    Success! Code is on GitHub.
    echo    https://github.com/ebernon/paris-a-six
    echo  ============================================
) else (
    echo  [ERROR] Push failed. See message above.
    echo  Make sure you're signed into GitHub when prompted.
)

echo.
pause
endlocal
