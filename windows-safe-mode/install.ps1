# install.ps1 - register the Faraday Mode scheduled tasks and start it.
#
# Creates two tasks:
#   FaradayMode\Boot - SYSTEM, AtStartup, runs FaradayMode.bat boot
#   FaradayMode\Tray - current user, AtLogOn, runs tray.ps1
#
# Then applies safe mode immediately and launches the tray for the
# current session.
#
param(
    [Parameter(Mandatory = $true)] [string]$BatPath,
    [Parameter(Mandatory = $true)] [string]$TrayPath
)

$ErrorActionPreference = 'Stop'

function Require-Admin {
    $id  = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $pri = New-Object System.Security.Principal.WindowsPrincipal($id)
    if (-not $pri.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)) {
        throw "install.ps1 must be run as administrator."
    }
}
Require-Admin

if (-not (Test-Path -LiteralPath $BatPath))  { throw "Bat not found:  $BatPath"  }
if (-not (Test-Path -LiteralPath $TrayPath)) { throw "Tray not found: $TrayPath" }

Write-Host "[*] Registering scheduled task: FaradayMode\Boot ..."
$bootArg       = "/c `"`"$BatPath`"`" boot"
$bootAction    = New-ScheduledTaskAction    -Execute 'cmd.exe' -Argument $bootArg
$bootTrigger   = New-ScheduledTaskTrigger   -AtStartup
$bootPrincipal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -RunLevel Highest
$bootSettings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName 'FaradayMode\Boot' `
    -Action $bootAction -Trigger $bootTrigger -Principal $bootPrincipal -Settings $bootSettings -Force | Out-Null

Write-Host "[*] Registering scheduled task: FaradayMode\Tray ..."
$user        = "$env:USERDOMAIN\$env:USERNAME"
$trayArg     = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$TrayPath`" -BatPath `"$BatPath`""
$trayAction  = New-ScheduledTaskAction    -Execute 'powershell.exe' -Argument $trayArg
$trayTrigger = New-ScheduledTaskTrigger   -AtLogOn -User $user
$trayPrincipal = New-ScheduledTaskPrincipal -UserId $user -RunLevel Limited -LogonType Interactive
$traySettings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName 'FaradayMode\Tray' `
    -Action $trayAction -Trigger $trayTrigger -Principal $trayPrincipal -Settings $traySettings -Force | Out-Null

Write-Host "[*] Applying safe mode now ..."
& $BatPath 'safe' | Out-Null

Write-Host "[*] Launching tray for current session ..."
Start-Process -FilePath 'powershell.exe' `
    -ArgumentList @('-NoProfile','-WindowStyle','Hidden','-ExecutionPolicy','Bypass','-File',$TrayPath,'-BatPath',$BatPath) `
    -WindowStyle Hidden | Out-Null

Write-Host ""
Write-Host "  Faraday Mode installed."
Write-Host "  - Safe mode is now ACTIVE."
Write-Host "  - It will auto-apply at every boot."
Write-Host "  - Use the tray-bar shield to switch Safe / Normal."
Write-Host ""
