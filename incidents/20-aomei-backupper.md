# #20 — AOMEI Backupper: ephemeral tampering of update/promo config delivered a backdoor (UNC7017)

> **Thread item:** "20. AOMEI: backup software's update server handed out a backdoor"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** AOMEI, Google GTIG/Mandiant, ManageEngine

**Additional details:** Actor: UNC7017. Chain: CROSSROAD, then SHINYROAD, then ADAPTAGENT (Adaptix C2). Victims in 11 countries across IT services, telecom and higher ed. GTIG also names AnyViewer (AOMEI disputes this), so include AnyViewer hosts in the hunt. [ManageEngine Sigma](https://www.manageengine.com/threat-analysis-lab/aomei-backupper-supply-chain-compromise.html).

- **What happened:**
  - **The attack (Apr–Jul 2026)** [1]:
    - A threat cluster GTIG tracks as UNC7017 altered `down_html.ini` and `Notifycfg.ini` on AOMEI's update infrastructure. Each change lasted only 5–10 minutes.
    - Clients that checked for updates during those windows downloaded a trojanized `upgrade-now.zip` (the CROSSROAD downloader). It installed the SHINYROAD backdoor.
    - ADAPTAGENT, a client for the Adaptix command-and-control (C2) framework, followed in mid-July.
  - **Confirmed tampering windows (UTC)** [1][3]:
    - May 28, 05:40–05:50
    - Jul 16, 08:33–08:39
    - Jul 20, 10:35–10:40
  - **Detection and notification** [1][2]:
    - May 28: ManageEngine's EDR first flagged it.
    - Jun 7: ManageEngine's threat lab (METAL) notified AOMEI.
    - Jul 17: Mandiant notified AOMEI.
    - Jul 29: AOMEI replied that "corrective actions had been taken."
    - AOMEI first blamed the problem on interception in transit. METAL says the evidence doesn't support that [2].
  - **Going public:**
    - Oct 15, 2026: GTIG and Mandiant published their report [1].
    - Oct 16: METAL published its report [2].
    - Oct 19: AOMEI posted its incident page and released Backupper 8.5.1 as a security release [3][4].
    - Oct 20: AOMEI still hadn't notified infected customers [9].

- **Identifiers:**
  - **Malware** [1]:
    - CROSSROAD (downloader)
    - SHINYROAD (backdoor)
    - ADAPTAGENT (Adaptix C2 client)
    - abused, legitimate Famatech Radmin binaries
  - **Actor:** UNC7017 [1].
  - **CVE:** none for the tampering itself [1][2][3].
  - **Separate driver CVEs** (not part of this attack; both scored CVSS 3.1 7.8 by VulDB as the CVE numbering authority [7][8]):
    - **CVE-2026-12780:** AOMEI Backupper's `amwrtdrv.sys` driver. NVD says "up to 8.3.0"; CERT/CC names 8.4.0 [6][7].
    - **CVE-2026-12778:** AOMEI Partition Assistant's `ampa10.sys` driver, up to 10.10.1 [8].
  - **Another driver fix:** the 8.5.0 changelog (Oct 9) also fixed a flaw in `ambakdrv.sys`, with no CVE listed [4].

- **Who's affected / exposure:**
  - **Who:** Windows installs of AOMEI Backupper that checked for updates during an exposure window [3], anywhere in Apr–Jul 2026 [1][2].
  - **Versions:** METAL says the problem was "observed on v8.3.0 and later versions" [2]. GTIG and AOMEI don't name versions [1][3].
  - **More windows likely:** the three confirmed windows are a minimum. GTIG says there were probably other windows nobody observed [1].
  - **Victims:** GTIG counts victims in 11 countries, in IT services, telecom and higher education. This is likely an undercount [1][9].

- **Fix / patch / mitigation:**
  1. **Upgrade Backupper to 8.5.1** (Oct 19, 2026). It turns off the in-app promo and auto-update features, and stops using www2.aomeisoftware.com [3][4][5].
     - Upgrading doesn't clean an infected machine. AOMEI and its changelog don't say it removes existing infections, and GTIG says server-side fixes don't clean endpoints [1][3][4].
  2. **Deal with the `amwrtdrv.sys` driver.** Until a fix is confirmed, CERT/CC advises either uninstalling Backupper or setting the driver's service start type to disabled [6]. No source says whether 8.5.1 includes that fix.
  3. **Scan:**
     - Update your installed security software and run a scan.
     - If the result is inconclusive, run a Malwarebytes Free scan.
     - AOMEI's own Security Scanner hasn't been released yet [3].
  4. **Block** the C2 IPs and domains listed below. Also block outbound SMB (port 445) and WebDAV to external IPs [1][2].
  5. **Preserve evidence before cleaning up:**
     - Save the contents of `Tmphtml\`.
     - Line up proxy logs with the alert timestamps [1].
     - No primary source gives steps for removal, reimaging or rotating credentials [1][2][3].
  6. **Partition Assistant (CVE-2026-12778):** the NVD record names no fixed version [8].

- **IOCs / detection:**
  - **SHA-256 hashes** (from GTIG's table; the full list is in [1]):
    - CROSSROAD loaders (`upgrade-now.exe`):
      - `11e576df44e9c9eef72b9f5b699291bcdb200a19130778ec231e5b0987b913ad` (May 20)
      - `9a58e8f49edf5644e5728f74cf36f560d3d486fa51db4db69d927963c7aca450` (Jul 16)
      - `b360b6db0c2b668317edc1504a7c39ef047f0d925c8f113b521f6724c157ae21` (Jul 20)
    - `BlkScrDl.dll`: `5837bc26a73cfb46ffd466cf889f03ce2f6a48f1f3fd42ec8be22189d51cab1e`
    - `RuntimeComponent.dll`: `8fbaa74b27dc1e89abfc694e834378746f0ad37a688098c5f8f511410157c8b8`
  - **Network** [1]:
    - `8.218.65.184`: SHINYROAD C2, ports 443 and 41397
    - `8.210.84.56`: Adaptix C2 on port 6800, and a WebDAV target for capturing NTLM credentials
    - Domains:
      - `storage-data.com`
      - `promotion.storage-data.com`
      - `aomei.storage-data.com`
      - `serv.oss-cn-hongkong.aliyuncs.com`
  - **File paths** [1]:
    - `%LOCALAPPDATA%\Radmin\`, containing `BlkScrDl.dll`, `csvc\RuntimeComponent.dll`, `config.zip` and `metadata.dat`
    - `%LOCALAPPDATA%\Nitro Pro\`, containing `Eztwain4.dll` and `NitroPromotion.exe`
    - AOMEI's own `html\` and `Tmphtml\` folders
  - **Persistence:** scheduled tasks `RadminComponentRuntime` (runs every 3 hours) and `NitroRuntime` [1].
  - **Detection rules** [1][2]:
    - YARA rules are in the Detections section of GTIG's report [1].
    - METAL provides two Sigma rules [2].
    - The full IOC set is in a VirusTotal GTI collection, available to registered users [1].
  - **GTIG's detection advice:** don't dismiss the signed `FamItrfc.exe` just because it's signed. Alert on unsigned DLLs and on runs with `--runtimechk` [1].

- **Priority for practitioners:**
  1. **Hunt for compromise first,** covering Apr–Jul 2026 and using the IOCs above.
  2. **Then patch now:** move to 8.5.1, and uninstall Backupper or disable `amwrtdrv.sys` until a fix is confirmed.
  3. **After confirmed compromise:** reset affected passwords after cleaning and rebuilding, following [CISA's general recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide). This is general incident-response practice, not an AOMEI instruction to rotate credentials on every installation.
  4. **Notify and monitor:** AOMEI says it will notify affected users once it has assessed them [3].

- **Sources:**
  1. [primary] Google Threat Intelligence Group and Mandiant (Tyler McLellan), "Investigating Ephemeral Supply Chain Tampering," Oct 15, 2026. https://cloud.google.com/blog/topics/threat-intelligence/investigating-ephemeral-supply-chain-tampering
  2. [primary] ManageEngine Threat Analysis Lab (METAL), "AOMEI Backupper supply chain compromise," Oct 16, 2026. https://www.manageengine.com/threat-analysis-lab/aomei-backupper-supply-chain-compromise.html
  3. [primary] AOMEI Technology, incident page "Investigating ephemeral tampering," updated Oct 19, 2026. https://www.aomeitech.com/company/investigating-ephemeral-tampering.html
  4. [primary] AOMEI Backupper changelog, entries 8.5.1 (Oct 19, 2026) and 8.5.0 (Oct 9, 2026). https://www.aomeitech.com/ab/changelog.html
  5. [primary] AOMEI download page, "Download Freeware v8.5.1," undated. https://www.aomeitech.com/download.html
  6. [primary] CERT/CC VU#687587, public 2026-09-10, updated 2026-10-12. https://kb.cert.org/vuls/id/687587
  7. [primary] NVD record CVE-2026-12780, published 2026-06-21, modified 2026-10-13 (CNA: VulDB). https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-12780
  8. [primary] NVD record CVE-2026-12778, published 2026-06-21, modified 2026-06-22 (CNA: VulDB). https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-12778
  9. [secondary] The Record (Recorded Future News), Oct 20, 2026. https://therecord.media/aomei-yet-to-notify-customers-hijack-software

- **Unknowns:**
  - **How the attackers got into AOMEI's servers.** GTIG, METAL and AOMEI don't say [1][2][3].
  - **When it started.** GTIG says "April," but the earliest confirmed window is May 28 [1][3].
  - **Versions before 8.3.0.** Their exposure hasn't been tested, and no source names which versions the tampering affected [1][2][3].
  - **What 8.5.x fixes.** It isn't stated whether 8.5.x removes infections or fixes `amwrtdrv.sys`. The 8.5.0 note cites `ambakdrv.sys`, and how that driver relates to `amwrtdrv.sys` is unknown [4][6].
  - **No further activity.** AOMEI says GTIG saw no further activity after remediation. That's AOMEI's account of what GTIG said, and it isn't verified [3].
  - **AnyViewer.** Whether it was targeted is disputed and unresolved [1][3][9].
  - **Government advisories.** None found from CISA, CERT-FR, NCSC, CCCS or CERT-EU. No AOMEI forum post found either.
  - **Pages not read:**
    - BleepingComputer and The Hacker News returned HTTP 403.
    - NVD's HTML pages didn't render, so the CVE data comes from the NVD JSON API.
    - CERT/CC's vendor table reads "Unknown" in the fetched copy [6].
  - **Unchecked claims:**
    - That Malwarebytes detects the malware is AOMEI's statement; the Malwarebytes page wasn't read [3].
    - The YARA and Sigma rule text wasn't read directly.
