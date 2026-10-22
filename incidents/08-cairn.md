# #8 — Cairn: an AI agent chain used to break into online retailers

> **Thread item:** "8. Cairn: criminals used an AI hacking tool to break into 100+ companies"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** Gambit Security and NorForge threat-intel reports

**Additional details:** A single financially motivated operator chaining open-source AI agents (Strix, Cairn, Hermes) against e-commerce checkouts for card skimming. Named victims include Deere, SharkNinja and Cummins ([Reuters via TNW](https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge)).

**What happened:**
- **22 Sep 2026, Gambit Security** (interim report, by Eyal Sela) [2]:
  - Since July 2026, a financially motivated operator, apparently one person, has run three open-source AI agents against online retailers:
    - Strix, for scanning;
    - Cairn, for automated exploitation;
    - Hermes, to coordinate the other two.
  - For 10–15 Sep, Gambit counts 105 Cairn projects and "at least 27 companies compromised to varying degrees."
  - More than 600,000 card records were taken from two of those companies.
- **19 Oct 2026, NorForge** ("Inside Cairn," by Snorre Fagerland) [1][12]:
  - More than 20 Cairn control panels were left exposed online, likely tied to intrusions.
  - They fall into three clusters. The largest, AIA0001, has 14 panels and over 1,100 projects, and targets e-commerce and payments in the US, Japan and Australia.
- **19 Oct 2026, Reuters** [10][11]: websites at "more than 100 companies" were hit by one Chinese-speaking hacker. Named victims include Deere, SharkNinja and Cummins.

**Identifiers:**
- **Cairn** (also spelled "Carin"): github.com/oritera/Cairn [6].
  - AGPL-3.0 license, 4,332 stars. Created 19 Apr 2026; last code push 7 Sep 2026.
  - The link to the campaign is strong but inferred:
    - NorForge describes agents posting their findings to a shared "blackboard." The original repo uses a blackboard design and supports Claude Code and Pi as worker backends [1][6].
    - No source names this repo as the build the campaign used, and NorForge names no developer.
- **Other tools:**
  - Strix is usestrix/strix, Apache-2.0 [7].
  - Hermes matches NousResearch/hermes-agent, MIT [8]. That's the agent's inference; Gambit names no developer [2].
- **Models used, all via OpenRouter** [2]:
  - Cairn: DeepSeek v4.1 Flash.
  - Strix: GLM 5.2, then DeepSeek v4 Pro.
  - Hermes: Anthropic opus-4.6.
  - NorForge saw a worker label, "claudecode_deepseek-v4.1-flash," which it says "could mean" Claude Code running DeepSeek. NorForge hedges on this [1].
- **Origin:** "Chinese" rests on the language of the tasks, not on any claim about nationality [1].
  - Gambit's operator wrote prompts in Chinese [2].
  - Tencent logos appear on the original repo, but NorForge sees no reason to connect Tencent to the campaign [1][6].
- **CVEs:**
  - Gambit names none [2].
  - NorForge says the attacker's tooling refers to CVE-2026-75650 but doesn't show it being used in an intrusion [1].
  - CISA's KEV catalog lists CVE-2026-75650 as a template-injection remote code execution flaw in Adobe Commerce/Magento. Added 2026-09-08, due 2026-09-11 [3].
- **How the attacker got in, in Gambit's worked example** [2]:
  1. An unauthenticated, error-based SQL injection in the login flow exposed one-time codes, bypassing MFA.
  2. That led to the admin panel.
  3. A file upload that skipped extension checks gave remote code execution.
  4. Passwordless `sudo` gave root.
  5. WordPress database credentials were found over NFS.
  6. 46 AWS Secrets Manager secrets were taken.
  7. Finally a Magento database, where card numbers encrypted with Blowfish-ECB were decrypted.
- **Other methods NorForge saw** [1]:
  - The task text lists login SQL injection, file uploads, PHP deserialization, auth bypass, server-side template injection and server-side request forgery.
  - Its one verified web shell came through a memcached session store and a Zend gadget chain.
- **MITRE ATT&CK techniques** (the agent's own mapping; no source gives IDs) [9]:
  - T1190: exploit a public-facing application.
  - T1505.003: web shell.
  - T1056.003: web portal capture, the closest fit for skimmers.
  - T1555.006: cloud secrets management stores.
  - T1548.003: sudo and sudo caching.
  - T1053.003: cron.
  - T1485: data destruction.

**Who's affected / exposure:**
- **Online retailers** with custom code and third-party checkout scripts.
  - Gambit says the targeting left out the major hosted and open-source commerce platforms [2].
  - Sectors named: hospitality, an airline, a distributor, fashion and bicycle retail [2], plus restaurant point-of-sale [1].
- **Adobe Commerce/Magento operators** on affected builds. Per NCSC's list: Commerce 2.4.4 to 2.4.9, and B2B 1.3.3 to 1.5.3 [4].
- **Anyone running Cairn:** its local-mode warning says agents run with your permissions and no sandbox [6].

**Fix / patch / mitigation:**
- **Adobe Commerce/Magento:**
  - Apply hotfix VULN-39341 per Adobe bulletin APSB26-146 [1][3][4][5].
  - KEV's required action is "apply mitigations in accordance with vendor instructions" [3].
  - A secondary search snippet mentions post-incident key rotation [13], but its full guidance was not checked; it is not used here as an operational instruction.
- **Block and audit:** block Gambit's indicators (below), and audit checkout JavaScript for the skimmer loader [2].
- **Gambit's advice is strategic** [2]:
  - Adopt a "resilience-first" posture.
  - Plan for data loss caused by cleanup code.
  - Define the minimum viable business.
  - Recognize that patching alone can't keep up when attacks arrive within hours of exposure.
  - Gambit gives no product patch steps for the attack chain; the Magento hotfix above is separately attributed to the vendor bulletin and NCSC record [4][5].
- **NorForge's only actions** are takedown requests to hosting providers, and keeping panel addresses redacted until they're removed [1].

**IOCs / detection:**
- **From Gambit** (checked word for word) [2]:
  - IPs:
    - 155.254.22.215: staging and AI console.
    - 209.126.4.170: DNS exfiltration.
    - 213.21.239.62 and 172.245.224.188: command and control.
    - 172.245.89.137: skimmer host.
  - Domains:
    - medbooksource[.]com: operator console.
    - traffic-analyzer[.]net: command and control.
    - Nine skimmer-host domains, such as x1opay[.]co and js-static[.]com.
  - Nine skimmer URLs.
  - Loader code: `new Function(atob('…'.slice(7)))()`
- **Signs on victim systems** [2]:
  - Database tables with a "ZQ" prefix or "Backup" in the name.
  - Gambit lists eight ways the skimmer was injected, including:
    - checkout script tags;
    - poisoned S3/CDN files;
    - a Kubernetes initContainer;
    - a cron job driven by JBoss logs that re-adds the skimmer after removal.
- **From NorForge** (from a summarized page fetch, so verify before blocking) [1]:
  - Staging IPs 199.247.25.25 and 199.247.27.2.
  - Networks AS56594, AS20473 and AS200019.
  - Control-panel IPs are masked. NorForge shares the full list with researchers on request.
- **Gaps:** the agent's searches turned up no CISA, FBI or vendor detection rules for this campaign.

**Priority for practitioners:**
- **Hunt for compromise (first):** check checkout JavaScript for the indicators above, and look for web shells, the JBoss cron job and ZQ tables [2].
- **Patch now:** Adobe Commerce/Magento on affected builds. The KEV due date has already passed [3][4].
- **After confirmed compromise:** reset affected passwords after cleaning and rebuilding, applying [CISA's general recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide), rather than treating reachability alone as proof of credential exposure. NorForge observed some exposed secrets still valid [1].
- **Notify & monitor:** merchants who find a skimmer.
  - Gambit worked with a fraud specialist to notify card issuers [2].
  - NorForge says it's notifying victims together with Reuters [1].
- **Awareness only:** everyone else.

**Sources:**
1. [primary] NorForge, "Inside Cairn: Open Windows into massive AI-Driven Cyber Operations," 19 Oct 2026. https://norforge.com/blog/inside_cairn
2. [primary] Gambit Security, interim report, 22 Sep 2026. https://gambit.security/blog-posts/autonomous-ai-agents-online-retailers-25-a-company
3. [primary] CISA Known Exploited Vulnerabilities feed, CVE-2026-75650 entry (dateAdded 2026-09-08). https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
4. [primary, CERT] NCSC-NL CSAF record for CVE-2026-75650 (hotfix names, affected builds). https://vulnerabilities.ncsc.nl/csaf/v2/2026/cve-2026-75650.json
5. [primary, not retrieved (HTTP 403)] Adobe APSB26-146. https://helpx.adobe.com/security/products/magento/apsb26-146.html
6. [primary] oritera/Cairn README and GitHub API metadata, accessed 22 Oct 2026. https://github.com/oritera/Cairn and https://api.github.com/repos/oritera/Cairn
7. [primary] usestrix/strix GitHub API metadata. https://api.github.com/repos/usestrix/strix
8. [primary] NousResearch/hermes-agent GitHub API metadata. https://api.github.com/repos/NousResearch/Hermes-Agent
9. [primary, reference] MITRE ATT&CK technique definitions: https://attack.mitre.org/techniques/T1190/ , /T1505/003/ , /T1056/003/ , /T1555/006/ , /T1548/003/ , /T1053/003/ , /T1485/
10. [secondary, not retrieved (blocked)] Reuters, 19 Oct 2026. https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/
11. [secondary] The Next Web, 19 Oct 2026, summarizing Reuters. https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge
12. [secondary] SecurityWeek, 20 Oct 2026. https://www.securityweek.com/ai-platform-cairn-abused-to-hack-over-100-organizations/
13. [secondary, search snippet only] Aicybr, CVE-2026-75650 hotfix and rotation guidance. https://aicybr.com/blog/stylesmuggler-magento-adobe-commerce-zero-day-rce
14. [secondary, search snippet only] Tenable FAQ on CVE-2026-75650. https://www.tenable.com/blog/stylesmuggler-cve-2026-75650-frequently-asked-questions-about-adobe-commerce-and-magento-zero

**Unknowns:**
- **Reuters' text was blocked.** The "100+" count, the named victims, "$50 per hack" and the creator's quote all rest on The Next Web's summary [11].
- **Adobe APSB26-146 was blocked.**
  - NCSC's record was cut off before it listed fixed versions.
  - The CVSS score is unverified, because NVD's pages need JavaScript.
  - Tenable says the CVE was "not listed" in KEV as of 8 Sep, but KEV itself says it was added 8 Sep, so the KEV date is used here [3][14].
- **Cairn as the campaign's build is inferred.** No source states it.
- **Victim totals are unverified.** Gambit's own counts of skimmer victims (5 vs. 19) don't match each other [2].
- **Cost figures don't reconcile:**
  - $5 per task [1].
  - $25 per company [2].
  - $50 per hack, and about $5,000 in total [11].
  - Gambit's $12k–18k estimate against $7,005.71 actually observed [2].
- **Anthropic:**
  - The only mention is Gambit's sentence about "opus-4.6" [2], and no statement from Anthropic was found.
  - A secondary claim that Anthropic closed the operator's account isn't in Gambit's text.
- **Whether CVE-2026-75650 was used against any victim isn't shown.** Gambit says the targeting left out major commerce platforms, yet its attack chain reached a Magento database [2]. NorForge saw Magento-specific tooling [1].
- **No other reports found.** The agent's searches turned up nothing on this campaign from Google GTIG, Microsoft, OpenAI, CrowdStrike, Unit 42, CISA or the FBI.
- **The ATT&CK IDs** are the agent's own mapping, not from a source.
