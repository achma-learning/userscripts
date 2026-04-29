# tray.ps1 - system-tray indicator for FaradayMode.bat
# Spawned hidden by the .bat. Right-click the shield to disable Faraday Mode.
param(
    [Parameter(Mandatory = $true)]
    [string]$BatPath,
    [Parameter(Mandatory = $true)]
    [string]$PidFile
)

# Record our own PID so the .bat can taskkill us on disable
[System.IO.File]::WriteAllText($PidFile, $PID)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$icon         = New-Object System.Windows.Forms.NotifyIcon
$icon.Icon    = [System.Drawing.SystemIcons]::Shield
$icon.Visible = $true
$icon.Text    = 'Faraday Mode: ACTIVE'

$ctx = New-Object System.Windows.Forms.ContextMenuStrip

$status = New-Object System.Windows.Forms.ToolStripMenuItem
$status.Text    = 'Faraday Mode is ACTIVE'
$status.Enabled = $false
[void]$ctx.Items.Add($status)

[void]$ctx.Items.Add('-')

$disable = New-Object System.Windows.Forms.ToolStripMenuItem
$disable.Text = 'Disable Faraday Mode'
$disable.Add_Click({
    Start-Process -FilePath $BatPath -Verb RunAs
    $icon.Visible = $false
    [System.Windows.Forms.Application]::Exit()
})
[void]$ctx.Items.Add($disable)

$icon.ContextMenuStrip = $ctx

# Balloon hint on launch
$icon.BalloonTipTitle = 'Faraday Mode'
$icon.BalloonTipText  = 'Device hardened. Right-click the shield to disable.'
$icon.ShowBalloonTip(4000)

# Keep the message loop alive
[System.Windows.Forms.Application]::Run()
