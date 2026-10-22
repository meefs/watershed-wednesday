# #14: Plex Media Server bug chain exploited in the wild ("plex2shell"; four CVEs in CISA's KEV catalog)

> **Thread item:** "14. Plex: hackers breaking into home media servers"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Plex, CISA KEV

**Additional details:** "plex2shell" exploit chain. The PoC went public Oct 16 and exploitation began Oct 17, deploying cryptominers and proxies. Shadowserver counts ~49,000 vulnerable servers exposed. Plex's notice title says "v1.43.2 and earlier," but the fix cutoff is 1.43.3.10861.

- **What happened:**
  - **It's a chain of bugs, not a password attack** [8][5]:
    1. An unauthenticated server-side request forgery (SSRF) on `/player/timeline` reaches a plugin API that listens only on loopback.
    2. That API hands over the owner's admin token.
    3. With the token, the attacker sets a transcoder option that plants a `.so` file in the Codecs folder.
    4. Plex loads the file without checking any signature, which gives the attacker code execution in the Plex Media Server process.
  - **Timeline:**
    - Jul 27, 2026: reported to Plex. Plex acknowledged it on Aug 4 [8].
    - Aug 4: fixed build 1.43.3.10861 released to everyone [2].
    - Sep 1: Plex notice posted [1].
    - Sep 23: CVEs published [5][4].
    - Oct 16: public write-up and proof-of-concept exploit [1][8].
    - Oct 17: first exploitation seen on a honeypot [9].
    - Oct 19: Plex updated its notice to say the flaws are under active exploitation [1].
    - Oct 20: added to CISA's KEV catalog [3].
  - **What attackers do once in:** run cryptominers and proxy software on the hijacked machines [1][9].

- **Identifiers:**
  - **Versions:**
    - Affected: every Plex Media Server build below 1.43.3.10861 [1][4][6].
    - Fixed: 1.43.3.10861 (Aug 4, 2026) [2].
    - Newest Plex release post found: 1.43.3.10896 (Aug 18, 2026) [2].
    - Build 1.43.3.10828 (Jul 14, 2026) is still affected [2][5].
    - Plex names Plex Desktop 1.115.0 as the desktop fix, but doesn't map any CVEs to it [1].
  - **CVE-2026-96652:** SSRF via `/player/timeline` [3][5].
    - CVSS 3.1 4.3 / CVSS 4.0 5.3 (Medium); CWE-918.
    - In KEV since Oct 20; due Nov 3.
  - **CVE-2026-96654:** URL injection via `searchOne` [3][5].
    - 6.5 / 6.9 (Medium); CWE-84.
    - In KEV since Oct 20; due Oct 23.
  - **CVE-2026-96655:** authenticated SSRF via `/video/:/transcode/universal` [3][5].
    - 4.3 / 5.3 (Medium); CWE-918.
    - In KEV since Oct 20; due Nov 3.
  - **CVE-2026-96656:** an admin can write a file that Plex then executes when it loads [3][5].
    - 7.2 (High) / 8.6 (High); CWE-73.
    - In KEV since Oct 20; due Oct 23.
  - **CVE-2026-96651:** path traversal via `/system/agents/media/get` [3][6].
    - 6.5 / 7.1 (High); CWE-22.
    - Not in KEV. CISA's SSVC assessment lists exploitation as "none."
  - **About the scores:** they come from CISA acting as the coordinating CVE authority (cisa-cg), and NVD lists them as "Secondary" [5][6]. KEV marks ransomware use as "Unknown" for all four KEV entries [3].

- **Who's affected / exposure:**
  - **Anyone running a build below 1.43.3.10861,** on any platform. NAS, Docker and app-store builds may lag behind [1][2].
  - **Main exposure:** servers reachable from the internet, meaning remote access is on or port 32400 is forwarded [1].
  - **Local network:** CVE-2026-96651 can also be triggered by a client on the same LAN that sends an X-Forwarded-For header [6].
  - **How many servers:**
    - About 49,000 "vulnerable-plex" hosts were still exposed as of roughly Oct 17, per Shadowserver data cited by Gizmodo [10].
    - An earlier figure of 36,000+ from early September comes from a search snippet only [11].
    - Censys counts 323,583 hosts that look like Plex Media Server. That's every Plex server it can see, not just vulnerable ones [7].
    - No source counts compromised hosts.

- **Fix / patch / mitigation:**
  1. **Update** to 1.43.3.10861 or newer; the newest found is 1.43.3.10896. Confirm the version under Settings → General in Plex Web [1][2].
  2. **If your server was older and reachable from the internet,** assume it may be compromised [1].
  3. **If you find indicators or can't rule out compromise** [1]:
     - Rebuild from a clean install.
     - Empty the Codecs folder.
     - Check Preferences.xml for transcoder options you never set.
  4. **Sign out every device and reset your Plex password** [1]. Plex's 2022 and 2025 notices gave the same sign-out advice [13][12].
  5. **Turn off remote access** when you don't need it, and don't forward port 32400 [1].
  6. **Rotate anything the Plex service account could reach,** such as mounted shares and credentials on the same host [1].
  7. **Patching alone isn't enough** if you were compromised. It doesn't remove an implant or revoke an admin token that was already disclosed [7].
  8. **Turn on 2FA.** The Oct 2026 notice doesn't mention it [1], but Plex's 2025 notice recommends it [12].

- **IOCs / detection:**
  - **From Plex** [1]:
    - Processes spawned by the server: `myawesomeproxy`, `mylovelyminer`, `x12345`.
    - Unknown `.so` or `.dll` files in the Codecs folder.
    - Traffic to `proxystream.st`.
    - High CPU use when nothing is playing.
  - **In the config** [8]: `TranscoderH264Options` abused with `dump-yuv`, visible in Preferences.xml.
  - **From a honeypot** (one operator, seen from Oct 17) [9]:
    - Exploit path: `/player/timeline/subscribe`
    - User-Agent: `Python-urllib/3.10`
    - Exploit source IPs: 45[.]194[.]92[.]222, 91[.]92[.]40[.]202, 176[.]65[.]139[.]228
    - File host: 217[.]60[.]194[.]116
    - Files dropped: `docker` and `x`
  - **Hashes:** 64-hex-character hashes; the source doesn't say which algorithm. A summarizing tool transcribed them, so verify before blocking.
    - `docker`: 5712ef510481f15fe8b18fdd10b73026d57cb3d9d151878a692358b99a464441
    - `x`, packed: 68938fb428f2bcfef4ede62f7b29cd0f15f37ed59e94462c099f2ca64e36baa7
    - `x`, unpacked: b20f39fc00d242e706b6c30367ad811c676e0575050a4ec2f30104b696944b49
    - `myawesomeproxy`: e546b10aee5edc754da4f9b0baace00392257121911f630145078eafad1e6bd9
    - Labelled "xmrig": 2d3c618b21a7e2f8bcd735da188e44a7609ff3f204832dd0781cd09e4388c9db

- **Priority for practitioners:**
  - **Patch now:** every build below 1.43.3.10861 [3].
    - Two KEV due dates are Oct 23, which is tomorrow: CVE-2026-96654 and CVE-2026-96656.
    - The other two are Nov 3: CVE-2026-96652 and CVE-2026-96655.
    - The KEV page doesn't say who the due dates apply to.
  - **Hunt for compromise:** on older builds that were reachable from the internet, using the indicators above [1].
  - **Rotate secrets:** if you can't rule out compromise. That includes the Plex password and any credentials the host could reach [1].

- **Sources:**
  1. [primary] Plex forum, "Important Security Update for Plex Media Server v1.43.2 and earlier," posted Sep 1, 2026, updated Oct 19, 2026: https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319
  2. [primary] Plex forum release posts: 1.43.3.10828 (Jul 14, 2026) https://forums.plex.tv/t/plex-media-server/30447/711 ; 1.43.3.10861 (Aug 4, 2026) https://forums.plex.tv/t/plex-media-server/30447/713 ; 1.43.3.10896 (Aug 18, 2026) https://forums.plex.tv/t/plex-media-server/30447/715
  3. [primary] CISA, KEV catalog feed v2026.10.21 (released Oct 21, 2026): https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json ; KEV page: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  4. [primary] CISA, CSAF advisory VA-26-266-01 (initial release Sep 23, 2026): https://raw.githubusercontent.com/cisagov/CSAF/develop/csaf_files/IT/white/2026/va-26-266-01.json
  5. [primary] NIST NVD API, published Sep 23, 2026 (IDs 96651, 96652, 96654, 96655, 96656; swap the ID in the URL): https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-96652
  6. [primary] CVE services record, CNA cisa-cg, Sep 23, 2026: https://cveawg.mitre.org/api/cve/CVE-2026-96651 and https://cveawg.mitre.org/api/cve/CVE-2026-96652
  7. [secondary, threat-intel] Censys advisory, dated Oct 20, 2026: https://censys.com/advisory/cve-2026-96652-cve-2026-96654-cve-2026-96655-cve-2026-96656/
  8. [secondary, researcher] zmain.info, "plex2shell" by "code-zm," Oct 16, 2026: https://zmain.info/blog/plex2shell
  9. [secondary, honeypot] BoredHackerBlog, Oct 17, 2026: https://www.boredhackerblog.info/2026/10/plex-vulnerabilities-being-exploited-in.html
  10. [secondary, press] Gizmodo, Oct 19, 2026 (cites Shadowserver): https://gizmodo.com/your-plex-server-could-be-mining-crypto-for-hackers-if-you-havent-updated-it-2000827461
  11. [secondary, press; search snippet only] BleepingComputer, early Sep 2026: https://www.bleepingcomputer.com/news/security/over-36-000-plex-servers-unpatched-against-recently-disclosed-flaws/
  12. [primary, 2025 incident] Plex forum, "Important Notice of Security Incident," Sep 8, 2025: https://forums.plex.tv/t/important-notice-of-security-incident/930523
  13. [primary, 2022 incident] Plex forum, breach announcement, Aug 2022: https://forums.plex.tv/t/breach-annoucment/806518/
  14. [primary, 2020 CVE] Plex forum, "Security: Regarding CVE-2020-5741," May 7, 2020: https://forums.plex.tv/t/security-regarding-cve-2020-5741/586819

- **Unknowns:**
  - **Builds:** no Plex build newer than 1.43.3.10896 (Aug 18) was found, and the release post doesn't name one.
  - **Exposure counts:**
    - Shadowserver's dashboard wasn't opened.
    - Gizmodo gives no exact date for its count; about Oct 17 is inferred.
    - The 36,000 figure comes from a snippet only.
  - **Possible NVD typo:** NVD's version-match data for CVE-2026-96651 reads versionEndExcluding "1.43.0.10861." That's likely a typo, since the CVE record and its description say 1.43.3.10861 [5][6]. Not confirmed with NVD.
  - **CVE-2026-96655:** Plex's description and NVD/KEV's still disagree. This report follows NVD/KEV.
  - **KEV due dates:** the KEV page doesn't say who they apply to, and whether they bind only federal agencies wasn't verified. A press headline from The Hacker News (not opened) frames it as an order to federal agencies.
  - **Plex's own systems:** no source says whether Plex's accounts or systems were breached in Oct 2026.
  - **Honeypot data:**
    - The hashes and IPs came through a summarizing tool.
    - Whether XMRig was actually running is unverified; one hash is only labelled "xmrig" [9].
  - **Exploit chain:** the steps come from the zmain write-up and the honeypot post. zmain doesn't say which step matches which CVE.
  - **Dates in older notices:**
    - The 2022 notice's forum timestamp says Aug 25, but its title says 24 Aug.
    - The 2025 notice gives no dates for when the access happened.
  - **Not opened:** BleepingComputer and The Hacker News, which returned HTTP 403.
