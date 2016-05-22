@echo off

rem stop apache
apache\bin\pv -f -k httpd.exe -q

rem stop mysql
apache\bin\pv -f -k mysqld.exe -q

rem kill all xampp-control.exe
taskkill /f /im "xampp-control.exe" 2> nul

if "%2"=="no" (
  start "" "xampp-control.exe"
)
