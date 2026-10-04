@echo off
setlocal
set "F=%~dp0index.html"
set "U=file:///%F:\=/%"
for %%P in ("%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%LocalAppData%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe") do (
  if exist %%P (
    start "" %%P --app="%U%"
    exit /b
  )
)
start "" "%F%"
