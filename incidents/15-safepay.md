# #15 — SafePay ransomware: joint advisory AA26-293A

> **Thread item:** "15. SafePay ransomware: FBI warns it has hit 600+ critical infrastructure organizations"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** CISA, FBI and partner agencies

**Additional details:** Co-sealed by the FBI, CISA, USSS, Germany's LKA Rheinland-Pfalz and the UK NCA. Initial access comes from brute-forced or phished VPN credentials over Mullvad IPs, and from edge-device CVEs. It wipes shadow copies and resets backup NAS devices. [STIX JSON](https://www.cisa.gov/sites/default/files/2026-10/AA26-293A-stix.json).

- **What happened:**
  - **The advisory:** on Oct 20, 2026, six agencies published joint advisory AA26-293A, "#StopRansomware: SafePay Ransomware" (initial version): FBI, CISA, USSS, Germany's LKA Rheinland-Pfalz, the UK's NCA and the UK North West ROCU. It covers indicators of compromise (IOCs) observed through Aug 2026 [1].
  - **The group:** active since Aug 2024 and "among the most active ransomware groups in 2026." It has hit businesses and critical infrastructure in North America, South America, Europe and Australia. The advisory names no sectors [1].
  - **How it gets in** [1]:
    - stolen or guessed passwords (brute force);
    - phished accounts;
    - VPN access from Mullvad IP addresses;
    - exploited flaws in edge devices.
  - **What it does once inside** [1]:
    - stops the Volume Shadow Copy Service;
    - resets backup NAS devices to factory settings;
    - "in some cases" deletes all network-attached backups.

- **Identifiers:**
  - **Advisory:** AA26-293A [1].
  - **CVEs the advisory names** [1][2]. Products come from secondary sources:
    - CVE-2020-3259: product not verified.
    - CVE-2023-20269: Cisco ASA/FTD [8].
    - CVE-2023-27532 and CVE-2024-40711: Veeam Backup & Replication [9][10].
    - CVE-2024-40766: SonicWall SonicOS [7].
  - **MITRE ATT&CK:** the advisory lists 26 technique IDs. The ones extracted include T1110, T1190, T1133, T1021.001/.002/.006, T1059.001, T1490, T1486, T1567 and T1550.002 [1].

- **Who's affected / exposure:**
  - **Stated audience** [1]:
    - government (federal civilian executive branch, and state, local, tribal and territorial);
    - critical infrastructure;
    - defensive and vulnerability analysts;
    - security managers;
    - OT owners and operators.
  - **Likely exposed** (the agent's inference, not stated in the advisory):
    - any organization with internet-facing VPN or firewall gear;
    - Veeam Backup & Replication servers;
    - VPN accounts protected only by a password;
    - NAS backups reachable from production networks.
  - **Mullvad:** the advisory says the attackers use Mullvad IP addresses. It doesn't say Mullvad itself was breached [1].
  - **IPs:** the advisory says to verify them before blocking [1].

- **Fix / patch / mitigation:**
  - **From the advisory** [1]:
    - Patch firewalls and edge devices first. Prioritize flaws in CISA's Known Exploited Vulnerabilities (KEV) catalog on internet-facing systems.
    - Require MFA through identity and access management (ICAM) policies, especially for webmail, VPNs and accounts that touch critical systems.
    - Limit admin tools and privileges.
    - Keep backups that are offline, encrypted, immutable and segregated, and test restoring from them.
  - **Vendor fixes** (from search summaries; the vendor pages weren't opened):
    - **SonicWall CVE-2024-40766:** Gen5 fix 5.9.2.14-13o, Gen6 fix 6.5.4.15-116n. Also reset local SSLVPN passwords [7].
    - **Veeam CVE-2024-40711:** build 12.2.0.334 or later [10].
    - **Veeam CVE-2023-27532:** see KB4424 [9].
    - **Cisco CVE-2023-20269:** see advisory cisco-sa-asaftd-ravpn-auth-8LyfCkeC [8].

- **IOCs / detection:**
  - **STIX file:** the agent fetched the STIX 2.1 JSON bundle. It holds 63 objects: 19 indicators, 12 malware entries, 5 vulnerabilities and 23 attack patterns. CISA also lists an XML copy [1][2].
  - **Indicator types:** IP addresses, file names, SHA-1 and SHA-256 hashes, and hostnames. There are no internet domains. IPs on cloud hosting may since have been reassigned to someone else [1].
  - **Most "malware" entries are legitimate tools:** PsExec, Mimikatz, Rclone, AnyDesk, ScreenConnect, WinRM, FileZilla, 7-Zip, WinRAR, CCleaner, Backblaze and PowerShell. The advisory says to verify how a tool is being used before blocking it [1][2]. Hunt by context, not by tool name.

- **Priority for practitioners:**
  - **Patch now:** edge and VPN devices, Veeam, SonicWall and Cisco.
  - **Hunt for compromise:** the STIX indicators, deleted shadow copies and NAS resets.
  - **Rotate secrets:** VPN and admin accounts [1][7].

- **Sources:**
  1. [primary] CISA, "#StopRansomware: SafePay Ransomware" (AA26-293A), Oct 20, 2026 — https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-293a
  2. [primary] CISA, AA26-293A STIX 2.1 JSON bundle, Oct 2026 — https://www.cisa.gov/sites/default/files/2026-10/AA26-293A-stix.json
  3. [primary] IC3, PSA listing (newest Oct 16, 2026; no SafePay item) — https://www.ic3.gov/PSA
  4. [primary] CISA, StopRansomware alerts page (incomplete; no SafePay item shown) — https://www.cisa.gov/stopransomware/alerts
  5. [secondary] J. Greig, The Record (Recorded Future News), Oct 20, 2026 — https://therecord.media/fbi-says-safepay-ransomware-gang-among-most-active-600-victims
  6. [secondary] eSecurityPlanet, Oct 21, 2026 — https://www.esecurityplanet.com/threats/news-fbi-safepay-ransomware-600-organizations/
  7. [secondary] CERT Vanuatu, SonicWall SNWLID-2024-0015 (search snippet only; date unverified) — https://cert.gov.vu/index.php/advisories/89-advisory-99
  8. [secondary] NCSC Ireland, Cisco CVE-2023-20269 PDF (search snippet only; ~Sept 2023) — https://ncsc.gov.ie/pdfs/Cisco_remote_access_VPN_unauthorised_access_vulnerability.pdf
  9. [secondary] Veeam Community customer advisory (search snippet only; date unverified) — https://community.veeam.com/news-56/customer-advisory-ensure-veeam-backup-replication-updates-have-been-installed-5460
  10. [secondary] Help Net Security, Sept 9, 2024 (search snippet only) — https://www.helpnetsecurity.com/2024/09/09/cve-2024-40711-exploited/
  11. [primary] CISA KEV JSON feed (partial read; dateReleased 2026-10-21) — https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json

- **Unknowns:**
  - **Vendor advisories not opened:** the agent hit the session rate limit before opening the SonicWall PSIRT, Cisco and Veeam KB pages.
  - **KEV status unverified** for all five CVEs, including whether KEV flags them as used in ransomware. The feed is about 1.8M characters, and none of the five appeared in the first 100k [11].
  - **Raw CISA page not inspected:** the fetch tool labeled the content "pasted text," so the quotes depend on its extraction [1].
  - **Date mismatch:** the STIX report's "published" date is 2026-10-15, but the advisory is dated Oct 20 [2][1]. Cause unknown.
  - **Co-sealer mismatch:** the advisory's metadata lists fewer co-sealing agencies than its body does. NSA, MS-ISAC and HHS aren't named in the text the agent read [1].
  - **No other agency releases found:** no FBI FLASH or IC3 PSA on SafePay, and no LKA Rheinland-Pfalz or NCA release (search only). The FLASH list wasn't checked separately [3].
  - **No sector breakdown** of the 600 victims has been published.
  - **ATT&CK IDs** weren't checked against attack.mitre.org.
  - **Other coverage** was seen only in search results: itnerd, technology.org, and decryptiondigest's article titled "Destroys Backups." The advisory's claim about backups is narrower than that title: stopped shadow copies, reset NAS devices and, "in some cases," deleted network-attached backups [1].
