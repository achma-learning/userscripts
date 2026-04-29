# uninstall.ps1 - tear down Faraday Mode autostart and revert to normal.
param(
    [Parameter(Mandatory = $true)] [string]$BatPath
)

$ErrorActionPreference = 'Continue'

function Require-Admin {
    $id  = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $pri = New-Object System.Security.Principal.WindowsPrincipal($id)
    if (-not $pri.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)) {
        throw "uninstall.ps1 must be run as administrator."
    }
}
Require-Admin

Write-Host "[*] Killing tray (if running) ..."
$pidFile = Join-Path $env:ProgramData 'FaradayMode\tray.pid'
if (Test-Path -LiteralPath $pidFile) {
    $trayPid = (Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue | Select-Object -First 1)
    if ($trayPid) { Stop-Process -Id $trayPid -Force -ErrorAction SilentlyContinue }
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

Write-Host "[*] Removing scheduled tasks ..."
foreach ($t in @('FaradayMode\Boot','FaradayMode\Tray')) {
    Unregister-ScheduledTask -TaskName $t -Confirm:$false -ErrorAction SilentlyContinue
}

if (Test-Path -LiteralPath $BatPath) {
    Write-Host "[*] Reverting to normal mode ..."
    & $BatPath 'normal' | Out-Null
} else {
    Write-Warning "Bat not found at $BatPath - cannot auto-revert. Run FaradayMode.bat normal manually."
}

Write-Host ""
Write-Host "  Faraday Mode uninstalled."
Write-Host "  Boot / logon tasks removed. System is back to NORMAL mode."
Write-Host ""
