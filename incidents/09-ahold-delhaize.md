# #9 — Ahold Delhaize: network security incident and precautionary shutdowns

> **Thread item:** "9. Ahold Delhaize: hackers knocked the owner of Food Lion and Stop & Shop offline"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** Ahold Delhaize

**Additional details:** Brands: Food Lion, Stop & Shop, Hannaford, Giant Food, Albert Heijn. Stores stayed open. No data theft found so far and no actor named. Reported to the Dutch NCSC and police.

- **What happened:**
  - **12 Oct 2026:** Ahold Delhaize said it was "experiencing a security issue within its network" and took "some systems offline to help protect them." Stores stayed open [1].
  - **19 Oct 2026:** its investigation "confirmed the suspicious activity resulted from the malicious actions of others" [3].
    - It "proactively took certain systems offline, including our brands' websites and apps."
    - It says it told the Dutch NCSC within 24 hours and filed a police report.
    - No attacker is named.
  - **20–22 Oct:** several outlets report US sites back online [7][9][10]. One piece on 22 Oct says they're still pending [11]. No group has claimed the attack in the sources the agent read, the latest of which is from 17 Oct [13].

- **Identifiers:**
  - **Company releases:** 12 Oct, 13 Oct (updated 14 Oct) and 19 Oct 2026 [1][2][3]. The 12 Oct release says the matter "qualifies as inside information" under Article 7(1) of the EU Market Abuse Regulation (MAR) [1].
  - **SEC filings:** an EDGAR full-text search for "Ahold Delhaize" and "cybersecurity" in Form 6-K filings, 1–22 Oct 2026, returned zero hits [4]. No Euronext copy was found.
  - **Attribution:** no ransomware group, CVE or case number has been tied to the 2026 event [13].
  - **Don't confuse it with the Nov 2024 incident:**
    - That intrusion happened 5–6 Nov 2024. INC Ransom claimed it, and about 2.2M people were affected, mostly staff and their dependents [15][5].
    - The Brussels Times headline "ransomware attack" is dated 17 Apr 2025 and covers that 2024 breach, not this one [14].

- **Who's affected / exposure:**
  - **US:** press reports name Food Lion, Stop & Shop, Hannaford and Giant Food as having websites, apps and online ordering down [5][8]. Stores stayed open [1][3]. Martin's status is unverified [10][11].
  - **Europe:**
    - Albert Heijn's site and app are back, with home delivery expected from 23 Oct [3].
    - Etos and Gall & Gall sites are up, and Belgian e-commerce is fully back [3].
    - Some Albert Heijn distribution centres are running [12].
  - **Data:** the company says there's "no evidence at this moment" that sensitive customer, associate or partner data was taken [2][3]. Stop & Shop says the same for its customers [9].
  - **Pharmacy patients:** no compromise reported. Stop & Shop says its pharmacies are open [9].

- **Fix / patch / mitigation:**
  - The company gives customers status updates and apologies only, with no security steps [1][2][3].
  - Food Lion's notice sends delivery customers to Instacart, DoorDash or Uber Eats, and promises refunds for web and app orders it couldn't fill [8].
  - No technical guidance for defenders was found from the company, the NCSC or CISA.

- **IOCs / detection:**
  - None published [1][2][3]. Rescana says the NCSC released none, but gives no source for that [13].
  - Unnamed sources told DutchNews that some attacker servers were in the US, Poland, Moldova and Turkey. The article itself warns that where a server sits doesn't show where the attacker is [12].

- **Priority for practitioners:**
  - **Notify & monitor.** There's no CVE, IOC or credential-rotation guidance, and while the investigation is open the company reports no data theft [3].
  - No source provides a hunt or credential-rotation instruction for connected third parties.

- **Sources:**
  1. [primary] Ahold Delhaize newsroom, 12 Oct 2026: https://newsroom.aholddelhaize.com/ahold-delhaize-takes-precautionary-measures-following-cybersecurity-incident/
  2. [primary] Ahold Delhaize newsroom, 13 Oct 2026 (updated 14 Oct): https://newsroom.aholddelhaize.com/update-on-ahold-delhaizes-cybersecurity-incident/
  3. [primary] Ahold Delhaize newsroom, 19 Oct 2026: https://newsroom.aholddelhaize.com/ahold-delhaize-update-on-status-of-cybersecurity-incident/
  4. [primary, SEC index; read through a summarized fetch] EDGAR full-text search, Form 6-K, 1–22 Oct 2026: https://efts.sec.gov/LATEST/search-index?q=%22Ahold%20Delhaize%22%20cybersecurity&dateRange=custom&startdt=2026-10-01&enddt=2026-10-22&forms=6-K
  5. [secondary] The Register, 19 Oct 2026: https://www.theregister.com/security/2026/10/19/grocery-giant-ahold-delhaize-confirms-cyberattack-forced-us-and-european-systems-offline/5303970
  6. [secondary] The Record, 19 Oct 2026: https://therecord.media/ahold-delhaize-cyberattack-grocery
  7. [secondary] Grocery Dive, 20 Oct 2026: https://www.grocerydive.com/news/ahold-delhaize-adusa-cybersecurity-update/833414/
  8. [secondary] Fox Business (quotes Food Lion's notice), 13 Oct 2026: https://www.foxbusiness.com/lifestyle/food-lion-stop-shop-hannaford-websites-face-outages-after-cybersecurity-issue
  9. [secondary] WFSB (Stop & Shop), published 14 Oct, updated 20 Oct 2026: https://www.wfsb.com/2026/10/16/stop-shop-website-app-remain-offline-after-cybersecurity-breach-parent-company/
  10. [secondary] RetailDetail, 21 Oct 2026: https://www.retaildetail.eu/news/food/ahold-delhaizes-u-s-websites-are-also-back-online/
  11. [secondary] Tech Insider, 22 Oct 2026 (contradicts [7][9][10]; thinly sourced): https://tech-insider.org/ahold-delhaize-hack-8-brands-eu-recovery-2026/
  12. [secondary] DutchNews, 13 Oct 2026 (the headline claims more than the article supports): https://www.dutchnews.nl/2026/10/albert-heijn-begins-restocking-as-hack-traced-to-foreign-servers/
  13. [secondary, vendor blog] Rescana, 17 Oct 2026: https://www.rescana.com/post/ahold-delhaize-cybersecurity-incident-october-2026
  14. [secondary] Brussels Times, 17 Apr 2025 (2024 breach): https://brusselstimes.com/belgium/1539103/delhaize-parent-company-hit-by-major-ransomware-attack
  15. [secondary] Grocery Dive, 30 Jun 2025 (2024 breach; cites the Maine AG filing): https://www.grocerydive.com/news/ahold-delhaize-usa-cyberattack-grocery-personal-data-exposed/751971/

- **Unknowns:**
  - **Official filings and statements:** none found from Euronext or the Dutch AFM, no 8-K, and nothing from CISA, the FBI or the NCSC. Dutch police statements from 14–15 Oct are known only through [13] and are unverified.
  - **Pages that couldn't be read (HTTP 403):** foodlion.com, Progressive Grocer, BleepingComputer and the SC breach letter. Stop & Shop's own notice wasn't located.
  - **US restoration:** the company hasn't confirmed it, and reports conflict ([7][9][10] versus [11]).
  - **Original reporting:** the AD.nl original and Beaumont's sources are unverified. Press reports disagree on the start date (11 vs 12 Oct).
  - **Possible later updates:** one search summary cited a company update on 21 Oct, but it wasn't found; the latest verified release is 19 Oct. The Register's "online-services update" wasn't located either.
  - **2024 figures:** these come from press reports quoting the Maine AG filing; the filing itself wasn't retrieved.
