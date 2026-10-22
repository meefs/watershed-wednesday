# #16: Palo Alto PAN-OS, ransomware via a GlobalProtect auth bypass (CVE-2026-0257), plus a new management-interface RCE (CVE-2026-0322)

> **Thread item:** "16. Palo Alto: ransomware gangs breaking in through company firewalls"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Palo Alto Networks, Unit 42, CISA KEV

**Additional details:** Exploited by the Qilin and Inc ransomware gangs. Also check the older KEV-listed PAN-OS flaws CVE-2024-3400 and CVE-2024-0012. [Arctic Wolf IR write-up](https://arcticwolf.com/resources/blog/exploitation-of-cve-2026-0257-leads-to-qilin-ransomware/) · [Rapid7](https://rapid7.com/blog/post/etr-rapid7-observed-exploitation-of-pan-os-globalprotect-authentication-bypass-vulnerability-cve-2026-0257/).

**What happened:**
- **How the attacks work** [3][10]:
  1. Attackers exploit CVE-2026-0257, an authentication bypass in the GlobalProtect portal and gateway, to open VPN sessions without MFA.
  2. They move laterally over RDP and SMB.
  3. They deploy ransomware.
- **Who's doing it** [3][10]:
  - Unit 42 names Qilin (which it tracks as "Spikey Scorpius") and Inc ("Tarnished Scorpius").
  - A third group, Settra, appears only in ReliaQuest's reporting.
  - Unit 42 added the ransomware activity to its threat brief in updates on Oct 19 and Oct 20, 2026.
- **Timeline** [1][8][9]:
  - **May 13, 2026:** Palo Alto disclosed the flaw.
  - **May 17:** Rapid7 saw the first exploitation, using forged override cookies to log in as local admin.
  - **May 21:** a second wave of exploitation.
  - **June 2026:** Arctic Wolf tied intrusions to Qilin.
- **A separate, genuinely new flaw: CVE-2026-0322** [2][4]
  - Root-level remote code execution through the PAN-OS management interface, fixed Oct 14, 2026.
  - Palo Alto calls exploitation "very limited."
  - It's in CISA's KEV catalog, with ransomware use listed as "Unknown."

**Identifiers:**
- **CVE-2026-0257** [1][4][5][7]:
  - Weakness: CWE-565.
  - Scores:
    - Palo Alto rates it CVSS 4.0 7.8 (High), with exploit status "attacked."
    - NVD also lists a CVSS 3.1 score of 9.1 (Critical), from NIST.
  - KEV: added 2026-05-29, due 2026-06-01, ransomware use "Known."
- **CVE-2026-0322** [2][4][6]:
  - Weakness: CWE-94.
  - Score: CVSS 4.0 8.6 (High), or 8.5 if management is reachable only from a jump box.
  - KEV: added 2026-10-14, due 2026-10-17, ransomware use "Unknown."
- **Fixed builds for CVE-2026-0257** [1][5]:
  - PAN-OS 12.1: 12.1.7, or 12.1.4-h6
  - PAN-OS 11.2: 11.2.12, 11.2.10-h7, 11.2.7-h14, 11.2.4-h17
  - PAN-OS 11.1: 11.1.15, 11.1.13-h5, 11.1.10-h25, 11.1.7-h6, 11.1.6-h32, 11.1.4-h33
  - PAN-OS 10.2: 10.2.18-h6, 10.2.16-h7, 10.2.13-h21, 10.2.10-h36, 10.2.7-h34
  - Prisma Access: 11.2.7-h13, 10.2.10-h36
- **Fixed builds for CVE-2026-0322** [2][6]:
  - PAN-OS 12.2: 12.2.4
  - PAN-OS 12.1: 12.1.4-h12, 12.1.7-h8, 12.1.10-h2
  - PAN-OS 11.2: 11.2.4-h22, 11.2.7-h21, 11.2.10-h15, 11.2.13-h3, 11.2.16
  - PAN-OS 11.1: 11.1.4-h37, 11.1.6-h39, 11.1.7-h11, 11.1.10-h35, 11.1.13-h15, 11.1.16-h3
  - PAN-OS 10.2: 10.2.7-h38, 10.2.10-h41, 10.2.13-h26, 10.2.16-h11, 10.2.18-h12

**Who's affected / exposure:**
- **CVE-2026-0257 requires all three of these** [1][8]:
  - a GlobalProtect portal or gateway;
  - authentication override cookies enabled;
  - an override certificate that's shared with another feature. Rapid7 cites the HTTPS service certificate, and says no password is needed when the certificate is shared.
- **How to check:** look in the portal's Agent > Authentication settings and the gateway's Authentication Override settings for "cookie for authentication override" [1].
- **Extra pattern:** in its review of the first wave, Rapid7 also found that Cloud Authentication Service was disabled on affected devices [8].
- **CVE-2026-0322** [2][3]:
  - "No special configuration is required."
  - Risk is highest when the management interface is reachable from the internet.
  - The attacker needs valid credentials and network access to it.
  - Unit 42 notes that GlobalProtect profiles on a management interface can expose ports 4443 and 3879.

**Fix / patch / mitigation:**
- **CVE-2026-0257** [1][9]:
  - Upgrade to a fixed build.
  - If you can't upgrade yet, either turn off generating and accepting override cookies, or use a dedicated certificate that's used only for override cookies.
  - After upgrading, users have to re-authenticate once. End any live GlobalProtect sessions after patching.
  - The HMAC CLI toggle is a compatibility setting, not a fix.
- **CVE-2026-0322** [2]:
  - "No known workarounds exist."
  - Restrict management access to trusted IPs, or to a single jump box.
  - Threat Prevention signatures 510046 and 510047 give limited coverage, and only work with SSL Decryption enabled.
- **Palo Alto product coverage, per Unit 42** [3]:
  - Advanced URL Filtering and Advanced IP Defense tags.
  - Cortex XDR and XSIAM behavioral rules.

**IOCs / detection:**
- **Unit 42, CVE-2026-0257** [3]:
  - Nine IPs seen before the public proof-of-concept: 23.128.228[.]6, 104.207.144[.]154, 146.19.216[.]119, 146.19.216[.]120, 146.19.216[.]125, 179.43.172[.]213, 185.195.232[.]139, 198.12.106[.]60, 202.144.192[.]47
  - Host IDs: GP-CLIENT, DESKTOP-GP01, WINDOWS-LAPTOP-001
  - Config seen after the proof-of-concept: `endpoint_os_version` "Microsoft Windows 10 Pro 64-bit" with an empty `source_user_info.domain`
  - No hashes, domains or tool names published.
- **Rapid7** [8]:
  - Two more IPs: 209.99.191.137 and 79.130.26.202
  - Spoofed MAC address aa:bb:cc:dd:ee:ff
  - Cookie-based logins to the local "admin" account.
- **Arctic Wolf, from inside intrusions** [9]:
  - VPN source IPs: 108.61.229[.]217, 108.61.75[.]232, 2.188.33[.]52, 199.247.22[.]193, 70.34.205[.]43
  - Hostnames: "kali" and DESKTOP-[ALPHANUMERIC]
  - Files:
    - `C:\PerfLogs\win.exe`
    - `C:\Windows\Temp\output.odt` (an LSASS memory dump)
    - `rclone.exe`
    - `PSEXESVC.exe`
  - Event ID 1102, which records the Windows security log being cleared.
- **CVE-2026-0322:** Palo Alto lists three IPs "associated with threat activity": 66[.]42[.]72[.]14, 208[.]83[.]239[.]114, 149[.]248[.]47[.]234 [2].

**Priority for practitioners:**
- **Patch now: CVE-2026-0322.** It gives root code execution, it's in KEV, and there's no workaround. Restrict management access today [2][4].
- **Patch now: CVE-2026-0257** on any affected GlobalProtect portal or gateway [1].
- **Hunt for compromise: CVE-2026-0257,** back to May 17, using the IOCs above [3][8][9].
- **Rotate secrets, but only if the hunt finds something.** Then assume the domain is compromised [9]:
  - Rotate domain admin and service accounts.
  - Reset KRBTGT twice.
  - Rotate MEGA, ProtonDrive and FileZilla credentials.

**Sources:**
1. [primary] Palo Alto Networks PSIRT, CVE-2026-0257 advisory, https://security.paloaltonetworks.com/CVE-2026-0257 (published 2026-05-13; exploit status 2026-05-29)
2. [primary] Palo Alto Networks PSIRT, CVE-2026-0322 advisory, https://security.paloaltonetworks.com/CVE-2026-0322 (published 2026-10-14; updated 2026-10-15)
3. [primary] Unit 42, "Threat Brief: Active Exploitation of PAN-OS CVE-2026-0257 (Updated October 20)," https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/ (revisions Oct 19 and Oct 20, 2026)
4. [primary] CISA, Known Exploited Vulnerabilities JSON feed, https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json (catalog released 2026-10-21)
5. [primary] CVE record CVE-2026-0257, CNA palo_alto, https://cveawg.mitre.org/api/cve/CVE-2026-0257 (published 2026-05-13)
6. [primary] CVE record CVE-2026-0322, CNA palo_alto, https://cveawg.mitre.org/api/cve/CVE-2026-0322 (published 2026-10-14)
7. [primary] NVD/NIST API, CVE-2026-0257, https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-0257 (lastModified 2026-06-17)
8. [primary, IR/MDR firm] Rapid7 ETR, "Observed exploitation of PAN-OS GlobalProtect authentication bypass (CVE-2026-0257)," https://rapid7.com/blog/post/etr-rapid7-observed-exploitation-of-pan-os-globalprotect-authentication-bypass-vulnerability-cve-2026-0257/ (2026-05-29)
9. [primary, IR firm] Arctic Wolf Labs, "Cookie Crumbles: How Exploitation of CVE-2026-0257 Leads to Qilin Ransomware," https://arcticwolf.com/resources/blog/exploitation-of-cve-2026-0257-leads-to-qilin-ransomware/ (2026-07-20)
10. [secondary] The Register, "Palo Alto's firewall OS has been under attack from multiple ransomware groups since June," https://www.theregister.com/cyber-crime/2026/10/20/palo-altos-firewall-os-has-been-under-attack-from-multiple-ransomware-groups-since-june/5304226 (2026-10-20)
11. [secondary] Help Net Security, https://www.helpnetsecurity.com/2026/10/21/ransomware-groups-exploit-palo-alto-globalprotect-cve-2026-0257/ (2026-10-21)

**Unknowns:**
- **Settra:** the ReliaQuest report wasn't opened, so Settra's involvement rests on Unit 42's citation.
- **CVE-2026-0322:**
  - The BleepingComputer article returned HTTP 403.
  - No readable source names an actor or a ransomware group for it.
  - When exploitation started is unknown.
  - The Elec's claim that it was "already abused before the fix" comes from that one source only.
- **Version ranges:** Palo Alto's CPE ranges differ slightly from its advisory tables, for example where 12.1 starts. The fixed builds match between the tables and the CVE JSON, but confirm them on the advisory before patching.
- **Unreadable pages:** Arctic Wolf's GitHub IOC appendix and Unit 42's "Lunar Peek" tag page couldn't be read. Unit 42's mention of the 2024 CVE appears only in a link URL.
- **Not disclosed:** victim counts, and whether Palo Alto itself was breached.
- **Cloud Authentication Service:** the pattern of it being disabled comes only from Rapid7's review of the first wave.
- **How pages were read:** the agent's fetch tool summarized the Palo Alto, Unit 42 and Arctic Wolf pages. Version strings were cross-checked against the CVE JSON, and the KEV dates against the CISA feed.
