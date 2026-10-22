# #26: Siemens Software Center DLL side-loading, exploited by the Romulus ClickFix campaign (CVE-2026-110936)

> **Thread item:** "26. Siemens: a software hole being used to spread malware"
> **Tier:** Also serious · **Researched:** 2026-10-22

**Confirmed by:** Siemens ProductCERT, CISA KEV

**Additional details:** Romulus ClickFix campaign: a trojanized `AllMyBasic.msi` side-loads DLLs into the signed `SiemensSoftwareCenter.exe`. The payload is reportedly LegionLoader. Found by Huntress. [Forescout on Romulus](https://www.forescout.com/blog/romulus-analysis-of-a-new-multi-payload-clickfix-delivery-platform/).

- **What happened:**
  - **Oct 15, 2026:** Siemens published SSA-580366 for CVE-2026-110936 in Siemens Software Center [1][5].
    - The flaw is an uncontrolled DLL search path (CWE-427).
    - An "authenticated local attacker" can plant a DLL that then runs with the app's privileges.
    - Fixed in V4.0.9.8.
  - **Oct 17 and Oct 19:** Siemens updated the advisory twice [1][2].
    - V1.1 (Oct 17) added remediation steps.
    - V1.2 (Oct 19) added the exploitation notice. It names the "Romulus multi-platform ClickFix campaign" and says "No Siemens system, product or update channel was breached to our knowledge."
  - **Oct 20–21:** CISA added the CVE to KEV on Oct 20 [3][4]. The CVE record and NVD were updated on Oct 21, and NVD's status is "Analyzed" [5][6].
  - **Malware family:** Siemens doesn't name one [2]. "LegionLoader" and a remote-access trojan (RAT) appear only in press coverage [7][8][9].

- **Identifiers:**
  - **CVE:** CVE-2026-110936. Assigned by Siemens as the CVE numbering authority (CNA). Published 2026-10-15; updated 2026-10-21 [5].
  - **Severity** (scored by Siemens; NVD mirrors these) [1][5][6]:
    - CVSS v4.0: 8.4 High, `CVSS:4.0/AV:L/AC:L/AT:N/PR:H/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`
    - CVSS v3.1: 6.7 Medium, `CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H`
  - **Scoring flag** (the agent's own inference):
    - Both vectors set PR:H, meaning high privileges are required.
    - But the advisory only says "authenticated local attacker," and the file paths in the notice are inside user profiles [1][2].
    - So the score may understate an attack that needs only an ordinary user account.
  - **Advisory:** SSA-580366 [1].
    - Versions: V1.0 (2026-10-15), V1.1 (2026-10-17), V1.2 (2026-10-19, latest).
    - Credited to Jose Oregon (Huntress Labs).
  - **Affected versions:** "All versions < V4.0.9.8" [1][5]. NVD's configuration says versionEndExcluding 4.0.9.8 [6].
    - The notice names 3.5.8.7 as the latest version available at the time [2].
  - **Fixed version:** V4.0.9.8 or later [1].
  - **KEV entry** [3][4][6]:
    - Listed under vendor Siemens, product Software Center.
    - Added 2026-10-20; due 2026-11-03.
    - Ransomware use: Unknown.
    - The required action cites BOD 26-04 [3][6].
  - **CISA's SSVC assessment** in the CVE record: exploitation active, not automatable, technical impact total [5].
  - **CISA ICS advisory (ICSA):** none found in the agent's first search; not re-checked.

- **Who's affected / exposure:**
  - Anyone running Software Center below V4.0.9.8 [1][5].
  - Anyone who fell for the ClickFix lure or installed AllMyBasic.msi [2].
  - Whether BOD 26-04 applies beyond US federal agencies wasn't verified [3].

- **Fix / patch / mitigation:**
  - **Update to V4.0.9.8 or later.** Download page: https://www.sw.siemens.com/en-US/siemens-software-center/ [1]
    - There's no separate workaround for this CVE [1].
  - **Auto-update:**
    - The advisory says "All existing versions of SSC will be auto updated on next startup" [1].
    - The notice says "Starting the application installs the update automatically" [2].
  - **Other advice from the notice** [2]:
    - Get software only through official Siemens channels.
    - Never paste commands from a web page into Win+R, Run or PowerShell.
    - If you suspect compromise:
      - isolate the host;
      - stop the process;
      - remove the autostart entry and scheduled task;
      - rotate credentials.

- **IOCs / detection** (from Siemens' Oct 19 notice [2]):
  - **Network:**
    - `96.62.218[.]59`: active; hosts payloads and acts as command-and-control (C2).
    - `wizardexpensive[.]com`: active; payload hosting and C2.
    - `2.27.248[.]127`: inactive; distributed AllMyBasic.msi. Hosts that downloaded from it may be compromised.
  - **SHA-256 hashes:**
    - AllMyBasic.msi: `f4d7c5321bb0d1bda439304a753bcf9b467b98ca53c7e9493b9c2c3451092e4a`
    - archive.dll: `3fdcc7d7d049a89711fb31fb236940a1c5a09d899143ffd20c3c41fb1f2cf491`
  - **File paths:**
    - `AppData\Local\Programs\"SM Software Provisioning Service"` (created by the malware)
    - `activate.bak` or `statinfosta.DB` next to SiemensSoftwareCenter.exe
    - `AppData\Local\FTSuite\ftc.uml`
  - **Behavior:**
    - SiemensSoftwareCenter.exe running from `AppData\Local\Programs`, launched by msiexec.
    - A Software Center autostart entry or scheduled task on a host where it was never installed.
  - **Not published:** registry keys, MD5 hashes, malicious URLs.
  - **Siemens' guidance:** "Detect on folder and behaviour, not on the Siemens file fingerprint."

- **Priority for practitioners:**
  - **Patch now:** any Software Center below V4.0.9.8. Confirm the version after launching it.
  - **Hunt for compromise:** using the network IOCs, hashes, file paths and the msiexec pattern.
  - **Rotate secrets:** only if the hunt finds something.

- **Sources:**
  1. [primary] Siemens ProductCERT, SSA-580366 "DLL Sideloading Vulnerability in Siemens Software Center," V1.2, published 2026-10-15, updated 2026-10-19: https://productcert.siemens.com/productcert/html/ssa-580366.html. Same text at https://cert-portal.siemens.com/productcert/html/ssa-580366.html (the fetch showed no redirect).
  2. [primary] Siemens ProductCERT news, "Active exploitation of CVE-2026-110936 in Siemens Software Center," 2026-10-19: https://productcert.siemens.com/news/2026/10/19/active-exploitation-of-cve-2026-110936-in-siemens-software-center/
  3. [primary] CISA KEV catalog JSON, catalogVersion 2026.10.21, released 2026-10-21: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  4. [primary] CISA KEV catalog page filtered to CVE-2026-110936: https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-110936
  5. [primary] CVE record via the CVE Services API, assigner siemens, updated 2026-10-21: https://cveawg.mitre.org/api/cve/CVE-2026-110936 (the cve.org HTML page rendered no content: https://www.cve.org/CVERecord?id=CVE-2026-110936)
  6. [primary] NVD API 2.0 record, status Analyzed, last modified 2026-10-21: https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-110936 (the nvd.nist.gov HTML page didn't load)
  7. [secondary] Help Net Security, 20 Oct 2026: https://www.helpnetsecurity.com/2026/10/20/exploitation-siemens-software-center-vulnerability-cve-2026-110936/
  8. [secondary] SecurityWeek, date not seen: https://www.securityweek.com/siemens-software-center-vulnerability-exploited-in-clickfix-malware-attacks/
  9. [secondary] The Hacker News, Oct 2026 (search summary only; not opened): https://thehackernews.com/2026/10/clickfix-attackers-exploit-siemens.html

- **Unknowns:**
  - **How the pages were read:**
    - Primary pages came through WebFetch summaries, not raw bytes.
    - Short quotes and IOC strings matched across two separate passes.
    - The hashes weren't checked against a raw download or in a sandbox.
  - **KEV:**
    - The KEV JSON is 1.8 MB. The entry is sixth in a newest-first list and was read within the first 100k characters.
    - The KEV web page matches the feed, but shows a stray "No result" label next to the Siemens filter.
  - **Malware family:** LegionLoader and the RAT claim come only from the press. Forescout's Romulus analysis, linked by Help Net Security, wasn't opened.
  - **Not verified:**
    - The PR:H point is the agent's inference, not a Siemens statement.
    - Whether BOD 26-04 applies to you.
    - Whether a CISA ICS advisory exists (not re-checked).
    - Any IOC or detection rule (none was tested).
