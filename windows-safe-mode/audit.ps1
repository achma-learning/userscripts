# audit.ps1 - Faraday Mode security audit (read-only).
#
# Prints a one-screen status report covering the kernel-attack and
# system-hardening tweaks applied by FaradayMode.bat. Safe to run at
# any time, no admin required to read most properties.

$ErrorActionPreference = 'SilentlyContinue'

function Test-Reg {
    param([string]$Path, [string]$Name, $Expected)
    try {
        $v = (Get-ItemProperty -LiteralPath $Path -Name $Name -ErrorAction Stop).$Name
        return [pscustomobject]@{ Value = $v ; Match = ($v -eq $Expected) }
    } catch {
        return [pscustomobject]@{ Value = $null ; Match = $false }
    }
}

function Row {
    param([string]$Label, $Ok, [string]$Detail = '')
    $sym = if ($Ok -eq $true)  { '[OK]' }
           elseif ($Ok -eq $false) { '[!] ' }
           else { '[-] ' }
    $color = if ($Ok -eq $true) { 'Green' } elseif ($Ok -eq $false) { 'Red' } else { 'DarkGray' }
    Write-Host ("  {0,-4} {1,-44} {2}" -f $sym, $Label, $Detail) -ForegroundColor $color
}

Write-Host ''
Write-Host '  ==========================================================='
Write-Host '   Faraday Mode - Security Audit'
Write-Host '  ==========================================================='
Write-Host ''

# ---- Faraday state -------------------------------------------------
$stateFile = Join-Path $env:ProgramData 'FaradayMode\state.flag'
$mode = if (Test-Path -LiteralPath $stateFile) {
    (Get-Content -LiteralPath $stateFile | Select-Object -First 1).Trim().ToUpper()
} else { 'NORMAL' }
Row 'Faraday Mode' $null $mode

# ---- VBS / HVCI / Credential Guard ---------------------------------
$dg = Get-CimInstance -Namespace 'root\Microsoft\Windows\DeviceGuard' -ClassName Win32_DeviceGuard -ErrorAction SilentlyContinue
if ($dg) {
    $vbs = $dg.VirtualizationBasedSecurityStatus    # 0=off 1=cfg 2=running
    $hvci = ($dg.SecurityServicesRunning -contains 2)
    $cg   = ($dg.SecurityServicesRunning -contains 1)
    Row 'VBS running'              ($vbs -eq 2)  ("status={0}" -f $vbs)
    Row 'HVCI / Memory Integrity'  $hvci
    Row 'Credential Guard'         $cg
} else {
    Row 'VBS / HVCI / Credential Guard' $null 'WMI namespace unavailable'
}

# ---- Hypervisor launch type ----------------------------------------
$hlt = (& bcdedit /enum '{current}' 2>$null | Select-String 'hypervisorlaunchtype').ToString()
Row 'Hypervisor launch type' $null $hlt

# ---- Vulnerable Driver Blocklist -----------------------------------
$vdb = Test-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Config' 'VulnerableDriverBlocklistEnable' 1
Row 'Vulnerable Driver Blocklist' $vdb.Match ("value={0}" -f $vdb.Value)

# ---- LSA Protection -------------------------------------------------
$ppl  = Test-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\Lsa' 'RunAsPPL'     2
$pplb = Test-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\Lsa' 'RunAsPPLBoot' 2
Row 'LSA Protection (RunAsPPL=2)'      $ppl.Match  ("value={0}" -f $ppl.Value)
Row 'LSA Protection (RunAsPPLBoot=2)'  $pplb.Match ("value={0}" -f $pplb.Value)

# ---- Defender preferences ------------------------------------------
$mp = Get-MpPreference -ErrorAction SilentlyContinue
if ($mp) {
    Row 'Defender Real-Time Protection'   (-not $mp.DisableRealtimeMonitoring)
    Row 'Defender Tamper Protection'      $null   ('see Windows Security UI')
    Row 'Controlled Folder Access'        ($mp.EnableControlledFolderAccess -ne 0) ("state={0}" -f $mp.EnableControlledFolderAccess)
    $asrCount = ($mp.AttackSurfaceReductionRules_Ids | Measure-Object).Count
    Row 'ASR rules configured'            ($asrCount -ge 10) ("count={0}" -f $asrCount)
} else {
    Row 'Defender (Get-MpPreference)' $false 'Defender module not available'
}

# ---- PowerShell v2 / WSH -------------------------------------------
$psv2 = (Get-WindowsOptionalFeature -Online -FeatureName MicrosoftWindows-PowerShellV2 -ErrorAction SilentlyContinue).State
Row 'PowerShell v2 disabled'  ($psv2 -eq 'Disabled') ("state={0}" -f $psv2)
$wsh  = Test-Reg 'HKLM:\SOFTWARE\Microsoft\Windows Script Host\Settings' 'Enabled' 0
Row 'Windows Script Host disabled' $wsh.Match ("Enabled={0}" -f $wsh.Value)

# ---- Logging --------------------------------------------------------
$sb  = Test-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging' 'EnableScriptBlockLogging' 1
$ml  = Test-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging'      'EnableModuleLogging'      1
Row 'PowerShell ScriptBlock logging' $sb.Match
Row 'PowerShell Module logging'      $ml.Match

# ---- USB / DMA ------------------------------------------------------
$usbBlock = Test-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeviceInstall\Restrictions' 'DeviceInstallDisabled' 1
$dma      = Test-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\DmaSecurity' 'AllowDmaUnderLock' 0
Row 'New USB device install blocked' $usbBlock.Match
Row 'DMA under lock blocked'         $dma.Match

# ---- Secure Boot / BitLocker / TPM ---------------------------------
try {
    $sbState = Confirm-SecureBootUEFI -ErrorAction Stop
    Row 'Secure Boot' $sbState
} catch {
    Row 'Secure Boot' $null 'unavailable (legacy BIOS / non-UEFI)'
}
try {
    $bl = Get-BitLockerVolume -MountPoint $env:SystemDrive -ErrorAction Stop
    Row 'BitLocker (system drive)' ($bl.ProtectionStatus -eq 'On') ("status={0}" -f $bl.ProtectionStatus)
} catch {
    Row 'BitLocker (system drive)' $null 'cmdlet unavailable'
}
try {
    $tpm = Get-Tpm -ErrorAction Stop
    Row 'TPM present + ready' ($tpm.TpmPresent -and $tpm.TpmReady)
} catch {
    Row 'TPM' $null 'cmdlet unavailable'
}

# ---- Firewall -------------------------------------------------------
$fw = Get-NetFirewallProfile -ErrorAction SilentlyContinue
foreach ($p in $fw) {
    Row ("Firewall [{0}]" -f $p.Name) ($p.Enabled -eq $true) ("In={0} Out={1}" -f $p.DefaultInboundAction, $p.DefaultOutboundAction)
}

# ---- Process mitigation snapshot -----------------------------------
try {
    $pm = Get-ProcessMitigation -System -ErrorAction Stop
    Row 'DEP system-wide'                   ($pm.DEP.Enable -eq 'ON')
    Row 'ASLR ForceRelocateImages'          ($pm.ASLR.ForceRelocateImages -eq 'ON')
    Row 'ASLR HighEntropy'                  ($pm.ASLR.HighEntropy -eq 'ON')
    Row 'CFG'                               ($pm.CFG.Enable -eq 'ON')
} catch {
    Row 'Process mitigations' $null 'Get-ProcessMitigation unavailable'
}

# ---- DNS / hosts ----------------------------------------------------
$dns = Get-DnsClientServerAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { $_.ServerAddresses.Count -gt 0 } | Select-Object -First 1
if ($dns) {
    Row ("DNS [{0}]" -f $dns.InterfaceAlias) $null (($dns.ServerAddresses) -join ',')
}
$hostsHasFaraday = (Select-String -Path "$env:SystemRoot\System32\drivers\etc\hosts" -Pattern '# FARADAY-BEGIN' -SimpleMatch -ErrorAction SilentlyContinue) -ne $null
Row 'Hosts file FARADAY block' $hostsHasFaraday

Write-Host ''
Write-Host '  Legend: [OK] enforced  [!] missing  [-] informational'
Write-Host ''
