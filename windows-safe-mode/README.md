# Faraday Mode — one-click Windows hardening toggle

A pair of scripts that put a Windows 10/11 PC into a *Faraday-cage-like*
lockdown: total firewall block, every remote-management service stopped,
classic protocol attack surface (SMBv1, NetBIOS, LLMNR, mDNS, WPAD) torn
down, NTLM hardened, telemetry silenced. A small tray-bar shield shows
that the mode is active. **Run the same `.bat` again to fully revert.**

## Files

| File              | Purpose                                                  |
|-------------------|----------------------------------------------------------|
| `FaradayMode.bat` | Self-elevating toggle (enable on first run, disable on second). |
| `tray.ps1`        | Hidden PowerShell that paints the tray-bar shield icon.  |

Keep them in the same folder.

## Usage

1. Right-click `FaradayMode.bat` → **Run as administrator** (it will also
   self-elevate if you just double-click it).
2. A shield appears in the tray bar — Faraday Mode is on.
3. Run the same `.bat` again (or right-click the shield → *Disable
   Faraday Mode*) to restore everything.

## What gets locked down

- **Windows Firewall** — default policy switched to *block inbound and
  outbound* on all profiles. Loopback (`127.0.0.1`) is whitelisted so
  local apps still work. Explicit deny rules for the high-risk ports:
  135, 137, 138, 139, 445, 593, 1433, 1434, 3389, 5040, 5353, 5355,
  5985, 5986.
- **Services stopped + disabled** — `TermService`, `SessionEnv`,
  `UmRdpService`, `WinRM`, `RemoteRegistry`, `RemoteAccess`,
  `SharedAccess`, `Spooler`, `SSDPSRV`, `upnphost`, `fdPHost`,
  `FDResPub`, `LanmanServer`, `WebClient`, `DiagTrack`,
  `dmwappushservice`, `RasMan`, `TlntSvr`, `SNMP`, `Fax`,
  `WinHttpAutoProxySvc`.
- **Remote login** — RDP off (`fDenyTSConnections=1`), Remote Assistance
  off, PowerShell Remoting disabled.
- **Legacy protocols** — SMBv1 off, NetBIOS-over-TCP off on every NIC,
  LLMNR off, mDNS off, WPAD off.
- **Authentication** — `NoLMHash=1`, `RestrictSendingNTLMTraffic=2`,
  `RestrictReceivingNTLMTraffic=2`, `LmCompatibilityLevel=5`.
- **Misc** — AutoRun/AutoPlay off, Windows Error Reporting off, CEIP off,
  telemetry policy = 0.
- **Caches** — DNS, ARP, NetBIOS name caches all flushed.

## What gets backed up

Stored in `%ProgramData%\FaradayMode\backup\`:

- `firewall.wfw` — full export of the previous firewall configuration
  (re-imported with `netsh advfirewall import` on disable).
- `services.txt` — original `START_TYPE` of every touched service, so
  disable restores each to its prior `auto` / `demand` / `disabled`
  setting instead of guessing.

`%ProgramData%\FaradayMode\state.flag` is the on/off marker.
`%ProgramData%\FaradayMode\tray.pid` is the PID of the tray helper so
disable can `taskkill` it cleanly.

## Notes / caveats

- **You will lose internet** while Faraday Mode is on — that is the
  point. Re-run the `.bat` (or use the tray menu) to come back online.
- A reboot after disabling is recommended — some service-state changes
  only fully reset on next boot.
- Domain-joined machines may need additional GPO-level reverts; the
  script only touches the local registry and SCM.
- Tested on Windows 10 22H2 and Windows 11 23H2/24H2. Older builds may
  not expose every service named above; `sc` errors on missing services
  are silently ignored.
