# #5 — Zeabur: platform database read, company shutting down

> **Thread item:** "5. Zeabur: 321,810 accounts breached. The company is shutting down."
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** Zeabur

**Additional details:** Entry was through internal admin credentials stored in plaintext. An SSH key tagged `zeabur-pentest` was planted on GCP dedicated servers. Shared clusters pause Dec 1 and everything shuts down Dec 31. [Migration guide](https://zeabur.com/blogs/migrate-from-zeabur).

**What happened:**
- **Aug 28 – Sep 9, 2026, first incident:** the attacker got into the shared cluster, then into production. On Aug 29, Zeabur said it found no evidence that the full dataset was obtained, which undercuts the "612 GB" claim [S4].
- **Oct 14 (UTC) – 15, 2026, second incident:**
  - The attacker used internal admin credentials that were stored in plaintext. With them, the attacker reached the shared clusters and some GCP dedicated servers ("signed in as root to 101").
  - The attacker then read the platform database: 3,218,965 env-var records and 321,810 accounts [S1][S2][S3].
- **Oct 17, 2026, wind-down announced** [S1]:
  - New dedicated servers and domains stopped right away.
  - On Dec 1, dedicated-server renewals stop and shared clusters pause.
  - All services are off by Dec 31.

**Identifiers:**
- **HIBP (Have I Been Pwned):** no Zeabur entry in the public breaches API (1,047 entries checked Oct 22, 2026) [S7].
- **Status incidents:**
  - 1091243: opened 2026-10-15 16:08 UTC and marked "Resolved" 2026-10-20 02:09 UTC, though the investigation continues [S3].
  - 1037896: 2026-08-28 07:11 to 2026-09-09 22:26 UTC [S4].
- **Preliminary report:** dated Oct 19 on the page [S2].
- **Deadlines** [S1][S6]:
  - Dec 1: renewals stop and shared clusters pause.
  - Dec 1–31: dedicated servers end on their own expiry dates.
  - Dec 31: final shutdown.
  - Not yet set: the deletion date, the final export deadline and the date Support closes.
- **Taiwan:** no TWCERT/CC notice found [S8]. Taipei City's chief consumer-protection officer commented on Oct 17 [S9].

**Who's affected / exposure:**
- Accounts whose data was in the platform database: 321,810 accounts and 3.2M env-var records [S2].
- Users of shared-cluster databases (n8n and new-api/one-api, per Zeabur's assessment) and of user-deployed PostgreSQL/MySQL [S2][S3].
- Owners of GCP dedicated servers [S2][S3].
- Holders of zSend and Zeabur Email keys [S2][S3].
- In the August incident, the attacker also ran targeted queries against users' env vars and exported them [S4].

**Fix / patch / mitigation:**
1. Replace every password and key stored on Zeabur, including keys you already replaced after August. Recreate access tokens and sign in again, since the session key was rotated [S2][S3].
2. For zSend, create new keys (566 were revoked). For Zeabur Email, create one new key [S2][S3].
3. For shared-cluster databases, change the DB passwords and replace the n8n encryption key [S2].
4. Treat GCP dedicated servers as compromised. Reset the root password and delete any SSH keys you don't recognize, especially any tagged `zeabur-pentest` [S2][S3].
5. Redeploy anything that failed during the outage [S3].
6. Migrate [S1][S6]:
   - Shared-cluster services: back them up; they pause on Dec 1.
   - Dedicated servers: back them up and migrate each one before it expires.
   - Domains: transfer them from the Dashboard.
   - Zeabur provides no official export tool or format. Its guide warns "Backups disappear too."
7. Don't count on a 7-day export window. Zeabur's general policy keeps data for 7 days after termination [S5], but the wind-down post says the deletion date isn't final [S1].
8. Ask Zeabur Support for balance refunds, incident compensation and reimbursement of third-party charges caused by the incident [S1][S3]. A Taipei officer said refunds should in principle be paid in the original currency [S9].

**IOCs / detection** (partial; the report calls these "representative" addresses) [S2]:
- **IPs:** 23.106.46.239, 102.244.78.57, 103.237.102.191, 103.112.139.162, 45.146.232.28, 216.98.11.198, 45.58.38.175, 52.220.72.188, 31.57.201.201
- **SSH key:** `SHA256:EdBc0uephoOMemIRKK0SRV2TRR45n52tJm1yErVU1iM` (its comment ends `@zeabur-pentest`)
- **User agent:** `Boto3/1.43.111 (Linux 6.12.86)`
- No file hashes were published.

**Priority for practitioners:**
- **Rotate secrets** now.
- **Hunt for compromise** if you ran GCP dedicated servers or shared-cluster services on Zeabur.
- **Notify and monitor:** watch provider billing for API keys that were stored on Zeabur [S2][S3].

**Sources:**
1. [primary] Zeabur, "Zeabur is shutting down: what happens next," Oct 17, 2026. https://zeabur.com/blogs/zeabur-is-shutting-down
2. [primary] Zeabur, "October 2026 security incident (preliminary report)," dated Oct 19, 2026. https://zeabur.com/blogs/october-2026-security-incident
3. [primary] Zeabur status, incident 1091243, Oct 15–20, 2026. https://status.zeabur.com/incident/1091243
4. [primary] Zeabur status, incident 1037896, Aug 28–Sep 9, 2026. https://status.zeabur.com/incident/1037896
5. [primary] Zeabur docs, "Security Practices," last updated May 15, 2026. https://zeabur.com/docs/en-US/security-practices
6. [primary] Zeabur, "Migrate from Zeabur," Oct 20, 2026. https://zeabur.com/blogs/migrate-from-zeabur
7. [primary] Have I Been Pwned public breaches API, checked Oct 22, 2026. https://haveibeenpwned.com/api/v3/breaches
8. [primary] TWCERT/CC news page, checked Oct 22, 2026 (page 1 only). https://www.twcert.org.tw/tw/mp-1.html
9. [secondary] Yam News, Oct 17, 2026 12:57 Taiwan time, reporting comments by Taipei City consumer officer 林傳健. https://n.yam.com/Article/20261017250749

(The [S1]–[S9] citations above refer to these numbered sources.)

**Unknowns:**
- **Quote accuracy:** the Zeabur quotes came from a fetch that summarizes the page rather than returning raw HTML, so re-check the wording before quoting. The "downloaded user database backups" and "presigned download URL" lines come from a single fetch.
- **Sources not opened:** BleepingComputer and iThome (HTTP 403), and @zeaburapp on X (HTTP 402). No official X post was verified. The founder's user email is reported only secondhand.
- **Unverified secondary claims:** "SSH keys added to 50 servers," and the meaning of the report's "359 and 48" Hetzner/DigitalOcean row.
- **Search limits:** the HIBP check covered only the public breaches list, not pastes or stealer-log collections. Taiwan searches were limited to gov.tw, twcert.org.tw and nics.nat.gov.tw. Not finding something there doesn't prove it doesn't exist.
- **Not verified:** the total customer base, whether data left Zeabur, and the status of the 612 GB claim beyond the Aug 29 denial.
