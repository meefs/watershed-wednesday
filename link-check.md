# Link check: Watershed Wednesday sources

**Checked:** 2026-10-22 07:09 CDT · **Method:** `curl -L --max-time 20` with a browser User-Agent, 24 in parallel, against every unique URL in `incidents/*.md`. `303` means the URL redirected but the final request didn't complete, and remains an incomplete availability check, not a successfully retrieved page.

> A `200` means the page loaded. It doesn't mean the page says what the report claims, so content still needs a human check.

## Summary

| Status | Count |
|---|---|
| 200 | 341 |
| 403 | 21 |
| 303 | 4 |
| 404 | 3 |
| 401 | 1 |

## ⚠️ Failed or incomplete checks

| Status | URL | Assessment |
|---|---|---|
| 401 | https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/ | Paywall/bot block. #8 already marks it 'not retrieved'. |
| 403 | https://edsource.org/updates/personal-information-for-7-million-california-students-has-been-stolen-following-hack | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://help.onamae.com/contact/ | GMO support contact page rejects scripted requests; check in a browser. |
| 403 | https://helpx.adobe.com/security/products/magento/apsb26-146.html | Adobe bot block on a [primary] bulletin; check in a browser. |
| 403 | https://socradar.io/data-breach/pingcap-tidb-cloud-fulcrumsec-ransomware-2026/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2025/04/lazarus-hits-6-south-korean-firms-via.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/07/unpatched-xring-flaw-in-xquic-lets.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/10/clickfix-attackers-exploit-siemens.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/10/hackers-hijack-five-ovhcloud-cli.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/10/new-qpack-flaws-can-crash-http3-servers.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/10/nginx-fixes-5-flaws-including-possible.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://thehackernews.com/2026/10/state-bank-of-india-confirms-data-leak.html | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://vuldb.com/vuln/422659 | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/bullhorn-takes-staffing-platform-offline-to-contain-cyberattack/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/japans-onamae-desktop-cloud-hacked-up-to-27-000-servers-affected/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/over-36-000-plex-servers-unpatched-against-recently-disclosed-flaws/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/stolen-updraftcentral-keys-used-to-backdoor-wordpress-sites/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/wordpress-seo-plugin-rank-math-compromised-to-backdoor-websites/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/ | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 403 | https://www.experianidworks.com/identity | Enrollment site rejects scripted requests; check in a browser. |
| 403 | https://www.experianidworks.com/minorplus | Enrollment site rejects scripted requests; check in a browser. |
| 403 | https://www.staffingindustry.com/news/global-daily-news/bullhorn-restoring-service-following-cyberattack | Bot block (Cloudflare/WAF); the agents also hit 403. Check in a browser. |
| 404 | https://api.github.com/advisories/GHSA-862f-55f5-vmvw | Expected: #25 notes the GHSA isn't in the global DB/OSV yet. The repo advisory URL itself works. |
| 404 | https://api.osv.dev/v1/vulns/GHSA-862f-55f5-vmvw | Expected: #25 notes the GHSA isn't in the global DB/OSV yet. The repo advisory URL itself works. |
| 404 | https://knvd.krcert.or.kr/detailSecNo.do?IDX=5881 | 2023 KrCERT advisory cited secondhand in #27. Page gone or moved. |

## All links

<details><summary>All 370 URLs with status</summary>

| Status | URL |
|---|---|
| 200 | http://www.boannews.com/news/articleView.html?idxno=141394 |
| 200 | https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/ |
| 200 | https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/ |
| 200 | https://about.gitlab.com/releases/2014/06/22/gitlab-7-dot-0-released |
| 200 | https://access.redhat.com/security/cve/cve-2026-109618 |
| 200 | https://advisories.gitlab.com/ |
| 200 | https://aicybr.com/blog/stylesmuggler-magento-adobe-commerce-zero-day-rce |
| 200 | https://aiweekly.co/alerts/gitlab-patches-cvss-10-pre-auth-rce-in-every-build-since-2014 |
| 200 | https://allaboutlawyer.com/california-student-data-breach-ets-lawsuit/ |
| 404 | https://api.github.com/advisories/GHSA-862f-55f5-vmvw |
| 200 | https://api.github.com/repos/BerriAI/litellm/git/ref/tags/v1.106.2 |
| 200 | https://api.github.com/repos/NousResearch/Hermes-Agent |
| 200 | https://api.github.com/repos/oritera/Cairn |
| 200 | https://api.github.com/repos/usestrix/strix |
| 404 | https://api.osv.dev/v1/vulns/GHSA-862f-55f5-vmvw |
| 200 | https://api.osv.dev/v1/vulns/MAL-2026-2144 |
| 200 | https://apps.apple.com/us/app/signal-private-messenger/id874139669 |
| 200 | https://arcticwolf.com/resources/blog/exploitation-of-cve-2026-0257-leads-to-qilin-ransomware/ |
| 200 | https://asec.ahnlab.com/en/54195 |
| 200 | https://attack.mitre.org/techniques/T1190/ |
| 200 | https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/ |
| 200 | https://blog.claroc.io/ghostshares-muse-passive-dns |
| 200 | https://blog.cloudflare.com/php-vulnerabilities-waf-protection/ |
| 200 | https://blog.railway.com |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-check-for-anomalous-aws-access |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-check-for-anomalous-github-access |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-openai-usage |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-usage-in-stripe |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-redeploy-buckets-and-reconnect-github-after-the-credential-reset |
| 200 | https://blog.railway.com/p/security-disclosure-recommendation-rotate-postgresql-database-credentials |
| 200 | https://blog.railway.com/p/security-disclosure-wednesday-october-21st |
| 200 | https://blog.torproject.org/ |
| 200 | https://blog.torproject.org/new-release-tor-browser-15026/ |
| 200 | https://brusselstimes.com/belgium/1539103/delhaize-parent-company-hit-by-major-ransomware-attack |
| 200 | https://bugzilla.mozilla.org/attachment.cgi?id=9664786 |
| 200 | https://bugzilla.mozilla.org/attachment.cgi?id=9665772 |
| 200 | https://bugzilla.mozilla.org/show_bug.cgi?id=1889859 |
| 200 | https://bugzilla.mozilla.org/show_bug.cgi?id=2083449 |
| 200 | https://bugzilla.mozilla.org/show_bug.cgi?id=2083709 |
| 200 | https://bugzilla.mozilla.org/show_bug.cgi?id=2084101 |
| 200 | https://bugzilla.redhat.com/show_bug.cgi?id=2423096 |
| 200 | https://bun.com/blog/bun-v1.4.4 |
| 200 | https://businesstoday.in/technology/news/story/from-compromised-certificates-to-malicious-software-inside-octobers-cybersecurity-alerts-563027-2026-10-22 |
| 200 | https://calif.io/php2shell/ |
| 200 | https://censys.com/advisory/cve-2026-96652-cve-2026-96654-cve-2026-96655-cve-2026-96656/ |
| 200 | https://cert-portal.siemens.com/productcert/html/ssa-580366.html |
| 200 | https://cert.cyber.gouv.fr/ |
| 200 | https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-014/ |
| 200 | https://cert.europa.eu/publications/security-advisories/2026-016/ |
| 200 | https://cert.europa.eu/publications/security-advisories/2026-018/ |
| 200 | https://cert.gov.vu/index.php/advisories/89-advisory-99 |
| 200 | https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md |
| 200 | https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.textproto |
| 200 | https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619 |
| 200 | https://cloud.google.com/blog/topics/threat-intelligence/investigating-ephemeral-supply-chain-tampering |
| 200 | https://community.veeam.com/news-56/customer-advisory-ensure-veeam-backup-replication-updates-have-been-installed-5460 |
| 200 | https://crt.sh/?q=E7568FE6E12331F4FD7DE61DA4C7559D0F8EB192A218D4741A3BA75184333838 |
| 200 | https://crypto.news/railway-security-breach-linked-to-371000-crypto-theft-across-19-chains/ |
| 200 | https://cryptobriefing.com/bitget-no-user-data-tidb-cloud-breach/ |
| 200 | https://curl.se/ca/cacert.pem |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-0257 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-0322 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-110264 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-110936 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-111943 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-113380 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-96651 |
| 200 | https://cveawg.mitre.org/api/cve/CVE-2026-96652 |
| 200 | https://cyberinsider.com/tor-removes-hundreds-of-compromised-relays-used-to-hijack-ssh-logins/ |
| 200 | https://cyberpress.org/gmo-shuts-malware-hit-cloud/ |
| 200 | https://cyberpress.org/state-bank-of-india-data-leak/ |
| 200 | https://daily.dev/posts/emudhra-intermediate-ca-keys-compromised-go-mozilla-chrome-apple-and-microsoft-distrust-eight-ce-a03ptohlj |
| 200 | https://docs.gitlab.com/policy/maintenance/ |
| 200 | https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/ |
| 200 | https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/ |
| 200 | https://docs.gitlab.com/update/upgrade_paths/ |
| 200 | https://docs.google.com/document/d/e/2PACX-1vT7GyVY26qMXg-HCCp5v7s-QrnGxfGaRCVUgxRVXohcwW-bQI4dx1zUqL8QmnLEnAyTtLucqkHFewuv/pub |
| 200 | https://docs.litellm.ai/blog/security-incident-oct-21-2026 |
| 200 | https://docs.ovhcloud.com/en/guides/manage-and-operate/cli/getting-started |
| 200 | https://docs.pingcap.com/tidbcloud/security-overview/ |
| 200 | https://docs.pingcap.com/tidbcloud/tidb-cloud-console-auditing/ |
| 200 | https://econotimes.com/Google-to-Remove-emSign-ECC-Root-CA-G3-From-Chrome-Root-Store-1758763 |
| 403 | https://edsource.org/updates/personal-information-for-7-million-california-students-has-been-stolen-following-hack |
| 200 | https://efts.sec.gov/LATEST/search-index?q=%22Ahold%20Delhaize%22%20cybersecurity&dateRange=custom&startdt=2026-10-01&enddt=2026-10-22&forms=6-K |
| 200 | https://emudhra.com/en/post/certificate-security-incident |
| 200 | https://en.wikipedia.org/wiki/Lazarus_Group |
| 200 | https://engadget.com/2253133/meta-reveals-its-ai-agent-that-can-shop-send-emails-and-plan-trips-on-your-behalf/ |
| 200 | https://firefox.settings.services.mozilla.com/v1/buckets/security-state/collections/onecrl/records |
| 200 | https://forkast.news/meta-patched-its-muse-macos-zero-day-just-before-connect-the-dispute-over-who-could-exploit-it-remains-open/ |
| 200 | https://formulae.brew.sh/api/formula/ca-certificates.json |
| 200 | https://forum.torproject.org/t/tor-relays-security-incident-affecting-some-relay-operators/22231 |
| 200 | https://forums.plex.tv/t/breach-annoucment/806518/ |
| 200 | https://forums.plex.tv/t/important-notice-of-security-incident/930523 |
| 200 | https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319 |
| 200 | https://forums.plex.tv/t/plex-media-server/30447/711 |
| 200 | https://forums.plex.tv/t/plex-media-server/30447/713 |
| 200 | https://forums.plex.tv/t/plex-media-server/30447/715 |
| 200 | https://forums.plex.tv/t/security-regarding-cve-2020-5741/586819 |
| 200 | https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers |
| 200 | https://gambit.security/blog-posts/autonomous-ai-agents-online-retailers-25-a-company |
| 200 | https://github.com/advisories/GHSA-5c63-xm6f-r368 |
| 200 | https://github.com/advisories/GHSA-5mg7-485q-xm76 |
| 200 | https://github.com/advisories/GHSA-92x9-889m-jgmw |
| 200 | https://github.com/BerriAI/litellm/issues/47826 |
| 200 | https://github.com/cloudflare/quiche/security/advisories/GHSA-4fgf-9xrr-88gf |
| 200 | https://github.com/FoxIO-LLC/blog_poc |
| 200 | https://github.com/hyperium/h3/releases |
| 200 | https://github.com/Imahian/Notes/tree/main/docs/CVEs/CVE-2026-113380 |
| 200 | https://github.com/litespeedtech/lsquic/blob/master/CHANGELOG |
| 200 | https://github.com/litespeedtech/openlitespeed/releases |
| 200 | https://github.com/NCSC-NL/php2shell |
| 200 | https://github.com/oritera/Cairn |
| 200 | https://github.com/oven-sh/bun/releases/tag/bun-v1.4.4 |
| 200 | https://github.com/ovh/ovhcloud-cli/issues/300 |
| 200 | https://github.com/ovh/ovhcloud-cli/releases/tag/v0.16.0 |
| 200 | https://github.com/ovh/ovhcloud-cli/security/advisories/GHSA-862f-55f5-vmvw |
| 200 | https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp |
| 200 | https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w |
| 200 | https://github.com/quic-go/quic-go/security/advisories/GHSA-g754-hx8w-x2g6 |
| 200 | https://github.com/signalapp/ringrtc/blob/main/CHANGELOG.md |
| 200 | https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3 |
| 200 | https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3.patch |
| 200 | https://github.com/signalapp/ringrtc/releases/tag/v2.72.0 |
| 200 | https://github.com/signalapp/Signal-Android/blob/v8.27.0/gradle/libs.versions.toml |
| 200 | https://github.com/signalapp/Signal-Android/blob/v8.31.0/gradle/libs.versions.toml |
| 200 | https://github.com/signalapp/Signal-Android/releases |
| 200 | https://github.com/signalapp/Signal-Android/releases/tag/v8.27.0 |
| 200 | https://github.com/signalapp/Signal-Desktop/blob/v8.29.0/package.json |
| 200 | https://github.com/signalapp/Signal-Desktop/releases |
| 200 | https://github.com/signalapp/Signal-iOS/issues/4628 |
| 200 | https://github.com/signalapp/Signal-iOS/issues/5895 |
| 200 | https://github.com/traefik/traefik/security/advisories/GHSA-hrpp-p4fc-wwf8 |
| 200 | https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/onigmo_native_worker_crash.md |
| 200 | https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/org_mode_render_error_burst.md |
| 200 | https://gizmodo.com/your-plex-server-could-be-mining-crypto-for-hackers-if-you-havent-updated-it-2000827461 |
| 200 | https://go.dev/doc/devel/release |
| 200 | https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE |
| 200 | https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/h2ucXHS5HZ4 |
| 200 | https://haveibeenpwned.com/api/v3/breaches |
| 403 | https://help.onamae.com/contact/ |
| 403 | https://helpx.adobe.com/security/products/magento/apsb26-146.html |
| 200 | https://hg.mozilla.org/projects/nss/raw-file/tip/lib/ckfw/builtins/certdata.txt |
| 200 | https://incidentdatabase.ai/es/entities/muse-spark-1.1/ |
| 200 | https://internet.watch.impress.co.jp/docs/news/2149829.html |
| 200 | https://kaba.cx/posts/20261020_Tor/ |
| 200 | https://kb.cert.org/vuls/id/687587 |
| 200 | https://knowledge.broadcom.com/external/article/445446/cve202649975-http2-denialofservicedos-vu.html |
| 404 | https://knvd.krcert.or.kr/detailSecNo.do?IDX=5881 |
| 200 | https://laist.com/brief/news/education/california-student-data-breach-2026-what-do-do |
| 200 | https://lilting.ch/en/articles/gitlab-cve-2026-110264-org-mode-rce |
| 200 | https://lilting.ch/en/articles/http3-qpack-header-amplification |
| 200 | https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays@lists.torproject.org/2026/10/ |
| 200 | https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays@lists.torproject.org/thread/WOHPLKCSHYXFTBRZXDENDKJZMBMPLMG5/ |
| 200 | https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays%40lists.torproject.org/thread/RXWGWYYYKBDEBNXC2C3NYIQ2HHHWXL7O |
| 200 | https://metrics.torproject.org/onionoo.html |
| 200 | https://my.f5.com/manage/s/article/K000162416 |
| 200 | https://n.yam.com/Article/20261017250749 |
| 200 | https://ncsc.gov.ie/pdfs/Cisco_remote_access_VPN_unauthorised_access_vulnerability.pdf |
| 200 | https://neopolitico.com/india/sbi-confirms-data-breach-identifies-3897-customer-records-on-dark-web-independent-probe-underway/ |
| 200 | https://nethemba.com/updraftcentral-backdoor-analysis/ |
| 200 | https://news-web.php.net/php.announce/513 |
| 200 | https://news.yahoo.co.jp/articles/d4555756d408b6529cd22b4b4caf42b1b6bc7a4f |
| 200 | https://newsroom.aholddelhaize.com/ahold-delhaize-takes-precautionary-measures-following-cybersecurity-incident/ |
| 200 | https://newsroom.aholddelhaize.com/ahold-delhaize-update-on-status-of-cybersecurity-incident/ |
| 200 | https://newsroom.aholddelhaize.com/update-on-ahold-delhaizes-cybersecurity-incident/ |
| 200 | https://nginx.org/2026.html |
| 200 | https://nginx.org/en/CHANGES |
| 200 | https://nginx.org/en/docs/njs/security.html |
| 200 | https://nginx.org/en/security_advisories.html |
| 200 | https://norforge.com/blog/inside_cairn |
| 200 | https://oag.ca.gov/ecrime/databreach/reports/sb24-629754 |
| 200 | https://oag.ca.gov/ecrime/databreach/reports/sb24-631485 |
| 200 | https://oag.ca.gov/node/613897 |
| 200 | https://oag.ca.gov/privacy |
| 200 | https://oag.ca.gov/privacy/databreach/list |
| 200 | https://oag.ca.gov/privacy/databreach/list?page=1 |
| 200 | https://oag.ca.gov/system/files/Notice%20of%20Data%20Breach_3_Redacted.pdf |
| 200 | https://oag.ca.gov/system/files/Notice%20of%20Data%20Breach%20AG%20Submission.pdf |
| 200 | https://oag.ca.gov/system/files/PHS_Redacted_Notice_Letter_40106534v1.pdf |
| 200 | https://ocrportal.hhs.gov/ocr/breach/breach_report_hip.jsf |
| 200 | https://onionoo.torproject.org/summary?type=relay&flag=BadExit&running=true |
| 200 | https://onionoo.torproject.org/summary?type=relay&flag=Exit&running=true |
| 200 | https://openclassactions.com/lawsuits/data-breaches/ets-california-student-data-breach-class-action-lawsuit.php |
| 200 | https://opensourcemalware.com/blog/glassworm-hacks-ovh-clouds-cli-tool |
| 200 | https://paradigm-healthcare.com/notice |
| 200 | https://parkstadactueel.nl/2026/10/21/digid-mijnoverheid-offline-kritieke-php-lekken-websites/ |
| 200 | https://patchstack.com/articles/updraftcentral-key-compromise-wordpress-backdoors/ |
| 200 | https://php2shell.com |
| 200 | https://productcert.siemens.com/news/2026/10/19/active-exploitation-of-cve-2026-110936-in-siemens-software-center/ |
| 200 | https://productcert.siemens.com/productcert/html/ssa-580366.html |
| 200 | https://pypi.org/project/aioquic/ |
| 200 | https://pypi.org/project/certifi/ |
| 200 | https://pypi.org/project/litellm/#history |
| 200 | https://pypi.org/project/litellm/1.107.0/ |
| 200 | https://pypistats.org/packages/litellm |
| 200 | https://rapid7.com/blog/post/etr-rapid7-observed-exploitation-of-pan-os-globalprotect-authentication-bypass-vulnerability-cve-2026-0257/ |
| 200 | https://raw.githubusercontent.com/caddyserver/caddy/v2.11.7/go.mod |
| 200 | https://raw.githubusercontent.com/certifi/python-certifi/2026.10.19/certifi/cacert.pem |
| 200 | https://raw.githubusercontent.com/cisagov/CSAF/develop/csaf_files/IT/white/2026/va-26-266-01.json |
| 200 | https://raw.githubusercontent.com/cloudflare/cloudflared/2026.10.3/go.mod |
| 200 | https://raw.githubusercontent.com/traefik/traefik/v3.7.16/go.mod |
| 200 | https://registry.npmjs.org/@signalapp/ringrtc |
| 200 | https://research.jfrog.com/post/php2shell-all-you-need-to-know-about-cve-2026-109618-and-cve-2026-109619/ |
| 200 | https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/ |
| 200 | https://sansec.io/research/php2shell |
| 200 | https://scan.netsecurity.ne.jp/article/2026/10/13/56428.html |
| 200 | https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/ |
| 200 | https://securelist.com/lazarus-operation-flashhole/121541/ |
| 200 | https://security-tracker.debian.org/tracker/CVE-2026-109618 |
| 200 | https://security.paloaltonetworks.com/CVE-2026-0257 |
| 200 | https://security.paloaltonetworks.com/CVE-2026-0322 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-0257 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-109618 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-109619 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-110264 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-110936 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-113380 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-12778 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-12780 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-15176 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-93479 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-96652 |
| 200 | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-97205 |
| 200 | https://snyk.io/blog/poisoned-security-scanner-backdooring-litellm/ |
| 200 | https://socket.dev/blog/litellm-compromise |
| 200 | https://socprime.com/blog/cve-2026-42530-critical-nginx-http-3-flaw-can-trigger-dos-and-possible-rce/ |
| 403 | https://socradar.io/data-breach/pingcap-tidb-cloud-fulcrumsec-ransomware-2026/ |
| 200 | https://sources.debian.org/data/main/c/ca-certificates/20260816%2Bnmu1/debian/changelog |
| 200 | https://startupfortune.com/hacker-claims-breach-of-state-bank-of-india-exposing-375000-customer-records/ |
| 200 | https://status.bullhorn.com/ |
| 200 | https://status.bullhorn.com/history.atom |
| 200 | https://status.bullhorn.com/incidents/95xrkmrn9s4y |
| 200 | https://status.railway.com |
| 200 | https://status.railway.com/incident/QH8L8B3E |
| 200 | https://status.tidbcloud.com |
| 200 | https://status.tidbcloud.com/history |
| 200 | https://status.zeabur.com/incident/1037896 |
| 200 | https://status.zeabur.com/incident/1091243 |
| 200 | https://teamupdraft.com/blog/security-incident-october-2026/ |
| 200 | https://tech-insider.org/ahold-delhaize-hack-8-brands-eu-recovery-2026/ |
| 403 | https://thehackernews.com/2025/04/lazarus-hits-6-south-korean-firms-via.html |
| 403 | https://thehackernews.com/2026/07/unpatched-xring-flaw-in-xquic-lets.html |
| 403 | https://thehackernews.com/2026/10/clickfix-attackers-exploit-siemens.html |
| 403 | https://thehackernews.com/2026/10/hackers-hijack-five-ovhcloud-cli.html |
| 403 | https://thehackernews.com/2026/10/new-qpack-flaws-can-crash-http3-servers.html |
| 403 | https://thehackernews.com/2026/10/nginx-fixes-5-flaws-including-possible.html |
| 403 | https://thehackernews.com/2026/10/state-bank-of-india-confirms-data-leak.html |
| 200 | https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge |
| 200 | https://therecord.media/ahold-delhaize-cyberattack-grocery |
| 200 | https://therecord.media/aomei-yet-to-notify-customers-hijack-software |
| 200 | https://therecord.media/fbi-says-safepay-ransomware-gang-among-most-active-600-victims |
| 200 | https://therecord.media/north-korea-hackers-ransomware |
| 200 | https://therecord.media/php-script-vulnerabilities-warnings |
| 200 | https://thestack.technology/ovhcloud-cli-repo-compromised-customer-reports-incident/ |
| 200 | https://threatlandscape.io/blog/php-core-rce-cve-2026-109618-109619-leak-ahead-of-embargo |
| 200 | https://time.com/article/2026/10/06/meta-muse-ai-agent-privacy/ |
| 200 | https://ubuntu.com/security/CVE-2026-109618 |
| 200 | https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/ |
| 200 | https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/ |
| 200 | https://view.asiae.co.kr/article/2026101308452003978 |
| 403 | https://vuldb.com/vuln/422659 |
| 200 | https://vulnerabilities.ncsc.nl/csaf/v2/2026/cve-2026-75650.json |
| 200 | https://w3techs.com/technologies/details/pl-php |
| 200 | https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/ |
| 200 | https://whbl.com/2026/10/16/hacker-gets-data-on-millions-of-california-students-state-education-department-says/ |
| 200 | https://www.404media.co/tag/muse/ |
| 200 | https://www.acn.gov.it/portale/en/w/risolta-vulnerabilita-in-signal-ringrtc |
| 200 | https://www.aikido.dev/blog/litellm-compromised-infostealer-rat |
| 200 | https://www.aomeitech.com/ab/changelog.html |
| 200 | https://www.aomeitech.com/company/investigating-ephemeral-tampering.html |
| 200 | https://www.aomeitech.com/download.html |
| 200 | https://www.atlantanewsfirst.com/2026/10/09/metas-new-muse-ai-agent-raises-privacy-concerns/ |
| 403 | https://www.bleepingcomputer.com/news/security/bullhorn-takes-staffing-platform-offline-to-contain-cyberattack/ |
| 403 | https://www.bleepingcomputer.com/news/security/japans-onamae-desktop-cloud-hacked-up-to-27-000-servers-affected/ |
| 403 | https://www.bleepingcomputer.com/news/security/over-36-000-plex-servers-unpatched-against-recently-disclosed-flaws/ |
| 403 | https://www.bleepingcomputer.com/news/security/stolen-updraftcentral-keys-used-to-backdoor-wordpress-sites/ |
| 403 | https://www.bleepingcomputer.com/news/security/wordpress-seo-plugin-rank-math-compromised-to-backdoor-websites/ |
| 403 | https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/ |
| 200 | https://www.boredhackerblog.info/2026/10/plex-vulnerabilities-being-exploited-in.html |
| 200 | https://www.bseindia.com/stock-share-price/state-bank-of-india/sbin/500112/corp-announcements/ |
| 200 | https://www.bullhorn.com/our-story/ |
| 303 | https://www.cde.ca.gov/ets |
| 303 | https://www.cde.ca.gov/nr/in/ets-notification.asp |
| 303 | https://www.cde.ca.gov/nr/in/yr26inltr1002.asp |
| 303 | https://www.cde.ca.gov/nr/ne/yr26/yr26rel45.asp |
| 200 | https://www.chaincatcher.com/en/article/2297743 |
| 200 | https://www.cisa.gov/known-exploited-vulnerabilities-catalog |
| 200 | https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-110936 |
| 200 | https://www.cisa.gov/news-events/alerts/2026/10/20/cisa-adds-six-known-exploited-vulnerabilities-catalog |
| 200 | https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching |
| 200 | https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-293a |
| 200 | https://www.cisa.gov/sites/default/files/2026-10/AA26-293A-stix.json |
| 200 | https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json |
| 200 | https://www.cisa.gov/stopransomware/alerts |
| 200 | https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-141/ |
| 200 | https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-150/ |
| 200 | https://www.cve.org/CVERecord?id=CVE-2026-110936 |
| 200 | https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619 |
| 200 | https://www.cyberkendra.com/2026/10/tor-relays-hacked-to-intercept-ssh-connections.html |
| 200 | https://www.dutchnews.nl/2026/10/albert-heijn-begins-restocking-as-hack-traced-to-foreign-servers/ |
| 200 | https://www.emeryreddy.com/blog/data-breach/paradigm-healthcare-services-data-breach |
| 200 | https://www.engadget.com/2292281/meta-suspends-muse-chats-sharing-feature-after-it-left-private-details-exposed/ |
| 200 | https://www.esecurityplanet.com/threats/news-fbi-safepay-ransomware-600-organizations/ |
| 403 | https://www.experianidworks.com/identity |
| 403 | https://www.experianidworks.com/minorplus |
| 200 | https://www.foxbusiness.com/lifestyle/food-lion-stop-shop-hannaford-websites-face-outages-after-cybersecurity-issue |
| 200 | https://www.freepressjournal.in/business/sbi-data-leak-hackers-claim-access-to-375-lakh-customer-records-personal-details-loan-documents-allegedly-exposed |
| 200 | https://www.grocerydive.com/news/ahold-delhaize-adusa-cybersecurity-update/833414/ |
| 200 | https://www.grocerydive.com/news/ahold-delhaize-usa-cyberattack-grocery-personal-data-exposed/751971/ |
| 200 | https://www.helpnetsecurity.com/2024/09/09/cve-2024-40711-exploited/ |
| 200 | https://www.helpnetsecurity.com/2026/05/18/ngnix-vulnerability-exploited-cve-2026-42945/ |
| 200 | https://www.helpnetsecurity.com/2026/10/20/exploitation-siemens-software-center-vulnerability-cve-2026-110936/ |
| 200 | https://www.helpnetsecurity.com/2026/10/21/emudhra-certificates-private-keys-compromised/ |
| 200 | https://www.helpnetsecurity.com/2026/10/21/ransomware-groups-exploit-palo-alto-globalprotect-cve-2026-0257/ |
| 200 | https://www.hookphish.com/blog/ransomware-group-fulcrumsec-hits-pingcap-tidb-cloud/ |
| 200 | https://www.ibtimes.sg/meta-pauses-muse-ai-chat-sharing-after-6800-private-conversation-links-found-online-95347 |
| 200 | https://www.ic3.gov/PSA |
| 200 | https://www.it-connect.tech/ovhcloud-cli-binaires-on-github-were-tampered-with-by-an-infostealer/ |
| 200 | https://www.itmedia.co.jp/news/article/2610/21/2000002442/ |
| 200 | https://www.manageengine.com/threat-analysis-lab/aomei-backupper-supply-chain-compromise.html |
| 200 | https://www.medianama.com/2026/10/223-sbi-data-breach-3897-customers-dark-web/ |
| 200 | https://www.mend.io/blog/litellm-1-107-0-compromised/ |
| 200 | https://www.mobygeek.com/ict-news/black-october-major-cyber-incidents-flood-the-last-48-hours-16492 |
| 200 | https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php |
| 200 | https://www.ncsc.govt.nz/alerts/cve-2026-109618-and-cve-2026-109619-affecting-php/ |
| 200 | https://www.ncsc.nl/alerts/kwetsbaarheden-php-patches-beschikbaar-update-nu |
| 200 | https://www.nikkei.com/article/DGXZQOUC2155P0R21C26A0000000/ |
| 200 | https://www.onamae.com/news/article/11434/ |
| 200 | https://www.onamae.com/news/article/11584 |
| 200 | https://www.outlookmoney.com/personal-finance/sbi-confirms-cyberattack-3897-customer-records-stolen-leaked-on-dark-web |
| 200 | https://www.ox.security/blog/litellm-1-107-0-compromised-with-a-rat-infostealer/ |
| 200 | https://www.php.net/archive/2026.php |
| 200 | https://www.php.net/releases/8_5_12.php |
| 200 | https://www.pingcap.com/ko/legal/security-addendum/ |
| 200 | https://www.pingcap.com/security/ |
| 200 | https://www.pingcap.com/trust-hub/security/security-update-october-2026/ |
| 200 | https://www.prnewswire.com/news-releases/railway-raises-100-million-series-b-as-ai-pushes-todays-cloud-infrastructure-past-its-limits-302667768.html |
| 200 | https://www.rapid7.com/blog/post/etr-cve-2026-97229-critical-unauthenticated-remote-code-execution-in-gitlab/ |
| 200 | https://www.rescana.com/post/ahold-delhaize-cybersecurity-incident-october-2026 |
| 200 | https://www.rescana.com/post/cdn-tsunami-critical-http-3-to-http-1-1-protocol-translation-vulnerability-triggers-up-to-350x-dos-amplification-across |
| 200 | https://www.retaildetail.eu/news/food/ahold-delhaizes-u-s-websites-are-also-back-online/ |
| 401 | https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/ |
| 200 | https://www.securityweek.com/970000-medi-cal-members-affected-by-paradigm-healthcare-data-breach/ |
| 200 | https://www.securityweek.com/ai-platform-cairn-abused-to-hack-over-100-organizations/ |
| 200 | https://www.securityweek.com/hijacked-developer-account-used-to-plant-stealer-in-ovhcloud-cli/ |
| 200 | https://www.securityweek.com/one-compromised-login-exposed-millions-of-california-students-records/ |
| 200 | https://www.securityweek.com/siemens-software-center-vulnerability-exploited-in-clickfix-malware-attacks/ |
| 403 | https://www.staffingindustry.com/news/global-daily-news/bullhorn-restoring-service-following-cyberattack |
| 200 | https://www.sw.siemens.com/en-US/siemens-software-center/ |
| 200 | https://www.tenable.com/blog/stylesmuggler-cve-2026-75650-frequently-asked-questions-about-adobe-commerce-and-magento-zero |
| 200 | https://www.theregister.com/cyber-crime/2026/10/20/palo-altos-firewall-os-has-been-under-attack-from-multiple-ransomware-groups-since-june/5304226 |
| 200 | https://www.theregister.com/security/2026/10/19/grocery-giant-ahold-delhaize-confirms-cyberattack-forced-us-and-european-systems-offline/5303970 |
| 200 | https://www.theregister.com/security/2026/10/20/bullhorn-sees-red-after-cyberattack-knocks-recruitment-platform-offline/5304114 |
| 200 | https://www.theregister.com/security/2026/10/20/indian-certification-authority-emudhras-private-keys-compromised-one-of-them-was-the-number-4/5304312 |
| 200 | https://www.theregister.com/security/2026/10/21/signal-bug-could-keep-your-mic-and-camera-on-after-hangup/5304528 |
| 200 | https://www.tomshardware.com/tech-industry/artificial-intelligence/metas-muse-ai-agent-accused-of-accessing-sensitive-user-data-on-iphone-and-mac-without-permission-agent-shocks-reporter-by-referring-to-confidential-messages-it-wasnt-granted-access-to |
| 200 | https://www.twcert.org.tw/tw/mp-1.html |
| 200 | https://www.voakorea.com/a/8213679.html |
| 200 | https://www.wfsb.com/2026/10/16/stop-shop-website-app-remain-offline-after-cybersecurity-breach-parent-company/ |
| 200 | https://www.wireshark.org/security/wnpa-sec-2025-07.html |
| 200 | https://www.wiz.io/blog/litellm-compromised-steals-credentials |
| 200 | https://x.com/AikidoSecurity/status/2113005713387815033 |
| 200 | https://x.com/JustJake/status/2113028631463436786 |
| 200 | https://x.com/rst_cloud/status/2112317465774489638 |
| 200 | https://x.com/yousukezan/status/2113037612659478928 |
| 200 | https://zeabur.com/blogs/migrate-from-zeabur |
| 200 | https://zeabur.com/blogs/october-2026-security-incident |
| 200 | https://zeabur.com/blogs/zeabur-is-shutting-down |
| 200 | https://zeabur.com/docs/en-US/security-practices |
| 200 | https://zmain.info/blog/plex2shell |

</details>
