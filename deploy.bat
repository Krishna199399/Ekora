@echo off
echo.
echo ===================================
echo   EGC - Build and Package for Deploy
echo ===================================
echo.

cd /d d:\ekorr

echo [1/3] Building static export...
call npx next build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo BUILD FAILED! Check errors above.
    pause
    exit /b 1
)

echo.
echo [2/3] Copying PHP API files into out/ folder...
if not exist "out\api" mkdir "out\api"
copy /Y "public\api\contact.php" "out\api\contact.php"
copy /Y "public\api\config.php"  "out\api\config.php"

echo     PHP files copied:
echo     - out\api\contact.php
echo     - out\api\config.php

echo.
echo [3/3] Creating deployment ZIP (Linux-compatible)...
if exist "d:\ekorr\hostinger-upload.zip" del /f "d:\ekorr\hostinger-upload.zip"
tar -a -cf d:\ekorr\hostinger-upload.zip -C d:\ekorr\out .

echo.
echo ===================================
echo   DONE!
echo   ZIP ready: d:\ekorr\hostinger-upload.zip
echo ===================================
echo.
echo Next steps:
echo   1. Upload hostinger-upload.zip to public_html
echo   2. Delete old _next/ folder first
echo   3. Extract ZIP with folder name "."
echo   4. Clear Hostinger cache
echo   5. Forms will now use /api/contact.php (PHP SMTP)
echo.
pause
