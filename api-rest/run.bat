@echo off
setlocal

REM 1. Parar processos antigos do node (app.js)
echo.
echo ================================================================
echo ⛔ Parando o servidor antigo...
for /f "tokens=2 delims=," %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO:CSV /NH') do (
    for /f "tokens=2 delims= " %%b in ('wmic process where "ProcessId=%%a" get CommandLine^,ProcessId /FORMAT:CSV ^| findstr /I "app.js"') do (
        echo Finalizando processo Node com PID %%a
        taskkill /PID %%a /F >nul 2>&1
    )
)

REM 2. Iniciar o servidor
echo ================================================================
echo 🚀 Iniciando servidor...
start "ServidorAPI" /B cmd /C "npm start"
REM Espera um pouco para o servidor iniciar
timeout /t 2 >nul

REM 3. Aguarda o servidor responder
set MAX_ATTEMPTS=20
set ATTEMPT=1
set URL=http://localhost:3030/
echo ================================================================
echo ⏳ Aguardando o servidor iniciar...

:wait_loop
powershell -Command ^
    "$r = $null; try { $r = Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2 } catch {}; if ($r -and $r.StatusCode -eq 200) { exit 0 } else { exit 1 }"
if %ERRORLEVEL%==0 (
    echo.
    echo ================================================================
    echo ✅ Servidor está pronto!
) else (
    set /a ATTEMPT+=1
    if %ATTEMPT% GTR %MAX_ATTEMPTS% (
        echo.
        echo ❌ Servidor não respondeu apos %MAX_ATTEMPTS% tentativas.
        exit /b 1
    )
    timeout /t 1 >nul
    goto wait_loop
)

REM 4. Executa os testes
echo ================================================================
echo ▶️ Executando todos os testes...
npm test

REM 5. Mata o servidor iniciado ao final dos testes
echo ================================================================
echo ⛔ Encerrando o servidor iniciado...
for /f "tokens=2 delims=," %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO:CSV /NH') do (
    for /f "tokens=2 delims= " %%b in ('wmic process where "ProcessId=%%a" get CommandLine^,ProcessId /FORMAT:CSV ^| findstr /I "app.js"') do (
        echo Finalizando processo Node com PID %%a
        taskkill /PID %%a /F >nul 2>&1
    )
)

echo ================================================================
echo ✅ Processo finalizado.

endlocal 