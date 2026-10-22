# #17 — Bullhorn: cyber incident and containment shutdown

> **Thread item:** "17. Bullhorn: platform used by 10,000+ companies knocked offline"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Bullhorn

**Additional details:** CrowdStrike and Kroll are engaged. ATS/CRM was affected, and API-user passwords have been expired. Exfiltration is still undetermined. Bullhorn says the Oct 22 PHP-related outage is separate. [FAQ](https://docs.google.com/document/d/e/2PACX-1vT7GyVY26qMXg-HCCp5v7s-QrnGxfGaRCVUgxRVXohcwW-bQI4dx1zUqL8QmnLEnAyTtLucqkHFewuv/pub).

- **What happened:**
  - **Oct 16:** per The Register, Bullhorn reported problems pushing job listings to Indeed [5].
  - **Oct 17:** Bullhorn said it "detected a cyber incident" and "temporarily disabled access to our systems to contain the activity" [2][3][5].
  - **Oct 20–21:**
    - Emergency maintenance on ATS/CRM and Back Office (00:30 and 01:30 EDT, Oct 20) ended user sessions and blocked logins [1].
    - ATS/CRM logins were blocked again on Oct 21, 1:35–6:10 PM ET [1].
    - As of Oct 20, The Register reports that Bullhorn said service was back in the UK, US and Australia [5].
    - Bullhorn blamed slow or failed logins on a surge of MFA and password resets, which it calls a separate operational incident [2].
  - **Oct 22, 03:18 EDT:** Bullhorn says the cyber incident "remains contained," with no new activity since its Oct 17 announcement. It says CrowdStrike and Kroll are working with its teams [2]. Talent Platform and Back Office still show "Major Outage" [1].

- **Identifiers:**
  - **Status-page IDs** [1][2]:
    - 95xrkmrn9s4y: All Products incident, opened Oct 20 13:15 EDT
    - tn6hvw3zt43g: Talent Platform and BBO
    - dm2bmfp3l02k: Target Recruit
    - kf7r8b6d3j88: TextKernel
    - 1b43mg3d2fn3 and m789tbc9ccjm: Oct 20 emergency maintenance
  - **CVE:** none listed [2].
  - **Threat actor:** none named [2][3][5].

- **Who's affected / exposure:**
  - **Customers:**
    - "The cyber incident affected Bullhorn ATS/CRM."
    - Other products show "no indication" of impact.
    - The number of affected customers hasn't been disclosed [3].
  - **Data:**
    - "We have not yet determined whether customer data was exfiltrated."
    - The FAQ doesn't directly say whether personal data was exposed.
    - Bullhorn says it will contact affected customers [3].
  - **Integrations:**
    - Bullhorn expired the passwords of API users, and is contacting partners and licensed integrators directly [3].
    - Talent Platform, BBO and Target Recruit were offline as of Oct 22 [2].

- **Fix / patch / mitigation** (Bullhorn guidance from [3] unless noted):
  - **Non-SSO users:** at your next login, reset your password with 2FA, then wait one minute before logging in. Some users may still hit a "password reset loop" [2].
  - **API users:** log in as the API user to set a new password; email verification follows. If the API user has no email on file, open a support case.
  - **Integrations you host yourself or a third party hosts:** update the API credentials in code or config, then redeploy. Bullhorn handles the integrations it hosts.
  - **Client Secret:** not required yet, but "We'll eventually require all customers to update their Client Secret." One FAQ passage reads as if rotation is required now, which conflicts with this later answer.
  - **Phishing:** The Register reports a Bullhorn warning that impostors may contact staff by email, text or phone, and that Bullhorn never asks for credentials or MFA codes [5]. The agent didn't find that wording in Bullhorn's own text. Bullhorn names status.bullhorn.com as its channel for updates [3].
  - **PHP:** Bullhorn says "Cybersecurity authorities have advised taking all PHP websites offline until a patch is available" [2]. This couldn't be verified from any other source.

- **IOCs / detection:** none published. Bullhorn's own text lists no hashes, domains, IPs or actor names [2][3].

- **Priority for practitioners:**
  - **Rotate secrets now** for Bullhorn API credentials in integrations you or a third party host [3].
  - **Notify & monitor:** it isn't yet known whether customer data was taken, and impersonation attempts have been reported [3][5].
  - **Patch now:** nothing to patch for ATS/CRM. Bullhorn says the PHP issue doesn't affect it [2].
  - **Hunt for compromise:** no guidance or IOCs have been published [2][3].

- **Sources:**
  1. [primary] Bullhorn status page, https://status.bullhorn.com/ (read as of Oct 22 2026, 03:18 EDT).
  2. [primary] Bullhorn incident "Bullhorn Incident Updates - All Products," 95xrkmrn9s4y, https://status.bullhorn.com/incidents/95xrkmrn9s4y (11 updates, Oct 20 13:15 to Oct 22 03:18 EDT).
  3. [primary; Google Docs copy linked from Bullhorn's status page] Bullhorn cyber-incident FAQ, https://docs.google.com/document/d/e/2PACX-1vT7GyVY26qMXg-HCCp5v7s-QrnGxfGaRCVUgxRVXohcwW-bQI4dx1zUqL8QmnLEnAyTtLucqkHFewuv/pub ("Last updated 2026/10/21 12:08 PM ET").
  4. [primary] Bullhorn, "The Bullhorn story," https://www.bullhorn.com/our-story/ (undated).
  5. [secondary] The Register, Oct 20 2026, https://www.theregister.com/security/2026/10/20/bullhorn-sees-red-after-cyberattack-knocks-recruitment-platform-offline/5304114

- **Unknowns:**
  - **Not yet determined:** whether data was exfiltrated, who the attacker is, the entry point, whether ransomware was involved, and how many customers were affected. A news and aggregator search found no leak-site claim, but ransomware trackers weren't checked directly.
  - **PHP:** the advisory Bullhorn cites, any CVE, and patch status weren't verified, because the session limit stopped the search first. Search turned up no CISA or FBI statement.
  - **Pages not read:** BleepingComputer (https://www.bleepingcomputer.com/news/security/bullhorn-takes-staffing-platform-offline-to-contain-cyberattack/) and Staffing Industry Analysts (https://www.staffingindustry.com/news/global-daily-news/bullhorn-restoring-service-following-cyberattack) both returned HTTP 403. cyberbreaches.org wasn't fetched.
  - **How Bullhorn's text was read:** all of it came through a fetch tool that summarizes pages, not the raw HTML. The FAQ updates itself, so re-check the exact wording before acting on it.
  - **Status-page discrepancies:**
    - The Atom feed (https://status.bullhorn.com/history.atom) showed no October entries, so it doesn't match the status page.
    - The status-page history for Oct 17 reads "No incidents reported," so it's unknown where the Oct 17 announcement was published.
