@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Faraday Mode

REM =====================================================================
REM  FaradayMode.bat  -  one-click hardening toggle for Windows 10/11
REM  Run once  : enables lockdown, drops a tray-icon to show it is ON.
REM  Run again : restores everything and removes the tray icon.
REM
REM  Lockdown actions (all reversible):
REM   * Windows Firewall   : block all inbound + outbound (loopback ok)
REM   * Services           : stop+disable RDP, WinRM, RemoteRegistry,
REM                          RemoteAccess, SSDP, UPnP, Spooler, WebClient,
REM                          LanmanServer, DiagTrack, RasMan, Telnet, SNMP,
REM                          Fax, RemoteAssistance, dmwappushservice
REM   * Network            : SMBv1 off, NetBIOS-over-TCP off, LLMNR off,
REM                          WPAD off, mDNS off
REM   * Remote login       : RDP, Remote Assistance, PSRemoting all off
REM   * Auth               : NoLMHash=1, RestrictSendingNTLMTraffic=2,
REM                          RestrictReceivingNTLMTraffic=2
REM   * Misc               : AutoPlay off, AutoRun off, scripted-diagnostics
REM                          off, error-reporting off, customer-experience
REM                          off
REM   * Cache              : ipconfig /flushdns + arp -d *
REM
REM  Backups stored in  %ProgramData%\FaradayMode\backup\
REM =====================================================================

REM ---- 1. Self-elevate ------------------------------------------------
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

REM ---- 2. Paths -------------------------------------------------------
set "ROOT=%ProgramData%\FaradayMode"
set "BACKUP=%ROOT%\backup"
set "STATE=%ROOT%\state.flag"
set "TRAYPID=%ROOT%\tray.pid"
set "FWBACKUP=%BACKUP%\firewall.wfw"
set "SVCBACKUP=%BACKUP%\services.txt"
set "TRAYPS1=%~dp0tray.ps1"

if not exist "%ROOT%"   mkdir "%ROOT%"
if not exist "%BACKUP%" mkdir "%BACKUP%"

REM ---- 3. Toggle dispatch --------------------------------------------
if exist "%STATE%" (
    goto :DISABLE
) else (
    goto :ENABLE
)

REM =====================================================================
:ENABLE
echo.
echo  ==========================================
echo   Engaging FARADAY MODE - hardening device
echo  ==========================================
echo.

REM ---- 3a. Backup firewall + service states ---------------------------
echo [*] Backing up firewall configuration...
netsh advfirewall export "%FWBACKUP%" >nul

echo [*] Recording current service start modes...
> "%SVCBACKUP%" echo # FaradayMode service backup
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax RasAuto iphlpsvc) do (
    for /f "tokens=2*" %%A in ('sc qc "%%S" 2^>nul ^| find "START_TYPE"') do (
        >> "%SVCBACKUP%" echo %%S=%%B
    )
)

REM ---- 3b. FIREWALL : block everything --------------------------------
echo [*] Locking down Windows Firewall (block in + out)...
netsh advfirewall set allprofiles state on                                >nul
netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound >nul
netsh advfirewall set allprofiles settings inboundusernotification disable  >nul
netsh advfirewall set allprofiles logging droppedconnections enable        >nul

REM Allow loopback so local apps still work
netsh advfirewall firewall add rule name="Faraday-Loopback-In"  dir=in  action=allow remoteip=127.0.0.1 >nul
netsh advfirewall firewall add rule name="Faraday-Loopback-Out" dir=out action=allow remoteip=127.0.0.1 >nul

REM Explicit deny for high-risk remote-management ports
for %%P in (135 137 138 139 445 593 1433 1434 3389 5040 5353 5355 5985 5986) do (
    netsh advfirewall firewall add rule name="Faraday-DenyTCP-%%P" dir=in  action=block protocol=TCP localport=%%P >nul
    netsh advfirewall firewall add rule name="Faraday-DenyUDP-%%P" dir=in  action=block protocol=UDP localport=%%P >nul
)

REM ---- 3c. Services : stop + disable ----------------------------------
echo [*] Stopping and disabling remote-access / telemetry services...
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax) do (
    sc stop    "%%S" >nul 2>&1
    sc config  "%%S" start= disabled >nul 2>&1
)

REM ---- 3d. Remote login surfaces --------------------------------------
echo [*] Disabling RDP, Remote Assistance, PSRemoting...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server"      /v fDenyTSConnections    /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance"    /v fAllowToGetHelp       /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance"    /v fAllowFullControl     /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "Disable-PSRemoting -Force -WarningAction SilentlyContinue" >nul 2>&1
powershell -NoProfile -Command "Stop-Service WinRM -Force -ErrorAction SilentlyContinue; Set-Service WinRM -StartupType Disabled -ErrorAction SilentlyContinue" >nul 2>&1

REM ---- 3e. Network protocol attack surface ----------------------------
echo [*] Disabling SMBv1, NetBIOS, LLMNR, mDNS, WPAD...
powershell -NoProfile -Command "Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force -ErrorAction SilentlyContinue" >nul 2>&1
powershell -NoProfile -Command "Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart -ErrorAction SilentlyContinue" >nul 2>&1

REM Disable LLMNR
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" /v EnableMulticast /t REG_DWORD /d 0 /f >nul

REM Disable mDNS
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters" /v EnableMDNS /t REG_DWORD /d 0 /f >nul

REM Disable NetBIOS-over-TCP on every interface
powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 2 -ErrorAction SilentlyContinue }" >nul 2>&1

REM Kill WPAD auto-proxy lookups
sc stop    WinHttpAutoProxySvc >nul 2>&1
sc config  WinHttpAutoProxySvc start= disabled >nul 2>&1

REM ---- 3f. Auth hardening ---------------------------------------------
echo [*] Hardening NTLM and disabling LM-hash storage...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa" /v NoLMHash                       /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictSendingNTLMTraffic   /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictReceivingNTLMTraffic /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa" /v LmCompatibilityLevel             /t REG_DWORD /d 5 /f >nul

REM ---- 3g. Misc surface reduction -------------------------------------
echo [*] Disabling AutoRun, AutoPlay, telemetry, error-reporting...
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 255 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /t REG_DWORD /d 0   /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient\Windows"               /v CEIPEnable        /t REG_DWORD /d 0   /f >nul

REM ---- 3h. Flush caches -----------------------------------------------
echo [*] Flushing DNS / ARP caches...
ipconfig /flushdns >nul
arp -d * >nul 2>&1
nbtstat -R >nul 2>&1
nbtstat -RR >nul 2>&1

REM ---- 3i. Drop tray icon ---------------------------------------------
echo [*] Spawning tray indicator...
if exist "%TRAYPS1%" (
    REM tray.ps1 writes its own PID into %TRAYPID% on startup
    start "" powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "%TRAYPS1%" -BatPath "%~f0" -PidFile "%TRAYPID%"
) else (
    echo     ^(tray.ps1 not found beside the .bat - skipping tray icon^)
)

REM ---- 3j. Mark state -------------------------------------------------
> "%STATE%" echo on
echo.
echo  [+] FARADAY MODE is now ACTIVE.
echo      Run this script again to disable.
echo.
timeout /t 4 >nul
exit /b 0

REM =====================================================================
:DISABLE
echo.
echo  ==========================================
echo   Disengaging FARADAY MODE - restoring
echo  ==========================================
echo.

REM ---- 4a. Kill tray icon ---------------------------------------------
if exist "%TRAYPID%" (
    set /p TPID=<"%TRAYPID%"
    echo [*] Closing tray indicator ^(PID !TPID!^)...
    taskkill /PID !TPID! /F >nul 2>&1
    del /q "%TRAYPID%" >nul 2>&1
)

REM ---- 4b. Restore firewall -------------------------------------------
if exist "%FWBACKUP%" (
    echo [*] Restoring firewall configuration...
    netsh advfirewall reset >nul
    netsh advfirewall import "%FWBACKUP%" >nul
)

REM Remove any rules we created (in case import skipped them)
for %%P in (135 137 138 139 445 593 1433 1434 3389 5040 5353 5355 5985 5986) do (
    netsh advfirewall firewall delete rule name="Faraday-DenyTCP-%%P" >nul 2>&1
    netsh advfirewall firewall delete rule name="Faraday-DenyUDP-%%P" >nul 2>&1
)
netsh advfirewall firewall delete rule name="Faraday-Loopback-In"  >nul 2>&1
netsh advfirewall firewall delete rule name="Faraday-Loopback-Out" >nul 2>&1

REM ---- 4c. Restore service start modes --------------------------------
echo [*] Restoring services...
if exist "%SVCBACKUP%" (
    for /f "usebackq tokens=1,2 delims==" %%A in (`findstr /v /b "#" "%SVCBACKUP%"`) do (
        if not "%%A"=="" call :RESTORE_SVC "%%A" "%%B"
    )
)

REM ---- 4d. Revert registry hardening ----------------------------------
echo [*] Reverting registry hardening...
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server"      /v fDenyTSConnections    /f >nul 2>&1
reg add    "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance"    /v fAllowToGetHelp       /t REG_DWORD /d 1 /f >nul
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient"      /v EnableMulticast       /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters" /v EnableMDNS            /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictSendingNTLMTraffic      /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictReceivingNTLMTraffic    /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"       /v LmCompatibilityLevel             /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /f >nul 2>&1

REM Restore NetBIOS to default (0 = use DHCP)
powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 0 -ErrorAction SilentlyContinue }" >nul 2>&1

REM ---- 4e. Clear state ------------------------------------------------
del /q "%STATE%" >nul 2>&1

echo.
echo  [+] FARADAY MODE disabled. Reboot recommended.
echo.
timeout /t 4 >nul
exit /b 0

REM =====================================================================
:RESTORE_SVC
REM %~1 = service name, %~2 = original start type string from sc qc
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
