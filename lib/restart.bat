@echo off

rem stop apache
apache\bin\pv -f -k httpd.exe -q

rem stop mysql
apache\bin\pv -f -k mysqld.exe -q

rem kill all xampp-control.exe
taskkill /f /im "xampp-control.exe"

start "" "xampp-control.exe"
