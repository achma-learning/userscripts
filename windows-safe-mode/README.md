# Faraday Mode — Windows hardening with a tray-bar mode switcher

A drop-in lockdown toggle for Windows 10/11, modeled after the WFC
"High Filtering" UX:

- One scheduled task re-applies **Safe Mode** at every boot (runs as
  `SYSTEM`, no UAC prompt).
- A second scheduled task launches a tray-bar shield at every logon.
- Right-click the shield to switch **Safe / Normal**, reboot into the
  Windows OS-level Safe Mode (Minimal / Networking / clear), open the
  backup folder, or uninstall.
- Left-click the shield = toggle Safe ↔ Normal.

Backups of the previous firewall, hosts file, and every touched
service's start type live under `%ProgramData%\FaradayMode\backup\`,
so **Normal Mode** restores the machine bit-for-bit.

## Files

| File              | Purpose                                                        |
|-------------------|----------------------------------------------------------------|
| `FaradayMode.bat` | Self-elevating state changer (`safe` / `normal` / `boot` / `toggle` / `install` / `uninstall` / `winsafe-min` / `winsafe-net` / `winsafe-clear` / `status`). |
| `install.ps1`     | Registers the two scheduled tasks, applies safe mode, launches tray. |
| `uninstall.ps1`   | Unregisters tasks, kills tray, reverts to normal.              |
| `tray.ps1`        | Tray-bar shield + mode-switcher menu.                          |

## Install / uninstall

Double-click `FaradayMode.bat` — it self-elevates (one UAC prompt) and
runs the full installer by default.

```bat
FaradayMode.bat install
```

To remove everything: `FaradayMode.bat uninstall`, or click *Uninstall*
in the tray menu.

## Tray controls

| Action                    | Effect                                                   |
|---------------------------|----------------------------------------------------------|
| Left-click shield         | Toggle Safe ↔ Normal (UAC).                              |
| Right-click → Safe        | Force Safe Mode.                                         |
| Right-click → Normal      | Force Normal Mode.                                       |
| Right-click → Restart Windows → Safe Mode (Minimal)            | `bcdedit /set safeboot minimal` + reboot in 10 s. |
| Right-click → Restart Windows → Safe Mode with Networking      | `bcdedit /set safeboot network` + reboot in 10 s. |
| Right-click → Restart Windows → Reboot normally (clear)        | `bcdedit /deletevalue safeboot` + reboot in 10 s. |
| Right-click → Open backup folder | Opens `%ProgramData%\FaradayMode\backup`.          |
| Right-click → Uninstall   | Confirms, then full uninstall + revert.                  |
| Right-click → Quit tray   | Closes the tray (autostart tasks remain).                |

## What "Safe Mode" actually does

### Firewall — real block-all (this is the fix vs. v1)

A naive "block-all" default policy still leaks because every existing
**allow** rule overrides it. Faraday's Safe Mode mirrors WFC's High
Filtering:

1. Set default policy to `block-in / block-out` on every profile.
2. **Disable every existing enabled allow rule**
   (`Get-NetFirewallRule -Action Allow -Enabled True | Set-NetFirewallRule -Enabled False`).
3. Re-add only `Faraday-Loopback-{In,Out,6-In,6-Out}` for `127.0.0.0/8`
   and `::1/128`.
4. Always-on inbound deny rules for the high-risk ports
   (135, 137-139, 445, 593, 1433-1434, 3389, 5040, 5353, 5355, 5985, 5986).

### DNS — fail-closed, not "use a different provider"

DNS is pointed at `127.0.0.1` (IPv4) and `::1` (IPv6) on every UP
adapter. No resolver listens there, so every name lookup fails
immediately. This is **more robust** than picking a public resolver
(Quad9 / Cloudflare): there is nothing that can be tampered with,
nothing to leak DoT/DoH metadata to, and no "what if the provider
goes down" failure mode. Combined with block-all-out it's belt + braces.

### Hosts file — telemetry blackhole + read-only

A `# FARADAY-BEGIN` / `# FARADAY-END` block is appended to
`%SystemRoot%\System32\drivers\etc\hosts` mapping ~25 telemetry /
tracker domains to `0.0.0.0`. The hosts file is then set
read-only (`attrib +R`) so apps cannot silently rewrite it while Safe
Mode is active. Both are reverted on Normal Mode (regex strips the
block, `attrib -R` clears the flag).

### Services — stopped + disabled

`TermService`, `SessionEnv`, `UmRdpService`, `WinRM`, `RemoteRegistry`,
`RemoteAccess`, `SharedAccess`, `Spooler`, `SSDPSRV`, `upnphost`,
`fdPHost`, `FDResPub`, `LanmanServer`, `WebClient`, `DiagTrack`,
`dmwappushservice`, `RasMan`, `TlntSvr`, `SNMP`, `Fax`,
`WinHttpAutoProxySvc`.

### Hyper-V — VM management plane stopped, vSwitches torn down

VBS / HVCI / Credential Guard are deliberately **kept on** — those use
the hypervisor to *protect* the OS. What gets stopped:

- Host-side VM management: `vmms`, `vmcompute`, `HvHost`.
- Integration services: `vmickvpexchange`, `vmicguestinterface`,
  `vmicshutdown`, `vmicheartbeat`, `vmicrdv`, `vmictimesync`, `vmicvss`.
- All `vEthernet*` host adapters (the host-side endpoints of any
  external Hyper-V vSwitch) are disabled — kills WSL2 / Docker-Desktop
  / external VM networking while Safe Mode is on.

### VPN — torn down, IPsec keying disabled, tunnel drivers blocked

- All active VPN / dial-up connections dropped via `rasdial /disconnect`
  + `Get-VpnConnection | rasdial … /disconnect`.
- Services stopped + disabled: `IKEEXT` (IKE/AuthIP, kills L2TP/IKEv2
  IPsec), `SstpSvc` (SSTP), `WwanSvc` (mobile broadband), `PolicyAgent`
  (IPsec Policy Agent), `RasAuto`. **`BFE` is kept** — Windows Firewall
  needs it.
- WAN miniport drivers for `PptpMiniport`, `L2tpMiniport`,
  `SstpMiniport`, and `AgileVpn` are set to `Start = 4` (disabled).
  Restored to `Start = 3` (manual) on Normal Mode.

### Remote login

RDP, Remote Assistance, PowerShell Remoting all off.

### Legacy network stack

SMBv1, NetBIOS-over-TCP (per-NIC), LLMNR, mDNS, WPAD off. IPv6
transition tech (Teredo / ISATAP / 6to4 — common bypass paths)
disabled via `DisabledComponents = 1`.

### Authentication

`NoLMHash = 1`, `LmCompatibilityLevel = 5`,
`RestrictSendingNTLMTraffic = 2`, `RestrictReceivingNTLMTraffic = 2`.

### Misc

AutoRun / AutoPlay off, telemetry policy = 0, Windows Error Reporting
off, CEIP off. DNS / ARP / NetBIOS caches flushed.

## What "Normal Mode" does

- Re-imports the saved firewall configuration (`firewall.wfw`).
- Forces the canonical `block-in / allow-out` default policy.
- Re-enables firewall allow rules that Safe Mode had disabled.
- Resets DNS to DHCP/automatic on every adapter.
- Strips the `FARADAY-BEGIN/END` block from hosts and clears the
  read-only flag.
- Restores every service to its previously recorded start type.
- Removes registry hardening keys.
- The `Faraday-DenyTCP-*` / `Faraday-DenyUDP-*` inbound deny rules
  **stay** in place — high-risk inbound is always blocked, regardless
  of mode.

## Boot behavior

The `FaradayMode\Boot` task runs `FaradayMode.bat boot` as `SYSTEM` at
every startup. If you switched to Normal during the previous session,
the next reboot silently puts you back into Safe — matching WFC's
"default-on-boot" philosophy.

## Restart-into-Windows-Safe-Mode

This is the OS-level Safe Mode (different from Faraday's Safe Mode).
Implemented with `bcdedit /set {current} safeboot <minimal|network>`
followed by `shutdown /r /t 10`. After booting into OS Safe Mode you
**must** run `winsafe-clear` (or click *Reboot normally (clear)*) to
clear the safeboot flag, otherwise every subsequent reboot keeps
landing you in Safe Mode.

## Caveats

- Internet is **completely unreachable** in Faraday Safe Mode (loopback
  only). Use the tray to come back to Normal.
- A reboot after `uninstall` is recommended — some service-state
  changes only fully revert on next boot.
- Domain-joined machines may need GPO-level reverts beyond the script.
- Hosts-file write while in Safe Mode requires temporarily clearing
  the read-only flag (Faraday does this when toggling modes).
- Tested on Windows 10 22H2 and Windows 11 23H2/24H2.
