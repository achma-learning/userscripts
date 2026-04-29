@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Faraday Mode

REM =====================================================================
REM  FaradayMode.bat - Windows hardening toggle (Safe Mode / Normal Mode)
REM
REM  Default (no args, e.g. double-click) = full INSTALL.  This is the
REM  setup-style behaviour: it registers the boot + logon scheduled
REM  tasks, applies safe mode immediately, and launches the tray.
REM
REM  Sub-commands:
REM    install    (default) Register tasks, apply safe mode, launch tray.
REM    uninstall  Unregister tasks, kill tray, revert to normal mode.
REM    safe       Apply lockdown (idempotent). Used at boot too.
REM    normal     Restore everything from backup (idempotent).
REM    boot       Alias of "safe" - invoked by the boot scheduled task.
REM    toggle     Flip current state without touching scheduled tasks.
REM    status     Print current state and exit.
REM =====================================================================

set "ELEVATED="
if /i "%~1"=="--elevated" (
    set "ELEVATED=1"
    set "CMD=%~2"
) else (
    set "CMD=%~1"
)
if "%CMD%"=="" set "CMD=install"

REM ---- admin check ----------------------------------------------------
REM   Do NOT use `net session` here: Faraday Mode disables LanmanServer,
REM   which makes `net session` return non-zero even when we ARE admin,
REM   producing an infinite self-elevation loop.  fsutil dirty query is
REM   admin-only and does not depend on any service we touch.
fsutil dirty query %systemdrive% >nul 2>&1
if %errorlevel% neq 0 (
    if defined ELEVATED (
        echo.
        echo  [!] UAC elevation did not give this process admin rights.
        echo      Right-click FaradayMode.bat ^-^> Run as administrator.
        echo.
        pause
        exit /b 1
    )
    echo Requesting administrator privileges...
    powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -ArgumentList '--elevated %CMD%' -Verb RunAs"
    exit /b
)

REM ---- paths ----------------------------------------------------------
set "ROOT=%ProgramData%\FaradayMode"
set "BACKUP=%ROOT%\backup"
set "STATE=%ROOT%\state.flag"
set "TRAYPID=%ROOT%\tray.pid"
set "FWBACKUP=%BACKUP%\firewall.wfw"
set "SVCBACKUP=%BACKUP%\services.txt"
set "INSTALLPS1=%~dp0install.ps1"
set "UNINSTALLPS1=%~dp0uninstall.ps1"

if not exist "%ROOT%"   mkdir "%ROOT%"
if not exist "%BACKUP%" mkdir "%BACKUP%"

REM ---- dispatch -------------------------------------------------------
if /i "%CMD%"=="status"    goto :STATUS
if /i "%CMD%"=="install"   goto :INSTALL
if /i "%CMD%"=="uninstall" goto :UNINSTALL
if /i "%CMD%"=="safe"      goto :ENABLE
if /i "%CMD%"=="boot"      goto :ENABLE
if /i "%CMD%"=="normal"    goto :DISABLE
if /i "%CMD%"=="toggle" (
    if exist "%STATE%" ( goto :DISABLE ) else ( goto :ENABLE )
)

echo Unknown command: %CMD%
echo Usage: %~nx0 [safe^|normal^|toggle^|boot^|install^|uninstall^|status]
exit /b 1

REM =====================================================================
:STATUS
if exist "%STATE%" (
    echo Faraday Mode: SAFE
) else (
    echo Faraday Mode: NORMAL
)
exit /b 0

REM =====================================================================
:INSTALL
echo.
echo  ==========================================
echo   Installing Faraday Mode (boot + logon)
echo  ==========================================
echo.
if not exist "%INSTALLPS1%" (
    echo install.ps1 not found beside the .bat - aborting.
    pause
    exit /b 2
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%INSTALLPS1%" -BatPath "%~f0" -TrayPath "%~dp0tray.ps1"
set "RC=%errorlevel%"
echo.
if %RC% equ 0 (
    echo  [+] Faraday Mode installed. Look for the shield in the tray.
) else (
    echo  [!] Install failed with code %RC%.
)
echo.
pause
exit /b %RC%

REM =====================================================================
:UNINSTALL
echo.
echo  ==========================================
echo   Uninstalling Faraday Mode
echo  ==========================================
echo.
if not exist "%UNINSTALLPS1%" (
    echo uninstall.ps1 not found beside the .bat - aborting.
    pause
    exit /b 2
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%UNINSTALLPS1%" -BatPath "%~f0"
set "RC=%errorlevel%"
echo.
pause
exit /b %RC%

REM =====================================================================
:ENABLE
REM Idempotent: if already in safe mode, just refresh and exit.
if exist "%STATE%" (
    echo [=] Faraday Mode is already SAFE - nothing to do.
    exit /b 0
)

echo.
echo  ==========================================
echo   Engaging FARADAY MODE - hardening device
echo  ==========================================
echo.

REM ---- Backup firewall + service states -------------------------------
echo [*] Backing up firewall configuration...
netsh advfirewall export "%FWBACKUP%" >nul

echo [*] Recording current service start modes...
> "%SVCBACKUP%" echo # FaradayMode service backup
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax RasAuto iphlpsvc WinHttpAutoProxySvc) do (
    for /f "tokens=2*" %%A in ('sc qc "%%S" 2^>nul ^| find "START_TYPE"') do (
        >> "%SVCBACKUP%" echo %%S=%%B
    )
)

REM ---- FIREWALL : block everything ------------------------------------
echo [*] Locking down Windows Firewall (block in + out)...
netsh advfirewall set allprofiles state on                                 >nul
netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound >nul
netsh advfirewall set allprofiles settings inboundusernotification disable  >nul
netsh advfirewall set allprofiles logging droppedconnections enable         >nul

netsh advfirewall firewall add rule name="Faraday-Loopback-In"  dir=in  action=allow remoteip=127.0.0.1 >nul
netsh advfirewall firewall add rule name="Faraday-Loopback-Out" dir=out action=allow remoteip=127.0.0.1 >nul

for %%P in (135 137 138 139 445 593 1433 1434 3389 5040 5353 5355 5985 5986) do (
    netsh advfirewall firewall add rule name="Faraday-DenyTCP-%%P" dir=in action=block protocol=TCP localport=%%P >nul
    netsh advfirewall firewall add rule name="Faraday-DenyUDP-%%P" dir=in action=block protocol=UDP localport=%%P >nul
)

REM ---- Services : stop + disable --------------------------------------
echo [*] Stopping and disabling remote-access / telemetry services...
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax WinHttpAutoProxySvc) do (
    sc stop   "%%S" >nul 2>&1
    sc config "%%S" start= disabled >nul 2>&1
)

REM ---- Remote-login surfaces ------------------------------------------
echo [*] Disabling RDP, Remote Assistance, PSRemoting...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server"   /v fDenyTSConnections /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v fAllowToGetHelp    /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v fAllowFullControl  /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "Disable-PSRemoting -Force -WarningAction SilentlyContinue" >nul 2>&1
powershell -NoProfile -Command "Stop-Service WinRM -Force -ErrorAction SilentlyContinue; Set-Service WinRM -StartupType Disabled -ErrorAction SilentlyContinue" >nul 2>&1

REM ---- Network protocol attack surface --------------------------------
echo [*] Disabling SMBv1, NetBIOS, LLMNR, mDNS, WPAD...
powershell -NoProfile -Command "Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force -ErrorAction SilentlyContinue" >nul 2>&1
powershell -NoProfile -Command "Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart -ErrorAction SilentlyContinue" >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient"      /v EnableMulticast /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters" /v EnableMDNS      /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 2 -ErrorAction SilentlyContinue }" >nul 2>&1

REM ---- Auth hardening -------------------------------------------------
echo [*] Hardening NTLM and disabling LM-hash storage...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"        /v NoLMHash                       /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictSendingNTLMTraffic     /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictReceivingNTLMTraffic   /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"        /v LmCompatibilityLevel           /t REG_DWORD /d 5 /f >nul

REM ---- Misc surface reduction -----------------------------------------
echo [*] Disabling AutoRun, AutoPlay, telemetry, error-reporting...
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 255 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /t REG_DWORD /d 0   /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient\Windows"               /v CEIPEnable        /t REG_DWORD /d 0   /f >nul

REM ---- Flush caches ---------------------------------------------------
echo [*] Flushing DNS / ARP / NetBIOS caches...
ipconfig /flushdns >nul
arp -d * >nul 2>&1
nbtstat -R >nul 2>&1
nbtstat -RR >nul 2>&1

REM ---- Mark state -----------------------------------------------------
> "%STATE%" echo safe
echo.
echo  [+] FARADAY MODE is now SAFE.
echo.
exit /b 0

REM =====================================================================
:DISABLE
if not exist "%STATE%" (
    echo [=] Faraday Mode is already NORMAL - nothing to do.
    exit /b 0
)

echo.
echo  ==========================================
echo   Disengaging FARADAY MODE - restoring
echo  ==========================================
echo.

REM ---- Restore firewall -----------------------------------------------
if exist "%FWBACKUP%" (
    echo [*] Restoring firewall configuration...
    netsh advfirewall reset >nul
    netsh advfirewall import "%FWBACKUP%" >nul
)
for %%P in (135 137 138 139 445 593 1433 1434 3389 5040 5353 5355 5985 5986) do (
    netsh advfirewall firewall delete rule name="Faraday-DenyTCP-%%P" >nul 2>&1
    netsh advfirewall firewall delete rule name="Faraday-DenyUDP-%%P" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Faraday-Loopback-In"  >nul 2>&1
netsh advfirewall firewall delete rule name="Faraday-Loopback-Out" >nul 2>&1

REM ---- Restore service start modes ------------------------------------
echo [*] Restoring services...
if exist "%SVCBACKUP%" (
    for /f "usebackq tokens=1,2 delims==" %%A in (`findstr /v /b "#" "%SVCBACKUP%"`) do (
        if not "%%A"=="" call :RESTORE_SVC "%%A" "%%B"
    )
)

REM ---- Revert registry hardening --------------------------------------
echo [*] Reverting registry hardening...
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server"      /v fDenyTSConnections /f >nul 2>&1
reg add    "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance"    /v fAllowToGetHelp    /t REG_DWORD /d 1 /f >nul
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient"      /v EnableMulticast    /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters" /v EnableMDNS         /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictSendingNTLMTraffic   /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictReceivingNTLMTraffic /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"        /v LmCompatibilityLevel        /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /f >nul 2>&1

powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 0 -ErrorAction SilentlyContinue }" >nul 2>&1

REM ---- Clear state ----------------------------------------------------
del /q "%STATE%" >nul 2>&1

echo.
echo  [+] FARADAY MODE is now NORMAL.  (Reboot recommended.)
echo.
exit /b 0

REM =====================================================================
:RESTORE_SVC
set "_NAME=%~1"
set "_TYPE=%~2"
set "_START="
echo %_TYPE% | find "AUTO_START"   >nul && set "_START=auto"
echo %_TYPE% | find "DEMAND_START" >nul && set "_START=demand"
echo %_TYPE% | find "DISABLED"     >nul && set "_START=disabled"
echo %_TYPE% | find "SYSTEM_START" >nul && set "_START=system"
echo %_TYPE% | find "BOOT_START"   >nul && set "_START=boot"
if defined _START sc config "%_NAME%" start= %_START% >nul 2>&1
exit /b 0
