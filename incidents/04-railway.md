# #4 — Railway: customer environment variables possibly accessed

> **Thread item:** "4. Railway: hackers stole customers' secret keys from a hosting platform used by millions of developers"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** Railway (blog + status page)

**Additional details:** Railway ties it to "a series of attacks" on platform companies aimed at AI-inference API keys. It has invalidated OAuth sessions and API tokens and rotated bucket keys. Per-provider rotation guides are on the [Railway blog](https://blog.railway.com). An analyst links ~$371K of crypto theft to it, unconfirmed by Railway, so move funds out of any wallet whose keys were in env vars.

- **What happened:**
  - **Oct 21, 2026 — detection:** Railway detected anomalous activity in the systems that store customer env vars. In its words, an "unauthorized third party may have accessed encrypted environment variables and, for some of them, obtained the decrypted contents." [1]
    - Status incident QH8L8B3E, titled "Railway Platform Outage," opened at 07:24 UTC. [2]
    - Builds were halted in every region by 09:28 UTC. [2]
  - **Oct 21 — response:** [2][7]
    - 20:19 UTC: OAuth sessions invalidated.
    - 21:59 UTC: security notice telling customers to revoke all env vars.
    - 22:10–22:45 UTC: bucket credentials rotated.
  - **Oct 22 — recovery:** [2][7]
    - 03:32 UTC: Enterprise builds returned.
    - 04:17 UTC: all Railway API tokens invalidated.
    - 06:29 UTC: Pro builds returned.
    - As of 08:01 UTC, Hobby, Free and Trial builds were still pending.
  - **Entry point and attacker:** neither is stated. Railway calls it "part of a series of attacks recently targeting platform companies with the aim of compromising AI inference providers." [1]

- **Identifiers:**
  - Status incident QH8L8B3E [2]; blog post "Security Disclosure: Wednesday October 21st" [1].
  - No CVE, GHSA or CWE appears in Railway's post [1], and a GHSA search found none.
  - No exposure window has been published. The first status update was at 07:24 UTC on Oct 21 [2]. The analyst reports the first theft at 19:36 UTC on Oct 21 [11].

- **Who's affected / exposure:**
  - Railway will email affected customers once confirmed, but advises all users to take the steps below as a precaution. [1]
  - The number of affected accounts hasn't been published.
  - Exposed items: env vars, bucket keys, GitHub connections and registry tokens, Railway API tokens, and OAuth sessions. [2][7]

- **Fix / patch / mitigation** (there's no patch; rotation is the fix):
  1. **All env vars:** roll every env var, including API keys and database and registry credentials, then redeploy. Services only read env vars at startup. [1][4] Railway says it has asked upstream providers to revoke keys. [1]
  2. **PostgreSQL:** go to the Database tab → Config → Regenerate, then redeploy every service that uses it. Turn off Public Access until the credentials are rotated. [4] Railway also has guides for MongoDB, Redis and MySQL, which weren't opened. [3]
  3. **Buckets:** Railway regenerated the keys for every bucket. Copy the new keys and redeploy. [7]
  4. **GitHub:** [6][7]
     - Reconnect GitHub in Account Settings.
     - Railway removed the registry tokens on its side, but they still work on GitHub, so revoke them there.
     - Review github.com/settings/security-log and revoke any OAuth apps or SSH keys you don't recognize.
  5. **AWS:** create a replacement key, then deactivate (not delete) the exposed one. [5]
  6. **OpenAI:** delete and replace project keys, and check usage. [8] Railway also has guides for Anthropic, OpenRouter and Grok, which weren't opened. [3]
  7. **Stripe:** roll secret and restricted keys. Check payments, refunds, bank accounts, webhooks and team members. [9]
  8. **Railway API tokens:** all were invalidated, so create new ones. [2]
  - Railway's own revocations may show up in your audit logs from 22:45 UTC on Oct 21. Those entries are expected. [2]

- **IOCs / detection:**
  - None published. The blog, the status updates and the AWS and GitHub guides list no IPs, user agents or hashes. [1][2][5][6]
  - Hunting leads from the guides:
    - **AWS CloudTrail:** calls such as RunInstances, CreateUser, CreateAccessKey, AttachUserPolicy, CreateRole and PutBucketPolicy, and source IPs outside Railway's egress ranges (Railway hasn't published those ranges). [5]
    - **GitHub security log:** the categories oauth_authorization, public_key and personal_access_token. [6]
    - **PostgreSQL:** pg_stat_activity and pg_roles. [4]
    - **OpenAI:** usage spikes. [8]

- **Priority for practitioners:**
  1. **Rotate secrets now.**
  2. **Hunt for compromise** over the exposure window. CloudTrail keeps 90 days of history [5], and the GitHub org audit log keeps 180 days [6].
  3. **Notify and monitor** while watching for Railway's email.
  - Nothing to patch: no vulnerability has been named. [1]

- **Sources:**
  1. [primary] Railway blog, "Security Disclosure: Wednesday October 21st," Oct 21 2026 (byline Jacob Cooper): https://blog.railway.com/p/security-disclosure-wednesday-october-21st
  2. [primary] Railway status, incident QH8L8B3E, Oct 21–22 2026: https://status.railway.com/incident/QH8L8B3E
  3. [primary] Railway blog index, 13 guides dated Oct 22 2026: https://blog.railway.com
  4. [primary] Railway blog, PostgreSQL rotation guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-rotate-postgresql-database-credentials
  5. [primary] Railway blog, AWS access guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-check-for-anomalous-aws-access
  6. [primary] Railway blog, GitHub access guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-check-for-anomalous-github-access
  7. [primary] Railway blog, bucket and GitHub reset guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-redeploy-buckets-and-reconnect-github-after-the-credential-reset
  8. [primary] Railway blog, OpenAI usage guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-openai-usage
  9. [primary] Railway blog, Stripe guide, Oct 22 2026: https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-usage-in-stripe
  10. [primary, company release] Railway Series B release via PR Newswire, Jan 22 2026: https://www.prnewswire.com/news-releases/railway-raises-100-million-series-b-as-ai-pushes-todays-cloud-infrastructure-past-its-limits-302667768.html
  11. [secondary] crypto.news (Rony Roy), Oct 22 2026: https://crypto.news/railway-security-breach-linked-to-371000-crypto-theft-across-19-chains/
  12. [social, unverified] X post by "Jake (@JustJake)," date not visible; search snippet only, as the fetch returned HTTP 402: https://x.com/JustJake/status/2113028631463436786

- **Unknowns:**
  - **Details Railway hasn't given:** the number of affected accounts, the attacker, the entry point, how values were decrypted, whether plaintext was stored, and when the intrusion started or how long the attacker was inside. [1]
  - **@JustJake:** it's unconfirmed whether this account is CEO Jake Cooper. PR Newswire names Jake Cooper "founder and CEO" [10], and the blog byline reads "Jacob Cooper" [1]. X couldn't be opened, so later posts weren't read. A search summary said those posts call the attack path mitigated and say it affected a "small group of accounts"; that's unverified and wasn't used.
  - **Crypto losses:** the losses, and any link to Railway beyond the analyst estimate, are unconfirmed. [11] An unverified search summary also claimed stolen AI keys were being resold; that wasn't used.
  - **Other coverage:** a domain-filtered search turned up no CISA, NCSC or CERT-EU notice about Railway. BleepingComputer, The Record, SecurityWeek and TechCrunch showed no Railway coverage. This search wasn't exhaustive.
  - **Other victims:** Railway names none. A BleepingComputer headline about a different platform, Zeabur, reports a second breach there in two months; only the headline was seen, because the page returned a 403. No source links it to Railway: https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/
