# #3: California students (ETS SFTP breach, CDE assessment data)

> **Thread item:** "3. California: data on every public school student since 2023 stolen, including disability status"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** ETS breach notice filed with the CA Attorney General

**Additional details:** Breached system: the SFTP site of ETS, CDE's testing contractor, accessed with a compromised login. Fields include disability and 504 status. No SSNs or financial data. ETS helpline: 833-931-8488.

- **What happened:**
  - Educational Testing Service (ETS) is a nonprofit under contract with California. Its SFTP site exchanges statewide assessment data with CDE. An unauthorized party used a compromised login to copy student files from that site between May 22 and Sep 18, 2026 [1].
  - ETS spotted the activity on Sep 25. It disabled the account and took the site offline [1].
  - CDE wrote to county and district officials on Oct 2 [6]. CDE disclosed publicly on Oct 16, the same day ETS began sending notices to families. The notices are expected to run until about early November [2][6][7].
  - ETS says it has added safeguards and enhanced monitoring, and has a third-party review under way [6]. Cal-CSIC, CDT and Cal OES are assisting [1].
  - No threat actor is named. The notice says agencies were "notified" but doesn't say which [1][7].
  - The compromised system belongs to ETS, not CDE. The notice doesn't mention CALPADS [1].

- **Identifiers:**
  - **AG record:** organization "CDE," breach date "Friday, May 22, 2026." The URL slug is sb24-631485; it isn't labeled as a case number [3].
  - **Notice:** no reference number. Recipients get Experian engagement numbers and activation codes, which are redacted in the AG copy [1].
  - **Helpline:** 833-931-8488 [1].
  - **Records and attacker:** no official record count [7]. No threat actor; official disclosures "do not identify the attacker" [7].
  - **Lawsuits** (from secondary sources; dockets not checked):
    - PL01 v. Educational Testing Service, No. 2:26-cv-12163 (C.D. Cal., filed Oct 17, 2026).
    - K. v. Educational Testing Service, No. 1:26-cv-12217 (N.D. Cal., filed Oct 20, 2026) [12].

- **Who's affected / exposure:**
  - **Students:** current and recently enrolled California public school students. Former students who left as far back as 2006 are reportedly included too [1][7][8].
  - **Fields that "may" be included** [1]:
    - Names, date of birth, address, school and grade, and statewide student ID (SSID).
    - Race/ethnicity, home language, country of origin, and English learner (EL) status.
    - Disability and Section 504 status, testing accommodations, and disability type.
    - Title I, McKinney-Vento and military-connected flags.
    - Assessment results.
  - **Not included:** SSNs, driver's license and passport numbers, financial and card data, and passwords. Parent and guardian information wasn't involved [1].
  - **Who must act:**
    - Parents and guardians of minors, and adult former students, should enroll in the monitoring offer below.
    - Districts: per the Oct 2 letter, ETS has halted routine enrollment-data processing and paused some testing [7].
    - CDE and SBE are reviewing whether ETS complied with its contract [1].
    - Not getting a letter doesn't mean you weren't exposed [8].

- **Fix / patch / mitigation:**
  - **Free identity monitoring:** 24 months of Experian IdentityWorks, no credit card required [1].
    - Minors: https://www.experianidworks.com/minorplus
    - Adults: https://www.experianidworks.com/identity
    - Enroll by Mar 19, 2027. The notice body says Mar 19, 2027 but its attachment says Mar 19, 2029, so go by the earlier date.
  - **Helpline:** 833-931-8488, Mon–Fri 6am–6pm PT, TTY 711 [1].
  - **Credit protection** [1, pp. 7–8]:
    - Free credit freezes at Equifax, Experian and TransUnion, available for children under 16 as well.
    - Free fraud alerts.
    - Free reports at annualcreditreport.com.
    - FTC: 1-877-438-4338.
  - **Phishing:** expect calls, emails or texts that mention the school, assessments or the incident. Check URLs, and don't share anything with an unsolicited contact [1].
  - **What ETS has already done:** disabled the account, took the site offline, and built a replacement with stronger controls [1].
  - **No instructions found** for families or districts to reset credentials or apply a patch.
  - **CA AG privacy page:** https://oag.ca.gov/privacy [1]

- **IOCs / detection:** none published, in the notice or in the secondary coverage the agent read. The notice names only "a compromised login credential" [1].

- **Priority for practitioners:** **Notify & monitor.**
  - Families should enroll before Mar 19, 2027 and treat school-themed contacts as suspicious.
  - Districts: awareness.
  - The sources give no credential-rotation instruction for districts; follow ETS/CDE notices for any account-specific action.

- **Sources:**
  1. [primary] ETS, "Notice of Data Breach" (English), issued at CDE's direction. No printed date; the AG posted it as a sample. https://oag.ca.gov/system/files/Notice%20of%20Data%20Breach_3_Redacted.pdf
  2. [primary] CA AG, Data Security Breach list, page 1 (50 entries, newest Oct 19, 2026). "CDE" reported on Oct 16, 2026; no ETS entry on this page. https://oag.ca.gov/privacy/databreach/list
  3. [primary] CA AG, "Submitted Breach Notification Sample" for "CDE," breach date Friday, May 22, 2026. https://oag.ca.gov/ecrime/databreach/reports/sb24-631485
  4. [primary, not retrieved] CDE news release, Oct 16, 2026. https://www.cde.ca.gov/nr/ne/yr26/yr26rel45.asp
  5. [primary, not retrieved; all redirected to a WAF page] CDE pages:
     - ETS hub: https://www.cde.ca.gov/ets
     - Notification page: https://www.cde.ca.gov/nr/in/ets-notification.asp
     - Oct 2, 2026 letter: https://www.cde.ca.gov/nr/in/yr26inltr1002.asp
  6. [secondary] Reuters via WHBL, Oct 16, 2026. https://whbl.com/2026/10/16/hacker-gets-data-on-millions-of-california-students-state-education-department-says/
  7. [secondary] SecurityWeek (Eduard Kovacs), Oct 19, 2026. https://www.securityweek.com/one-compromised-login-exposed-millions-of-california-students-records/
  8. [secondary] LAist (Mariana Dale), Oct 19, 2026. https://laist.com/brief/news/education/california-student-data-breach-2026-what-do-do
  9. [secondary, headline only; page returned HTTP 403] EdSource, date not seen. https://edsource.org/updates/personal-information-for-7-million-california-students-has-been-stolen-following-hack
  10. [primary, separate incident] CalOPS notice, Mar 24, 2026. https://oag.ca.gov/system/files/Notice%20of%20Data%20Breach%20AG%20Submission.pdf
  11. [primary, separate incident] CA AG press release on the Illuminate Education settlement, Nov 6, 2025. https://oag.ca.gov/node/613897
  12. [secondary, single tracker] OpenClassActions lawsuit page. https://openclassactions.com/lawsuits/data-breaches/ets-california-student-data-breach-class-action-lawsuit.php (also allaboutlawyer.com, seen only as a search snippet: https://allaboutlawyer.com/california-student-data-breach-ets-lawsuit/)

- **Unknowns:**
  - **CDE's own pages:** blocked by a WAF redirect, so the FAQ details (the 2006 scope and the testing pause) rest on secondary reports [5][7][8].
  - **Affected count:** no official count in anything the agent read. The "7 million" figure is unverified [9].
  - **The notice:** it has no printed date. The AG copy is a sample, and the versions mailed to families may differ.
  - **Lawsuits:** they appear only on class-action trackers. CourtListener returned HTTP 403, so the dockets weren't checked.
  - **Attacker:** no named threat actor and no leak-site claim found. Leak-site trackers weren't checked directly.
  - **Government statements:** none found from the FBI, CISA or Cal-CSIC.
  - **Not found:**
    - How the credential was obtained.
    - Whether any district credentials were involved.
    - Any IOCs.
  - **Recency:** the latest official item found is from Oct 16; the latest coverage is from Oct 19–20.
