# #12 — NGINX: three heap/UAF flaws fixed in 1.30.6 / 1.31.7

> **Thread item:** "12. NGINX: 3 critical holes in software running ~1/3 of websites"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** nginx.org, F5 (via NVD)

**Additional details:** The same release fixes two more CVEs: CVE-2026-95101 (HTTP/3) and CVE-2026-97629 (TLS session-ticket key). It also affects F5 WAF/DoS for NGINX, Ingress Controller and Gateway Fabric. Not in KEV. [CSA SG workarounds](https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-150/).

- **What happened:**
  - **14 Oct 2026:** nginx released 1.30.6 (stable) and 1.31.7 (mainline), fixing five CVEs. The three rated critical (CVSS v4.0 9.2) are [1][2][3][5][6][7]:
    - **CVE-2026-15176:** a heap overflow when `alias` and `rewrite` are combined, in ngx_http_core.
    - **CVE-2026-93479:** a heap overflow in string expressions and regex-map captures used by `root` and logging, in both http and stream.
    - **CVE-2026-97205:** a use-after-free when AIO is combined with SSI `include virtual`.
  - **NVD scores:** NVD's records, published 14 Oct, give all three CVSS v4.0 9.2 and CVSS v3.1 8.1. The scores come from f5sirt@f5.com [5][6][7].
  - **CSA:** Singapore's Cyber Security Agency calls them "three critical vulnerabilities" (alert dated 21 Oct, updated 22 Oct) [8].
  - **Not these bugs:** none of the three involves HTTP/3, mp4 or the resolver. The HTTP/3 bug in the same release, CVE-2026-95101, is medium [1][2].

- **Identifiers:**
  - **KEV:** none of the three is in CISA's 20 Oct additions to the Known Exploited Vulnerabilities catalog [9]. The full KEV feed wasn't checked [10].
  - **CVE-2026-15176:**
    - CWE-122. nginx rates it medium; CVSS 9.2 (v4.0) / 8.1 (v3.1).
    - Affected: open source 0.1.29–1.31.6. Fixed in 1.30.6 / 1.31.7 [1][5].
    - F5 advisory: K000162416 [1][11].
  - **CVE-2026-93479:**
    - CWE-122. Medium; 9.2 / 8.1.
    - Affected: open source 1.31.2–1.31.6 and 1.30.0–1.30.5. Fixed in 1.31.7 / 1.30.6 [1][6].
    - F5 advisory: K000162607 [1][11].
    - Credited to Matt Suiche of Tolmo Inc. [2].
  - **CVE-2026-97205:**
    - CWE-416. Medium; 9.2 / 8.1.
    - Affected: open source 0.8.11–1.31.6 according to nginx [1]. NVD lists only 1.31.0–<1.31.7 and 1.30.0–<1.30.6 [7]. Fixed in 1.31.7 / 1.30.6.
    - F5 advisory: K000162608 [1][11].
    - Credited to "cyberlancer" [2].
  - **NGINX Plus:** CSA lists R33–R37 as affected [8]. NVD bounds the 37.x line at 37.0.5.1 and 37.1.0.1 and gives no bound for R33–R36 [5]–[7]. Unconfirmed.
  - **Medium bugs in the same release:**
    - CVE-2026-95101: HTTP/3 (F5 K000162613).
    - CVE-2026-97629: TLS session-ticket key left uninitialized (F5 K000162606) [1][2].
  - **Related:**
    - **CVE-2026-42945:** a `rewrite` bug in open source 0.6.27–1.30.0, fixed in 1.30.1 / 1.31.0 [1]. A May 2026 report says it was exploited in the wild [12].
    - **njs 1.0.2:** fixes CVE-2026-101025 and CVE-2026-101019, both medium [3][4].

- **Who's affected / exposure:**
  - **Remote and unauthenticated.** The worst likely outcome is a crashed worker process (denial of service). Code execution needs ASLR to be disabled or bypassed [5]–[8].
  - **Each bug needs a specific configuration:**
    - **CVE-2026-15176:** `alias` inside a location with `rewrite`, plus either a `set` or `return` using `$request_filename`, or `$request_filename` in `log_format` [5].
    - **CVE-2026-93479:** regex-map captures read by `root` or a log format before the map result [6].
    - **CVE-2026-97205:** AIO turned on, and an SSI page using `include virtual` [7][8].
  - **Data plane only:** the flaws don't affect the control plane [5].
  - **Old builds:** nginx's affected ranges reach back to 0.1.29 and 0.8.11 [1]. NVD doesn't evaluate end-of-support versions [5].

- **Fix / patch / mitigation:**
  - **Open source:** upgrade to 1.30.6 or later (stable), or 1.31.7 or later (mainline) [1][2][3]. The current mainline, 1.31.8 (21 Oct), has no security fixes. It does fix an HTTP/3 SIGBUS worker crash on platforms with strict memory alignment [2][3].
  - **NGINX Plus and F5 products:** CSA gives affected versions but not fixed ones, and says to "update to the latest security versions immediately" [8].
  - **If you can't patch,** CSA lists these workarounds [8]:
    - **CVE-2026-15176:** avoid `alias` in location blocks, and avoid `$request_filename`.
    - **CVE-2026-97205:** disable AIO or SSI.
    - **CVE-2026-93479:** use named captures, limited to the block that contains the regex match.

- **IOCs / detection:** none published by nginx.org, NVD or CSA [1][5]–[8].

- **Priority for practitioners:**
  - **Patch now:** open-source builds at or below 1.31.6 / 1.30.5, and the F5 products listed above.
  - **Hunt for compromise:** there are no IOCs for these three. If you ran 0.6.27–1.30.0 before that fix, check for exploitation of CVE-2026-42945 [1][12].
  - No credential or TLS session-ticket-key rotation instruction was found in the sources checked.
  - **Notify & monitor:** owners of F5 WAF, DoS, Ingress Controller, Gateway Fabric and Instance Manager [8].

- **Sources:**
  1. [primary] nginx.org, Security advisories (page undated) — https://nginx.org/en/security_advisories.html
  2. [primary] nginx.org, CHANGES (1.31.8: 21 Oct 2026; 1.31.7: 14 Oct 2026; 1.31.6: 15 Sep 2026) — https://nginx.org/en/CHANGES
  3. [primary] nginx.org, news (14 Oct, 21 Oct, 15 Sep 2026) — https://nginx.org/2026.html
  4. [primary] nginx.org, njs security (njs 1.0.2, 14 Oct 2026) — https://nginx.org/en/docs/njs/security.html
  5. [primary; CVE/NVD, source f5sirt@f5.com] NVD, CVE-2026-15176 (published 14 Oct 2026; modified 15 Oct 2026) — https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-15176
  6. [primary; same] NVD, CVE-2026-93479 — https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-93479
  7. [primary; same] NVD, CVE-2026-97205 — https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97205
  8. [secondary; national CERT] Cyber Security Agency of Singapore, AL-2026-150 (21 Oct 2026; updated 22 Oct 2026) — https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-150/
  9. [primary] CISA, "CISA Adds Six Known Exploited Vulnerabilities to Catalog" (20 Oct 2026; no NGINX, F5 or njs entries) — https://www.cisa.gov/news-events/alerts/2026/10/20/cisa-adds-six-known-exploited-vulnerabilities-catalog
  10. [primary; partly read] CISA KEV JSON (catalogVersion 2026.10.21) — https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  11. [primary; wouldn't load] F5 K000162416, K000162607, K000162608 — https://my.f5.com/manage/s/article/K000162416 (K000162607 and K000162608 are at the same path)
  12. [secondary; search snippet, not fetched] Help Net Security, 18 May 2026, on CVE-2026-42945 exploitation — https://www.helpnetsecurity.com/2026/05/18/ngnix-vulnerability-exploited-cve-2026-42945/
  13. [secondary; search snippet, not fetched] The Hacker News, Oct 2026, on the five NGINX flaws — https://thehackernews.com/2026/10/nginx-fixes-5-flaws-including-possible.html

- **Unknowns:**
  - **F5's advisories** [11] wouldn't load. NGINX Plus fixed releases and F5's own wording are unverified. The NVD records [5]–[7] are the only F5-sourced data the agent read.
  - **KEV status** of the three is unconfirmed. The read of the KEV feed [10] was cut off after about 55 of 1,754 entries.
  - **Exploitation:** neither the vendor nor CISA has said whether the three have been exploited, and no IOCs exist [8]. An unfetched snippet reports no attacks as of 15 Oct [13].
  - **"~1/3 of websites"** wasn't checked.
  - **Linux distribution advisories** (Debian, Ubuntu, Red Hat) for the three weren't checked.
  - **Discoverer write-ups:** none found, only the credits in CHANGES [2].
  - **Disagreements:** NVD and nginx disagree on CVE-2026-97205's affected range (see Identifiers). The CVSS score for CVE-2026-42945 is unverified; snippets say 9.2.
  - **Cut short:** the agent hit the session rate limit, so the checks listed here remain open.
