# Faraday Mode — Windows hardening with a tray-bar mode switcher

A drop-in lockdown toggle for Windows 10/11, modeled after the WFC
"High Filtering" UX:

- One scheduled task re-applies **Safe Mode** at every boot (runs as
  `SYSTEM`, no UAC prompt).
- A second scheduled task launches a tray-bar shield at every logon.
- Right-click the shield to switch **Safe / Normal**, open the backup
  folder, or uninstall everything.
- Left-click the shield = toggle between the two modes.

Backups of the previous firewall config and every touched service's
start type are kept under `%ProgramData%\FaradayMode\backup\`, so
**Normal Mode** restores the machine bit-for-bit.

## Files

| File              | Purpose                                                        |
|-------------------|----------------------------------------------------------------|
| `FaradayMode.bat` | Self-elevating state changer (`safe` / `normal` / `boot` / `toggle` / `install` / `uninstall` / `status`). |
| `install.ps1`     | Registers the two scheduled tasks, applies safe mode, launches tray. |
| `uninstall.ps1`   | Unregisters tasks, kills the tray, reverts to normal.          |
| `tray.ps1`        | Tray-bar shield + mode-switcher menu, polls state every 1.5 s. |

Keep all four files in the same folder. The scheduled tasks are
registered with the **absolute path of the folder you install from**,
so don't move it afterwards (just uninstall, move, reinstall).

## Install / uninstall

**Just double-click `FaradayMode.bat`** — it self-elevates (you'll get
one UAC prompt) and runs the full installer by default. Equivalent to:

```bat
FaradayMode.bat install
```

Effects:

1. Registers `FaradayMode\Boot` (SYSTEM, `AtStartup`, runs `FaradayMode.bat boot`).
2. Registers `FaradayMode\Tray` (current user, `AtLogOn`, runs `tray.ps1`).
3. Applies Safe Mode immediately.
4. Launches the tray for the current session.

To remove everything:

```bat
FaradayMode.bat uninstall
```

…or click **Uninstall (revert + remove autostart)** in the tray menu.

## Tray controls

| Action                | Effect                                                        |
|-----------------------|---------------------------------------------------------------|
| Left-click shield     | Toggle Safe ↔ Normal (UAC prompts).                           |
| Right-click → Safe    | Force Safe Mode.                                              |
| Right-click → Normal  | Force Normal Mode.                                            |
| Right-click → Open backup folder | Opens `%ProgramData%\FaradayMode\backup`.          |
| Right-click → Uninstall | Confirms, then full uninstall + revert.                     |
| Right-click → Quit tray | Closes the tray (boot/logon tasks remain).                  |

Icon: **Shield** = Safe, **Information** = Normal. Hover tooltip shows
the active mode.

## What "Safe Mode" actually does

- **Windows Firewall** — default policy `block in / block out` on every
  profile. Loopback whitelisted. Explicit deny rules for ports 135,
  137-139, 445, 593, 1433-1434, 3389, 5040, 5353, 5355, 5985, 5986.
- **Services stopped + disabled** — `TermService`, `SessionEnv`,
  `UmRdpService`, `WinRM`, `RemoteRegistry`, `RemoteAccess`,
  `SharedAccess`, `Spooler`, `SSDPSRV`, `upnphost`, `fdPHost`,
  `FDResPub`, `LanmanServer`, `WebClient`, `DiagTrack`,
  `dmwappushservice`, `RasMan`, `TlntSvr`, `SNMP`, `Fax`,
  `WinHttpAutoProxySvc`.
- **Remote login** — RDP, Remote Assistance, PowerShell Remoting all off.
- **Legacy network** — SMBv1, NetBIOS-over-TCP (per-NIC), LLMNR, mDNS,
  WPAD all off.
- **Authentication** — `NoLMHash=1`, `LmCompatibilityLevel=5`,
  `RestrictSendingNTLMTraffic=2`, `RestrictReceivingNTLMTraffic=2`.
- **Misc** — AutoRun/AutoPlay off, telemetry policy = 0, Windows Error
  Reporting off, CEIP off.
- **Caches** — DNS / ARP / NetBIOS name caches all flushed.

## What "Normal Mode" does

- Re-imports the saved firewall configuration (`firewall.wfw`).
- Restores every service to its **previously recorded** start type
  (`auto` / `demand` / `disabled` / `system` / `boot`).
- Removes the registry keys the script added; resets NetBIOS to its
  default value (`0` = use DHCP).

## Boot behavior

The boot task runs `FaradayMode.bat boot` as `SYSTEM` at every startup.
If you switched to Normal during the previous session, the next reboot
silently puts you back into Safe — matching WFC's "default-on-boot"
philosophy.

## Caveats

- Internet is **completely unreachable** in Safe Mode (loopback only).
  That's the entire point. Use the tray to come back to Normal.
- A reboot after `uninstall` is recommended — some service-state
  changes only fully revert on next boot.
- Domain-joined machines may need GPO-level reverts beyond what the
  script touches.
- Tested on Windows 10 22H2 and Windows 11 23H2/24H2. Older builds may
  be missing some named services; `sc` errors are silently ignored.
