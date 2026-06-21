@echo off
echo ========================================
echo Project Cleanup Script
echo ========================================
echo.

echo Current folder sizes:
echo.
powershell -Command "Get-ChildItem -Directory | ForEach-Object { $size = (Get-ChildItem $_.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB; [PSCustomObject]@{Folder=$_.Name; SizeMB=[math]::Round($size, 2)} } | Sort-Object SizeMB -Descending | Select-Object -First 5 | Format-Table"

echo.
echo ========================================
echo Step 1: Removing .next folder...
echo ========================================
if exist .next (
    rmdir /s /q .next
    echo [OK] .next folder removed (~976 MB freed)
) else (
    echo [INFO] .next folder does not exist
)

echo.
echo ========================================
echo Step 2: Removing out folder...
echo ========================================
if exist out (
    rmdir /s /q out
    echo [OK] out folder removed (~426 MB freed)
) else (
    echo [INFO] out folder does not exist
)

echo.
echo ========================================
echo Cleanup Complete!
echo ========================================
echo.
echo Estimated space freed: ~1.4 GB
echo.
echo Next steps:
echo 1. Consider removing duplicate images from src\assets (~276 MB)
echo 2. Optimize images in public folder (~200+ MB can be saved)
echo 3. Run 'npm run build' when you need to rebuild
echo.
pause
