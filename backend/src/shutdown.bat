@echo off
set /p port= "Enter port: "
npx kill-port %port%
@pause