# #1 — PHP2Shell: two unauthenticated RCE flaws in PHP core (CVE-2026-109618 / -109619)

> **Thread item:** "1. PHP2Shell: a hole in the software behind ~70% of websites. Governments took sites offline."
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** PHP project, CISA, CERT-EU, UK NCSC

**Additional details:** Named "PHP2Shell" by [Wiz](https://php2shell.com). [AWS](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/) saw exploitation attempts from Oct 17, before disclosure. Several NCSCs advise taking unpatchable PHP offline. Fake PoCs are circulating on GitHub ([JFrog](https://research.jfrog.com/post/php2shell-all-you-need-to-know-about-cve-2026-109618-and-cve-2026-109619/)). [NCSC-NL tooling](https://github.com/NCSC-NL/php2shell).

- **What happened:**
  - **20 Oct 2026:** details of the two RCE bugs leaked while they were still under embargo. PHP then scheduled its security release for 21 Oct, 14:00 UTC [1][30].
  - **21 Oct 2026, release and alerts:**
    - PHP shipped 8.5.12, 8.4.27, 8.3.36 and 8.2.35. The GHSAs were published at 13:34 UTC and the NVD records at 14:17 UTC [1][2][4][5][6].
    - CISA, CERT-EU, the UK NCSC, CERT-FR and the Canadian Cyber Centre all issued alerts that day [7][9][10][14][15].
    - NCSC-NL took its own site offline. It says other organisations, "including government agencies," switched their sites off as a precaution [12] (translated from Dutch).
  - **17–22 Oct 2026, attack activity:**
    - Amazon reports a probe against its MadPot honeypots dated 17 Oct, then more attempts from 21 Oct [16].
    - Cloudflare says it saw attack traffic against its customers (blog post dated 21 Oct) [17].
    - On 22 Oct, NCSC NZ said it is "aware of reports of active exploitation" [11].

- **Identifiers:**
  - **CVE-2026-109618:** "RCE via OOM corruption," GHSA-w8hw-w9fx-j79w, CWE-416 [4][6][25].
    - CVSS v4.0 9.2 (AV:N/AC:H/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N), scored by security@php.net.
    - CVSS v3.1 9.8, scored by NVD.
    - Red Hat rates it CVSS v3.1 8.1 and "Important."
  - **CVE-2026-109619:** "RCE via stale global state," GHSA-6wmf-4rv5-p3rp. Same scores [5][6].
  - **Affected versions:**
    - php-src below 8.2.35, 8.3.36, 8.4.27 and 8.5.12; those releases fix it [4][5].
    - Cloudflare and Google say PHP 5.4 through 8.5.x are affected [17][18].
    - CERT-FR lists all of 5.x through 8.1.x [14].
  - **Debian** [23]:
    - DLA-4848-1: bookworm php8.2 8.2.35-1~deb12u1.
    - DSA-6574-1: trixie php8.4 8.4.27-1~deb13u1.
    - sid php8.2: not yet fixed.
  - **Ubuntu** [24]:
    - noble php8.3 8.3.6-0ubuntu0.24.04.13.
    - jammy php8.1 8.1.2-1ubuntu2.28.
    - ESM builds for php5, 7.0, 7.2 and 7.4.
  - **CISA KEV:** not listed. Catalog 2026.10.21, released 21 Oct 14:04 UTC, contains neither CVE [8].
  - **php-8.5.12.tar.bz2 SHA256:** `ffb60edc437ced63b5137e4984db379a8111c50049c711510d8b958277efc1a8` [3].

- **Who's affected / exposure:**
  - **Any PHP that serves web requests:** PHP-FPM, mod_php, php-cgi, FrankenPHP and LiteSpeed. PHP rates mod_php as the highest risk [1][9].
  - **Bundled PHP:** PHP inside appliances, third-party products and containers is also in scope [9][10][13][15].
  - **Managed hosting:** if a host runs PHP for you, ask it to patch [17]. Remi's repository had no fix on release day [9].
  - **Old branches:** PHP 8.1 and older get no upstream release, so move to 8.2 or later [1][14][18]. PHP 8.2's security support ends 31 Dec 2026 [1].
  - **Scale:** Unit 42 claims more than 22.6M "potentially vulnerable" instances from its telemetry, without describing its method [22]. Red Hat says reliable exploitation is hard [25].

- **Fix / patch / mitigation:**
  1. **Upgrade** every server, image and deploy pipeline to 8.5.12, 8.4.27, 8.3.36 or 8.2.35. Then restart web servers, FPM and workers [1][2][19]. Updating application code or plugins doesn't fix it [17].
  2. **Distro and LTS users:** install your vendor's packages [1][23][24].
  3. **PHP 8.1 and older:** upgrade to a supported branch, or use a vendor backport [1][14].
  4. **If you can't patch now:**
     - CISA says to take PHP systems offline until they're patched, if you can't update or still run 8.1 or older [7].
     - The UK NCSC says to consider taking the system offline if you can't deploy mitigations [10].
     - CERT-EU, CERT-FR and CCCS say to isolate the systems instead [9][14][15].
  5. **Settings that reduce the risk.** These are partial; PHP says they "do not make an installation safe" [1].
     - Set `memory_limit=-1` administratively (`php_admin_value`). Never use RLIMIT_AS or RLIMIT_DATA [4].
     - Cap `post_max_size` at 8M, or 32M if you need uploads [9].
     - Set `session.upload_progress.enabled=0` in php.ini or the FPM pool config, not through `ini_set` or `.user.ini`. Then restart workers [9].
     - On 8.5, set `fatal_error_backtraces=0` [9].
  6. **Edge protection:**
     - Cloudflare enabled default protection at 03:02 UTC on 21 Oct [17].
     - AWS suggests blocking multipart uploads on systems you can't patch right away [16]. Such blocks can break uploads and checkout forms [27].
  7. **Don't run GitHub PoCs without reviewing them.** JFrog found fakes, including one that changes your desktop background (not malware) [26].

- **IOCs / detection:**
  - **AWS MadPot IPs.** Investigate these rather than block them; AWS says they aren't used only for this activity [16].
    - 17 Oct: 103.216.220.92
    - 21 Oct: 31.223.184.166, 37.19.200.5, 134.209.159.64, 103.114.163.188, 95.217.98.37
  - **What to hunt for:**
    - POST requests carrying the `PHP_SESSION_UPLOAD_PROGRESS` string in form uploads, going back to 17 Oct [16]. Every known trigger uses multipart/form-data [27].
    - PHP worker processes that launch shells or download tools [7].
    - Web shells, unusual scheduled jobs and new accounts tied to PHP [20].
    - Leaked memory may come back in a PHPSESSID cookie [27].
  - **Vendor detection rules:**
    - Cloudflare: Managed Free Ruleset `77454fe2d30c4220b5701f6fdfb893ba` and Managed Ruleset `efb7b8c949ac4650a09736fc376e9aee` [17].
    - Palo Alto: Threat ID 543004 [22].
    - Google: cites 23 Mandiant detections and GLOBAL.26.015 [18].
  - **No YARA, Sigma or Snort rules** appear in the primary pages checked [13][14][21][22][26].

- **Priority for practitioners:**
  - **Patch now,** then **hunt for compromise** back to 17 Oct.
  - **After confirmed compromise:** reset affected passwords after cleaning and rebuilding the environment, following [CISA's general recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide). This applies general incident-response practice; it is not a PHP-specific vendor instruction.
  - **Keep monitoring** vendors that bundle PHP [10][15].

- **Sources:**
  1. [primary] PHP.net news archive, 20–21 Oct 2026. https://www.php.net/archive/2026.php
  2. [primary] PHP.net, PHP 8.5.12 release, 21 Oct 2026. https://www.php.net/releases/8_5_12.php
  3. [primary] php.announce, 21 Oct 2026 14:10 UTC (SHA256). https://news-web.php.net/php.announce/513
  4. [primary] php-src GHSA-w8hw-w9fx-j79w (CVE-2026-109618), 21 Oct 2026. https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w
  5. [primary] php-src GHSA-6wmf-4rv5-p3rp (CVE-2026-109619), 21 Oct 2026. https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp
  6. [primary] NIST NVD API records, 21 Oct 2026. https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-109618 and https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-109619
  7. [primary] CISA alert, 21 Oct 2026. https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching
  8. [primary] CISA KEV JSON, catalog 2026.10.21 (fetched 22 Oct). https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  9. [primary] CERT-EU SA 2026-018 v1.1, 21 Oct 2026. https://cert.europa.eu/publications/security-advisories/2026-018/
  10. [primary] UK NCSC, 21 Oct 2026 (updated 22 Oct). https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php
  11. [primary] NCSC NZ, 22 Oct 2026. https://www.ncsc.govt.nz/alerts/cve-2026-109618-and-cve-2026-109619-affecting-php/
  12. [primary] NCSC-NL alert, 21 Oct 2026 (Dutch). https://www.ncsc.nl/alerts/kwetsbaarheden-php-patches-beschikbaar-update-nu
  13. [primary] NCSC-NL php2shell repo, 21 Oct 2026. https://github.com/NCSC-NL/php2shell
  14. [primary] CERT-FR CERTFR-2026-ALE-014, 21 Oct 2026 (French). https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-014/
  15. [primary] Canadian Centre for Cyber Security AL26-026, 21 Oct 2026. https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619
  16. [primary, company] Amazon Threat Intelligence, AWS Security Blog, 21 Oct 2026. https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
  17. [primary, company] Cloudflare blog, 21 Oct 2026. https://blog.cloudflare.com/php-vulnerabilities-waf-protection/
  18. [primary, company] Google Cloud blog, 21 Oct 2026. https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619
  19. [primary, researcher] Wiz Research, php2shell.com (undated). https://php2shell.com
  20. [primary, researcher] watchTowr, 21 Oct 2026. https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/
  21. [primary, researcher] Calif, php2shell writeup (undated). https://calif.io/php2shell/
  22. [secondary, vendor claim] Palo Alto Networks Unit 42, 21 Oct 2026. https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/
  23. [primary, distro] Debian Security Tracker, CVE-2026-109618. https://security-tracker.debian.org/tracker/CVE-2026-109618
  24. [primary, distro] Ubuntu CVE page, CVE-2026-109618. https://ubuntu.com/security/CVE-2026-109618
  25. [primary, distro] Red Hat CVE page, CVE-2026-109618. https://access.redhat.com/security/cve/cve-2026-109618
  26. [primary, company research] JFrog, 21 Oct 2026. https://research.jfrog.com/post/php2shell-all-you-need-to-know-about-cve-2026-109618-and-cve-2026-109619/
  27. [secondary] Sansec, 21 Oct 2026. https://sansec.io/research/php2shell
  28. [secondary, statistics] W3Techs, 22 Oct 2026. https://w3techs.com/technologies/details/pl-php
  29. [secondary] The Record (Jonathan Greig), 21 Oct 2026. https://therecord.media/php-script-vulnerabilities-warnings
  30. [secondary] Threat Landscape, 20 Oct 2026 (updated 21 Oct). https://threatlandscape.io/blog/php-core-rce-cve-2026-109618-109619-leak-ahead-of-embargo
  31. [secondary, Dutch press, search snippet only] Parkstad Actueel, 21 Oct 2026. https://parkstadactueel.nl/2026/10/21/digid-mijnoverheid-offline-kritieke-php-lekken-websites/

- **Unknowns:**
  - **Unverified outage and pause claims:** the Finland/Valtori outage, a Kenya ICT directive, a Nintendo pause, pauses at UK councils and the NHS, outages in Austria and France, and a Canadian takedown. These appear only in press or aggregator results. The Canadian alert contains no takedown instruction [15].
  - **DigiD and MijnOverheid:** no notice from Logius or Rijksoverheid was found [31].
  - **No misuse in the Netherlands:** the claim that none had been seen there by Wednesday afternoon comes only from Dutch reporting. It isn't in NCSC-NL's text [12].
  - **Patches for older branches:** sources conflict, and the php-src commits and ChangeLog weren't checked.
    - PHP, NCSC-NL and CERT-EU say minimal source backports exist for 7.4, 8.0 and 8.1 [1][12][9].
    - Google says there are none for 8.1 or earlier [18].
    - watchTowr says there are none for 5 or 7 [20].
    - Ubuntu lists ESM fixes [24].
  - **Release time:** PHP scheduled 14:00 UTC [1], the GHSAs are dated 13:34 UTC [4], and CERT-EU says 13:30 UTC [9]. Not reconciled.
  - **CISA's "take offline" wording** came from a summary with truncated quotes. Check it word for word at [7].
  - **KEV:** only the catalog snapshot fetched on 22 Oct was checked [8].
  - **Successful compromise:** no source confirms one in the wild. Unit 42 doesn't say how it measured exposure [22].
  - **Calif:** its version scope is inconsistent (PHP >= 7.3 in one place, >= 5.4.0 in another) [21]. Its claims of RCE through specific applications weren't checked with those vendors.
  - **Third-party IOC and PoC repos** appeared in search results but weren't fetched or endorsed.
  - **Wiz's page** is undated [19].
  - **Not checked:** the NVD HTML page (it needs JavaScript, so the API was used instead), The Hacker News (returned 403), Logius, and the php-src ChangeLog.
