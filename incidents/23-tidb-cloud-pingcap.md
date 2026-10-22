# #23 — TiDB Cloud (PingCAP): internal systems accessed with stolen service-account credentials

> **Thread item:** "23. TiDB Cloud: database company's cloud breached"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** PingCAP

**Additional details:** Stolen service-account credentials were used Sep 9–Oct 7. FulcrumSec claims 10.6 TB, which PingCAP hasn't confirmed. Four vulnerabilities were fixed by Oct 14. [Audit-log docs](https://docs.pingcap.com/tidbcloud/tidb-cloud-console-auditing/).

**What happened:**
- **Access:** between Sep 9 and Oct 7, 2026, "an unauthorized party used stolen service account credentials to access certain PingCAP internal systems" [1].
- **Response:** PingCAP learned of it on Oct 7 and started disabling the affected credentials that day. It deleted more by Oct 10, and had invalidated every compromised credential it found by Oct 14 [1].
- **What was copied, per PingCAP** [1]:
  - TiDB Cloud usernames and emails
  - text and error messages from the SQL editor
  - links between organizations and projects
  - billing and contract records
  - an exported table of encrypted API-key values
  - source code
- **No persistence found:** PingCAP found "no evidence that the attacker ran commands or maintained persistent access" in the production systems it examined [1].
- **Four vulnerabilities:** an outside firm reported them on Oct 12–13, and PingCAP says it fixed them by Oct 14. It doesn't say whether any of them was how the attacker got in [1].
- **Leak site:** the group reportedly listed PingCAP on its leak site on Oct 19 (search snippet only) [15].

**Identifiers:**
- PingCAP's notice gives no incident ID, CVE, IOC, region or service tier. The four vulnerabilities aren't named. Contact: security@pingcap.com [1].
- PingCAP's vulnerability-disclosure page has no notice about the incident [3].
- Zeabur's intrusion window: Oct 14 01:36 to Oct 15 21:05 UTC [10].
- Railway's notice shows no incident ID [8].

**Who's affected / exposure:**
- **PingCAP's scope statement:** the account and billing data are "the customer data identified as affected to date" [1].
- **Not everyone saw everything:** "These findings do not mean that every customer had every category of information exposed." PingCAP says it will "notify affected customers directly once we have established customer-specific impact" [1].
- **Notice obligation:** PingCAP's Security Addendum requires it to notify customers "without undue delay" once it becomes aware of a breach [2].
- **API keys:** PingCAP reports an exported table of encrypted API-key values; the notice does not specify the encryption method or establish that usable plaintext keys were taken [1].

**Fix / patch / mitigation:**
- **What PingCAP says it has already done** [1]:
  - disabled and invalidated the compromised credentials;
  - fixed the four vulnerabilities by Oct 14.
- **What PingCAP says is ongoing:** to "Expand credential rotation, access controls, code and secret scanning, audit logging, and alerts for unusual access" [1].
- **No customer action items:** PingCAP's notice gives none [1].
- **Available customer information and audit capability:**
  1. PingCAP's notice gives no universal customer API-key rotation instruction [1]. The security overview checked does not describe a rotation procedure [7].
  2. Console audit logs, where enabled, can support an account-specific investigation [6]:
     - They're off by default. Only the Organization Owner or Console Audit Manager can turn them on.
     - They record API keys being created, edited or deleted, and member invites.
     - Logs are kept for 90 days, so entries from Sep 9 expire around Dec 8.
  3. SQL-editor text was among the potentially accessed data; PingCAP does not prescribe a customer review or rotation procedure for it [1].
  4. PingCAP lists security@pingcap.com for incident questions [1].
- **Railway users:**
  - "Immediately roll all environment variables, including any API keys, stored in Railway."
  - Roll private registry credentials.
  - Review your logs [8].
  - Railway's follow-up posts cover OpenRouter, Grok and PostgreSQL credentials [9].
- **Zeabur users:**
  - "Replace all credentials in your environment variables," including signing and encryption keys.
  - Treat GCP servers as compromised.
  - Review GitHub audit logs for Oct 15, 15:05–18:54 UTC [10].

**IOCs / detection:**
- PingCAP's notice contains none [1].
- Zeabur reports attacker SSH keys on 50 GCP servers, and a program planted in PostgreSQL databases in Tokyo [10].

**Priority for practitioners:**
- **TiDB Cloud customers:**
  - **Notify & monitor:** follow PingCAP's account-specific notifications and use the documented audit capability where available [1][6].
  - No universal customer credential-rotation instruction was published in the notice checked [1].
  - Not "Patch now," because PingCAP says the four vulnerabilities were fixed by Oct 14 [1].
- **Railway or Zeabur users:** **Rotate secrets now** [8][10].

**Sources:**
1. [primary] PingCAP, "Security Update" (Oct 2026), published Oct 19, 2026. https://www.pingcap.com/trust-hub/security/security-update-october-2026/
2. [primary] PingCAP Security Addendum, §3 "Security Breach Response," undated. https://www.pingcap.com/ko/legal/security-addendum/
3. [primary] PingCAP vulnerability-disclosure page, fetched Oct 22, 2026. https://www.pingcap.com/security/
4. [primary] TiDB Cloud status page (Oct 8–22 window, no incidents), fetched Oct 22, 2026. https://status.tidbcloud.com
5. [primary] TiDB Cloud status history (no incident entries captured). https://status.tidbcloud.com/history
6. [primary] TiDB Cloud docs, console auditing. https://docs.pingcap.com/tidbcloud/tidb-cloud-console-auditing/
7. [primary] TiDB Cloud docs, security overview. https://docs.pingcap.com/tidbcloud/security-overview/
8. [primary] Railway, "Security Disclosure: Wednesday October 21st," Oct 21, 2026. https://blog.railway.com/p/security-disclosure-wednesday-october-21st
9. [primary] Railway status page (follow-up post titles, Oct 22 updates). https://status.railway.com
10. [primary] Zeabur, "October 2026 security incident (preliminary report)," Oct 19, 2026. https://zeabur.com/blogs/october-2026-security-incident
11. [primary] Zeabur status incident 1037896, "Unauthorized Access to Project Environment Variable Data," Aug 28–Sep 9, 2026. https://status.zeabur.com/incident/1037896
12. [secondary] Chaincatcher, "PingCAP Responds to TiDB Cloud Data Breach," Oct 21, 2026. https://www.chaincatcher.com/en/article/2297743
13. [secondary] CryptoBriefing, "Bitget says no user data exposed in alleged TiDB Cloud breach," Oct 20, 2026. https://cryptobriefing.com/bitget-no-user-data-tidb-cloud-breach/
14. [secondary] HookPhish, FulcrumSec claim article, Oct 19, 2026. https://www.hookphish.com/blog/ransomware-group-fulcrumsec-hits-pingcap-tidb-cloud/
15. [secondary] SOCRadar, PingCAP/TiDB Cloud breach write-up (fetch returned HTTP 403; search snippet only). https://socradar.io/data-breach/pingcap-tidb-cloud-fulcrumsec-ransomware-2026/

**Unknowns:**
- **Scope:** which customers, service tiers and regions were affected. Not stated [1].
- **Entry point:** how the service-account credentials were stolen, and whether any of the four vulnerabilities was how the attacker got in [1].
- **API keys:** how they were encrypted, and whether any have been rotated [1][7].
- **Claims without independent confirmation:**
  - The group's claims, and Bitget's account, have no independent confirmation.
  - SOCRadar and Dark Reading returned HTTP 403, so SOCRadar is cited from a search snippet only and Dark Reading wasn't read.
  - HookPhish gives no posting date and doesn't describe what was posted [14].
- **Railway link:** Railway doesn't say whether TiDB is part of its "series of attacks" [8].
- **Regulators and CERTs:** two searches found no statements.
- **Railway follow-ups:** these are known only from post titles on the status page [9].
