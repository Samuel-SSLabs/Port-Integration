@echo off
title SSLabs Port Manager - EcoSystem 1.042
cd /d "%~dp0"
echo ================================================================
echo    SSLabs EcoSystem • Port Integration Gerenciador (v1.042)
echo ================================================================
echo  Iniciando servidor local e abrindo interface no navegador...
echo.
node scripts/gerenciador-server.js
pause
