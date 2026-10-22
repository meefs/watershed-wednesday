# #27: North Korea / Lazarus, "Operation FlashHole" against South Korean firms

> **Thread item:** "27. North Korea: state hackers launch a new attack campaign on South Korea"
> **Tier:** Also serious · **Researched:** 2026-10-22

**Confirmed by:** Kaspersky threat-intel report

**Additional details:** Lazarus, tied to 2025's SyncHole campaign with medium-to-high confidence. It abuses INISAFE CrossWeb EX and lures victims with résumé pages hosted on GitHub. Tooling: LPEClient and the Cubridge backdoor. Part of the wider "Cascade Hole" campaign.

- **What happened:**
  - **The report:** on 21 Oct 2026, Kaspersky published "Operation FlashHole: Lazarus breaks security, defies control" [1].
    - That's the page's own title. The search index showed a different one.
    - It attributes the campaign to Lazarus.
    - Its "medium-to-high" confidence rating covers a narrower claim: that SyncHole and FlashHole are the same actor. The basis is a shared attack vector, targets, infection chain and use of the LPEClient malware.
    - FlashHole sits inside a wider campaign Kaspersky calls "Cascade Hole."
  - **Timing and victims** [1][2]:
    - Activity dates back to at least July 2025.
    - At least three South Korean companies were hit: makers of software, construction products and wired-network equipment.
    - The report believes considerably more were hit.
  - **How it gets in** [1]:
    1. Phishing emails tailored to each target link to fake résumé and portfolio pages hosted on GitHub Pages.
    2. Visiting the page likely starts the INISAFE CrossWeb EX process. Exactly what triggers it hasn't been determined.
    3. INISAFECrossWebEXSvc.exe launches the legitimate Windows program fsquirt.exe, which is then injected with the TechHub malware.
    4. From there the chain runs TouchHub/TouchShift, then ClientHub plus LPEClient, then Cubridge. All of it runs in memory.

- **Identifiers:**
  - **Actor:** Lazarus Group, North Korea [1][7].
    - No source the agent read links it to Kimsuky/APT43 or Andariel.
    - Other aliases, from the agent's background knowledge and unverified: Hidden Cobra, Zinc, Labyrinth Chollima, APT38 [11].
  - **Campaign:** Operation FlashHole, part of "Cascade Hole" [1]. Its predecessor, Operation SyncHole (2025), was a watering-hole campaign [1][5].
  - **Malware families in this campaign** [1]:
    - TechHub (also tracked as CLOUDBURST / NickelLoader)
    - TouchHub and TouchShift
    - Cubridge (also SIDESHOW / LightlessCan)
    - ClientHub, which Kaspersky assesses with medium-high confidence is an advanced version of CookiePlus
    - LPEClient, first seen in 2019
  - **Related Lazarus families the report also mentions** [1]:
    - MISTPEN and SIGNBT
    - IMETHOD, a ThreatNeedle variant used in SyncHole
    - ForestTiger
    - COPPERHEDGE, which AhnLab links to Gunra ransomware
  - **Encryption** [1]:
    - LPEClient combines ML-KEM-1024, AES-CBC-256, Threefish and GOST/Magma, among others.
    - TechHub uses RSA with AES.
  - **CVEs:** none are named in the report [1].
    - It mentions a zero-day only by citing Check Point, and gives no CVE ID.
    - Earlier Lazarus campaigns used zero-days in VestCert and TCO!Stream in 2023, also without CVE IDs [3], and flaws in Cross EX and Innorix against SyncHole victims in 2025 [5].
  - **MITRE ATT&CK:** the report has no technique table or IDs [1]. The agent's own mapping, not from a source:
    - T1566.002: spearphishing link
    - T1189: drive-by compromise (possible)
    - T1055: process injection
    - T1574.002: DLL side-loading
    - T1543.003: Windows service
    - T1102.002: web service used for command and control
    - T1555.003: credentials from web browsers
    - T1620: reflective code loading (possible)

- **Who's affected / exposure:**
  - **Confirmed victims:** at least three South Korean makers of software, construction products and wired-network equipment [1][2].
  - **Exposed:**
    - South Korean computers running INISAFE CrossWeb EX. Korean banking and government websites require it. The report names V3, bundle 3.4.1.2 [1][2].
    - Staff who open the lure links [1].
  - **Earlier campaign:** SyncHole reportedly hit six South Korean firms [5].
  - **Outlook:** South Korea's National Intelligence Service (NIS) expects state-backed threats to keep targeting Korean technology and infrastructure in 2026 (seen as a headline only) [6].

- **Fix / patch / mitigation:**
  - **The report gives none.** The agent read the full text: there are no recommendations, no patch and no CVE [1].
  - **The only defensive content** is Kaspersky's detection names [1]:
    - MEM:Trojan.Win64.Shellcode.gen
    - Trojan.Win64.DLLhijack.*
    - Trojan.Win64.Lazarus.*
  - **No fixed CrossWeb EX version is named.** CrossWeb EX wasn't among the products whose flaws were exploited in 2023 [3].

- **IOCs / detection** (extracted from the fetched page; check them on the page before blocking):
  - **Hashes:** 7 of them, 32 hex characters each, so likely MD5; the page doesn't label the algorithm [1].
    - TouchShift (mscoree.dll):
      - ec84d6cb2ae7974767aedac246b50a3e
      - a28cba214058fcae2883d8cffc883abd
      - c105d6b16f544582772de0159f24c00a
      - 2f8475a90a25624ed02f1d18d4e6d65d
      - 676fabe30a28b53925fba98e34b35986
      - b4a7eff35f048f06fb0a2d7631f23a7d
    - ClientHub (liblzma.dll):
      - ff07641dc56914dd90ee0bd7404d7ad7
  - **Domains** (defanged; several are legitimate sites that were compromised) [1]:
    - javadevhouse[.]co[.]kr
    - pythonapischool[.]com
    - cubedesign[.]co[.]kr
    - fp-news[.]co[.]kr
    - k-wbc[.]co[.]kr
    - rcsh[.]co[.]kr
    - www[.]ksog[.]org
  - **File paths** [1]:
    - `C:\ProgramData\Dell\mscoree.dll`
    - `C:\Windows\System32\RasConv\mscoree.dll`
    - `C:\Windows\System32\RasConv\ActivationStore.dat`
    - `C:\Windows\System32\DrvConh\mscoree.dll`
    - `C:\Program Files\Common Files\System\msadc\msadc.inc`
  - **Behaviors** [1]:
    - INISAFECrossWebEXSvc.exe launching fsquirt.exe.
    - A service with the command line "ImeBroker.exe -TimeBroker" and the description "Microsoft Service".
    - TechHub calling the GitHub Issues API.
    - LPEClient overwriting the start of the MD4Update function in jscript9.dll.
  - **Not in the report** [1]:
    - No IP addresses, GitHub account names, YARA or Sigma rules.
    - The hash and domain entries link to Kaspersky's OpenTIP lookup service, not to a feed.
    - Hard-coded tokens and passwords appear on the page but aren't reproduced here.

- **Priority for practitioners:**
  - **Research-based detection:** Kaspersky describes South Korean software, construction and wired-network victims and publishes CrossWeb EX process, service and file indicators [1]. These support an investigation where that software or behavior is present; the report does not establish that every CrossWeb EX host is compromised.
    - Hunt the process and service behaviors first. fsquirt.exe is a legitimate program, so hash matching will miss the injection [1].
  - **After confirmed compromise:** reset affected passwords after cleaning and rebuilding, applying [CISA's general recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide). Kaspersky describes Cubridge accessing Chrome's stored encryption key through Windows DPAPI [1].
  - **Awareness only** for everyone else.

- **Sources:**
  1. [primary] Kaspersky Securelist, "Operation FlashHole: Lazarus breaks security, defies control" (author Sojun Ryu), 21 Oct 2026. Full body read: https://securelist.com/lazarus-operation-flashhole/121541/
  2. [secondary] VOA Korea, Korean-language report, date not seen: https://www.voakorea.com/a/8213679.html
  3. [primary, threat intel] AhnLab ASEC, "Lazarus Threat Group Exploiting Vulnerability of Korean Finance Security Solution," Jun 08 2023: https://asec.ahnlab.com/en/54195
  4. [primary, government, cited in 3, not opened] KISA/KrCERT KNVD advisory IDX=5881 (posted "March 13" per [3], so 2023 by context): https://knvd.krcert.or.kr/detailSecNo.do?IDX=5881
  5. [secondary] The Hacker News, "Lazarus Hits 6 South Korean Firms via Cross EX, Innorix Flaws and ThreatNeedle Malware," Apr 2025 (date from URL): https://thehackernews.com/2025/04/lazarus-hits-6-south-korean-firms-via.html
  6. [primary, headline only] Boannews reprint of the NIS 2026 outlook, date not seen: http://www.boannews.com/news/articleView.html?idxno=141394
  7. [secondary, headline only] The Record, "North Korea's Lazarus Group sharing tools with ransomware hackers, South Korean agencies warn," date not seen: https://therecord.media/north-korea-hackers-ransomware
  8. [secondary, headline only] BusinessToday, cyber-alert roundup, Oct 22 2026: https://businesstoday.in/technology/news/story/from-compromised-certificates-to-malicious-software-inside-octobers-cybersecurity-alerts-563027-2026-10-22
  9. [secondary, headline] Asiae, Oct 13 2026 (date from URL): https://view.asiae.co.kr/article/2026101308452003978
  10. [secondary, unverified] RST Cloud post on X, Oct 15 2026 (per search summary): https://x.com/rst_cloud/status/2112317465774489638
  11. [secondary, not opened] Wikipedia, "Lazarus Group": https://en.wikipedia.org/wiki/Lazarus_Group

- **Unknowns:**
  - **Hashes and IOCs:** the hash algorithm isn't labeled, and the IOCs come from an extraction of the page. Check them on the page before blocking.
  - **When it started:** the report says "since at least July 2025," but also mentions a C2 account created "last September" (Sept 2025). These aren't reconciled.
  - **KISA/KrCERT:** one Korean-language search found no FlashHole notice. The closest is [4], from 2023.
    - Next step: search 보호나라 (boho.or.kr, KISA's public security portal).
    - The report says KrCERT once analyzed LPEClient's encryption and called it "DES-like." That analysis wasn't located.
  - **The zero-day:** the one Kaspersky cites via Check Point is unnamed.
  - **SyncHole:** its CVE IDs weren't checked, and [5] wasn't opened.
  - **Possible Gunra link:** The Record's story [7] and AhnLab's "Operation Double Barrel" (named in one search summary) may relate to the COPPERHEDGE–Gunra link. Unconfirmed.
  - **Aliases:** the background aliases listed under Identifiers are unverified.
