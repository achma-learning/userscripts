# tray.ps1 - Faraday Mode tray indicator + mode switcher.
#
# Reads %ProgramData%\FaradayMode\state.flag to know the current mode.
# Polls every 1.5s so the icon updates when other instances flip the
# state. Right-click menu lets the user switch Safe / Normal (UAC
# prompts) or fully uninstall.
#
param(
    [Parameter(Mandatory = $true)] [string]$BatPath
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Single-instance guard - if another tray is alive, exit quietly.
$pidFile = Join-Path $env:ProgramData 'FaradayMode\tray.pid'
$root    = Split-Path -Parent $pidFile
if (-not (Test-Path -LiteralPath $root)) { New-Item -ItemType Directory -Path $root -Force | Out-Null }
if (Test-Path -LiteralPath $pidFile) {
    $existing = (Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue | Select-Object -First 1) -as [int]
    if ($existing -and (Get-Process -Id $existing -ErrorAction SilentlyContinue)) { exit }
}
[System.IO.File]::WriteAllText($pidFile, $PID)

$stateFile = Join-Path $env:ProgramData 'FaradayMode\state.flag'

function Get-Mode {
    if (-not (Test-Path -LiteralPath $stateFile)) { return 'normal' }
    $c = (Get-Content -LiteralPath $stateFile -ErrorAction SilentlyContinue | Select-Object -First 1)
    if ($null -eq $c) { return 'normal' }
    $c = $c.Trim().ToLower()
    if ($c -eq 'safe' -or $c -eq 'lite') { return $c }
    return 'safe'  # legacy state files
}

# ---- Tray icon -------------------------------------------------------
$icon         = New-Object System.Windows.Forms.NotifyIcon
$icon.Icon    = [System.Drawing.SystemIcons]::Shield
$icon.Visible = $true

# ---- Menu ------------------------------------------------------------
$ctx        = New-Object System.Windows.Forms.ContextMenuStrip
$miStatus   = New-Object System.Windows.Forms.ToolStripMenuItem 'Faraday Mode'
$miStatus.Enabled = $false
$miSep1     = New-Object System.Windows.Forms.ToolStripSeparator
$miSafe     = New-Object System.Windows.Forms.ToolStripMenuItem 'High Filtering  (Faraday cage - block all)'
$miLite     = New-Object System.Windows.Forms.ToolStripMenuItem 'High Light  (hardened, internet on)'
$miNormal   = New-Object System.Windows.Forms.ToolStripMenuItem 'Normal  (Windows defaults)'
$miSep2     = New-Object System.Windows.Forms.ToolStripSeparator

# Restart submenu (Windows OS-level Safe Boot via bcdedit).
$miRestart  = New-Object System.Windows.Forms.ToolStripMenuItem 'Restart Windows'
$miWinSafeMin = New-Object System.Windows.Forms.ToolStripMenuItem 'Reboot into Safe Mode (Minimal)'
$miWinSafeNet = New-Object System.Windows.Forms.ToolStripMenuItem 'Reboot into Safe Mode with Networking'
$miWinSafeClr = New-Object System.Windows.Forms.ToolStripMenuItem 'Reboot normally (clear Safe Boot)'
[void]$miRestart.DropDownItems.AddRange(@($miWinSafeMin,$miWinSafeNet,$miWinSafeClr))

$miSep3     = New-Object System.Windows.Forms.ToolStripSeparator
$miAudit    = New-Object System.Windows.Forms.ToolStripMenuItem 'Security audit...'
$miSetPw    = New-Object System.Windows.Forms.ToolStripMenuItem 'Change password...'
$miOpen     = New-Object System.Windows.Forms.ToolStripMenuItem 'Open backup folder'
$miUninst   = New-Object System.Windows.Forms.ToolStripMenuItem 'Uninstall (revert + remove autostart)'
$miSep4     = New-Object System.Windows.Forms.ToolStripSeparator
$miQuit     = New-Object System.Windows.Forms.ToolStripMenuItem 'Quit tray'

[void]$ctx.Items.AddRange(@($miStatus,$miSep1,$miSafe,$miLite,$miNormal,$miSep2,$miRestart,$miSep3,$miAudit,$miSetPw,$miOpen,$miUninst,$miSep4,$miQuit))
$icon.ContextMenuStrip = $ctx

function Invoke-Bat([string]$arg) {
    Start-Process -FilePath $BatPath -ArgumentList $arg -Verb RunAs -ErrorAction SilentlyContinue | Out-Null
}

function Confirm-Reboot([string]$label) {
    [System.Windows.Forms.MessageBox]::Show(
        "$label`n`nWindows will reboot in ~10 seconds. Save your work first.`nProceed?",
        'Faraday Mode - Restart', 'YesNo', 'Warning') -eq 'Yes'
}

$miSafe.Add_Click(  { Invoke-Bat 'safe'   })
$miLite.Add_Click(  { Invoke-Bat 'lite'   })
$miNormal.Add_Click({ Invoke-Bat 'normal' })
$miOpen.Add_Click(  { Start-Process -FilePath 'explorer.exe' -ArgumentList (Join-Path $env:ProgramData 'FaradayMode\backup') })
$miUninst.Add_Click({
    $ans = [System.Windows.Forms.MessageBox]::Show(
        'Remove Faraday Mode autostart and revert all hardening?',
        'Faraday Mode', 'YesNo', 'Question')
    if ($ans -eq 'Yes') { Invoke-Bat 'uninstall'; Start-Sleep -Seconds 2; $script:Quit = $true }
})
$miQuit.Add_Click({ $script:Quit = $true })

$miWinSafeMin.Add_Click({ if (Confirm-Reboot 'Reboot into Windows Safe Mode (Minimal).')              { Invoke-Bat 'winsafe-min'   } })
$miWinSafeNet.Add_Click({ if (Confirm-Reboot 'Reboot into Windows Safe Mode with Networking.')        { Invoke-Bat 'winsafe-net'   } })
$miWinSafeClr.Add_Click({ if (Confirm-Reboot 'Clear Safe Boot flag and reboot normally into Windows.') { Invoke-Bat 'winsafe-clear' } })
$miSetPw.Add_Click(     { Invoke-Bat 'setpw' })
$miAudit.Add_Click(     { Invoke-Bat 'audit' })

# Left-click cycles: Normal -> High Light -> High Filtering -> Normal ...
$icon.Add_MouseClick({
    param($s,$e)
    if ($e.Button -eq [System.Windows.Forms.MouseButtons]::Left) {
        switch (Get-Mode) {
            'normal' { Invoke-Bat 'lite' }
            'lite'   { Invoke-Bat 'safe' }
            'safe'   { Invoke-Bat 'normal' }
        }
    }
})

# ---- Render current state -------------------------------------------
function Refresh-Ui {
    $mode = Get-Mode
    switch ($mode) {
        'safe' {
            $icon.Icon = [System.Drawing.SystemIcons]::Shield
            $icon.Text = 'Faraday: HIGH FILTERING (block all)'
            $miStatus.Text    = 'Mode: HIGH FILTERING  (Faraday cage)'
            $miSafe.Checked   = $true
            $miLite.Checked   = $false
            $miNormal.Checked = $false
        }
        'lite' {
            $icon.Icon = [System.Drawing.SystemIcons]::Warning
            $icon.Text = 'Faraday: HIGH LIGHT (hardened, internet on)'
            $miStatus.Text    = 'Mode: HIGH LIGHT  (hardened)'
            $miSafe.Checked   = $false
            $miLite.Checked   = $true
            $miNormal.Checked = $false
        }
        default {
            $icon.Icon = [System.Drawing.SystemIcons]::Information
            $icon.Text = 'Faraday: NORMAL'
            $miStatus.Text    = 'Mode: NORMAL'
            $miSafe.Checked   = $false
            $miLite.Checked   = $false
            $miNormal.Checked = $true
        }
    }
}
Refresh-Ui

# Balloon tip on first launch.
$icon.BalloonTipTitle = 'Faraday Mode'
$icon.BalloonTipText  = "Active mode: $((Get-Mode).ToUpper()).  Right-click the shield to switch."
$icon.ShowBalloonTip(4000)

# ---- Poll state file every 1.5s -------------------------------------
$script:Quit = $false
$lastWrite   = $null
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 1500
$timer.Add_Tick({
    if ($script:Quit) {
        $icon.Visible = $false
        $timer.Stop()
        try { Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue } catch {}
        [System.Windows.Forms.Application]::Exit()
        return
    }
    $cur = if (Test-Path -LiteralPath $stateFile) { (Get-Item -LiteralPath $stateFile).LastWriteTimeUtc } else { [datetime]::MinValue }
    if ($cur -ne $script:lastWrite) {
        $script:lastWrite = $cur
        Refresh-Ui
    }
})
$timer.Start()

[System.Windows.Forms.Application]::Run()
