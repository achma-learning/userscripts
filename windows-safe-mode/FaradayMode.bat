@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Faraday Mode

REM =====================================================================
REM  FaradayMode.bat - Windows hardening toggle (Safe Mode / Normal Mode)
REM
REM  Default (no args, e.g. double-click) = full INSTALL.
REM
REM  Sub-commands:
REM    install         (default) Register tasks, apply safe mode, launch tray.
REM    uninstall       Unregister tasks, kill tray, revert to normal mode.
REM    safe            Apply lockdown.       (idempotent)
REM    normal          Restore everything.   (idempotent)
REM    boot            Alias of "safe" - invoked by the boot scheduled task.
REM    toggle          Flip current state.
REM    status          Print current state and exit.
REM    winsafe-min     Reboot into Windows Safe Mode (Minimal).
REM    winsafe-net     Reboot into Windows Safe Mode with Networking.
REM    winsafe-clear   Clear Safe Boot flag and reboot normally.
REM =====================================================================

set "ELEVATED="
if /i "%~1"=="--elevated" (
    set "ELEVATED=1"
    set "CMD=%~2"
) else (
    set "CMD=%~1"
)
if "%CMD%"=="" set "CMD=install"

REM ---- admin check (fsutil, NOT net session - LanmanServer is off) ---
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
set "HOSTSBACKUP=%BACKUP%\hosts.bak"
set "INSTALLPS1=%~dp0install.ps1"
set "UNINSTALLPS1=%~dp0uninstall.ps1"
set "HOSTS=%SystemRoot%\System32\drivers\etc\hosts"

if not exist "%ROOT%"   mkdir "%ROOT%"
if not exist "%BACKUP%" mkdir "%BACKUP%"

REM ---- dispatch -------------------------------------------------------
if /i "%CMD%"=="status"        goto :STATUS
if /i "%CMD%"=="install"       goto :INSTALL
if /i "%CMD%"=="uninstall"     goto :UNINSTALL
if /i "%CMD%"=="safe"          goto :ENABLE
if /i "%CMD%"=="boot"          goto :ENABLE
if /i "%CMD%"=="normal"        goto :DISABLE
if /i "%CMD%"=="winsafe-min"   goto :WINSAFE_MIN
if /i "%CMD%"=="winsafe-net"   goto :WINSAFE_NET
if /i "%CMD%"=="winsafe-clear" goto :WINSAFE_CLEAR
if /i "%CMD%"=="toggle" (
    if exist "%STATE%" ( goto :DISABLE ) else ( goto :ENABLE )
)

echo Unknown command: %CMD%
exit /b 1

REM =====================================================================
:STATUS
if exist "%STATE%" ( echo Faraday Mode: SAFE ) else ( echo Faraday Mode: NORMAL )
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
    pause & exit /b 2
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%INSTALLPS1%" -BatPath "%~f0" -TrayPath "%~dp0tray.ps1"
set "RC=%errorlevel%"
echo.
if %RC% equ 0 ( echo  [+] Faraday Mode installed. ) else ( echo  [!] Install failed (%RC%). )
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
if not exist "%UNINSTALLPS1%" ( echo uninstall.ps1 not found - aborting. & pause & exit /b 2 )
powershell -NoProfile -ExecutionPolicy Bypass -File "%UNINSTALLPS1%" -BatPath "%~f0"
set "RC=%errorlevel%"
echo.
pause
exit /b %RC%

REM =====================================================================
:ENABLE
if exist "%STATE%" (
    echo [=] Faraday Mode is already SAFE.
    exit /b 0
)
echo.
echo  ==========================================
echo   Engaging FARADAY MODE - hardening device
echo  ==========================================
echo.

REM ---- Backup --------------------------------------------------------
echo [*] Backing up firewall + services + hosts...
netsh advfirewall export "%FWBACKUP%" >nul
copy /y "%HOSTS%" "%HOSTSBACKUP%" >nul 2>&1

> "%SVCBACKUP%" echo # FaradayMode service backup
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax RasAuto iphlpsvc WinHttpAutoProxySvc) do (
    for /f "tokens=2*" %%A in ('sc qc "%%S" 2^>nul ^| find "START_TYPE"') do (
        >> "%SVCBACKUP%" echo %%S=%%B
    )
)

REM ---- FIREWALL: real lockdown ---------------------------------------
echo [*] Locking down Windows Firewall (block in + out, disable ALL allow rules)...
netsh advfirewall set allprofiles state on                                  >nul
netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound >nul
netsh advfirewall set allprofiles settings inboundusernotification disable  >nul
netsh advfirewall set allprofiles logging droppedconnections enable         >nul

REM This is what makes "block all" actually block - existing allow rules
REM override the default policy until they are disabled.
powershell -NoProfile -Command "Get-NetFirewallRule -Action Allow -Enabled True -ErrorAction SilentlyContinue | Set-NetFirewallRule -Enabled False -ErrorAction SilentlyContinue" 2>nul

REM Loopback only.
netsh advfirewall firewall add rule name="Faraday-Loopback-In"  dir=in  action=allow remoteip=127.0.0.0/8 enable=yes >nul
netsh advfirewall firewall add rule name="Faraday-Loopback-Out" dir=out action=allow remoteip=127.0.0.0/8 enable=yes >nul
netsh advfirewall firewall add rule name="Faraday-Loopback6-In"  dir=in  action=allow remoteip=::1/128 enable=yes >nul
netsh advfirewall firewall add rule name="Faraday-Loopback6-Out" dir=out action=allow remoteip=::1/128 enable=yes >nul

REM Always-on inbound deny rules for the high-risk ports.
for %%P in (135 137 138 139 445 593 1433 1434 3389 5040 5353 5355 5985 5986) do (
    netsh advfirewall firewall add rule name="Faraday-DenyTCP-%%P" dir=in action=block protocol=TCP localport=%%P >nul
    netsh advfirewall firewall add rule name="Faraday-DenyUDP-%%P" dir=in action=block protocol=UDP localport=%%P >nul
)

REM ---- DNS: point to a black hole ------------------------------------
echo [*] Pointing DNS to 127.0.0.1 / ::1 (no resolver - fail closed)...
powershell -NoProfile -Command "Get-NetAdapter | Where-Object Status -eq 'Up' | ForEach-Object { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ServerAddresses '127.0.0.1','::1' -ErrorAction SilentlyContinue }" 2>nul

REM ---- HOSTS: blackhole telemetry / tracker domains ------------------
echo [*] Updating hosts file with telemetry blackhole list...
attrib -R "%HOSTS%" >nul 2>&1
findstr /c:"# FARADAY-BEGIN" "%HOSTS%" >nul 2>&1
if %errorlevel% neq 0 (
    >> "%HOSTS%" echo.
    >> "%HOSTS%" echo # FARADAY-BEGIN  - removed automatically by FaradayMode normal
    for %%D in (
        telemetry.microsoft.com
        vortex.data.microsoft.com
        vortex-win.data.microsoft.com
        watson.telemetry.microsoft.com
        watson.ppe.telemetry.microsoft.com
        settings-win.data.microsoft.com
        v10.events.data.microsoft.com
        v20.events.data.microsoft.com
        oca.telemetry.microsoft.com
        sqm.telemetry.microsoft.com
        telecommand.telemetry.microsoft.com
        reports.wes.df.telemetry.microsoft.com
        services.wes.df.telemetry.microsoft.com
        sb.scorecardresearch.com
        ssl.google-analytics.com
        www.google-analytics.com
        connect.facebook.net
        graph.facebook.com
        ads.yahoo.com
        ad.doubleclick.net
        googleads.g.doubleclick.net
    ) do (
        >> "%HOSTS%" echo 0.0.0.0 %%D
    )
    >> "%HOSTS%" echo # FARADAY-END
)
attrib +R "%HOSTS%" >nul 2>&1

REM ---- Services : stop + disable -------------------------------------
echo [*] Stopping and disabling remote-access / telemetry services...
for %%S in (TermService SessionEnv UmRdpService WinRM RemoteRegistry RemoteAccess SharedAccess Spooler SSDPSRV upnphost fdPHost FDResPub LanmanServer WebClient DiagTrack dmwappushservice RasMan TlntSvr SNMP Fax WinHttpAutoProxySvc) do (
    sc stop   "%%S" >nul 2>&1
    sc config "%%S" start= disabled >nul 2>&1
)

REM ---- Remote-login surfaces -----------------------------------------
echo [*] Disabling RDP, Remote Assistance, PSRemoting...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server"   /v fDenyTSConnections /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v fAllowToGetHelp    /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v fAllowFullControl  /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "Disable-PSRemoting -Force -WarningAction SilentlyContinue" >nul 2>&1

REM ---- Network protocol attack surface -------------------------------
echo [*] Disabling SMBv1, NetBIOS, LLMNR, mDNS, IPv6 transition...
powershell -NoProfile -Command "Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force -ErrorAction SilentlyContinue" >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient"      /v EnableMulticast /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters" /v EnableMDNS      /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 2 -ErrorAction SilentlyContinue }" >nul 2>&1
REM Disable IPv6 tunneling (Teredo, ISATAP, 6to4) - common bypass paths.
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters" /v DisabledComponents /t REG_DWORD /d 0x01 /f >nul

REM ---- Auth hardening ------------------------------------------------
echo [*] Hardening NTLM and disabling LM-hash storage...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"        /v NoLMHash                       /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictSendingNTLMTraffic     /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0" /v RestrictReceivingNTLMTraffic   /t REG_DWORD /d 2 /f >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa"        /v LmCompatibilityLevel           /t REG_DWORD /d 5 /f >nul

REM ---- Misc surface reduction ----------------------------------------
echo [*] Disabling AutoRun, AutoPlay, telemetry, error-reporting...
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 255 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /t REG_DWORD /d 0   /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /t REG_DWORD /d 1   /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient\Windows"               /v CEIPEnable        /t REG_DWORD /d 0   /f >nul

REM ---- Flush caches --------------------------------------------------
ipconfig /flushdns >nul
arp -d * >nul 2>&1
nbtstat -R >nul 2>&1
nbtstat -RR >nul 2>&1

> "%STATE%" echo safe
echo.
echo  [+] FARADAY MODE is now SAFE.
echo.
exit /b 0

REM =====================================================================
:DISABLE
if not exist "%STATE%" (
    echo [=] Faraday Mode is already NORMAL.
    exit /b 0
)
echo.
echo  ==========================================
echo   Disengaging FARADAY MODE - restoring
echo  ==========================================
echo.

REM ---- Restore firewall ----------------------------------------------
if exist "%FWBACKUP%" (
    echo [*] Restoring firewall configuration...
    netsh advfirewall reset >nul
    netsh advfirewall import "%FWBACKUP%" >nul
)
REM Force the canonical "block-in / allow-out" default in case .wfw had
REM something weird, and re-enable rules disabled by Safe Mode.
netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound >nul
powershell -NoProfile -Command "Get-NetFirewallRule -Action Allow -Enabled False -ErrorAction SilentlyContinue | Where-Object { $_.DisplayGroup -ne $null -or $_.Owner -ne $null } | Set-NetFirewallRule -Enabled True -ErrorAction SilentlyContinue" 2>nul

REM Strip our own loopback rules.
for %%R in (Faraday-Loopback-In Faraday-Loopback-Out Faraday-Loopback6-In Faraday-Loopback6-Out) do (
    netsh advfirewall firewall delete rule name="%%R" >nul 2>&1
)
REM Note: Faraday-DenyTCP-* / Faraday-DenyUDP-* rules persist on purpose
REM (always-on inbound deny for high-risk ports).

REM ---- Restore DNS to DHCP / automatic --------------------------------
echo [*] Restoring DNS to DHCP/automatic...
powershell -NoProfile -Command "Get-NetAdapter | ForEach-Object { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ResetServerAddresses -ErrorAction SilentlyContinue }" 2>nul

REM ---- Restore hosts file --------------------------------------------
echo [*] Removing FARADAY block from hosts file...
attrib -R "%HOSTS%" >nul 2>&1
powershell -NoProfile -Command "$h='%HOSTS%'; $t=Get-Content -Raw -LiteralPath $h; $c=[regex]::Replace($t,'(?ms)\r?\n# FARADAY-BEGIN.*?# FARADAY-END\r?\n?',''); Set-Content -LiteralPath $h -Value $c -NoNewline" 2>nul

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
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters" /v DisabledComponents   /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoDriveTypeAutoRun /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v NoAutorun         /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection"          /v AllowTelemetry    /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting"          /v Disabled          /f >nul 2>&1
powershell -NoProfile -Command "Get-ChildItem 'HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces' | ForEach-Object { Set-ItemProperty -Path $_.PSPath -Name NetbiosOptions -Value 0 -ErrorAction SilentlyContinue }" >nul 2>&1

ipconfig /flushdns >nul

del /q "%STATE%" >nul 2>&1

echo.
echo  [+] FARADAY MODE is now NORMAL.  (Reboot recommended.)
echo.
exit /b 0

REM =====================================================================
:WINSAFE_MIN
echo [*] Setting Safe Boot = minimal and rebooting in 10 s...
bcdedit /set "{current}" safeboot minimal >nul
shutdown /r /t 10 /c "Faraday: rebooting into Windows Safe Mode (Minimal)"
exit /b 0

:WINSAFE_NET
echo [*] Setting Safe Boot = network and rebooting in 10 s...
bcdedit /set "{current}" safeboot network >nul
shutdown /r /t 10 /c "Faraday: rebooting into Windows Safe Mode (Networking)"
exit /b 0

:WINSAFE_CLEAR
echo [*] Clearing Safe Boot flag and rebooting in 10 s...
bcdedit /deletevalue "{current}" safeboot >nul 2>&1
shutdown /r /t 10 /c "Faraday: rebooting normally (Safe Boot cleared)"
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
