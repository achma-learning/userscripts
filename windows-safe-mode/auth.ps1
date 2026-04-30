# auth.ps1 - Faraday Mode password gate.
#
# Modes:
#   -Set     Prompt twice for a new password, hash with PBKDF2-SHA256
#            (200k iterations, 16-byte random salt), write to AuthFile,
#            tighten ACL to SYSTEM + Administrators only.
#   -Verify  Prompt once, hash with the stored salt + iter count, do a
#            constant-time compare. Exit 0 on match, 1 on mismatch /
#            cancel / I/O error.  Exit 0 if no AuthFile exists yet
#            (first-run convenience - lets `safe` work before a
#            password has been set).
#
# Storage format (single ASCII line):
#     base64(salt) ':' iterations ':' base64(hash)
#
# Notes:
# - The hash file's ACL is hardened so a non-admin remote shell cannot
#   read it. PBKDF2 also makes any exfiltrated hash slow to crack.
# - SYSTEM is allowed to read it so the boot scheduled task can verify
#   if you ever decide to gate `boot` too (currently it bypasses).
# - All user-facing messages use Write-Host (stdout) - never Write-Error
#   - so the password prompt is never polluted by red error-stream text
#   that the user might mistake for "the script crashed".

param(
    [Parameter(ParameterSetName = 'Set',    Mandatory = $true)] [switch]$Set,
    [Parameter(ParameterSetName = 'Verify', Mandatory = $true)] [switch]$Verify,
    [Parameter(Mandatory = $true)] [string]$AuthFile
)

# Continue (not Stop) so a stray non-terminating error does not paint a
# red traceback over the password prompt and exit before the user can
# read it. We handle every fallible call with try/catch explicitly.
$ErrorActionPreference = 'Continue'
# Suppress the red error stream entirely - any unexpected error gets
# converted to a friendly Write-Host message inside our try/catch.
$ErrorView = 'NormalView'

function Get-Plain([System.Security.SecureString]$ss) {
    if (-not $ss) { return '' }
    (New-Object System.Net.NetworkCredential('', $ss)).Password
}

function Compute-Hash([string]$pw, [byte[]]$salt, [int]$iter) {
    $kdf = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($pw, $salt, $iter, [System.Security.Cryptography.HashAlgorithmName]::SHA256)
    try { return $kdf.GetBytes(32) } finally { $kdf.Dispose() }
}

function ConstantTime-Equal([byte[]]$a, [byte[]]$b) {
    if ($null -eq $a -or $null -eq $b) { return $false }
    if ($a.Length -ne $b.Length) { return $false }
    $diff = 0
    for ($i = 0; $i -lt $a.Length; $i++) { $diff = $diff -bor ($a[$i] -bxor $b[$i]) }
    return $diff -eq 0
}

function Lock-Acl([string]$path) {
    # Only SYSTEM and the local Administrators group keep access.
    cmd /c icacls "$path" /inheritance:r 2>$null | Out-Null
    cmd /c icacls "$path" /grant:r "*S-1-5-18:(F)" "*S-1-5-32-544:(F)" 2>$null | Out-Null
}

function Say-Warn([string]$msg) {
    Write-Host "[!] $msg" -ForegroundColor Yellow
}

if ($Set) {
    try {
        $pw1 = Read-Host -Prompt 'Set new Faraday password' -AsSecureString
        $pw2 = Read-Host -Prompt 'Confirm new Faraday password' -AsSecureString
        $p1 = Get-Plain $pw1
        $p2 = Get-Plain $pw2
        if ($p1 -ne $p2)      { Say-Warn 'Passwords do not match.'                ; exit 2 }
        if ($p1.Length -lt 6) { Say-Warn 'Password too short (minimum 6 chars).'  ; exit 2 }

        $salt = New-Object byte[] 16
        [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($salt)
        $iter = 200000
        $hash = Compute-Hash $p1 $salt $iter

        $blob = '{0}:{1}:{2}' -f ([Convert]::ToBase64String($salt)), $iter, ([Convert]::ToBase64String($hash))
        $dir  = Split-Path -Parent $AuthFile
        if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        Set-Content -LiteralPath $AuthFile -Value $blob -Encoding ASCII -Force
        Lock-Acl $AuthFile

        Write-Host '[+] Faraday password set.' -ForegroundColor Green
        exit 0
    } catch {
        Say-Warn ("Could not set password: " + $_.Exception.Message)
        exit 2
    }
}

if ($Verify) {
    try {
        if (-not (Test-Path -LiteralPath $AuthFile)) {
            # No password configured yet - allow.
            exit 0
        }
        $raw = Get-Content -LiteralPath $AuthFile -ErrorAction SilentlyContinue
        if (-not $raw) { Say-Warn 'Auth file is empty or unreadable.' ; exit 1 }
        $blob  = ($raw | Select-Object -First 1).Trim()
        $parts = $blob -split ':'
        if ($parts.Length -ne 3) { Say-Warn 'Auth file is corrupt.' ; exit 1 }

        try {
            $salt     = [Convert]::FromBase64String($parts[0])
            $iter     = [int]$parts[1]
            $expected = [Convert]::FromBase64String($parts[2])
        } catch {
            Say-Warn 'Auth file is corrupt.'
            exit 1
        }

        $pw = Read-Host -Prompt 'Faraday password' -AsSecureString
        $p  = Get-Plain $pw
        if ([string]::IsNullOrEmpty($p)) { Say-Warn 'No password entered.' ; exit 1 }

        $actual = Compute-Hash $p $salt $iter
        if (ConstantTime-Equal $actual $expected) { exit 0 }
        Say-Warn 'Wrong password.'
        exit 1
    } catch {
        Say-Warn ("Verification error: " + $_.Exception.Message)
        exit 1
    }
}
