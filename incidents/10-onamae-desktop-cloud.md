# #10 — Onamae.com Desktop Cloud (GMO): unauthorized programs on customer servers

> **Thread item:** "10. Onamae: malware planted on up to 26,739 customer servers in Japan"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** GMO Internet (Onamae.com)

**Additional details:** Service: お名前.com Desktop Cloud, an FX-trading VPS. All plans are stopped, with no restart date. The entry vector and malware family haven't been disclosed. Support: 03-5456-2560.

- **What happened:**
  - **Service:** お名前.com デスクトップクラウド (Desktop Cloud). The press describes it as a VPS for automated FX trading [4][5]. Nikkei's "server rental" wording [7] is not the rental-server product from GMO's June notice [2].
  - **2026-10-20:** GMO confirmed that a third party had installed 不正なプログラム ("unauthorized programs") on some customer servers [1][4].
  - **2026-10-21:** the notice was posted. Servers on all plans were shut down one after another from 04:00, with no restart date [1][4].
  - **Not stated:** how the attacker got in, and the name or type of the malware [1][4][8].

- **Identifiers:**
  - **The notice:** onamae.com article 11584, titled 【重要】...お詫びとお知らせ（2026年10月21日 4:00時点）. It has no separate notice number [1].
  - **No source names** a CVE, malware family or entry vulnerability for this incident.
  - **Two items that look related but aren't linked to it by any source:**
    - CVE-2026-49975 (HTTP/2 denial of service). It appears in GMO's June rental-server notice [2] and a Broadcom advisory (DoS, no data access) [3].
    - JPCERT-AT-2026-0030, a general unauthorized-access alert reported as dated 2026-10-08 [9].

- **Who's affected / exposure:**
  - **Desktop Cloud customers on all plans.** Servers are stopped, with no restart date [1].
  - **People who stored or used IDs and passwords on those servers,** and anyone who reused those passwords elsewhere [1].
  - **What GMO says it hasn't found:** as of 04:00 on 10-21, no leak of the personal data customers entrusted to it and no misuse. It also says it holds no card data [1].
  - **No source names** any other お名前.com service as affected.

- **Fix / patch / mitigation (official):**
  - Promptly change any IDs and passwords stored on the server or used through it [1].
  - Change the same passwords on other services [1].
  - Watch for phishing. GMO says it won't ask for passwords or card details by email or phone [1].
  - **Contact:** https://help.onamae.com/contact/ or 03-5456-2560 (weekdays 10:00–18:00) [1].
  - **Not in GMO's notice:** reinstalling, scanning for malware, rotating SSH keys or reviewing logs [1].
  - **Patch:** none, because no vulnerability has been named [1].
  - **The HTTP/2 change is a separate matter** affecting the rental-server product: GMO disabled HTTP/2 until a permanent fix [2]. Broadcom lists no fixed version [3].

- **IOCs / detection:** none published. The notice gives no names, hashes, domains, IPs or file names [1]. CyberPress also reports no IOCs [8].

- **Priority for practitioners:**
  - **Rotate secrets** now if you're a Desktop Cloud customer who stored or used credentials on the server [1].
  - **Notify & monitor** for phishing [1].
  - **Not "Patch now"** (no vulnerability has been named), and **not "Hunt for compromise"** (no IOCs or technical guidance) [1][8].
  - **Everyone else:** awareness only [1].

- **Sources:**
  1. [primary] GMOインターネット / お名前.com, notice 11584, posted 2026-10-21 (as of 04:00) — https://www.onamae.com/news/article/11584
  2. [primary] GMO / お名前.com notice on CVE-2026-49975 (rental-server HTTP/2), posted 2026-06-04 — https://www.onamae.com/news/article/11434/
  3. [primary] Broadcom Knowledge, CVE-2026-49975 advisory for VCF products (no date shown) — https://knowledge.broadcom.com/external/article/445446/cve202649975-http2-denialofservicedos-vu.html
  4. [secondary] ITmedia NEWS, 2026-10-21 07:55 — https://www.itmedia.co.jp/news/article/2610/21/2000002442/
  5. [secondary] INTERNET Watch, 2026-10-21 10:00 — https://internet.watch.impress.co.jp/docs/news/2149829.html
  6. [secondary] Asahi Shimbun via Yahoo! News, 2026-10-21 12:32 — https://news.yahoo.co.jp/articles/d4555756d408b6529cd22b4b4caf42b1b6bc7a4f
  7. [secondary] Nikkei, 2026-10-21 15:34 — https://www.nikkei.com/article/DGXZQOUC2155P0R21C26A0000000/
  8. [secondary] CyberPress, 2026-10-22 — https://cyberpress.org/gmo-shuts-malware-hit-cloud/
  9. [secondary] ScanNetSecurity, 2026-10-13, on the JPCERT/CC alert (search snippet only, not opened) — https://scan.netsecurity.ne.jp/article/2026/10/13/56428.html
  10. [secondary] X post by @yousukezan (search snippet only, not opened) — https://x.com/yousukezan/status/2113037612659478928

- **Unknowns:**
  - **Not stated anywhere the agent could open:** how the attacker got in, the malware's name or family, who the attacker is, and when the intrusion started.
  - **Also not stated:** how many of the 26,739 servers were infected, and what data was viewed.
  - **Restart:** no date set. Search found no later GMO update, and the notice shows no revision history.
  - **Single-source claims the agent didn't open:**
    - PrivacyNeedle says credentials, config files and automated-trading data were exposed.
    - An Offseq AI summary says backend systems were hit.
    - Neither claim appears in GMO's notice.
  - **Not opened:**
    - BleepingComputer (HTTP 403): https://www.bleepingcomputer.com/news/security/japans-onamae-desktop-cloud-hacked-up-to-27-000-servers-affected/
    - The JPCERT/CC alert itself.
    - The NVD record for CVE-2026-49975 (the page didn't render).
  - **Government:** search found no statement from the PPC, police, MIC or IPA. Government sites weren't checked directly.
  - **Operator:** the notice's own operator line wasn't quoted. The press attributes the notice to GMO Internet Group [4][7].
  - **Cut short:** the agent hit the session rate limit partway through, so its final checks of JPCERT/CC, NVD and the operator line weren't completed.
