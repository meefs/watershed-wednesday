# #24 — State Bank of India: customer-data leak acknowledged, records found on the dark web

> **Thread item:** "24. State Bank of India: India's biggest bank confirms a data breach"
> **Tier:** Also serious · **Researched:** 2026-10-22

**Confirmed by:** SBI stock-exchange filing

**Additional details:** The filing reports 3,897 customer PII records within ~375K dark-web records. A seller called "Siriusim" is claiming the data on BreachForums. No passwords, OTPs or card numbers were exposed. Watch for a fake "report.phishing@sbi.co.in" link that's circulating.

- **What happened:**
  - **16 Oct 2026:** three parties reportedly alerted SBI: its threat-intelligence provider, India's Defence Cyber Agency, and CERT-In, the national computer emergency team [6][7][8].
  - **21 Oct 2026, stock-exchange filing:** SBI filed with the Bombay (BSE) and National (NSE) stock exchanges.
    - The Internet Freedom Foundation (IFF) says it was titled "Incident involving Data Loss" [9].
    - It cites "suspected exposure" of customer data on the dark web [6].
    - It reports 3,897 customer records with personal information, found within about 375,000 records on the dark web [7].
    - It says there's no material impact on SBI's core business [6][7].
  - **21 Oct 2026, homepage notice:** a banner on SBI's homepage says the incident "has impacted a very very small number of customers" and "Customer balances are completely safe" [1]. The date comes from the image file's timestamp.

- **Identifiers:**
  - **Filing:** Regulation 30 notice to BSE and NSE, 21 Oct 2026. The title comes from IFF [9].
    - The BSE PDF link found via a search index is source [4]; it returned 403.
    - Reference "CC/S&B/AND/2026-27/21.10.2026" appears only in a search snippet.
  - **Claimed attacker** (a claim only, not confirmed): "Siriusim," posting on the BreachForums leak site. The X account CyberPulse56 flagged it first [6].
  - **Counts:**
    - 3,897 customer records with personal information (from the filing, per [7])
    - about 375,000 records on the dark web [7]
    - 2,722 PDFs (a claim, [6])

- **Who's affected / exposure:**
  - **SBI customers.**
  - **Data fields reported:**
    - names, date of birth, gender, address, mobile number, email [7]
    - CIF number, lead IDs and loan-linked metadata [7]
    - branch details and customer IDs [8]
  - **Not included:** passwords, one-time codes (OTPs), card numbers or national ID numbers [7][8].
  - **Customer notification:**
    - The filing doesn't say whether customers were told [6].
    - IFF found no customer notice on 21 Oct [9].
    - The homepage banner [1] is the only customer-facing notice found.
  - **No partners or vendors** are named.

- **Fix / patch / mitigation:**
  - **SBI:**
    - The banner offers reassurance but no steps [1].
    - The homepage footer says SBI never asks for your user ID, password or PIN by phone, SMS or email. It links to pages for reporting unauthorised transactions and blocking a debit card [1].
    - SBI's investor-relations page (last updated 14 Sep 2026) lists no October disclosure [11].
  - **RBI (Reserve Bank of India):**
    - No statement about this incident. The agent checked the titles of 32 RBI press releases dated 16–22 Oct and none mentioned it [3].
    - RBI's general guidance, Advisory No. 3/2026 (25 Mar 2026, non-binding), says banks should notify customers "through SMS, email, app alerts, calls, and website updates," and offer password resets, credential blocking and helpline support (§6(c)) [2].
  - **CERT-In:**
    - No advisory about this incident found. Its homepage timed out twice.
    - An October advisory that came up in search, CIAD-2026-0046, targets non-bank lenders, fintechs and payment firms according to its search snippet. The agent didn't open it [5].
  - **General advice from a news article** (not SBI's):
    - Don't share OTPs or PINs, even if the caller says they're SBI staff.
    - Call 1930, India's cyber-fraud helpline, to report unauthorised transactions [10].
    - ⚠️ That article's "report.phishing@sbi.co.in" link points to a domain that isn't SBI's. Don't use it [10].

- **IOCs / detection:** none published by SBI, RBI or CERT-In that the agent could read.

- **Priority for practitioners:** **Notify & monitor.**
  - Watch for impersonation, and for KYC or loan scams that use the leaked fields.
  - Treat the dark-web dump as unverified.
  - Nothing in SBI's notice or the reported data fields calls for rotating credentials [1][7].

- **Sources** ([primary] = official or primary text):
  1. [primary] SBI homepage, "Important Information for Customers" banner and footer (sbi.co.in redirects to sbi.bank.in). https://sbi.bank.in/ . Banner image: https://sbi.bank.in/documents/16012/58498825/Imp_information.jpg/e7ef68a8-1b39-c31f-a549-ef9e4ec3b405?t=1792592318861 . The footer text comes from a fetch extraction, not a visual check.
  2. [primary text, non-RBI host] RBI Advisory No. 3/2026, 25 Mar 2026, copy hosted by Dentons. https://insights.dentons.com/528/35319/uploads/rbi-advisory-on-best-practices-for-customer-data-protection.pdf
  3. [primary] RBI press release listing (titles checked for 16–22 Oct 2026). https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx
  4. [primary, read in full] SBI Regulation 30 filing "Incident involving Data Loss," 21 Oct 2026 08:38 IST. https://www.bseindia.com/xml-data/corpfiling/AttachLive/e16e3a1a-ee15-4971-977c-5f9f6aef1fb9.pdf
  5. [primary, not opened] CERT-In CIAD-2026-0046, from a search index. https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES02&VLCODE=CIAD-2026-0046
  6. [secondary] MediaNama, 21 Oct 2026. https://www.medianama.com/2026/10/223-sbi-data-breach-3897-customers-dark-web/
  7. [secondary] Outlook Money, 21 Oct 2026 (1:21 pm). https://www.outlookmoney.com/personal-finance/sbi-confirms-cyberattack-3897-customer-records-stolen-leaked-on-dark-web
  8. [secondary] Neo Politico, 22 Oct 2026. https://neopolitico.com/india/sbi-confirms-data-breach-identifies-3897-customer-records-on-dark-web-independent-probe-underway/
  9. [secondary, advocacy group] Internet Freedom Foundation, 21 Oct 2026. https://internetfreedom.in/sbi-told-investors-its-data-breach-doesnt-matter-what-about-the-3-897-customers-it-affected/
  10. [secondary] The Week, 21 Oct 2026. https://www.theweek.in/news/biz-tech/2026/10/21/is-your-bank-account-safe-3897-sbi-customers-data-leaked-on-dark-web.html
  11. [primary] SBI announcements and investor-relations pages, checked for October items (none found). https://sbi.bank.in/web/home/announcements and https://sbi.bank.in/web/investor-relations/investor-relations

- **Unknowns:**
  - **The filing:** resolved by the main-session download (see Verified). Its reference number has no serial suffix after `2026-27/`.
  - **The banner's date:** the agent decoded it from the image file's timestamp (21 Oct 2026, about 19:48 IST). The page itself shows no date.
    - When it was posted is unknown.
    - Whether SBI also sent customers an SMS or email is unknown.
  - **RBI:** only press-release titles were checked. RBI's own copy of Advisory 3/2026 wasn't retrieved; the Dentons-hosted copy carries a recipient watermark.
  - **CERT-In:** the homepage and CIAD-2026-0046 both timed out. A CERT-In statement on this incident is neither confirmed nor ruled out.
  - **Number of affected customers:** SBI says only a "very very small number." The 3,897 figure comes from news reports.
  - **Unverified claims:**
    - the Siriusim claim
    - the 16 Oct date of the BreachForums post (from a search summary only)
    - the 2,722 PDFs
    - the Free Press Journal's test of the leaked data
  - **"India's biggest bank"** wasn't checked.
