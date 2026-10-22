# #18 — Medi-Cal: Paradigm Healthcare Services (billing contractor) breach

> **Thread item:** "18. Medi-Cal: 970,000 patients' data stolen"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Paradigm Healthcare, HHS OCR, CA Attorney General

**Additional details:** Breached entity: Paradigm Healthcare Services, a Medi-Cal billing contractor, not DHCS. HHS counts 970,403 people. Data: name, date of birth, gender and Medi-Cal ID. No SSNs.

- **What happened:**
  - **The breached entity** is Paradigm Healthcare Services, LLC, a Medi-Cal billing contractor working under a Data Use Agreement with DHCS. DHCS itself isn't reported as breached [1][6].
  - **Timeline** [1]:
    - Oct 8–15, 2025: the unauthorized access took place.
    - Oct 13, 2025: Paradigm "became aware of unauthorized access to its local network."
    - Aug 18, 2026: Paradigm determined that certain files "may have been accessed by an unauthorized party."
  - **Attack vector:** not disclosed [1].
  - **Notification:** letters are dated Sep 14, 2026 [6][7], the same day as the HHS and California AG submissions [2][3].
  - **Data involved:** name, date of birth, gender and Medi-Cal member ID. No SSN or financial data is listed [1].

- **Identifiers:**
  - **HHS OCR breach portal** [2]:
    - Entity: Paradigm Healthcare Services, CA.
    - Type: Business Associate.
    - Affected: 970,403.
    - Submitted: 09/14/2026.
    - Breach: Hacking/IT Incident, network server.
  - **California AG** [3][4]:
    - Listed as "Paradigm Healthcare Services."
    - Breach dates: 10/08/2025 and 10/15/2025. Reported: 09/14/2026.
    - Report: https://oag.ca.gov/ecrime/databreach/reports/sb24-629754
  - **Threat actor:** none named [1][6]. No leak-site post or group claim was found.

- **Who's affected / exposure:**
  - **Affected people:** Medi-Cal members whose records were in the accessed files. The notice calls them "select individuals" [1].
  - **California count:** the California AG page as read shows none [4].
  - **What wasn't affected:** the notice says the SHN platform wasn't impacted [1].
  - **Who has to act:** affected individuals, using the steps below. No public action items were found for providers, health plans or DHCS.

- **Fix / patch / mitigation:**
  - **Individuals** [1]:
    - Place a free one-year fraud alert.
    - Request free security freezes.
    - Get free credit reports at annualcreditreport.com.
    - Review explanation-of-benefits (EOB) statements and bank and card statements.
    - Report any misuse to the police and the FTC.
    - Paradigm's call center: 1-833-851-9382, 5am–5pm PT, Monday–Friday.
    - No credit monitoring or enrollment code is offered.
  - **Vendor** [1]:
    - Paradigm says it took "certain systems offline and notifying law enforcement" and "engaged professionals."
    - No patch, CVE or technical advisory was found, and no DHCS guidance.

- **IOCs / detection:** none in the notice [1] or the AG record [4], and none found in searches.

- **Priority for practitioners:**
  - **Notify & monitor:** Medi-Cal members who received letters, and any Paradigm client.
  - **Awareness only:** everyone else.
  - Nothing in the sources calls for patching, rotating secrets or hunting for compromise at other organizations (the agent's judgment, based on [1] and [6]).

- **Sources:**
  1. [primary] Paradigm Healthcare Services, LLC, "Notice of Data Breach" (page undated, © 2026): https://paradigm-healthcare.com/notice
  2. [primary] HHS OCR breach portal, Paradigm row, submitted 09/14/2026 (read via one WebFetch summary): https://ocrportal.hhs.gov/ocr/breach/breach_report_hip.jsf
  3. [primary] California AG breach list, page 2 of 108, Paradigm row, reported 09/14/2026: https://oag.ca.gov/privacy/databreach/list?page=1
  4. [primary] California AG report sb24-629754 (no California count shown in the read): https://oag.ca.gov/ecrime/databreach/reports/sb24-629754
  5. [primary] Paradigm sample letter, redacted PDF (image-only; text couldn't be extracted): https://oag.ca.gov/system/files/PHS_Redacted_Notice_Letter_40106534v1.pdf
  6. [secondary] SecurityWeek, Oct 20, 2026: https://www.securityweek.com/970000-medi-cal-members-affected-by-paradigm-healthcare-data-breach/
  7. [secondary] Emery | Reddy law firm blog, Sep 18, 2026: https://www.emeryreddy.com/blog/data-breach/paradigm-healthcare-services-data-breach
  8. [secondary] MobyGeek "Black October" roundup, Oct 22, 2026: https://www.mobygeek.com/ict-news/black-october-major-cyber-incidents-flood-the-last-48-hours-16492

- **Unknowns:**
  - **DHCS statement:** none found in two searches, one of them limited to dhcs.ca.gov. The DHCS newsroom wasn't browsed.
  - **Other state AG filings:** the Maine list returned HTTP 403, and other states weren't checked.
  - **California count:** a law firm's post reportedly cites "over 500" in California. Its page returned HTTP 418, so this is unverified.
  - **Notification timing:** HIPAA's 60-day deadline for notifying individuals wasn't verified, because the HHS page returned HTTP 403. So the 336-day gap between discovery and the letters [7] wasn't assessed against it.
  - **Attack details:** the attack vector, whether data was exfiltrated, and who the attacker is aren't disclosed. No leak-site listing was found.
  - **How the records were read:**
    - The sample letter PDF is image-only, so its text couldn't be read.
    - The HHS and AG rows were read through fetches that summarize the page, not checked directly.
    - The notice's wording comes from the HTML page.
  - **HIPAA Journal:** a page with the 970,403 figure appeared only in a search summary and wasn't used.
  - **Unfinished checks:** the web tool hit its session limit before the last three: HIPAA Journal, a DHCS news search and the HHS rule page.
