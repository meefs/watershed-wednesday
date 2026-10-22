# #7 — GitLab: CVSS 10 pre-auth RCE

> **Thread item:** "7. GitLab: a 10-out-of-10 severity hole in every version since 2014"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** GitLab

**Additional details:** Integer overflow in regex compilation. Not in KEV, and no exploitation has been reported. Also patch CVE-2026-97229, a separate CVSS 10 flaw in 19.2+ fixed Oct 12. [Sigma detections](https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/onigmo_native_worker_crash.md).

- **What happened:** On 2026-10-21 GitLab shipped Critical Patch Releases 19.5.1, 19.4.3, 19.3.6, 19.2.9, 19.1.9, 19.0.10 and 18.11.13, which together cover 12 CVEs [1]. The top one is an integer overflow in regex compilation that "could have allowed an unauthenticated user to execute arbitrary code on the GitLab server" [1][2]. Vector AV:N/AC:L/PR:N/UI:N; CE and EE [2][3]. The CVE record was published 2026-10-22 [2].

- **Identifiers:** CVE-2026-110264; CVSS 3.1 10.0, vector CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H [2][3].
  - Affected versions (below the fixed build): 7.0→18.11.13, 19.0→19.0.10, 19.1→19.1.9, 19.2→19.2.9, 19.3→19.3.6, 19.4→19.4.3, 19.5→19.5.1 [1][2].
  - CISA KEV: not listed as of catalog 2026.10.21 [4].
  - Exploitation in the wild: no report found.
  - Credit: joaxcar via HackerOne [1].
  - A separate GitLab CE/EE path-traversal flaw, CVE-2026-85706, was added to KEV on 2026-09-11. Its fixed versions weren't checked [4].

- **Who's affected / exposure:**
  - Self-managed CE/EE in the ranges above. GitLab's post says "When no specific deployment type... is mentioned, it means all types are affected" [1].
  - GitLab.com is already patched [1].
  - Dedicated tenants on 19.3.5-internal0 or 19.4.2-internal0 and later already have the fixes [1].
  - Installs on the October 12 builds (19.2.8, 19.3.5, 19.4.2) are still affected [1][3].

- **Fix / patch / mitigation:**
  - Upgrade to the fixed build for your release line [1]. GitLab names no workaround and says to upgrade "as soon as possible" [1]. A vendor post on X suggests firewalling first (seen only as a search snippet); GitLab doesn't say that [14].
  - Release lines 7.0–18.10 get no backport. The documented fix is 18.11.13 or later [1][2]. GitLab's policy backports security fixes to the current and previous two monthly releases, with exceptions for severe issues [7].
  - Follow the required upgrade stops (x.2, x.5, x.8 and x.11 from 17.5 on) [8].
  - Upgrade impact: the release includes database migrations. Single-node installs need downtime; multi-node installs can upgrade with zero downtime. 19.4.3 and 19.3.6 have regular migrations [1].

- **IOCs / detection:** The release post lists no hashes, IPs or payloads. It links two experimental Sigma rules dated 2026-10-20 [1][6]:
  - `puma_stderr.log` (Omnibus default `/var/log/gitlab/puma/puma_stderr.log`): a `[BUG]` crash line naming org-ruby or Onigmo regex functions [6].
  - `exceptions_json.log`: `Timeout::Error` from OtherMarkup on `.org` file names. A burst is 5 or more per `meta.client_id` in 30 minutes [6].
  - `production_json.log`: `Projects::BlobController#preview` requests with `.org` parameters. Workhorse 502 errors on `.org` blobs are a supporting signal [6].
  - The docs say that a missing alert doesn't rule out compromise [6].

- **Priority for practitioners:**
  - **Patch now** if you run self-managed CE/EE in the affected range [1].
  - **Detection:** use GitLab's experimental Sigma rules with the documented tuning and limitations [6]. A missing alert does not establish that the host is clean.
  - **After confirmed compromise:** reset affected passwords after cleaning and rebuilding, following [CISA's general recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide). This is general incident-response practice, not a GitLab instruction to rotate every exposed installation.
  - GitLab.com and the Dedicated builds listed above need no action [1].
  - Rapid7 links a proof-of-concept exploit for the sibling flaw CVE-2026-97229 [12]. No source read says one exists for CVE-2026-110264.

- **Sources:**
  1. [primary] GitLab, "GitLab Critical Patch Release: 19.5.1, 19.4.3, 19.3.6, 19.2.9, 19.1.9, 19.0.10, 18.11.13," 2026-10-21. https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/ (about.gitlab.com/releases/ redirects here with a 301)
  2. [primary] CVE Services record CVE-2026-110264 (CNA: GitLab), published 2026-10-22. https://cveawg.mitre.org/api/cve/CVE-2026-110264
  3. [primary] NVD record CVE-2026-110264 (source cve@gitlab.com; status Received), 2026-10-22. https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-110264
  4. [primary] CISA KEV catalog, version 2026.10.21 (released 2026-10-21). https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  5. [primary] GitLab, "GitLab Critical Patch Release: 19.4.2, 19.3.5, 19.2.8" (CVE-2026-97229), 2026-10-12. https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/
  6. [primary, GitLab-authored, experimental] Sigma detections linked from [1], dated 2026-10-20. https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/onigmo_native_worker_crash.md and https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/org_mode_render_error_burst.md
  7. [primary] GitLab, maintenance policy (undated). https://docs.gitlab.com/policy/maintenance/
  8. [primary] GitLab, upgrade paths (undated). https://docs.gitlab.com/update/upgrade_paths/
  9. [primary] GitLab, "GitLab 7.0 released," date from the URL 2014-06-22; the page now redirects. https://about.gitlab.com/releases/2014/06/22/gitlab-7-dot-0-released
  10. [primary, EU CERT] CERT-EU advisory 2026-016, 2026-10-12 (CVE-2026-97229 only). https://cert.europa.eu/publications/security-advisories/2026-016/
  11. [primary, national CERT] Singapore CSA alert AL-2026-141, 2026-10-14 (CVE-2026-97229 only). https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-141/
  12. [secondary] Rapid7 ETR blog on CVE-2026-97229, 2026-10-13 (updated 2026-10-16). https://www.rapid7.com/blog/post/etr-cve-2026-97229-critical-unauthenticated-remote-code-execution-in-gitlab/
  13. [secondary] aiweekly.co, 2026-10-22. https://aiweekly.co/alerts/gitlab-patches-cvss-10-pre-auth-rce-in-every-build-since-2014
  14. [secondary] Lilting (Ikesan), 2026-10-22. https://lilting.ch/en/articles/gitlab-cve-2026-110264-org-mode-rce ; Aikido Security post on X, seen only as a search snippet, 2026. https://x.com/AikidoSecurity/status/2113005713387815033
  15. [checked; no GitLab product entry] GitLab advisory database. https://advisories.gitlab.com/

- **Unknowns:**
  - No source confirms in-the-wild exploitation or a public proof-of-concept for CVE-2026-110264. A third-party GitHub repo named after the CVE, claiming unauthenticated RCE, returned a 404 and wasn't opened.
  - The Org-mode attack path comes from GitLab's Sigma docs [6], not from the release post [1], and wasn't tested. The Sigma files were read through a fetch that returns a summary, not the raw file, and the docs say the burst threshold needs calibrating.
  - NVD hasn't analyzed the CVE yet, so there's no CPE data [3].
  - The upgrade path for 7.0–18.10 wasn't run through GitLab's Upgrade Path tool [8].
  - The other 11 CVEs come from a single summarized fetch [1]. The Sigma doc also maps CVE-2026-93577 to the CI regex path, but the October 12 table that was read doesn't list it [5][6].
  - HackerOne report 4093475 (cited in [2]) returned a 403, and no write-up by joaxcar was found. Details go public 90 days after release [1], about 2027-01-19 by the agent's count.
  - One search pass found no national CERT advisory for CVE-2026-110264. CERT-EU and CSA cover only CVE-2026-97229 [10][11].
  - VulDB and The Hacker News returned 403s. Dedicated builds beyond the two named aren't stated [1].
