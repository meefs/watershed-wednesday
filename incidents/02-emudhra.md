# #2 — eMudhra: eight intermediate CA private keys compromised

> **Thread item:** "2. eMudhra: the master keys that prove websites are real were cracked. One was the number 4."
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** eMudhra, Mozilla, Chrome Root Program

**Additional details:** Affected: 6 TLS and 2 code-signing intermediates (EM DV/OV/EV TLS CA - G3B/G3C, EM OV CS CA - G3B/G3C). Chrome CRLSet and Firefox OneCRL have blocked them since Oct 17. No rogue certificates have been seen in CT. [Bugzilla 2083449](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449) · [Scott Helme analysis](https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/).

**What happened:**
- **17 Oct:**
  - Mozilla received a community report at 20:06 UTC. Chrome says its report arrived at 18:05 UTC.
  - Chrome's CRLSet blocked the six TLS intermediates by SPKI at 19:45 UTC. Mozilla finished blocking them in OneCRL at 22:59 UTC [S1].
  - Each key is P-384 with only one nonzero byte. That leaves about 255 candidate keys, which can be recovered from the public certificates in under a second [S17].
- **18–19 Oct:** eMudhra revoked all eight "the following day" [S2]. The notice dates eMudhra's revocations to 18 Oct and Sectigo's to 19 Oct [S3].
- **20 Oct:**
  - Mozilla and Chrome posted publicly [S1].
  - eMudhra's statement was published 20 Oct and updated 21 Oct. It says the root cause is "not yet confirmed" and promises a full report, with no date given [S2].

**Identifiers:**
- **Main bug:** Bugzilla 2083449, "eMudhra: Private key compromise of Intermediate Certificates." Status ASSIGNED, assigned to eMudhra staff [S3].
  - Attachment 9664786 is an unsigned notice dated 2026-10-19. It lists hashes, SPKIs, serials and CCADB IDs [S3].
- **NSS root removals:**
  - 2084101 (G3), FIXED [S4].
  - 2083709 (C1/C3), FIXED. eMudhra requested this one itself, describing the roots as "not part of eMudhra's future hierarchy" [S5].
- **Other bugs:**
  - Inclusion request Bugzilla 1889859 (CCADB case 1777) is still ASSIGNED [S6].
  - Bugzilla 2083382 is access-restricted; the OneCRL records cite it [S3][S9].
- **CCADB IDs** (taken from the notice; not checked in CCADB itself) [S3]:
  - G3C: A012294 DV, A012296 EV, A012298 CS, A012300 OV.
  - G3B: A012302 DV, A012304 EV, A012306 CS, A012308 OV.

**Who's affected / exposure:**
- **Who has to act:** operators of trust stores that can't block intermediates or check revocation. Clients that check revocation and fail closed need to do nothing [S3].
- **eMudhra's scope statement:** other eMudhra products need no action. TLS impact is "limited to TLS certificates chaining to the distrusted ECC root" in "a single customer ecosystem in the United States" [S2].
- **Breakage risk:** removing the three roots can break other servers using eMudhra certificates, because other intermediates under those roots issued customer certificates [S3].
- **Code signing:**
  - The two code-signing intermediates chain to "emSign Root CS CA - G3," and the notice doesn't list that root [S3].
  - Chrome didn't block them, because its verifier doesn't build TLS paths through intermediates restricted to code signing [S1].
  - The OneCRL records whose names can be decoded are all six TLS CAs [S9].
- **Already absent:** emSign Root TLS CA - G3 isn't in NSS tip or in Chromium's root store [S7][S8].
- **Apple and Microsoft:** the notice says both root programs trust these intermediates [S3]. Their responses appear only in secondary sources, which say Apple "followed on October 19" and Microsoft "on October 20" [S19][S20]. This is unverified.

**Fix / patch / mitigation:**
- **Mozilla (20 Oct):** if you can block intermediates, block the ones in impacted-intermediates.json now. If you can't, consider removing trust in the roots listed in roots.json [S1]. Neither JSON file was retrieved, but the notice lists the same items [S3].
- **The notice:** block the eight by SPKI or serial. Otherwise, remove trust in three roots [S3]:
  - AAA Certificate Services
  - emSign Root TLS CA - G3
  - emSign ECC Root CA - G3
- **CA bundles, checked 2026-10-22:**
  - **NSS tip (3.132):** emSign ECC Root CA - G3, C1 and C3 are all gone; G1 remains [S7].
  - **curl cacert.pem and Homebrew ca-certificates 2026-10-20:** none of the three are present [S10].
  - **certifi 2026.10.19:** G3 is gone, but C1 and C3 are still included [S11].
  - **Debian ca-certificates 20260816+nmu1:** blacklists "emSign ECC Root CA - G3" and "Comodo AAA Services root." C1 and C3 aren't mentioned. The stable-security version wasn't checked [S12].
  - **Go:** 1.26.10 was released 2026-10-19 [S13]. CVE-2026-111943 (published 2026-10-21) adds a crypto/x509 denylist for "known intermediate certificates" [S14]. Only a secondary source ties it to eMudhra [S20].
- **Chrome:** CRLSet already protects Chrome users. Root Store v43 removes "the upstream eMudhra root" to protect clients that don't use CRLSet [S1].
  - The v43 file on main has no G3 entry [S8].
  - The rollout to devices around 27 Oct is reported only in a secondary source [S21].
- **eMudhra's offer:** it is "offering every Enterprise TLS customer certificates from an additional publicly trusted CA" [S2].

**IOCs / detection:**
```
EM EV TLS CA - G3B  E7568FE6E12331F4FD7DE61DA4C7559D0F8EB192A218D4741A3BA75184333838
EM OV TLS CA - G3B  98B896625C0C230ADEEC3EB2CF6AAD5001ECF9156A68644E82374CE5833BC25B
EM DV TLS CA - G3B  42C4ACCD12C4F59597925E1A08A7A90102608543809308D50EC427E118BA1493
EM EV TLS CA - G3C  432EC25F0D28DE9006D97BF752F17BBB2CD41F669933FCB072D9A1148D0261F3
EM OV TLS CA - G3C  CB6E15165AC802E9B3F993F16C25D41F4E81C21EBDE71AE1B012AC00BF9C7C3F
EM DV TLS CA - G3C  0164D7CEAE5BB909C272AF151FF44B1177AE9B47D9424B94F1D9558C30934D19
EM OV CS CA - G3B   9E39DE2881273ACC225A149C72BA3E0F51424963669AB633EE1DC7DF5DB067B4
EM OV CS CA - G3C   4B2460A466F95FD40113BCDCCA2CEB29B3B093921DE45474DA7DF48874C630B1
SPKI (roots): AAA Certificate Services bd153ed7b0434f6886b17bce8bbe84ed340c7132d702a8f4fa318f756ecbd6f3
SPKI (roots): emSign Root TLS CA - G3 c619e4780ed8e0abeda24ad732567de4383a7ea941338f6d1a7d1b49ac792fe9
SPKI (roots): emSign ECC Root CA - G3 8d417db2dd8bf5e3084d1e3f196d583849d81bdd4c00c70b9d39369e96b8c782
```
- **Where these come from:** all eight hashes appear word for word in the notice [S3]. Sectigo's cross-signed certificates share the same SPKIs and have their own serials, also listed in the notice [S3].
- **crt.sh:** looking up a hash works. E7568… maps to crt.sh ID 18286207187, issuer "emSign Root TLS CA - G3" [S15].
- **OneCRL:** decode the `subject` field on the security-state/onecrl records [S9]:
  - Six eMudhra TLS entries are dated 2026-10-21 22:34:01 UTC.
  - Six entries that identify only a key are dated 2026-10-17 22:00:05 UTC.
- **Certificate Transparency:**
  - No certificates issued from these intermediates were logged before the 17 Oct block [S1], and none as of 19 Oct [S3].
  - A third party claims to have issued a proof-of-concept leaf certificate, "we-are-lost.com" (SHA-256 A5DA105876E5843E4573D7A8705EFBA27121FE8BDA52D0D9BA675DF65C4EC6D3), under EM EV TLS CA - G3B [S16]. It is unverified; treat it as a claim only.

**Priority for practitioners:**
- **Patch now:**
  - Block the eight intermediates, or remove the three roots and accept that some sites may break.
  - Refresh curl, Homebrew and NSS-derived bundles.
  - Check certifi and Debian for C1 and C3.
- **Notify & monitor:** tell eMudhra TLS and code-signing customers. Watch CT logs for new issuance under emSign Root TLS CA - G3.
- **Hunt for compromise:** no misuse has been confirmed [S1][S2][S3], but the notice warns abuse is "likely in the near future" [S3].
- **Rotate secrets:** only if you hold keys that eMudhra issued.

**Sources:**
1. [primary] Mozilla (D. Jackson) and Chrome Root Program posts, "Compromised eMudhra Intermediate Certificates," 2026-10-20 — https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/0R3XLJL6FuE
2. [primary] eMudhra, "Statement on Recent Certificate Security Incident," 2026-10-20, updated 2026-10-21 — https://emudhra.com/en/post/certificate-security-incident
3. [primary] Bugzilla 2083449 and attachment 9664786 (unsigned notice, 2026-10-19) — https://bugzilla.mozilla.org/show_bug.cgi?id=2083449 ; https://bugzilla.mozilla.org/attachment.cgi?id=9664786
4. [primary] Bugzilla 2084101, G3 NSS removal, FIXED — https://bugzilla.mozilla.org/show_bug.cgi?id=2084101
5. [primary] Bugzilla 2083709, C1/C3 NSS removal, FIXED — https://bugzilla.mozilla.org/show_bug.cgi?id=2083709
6. [primary] Mozilla notice, B. Wilson, 2026-10-02 — https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/h2ucXHS5HZ4 ; Bugzilla 1889859 — https://bugzilla.mozilla.org/show_bug.cgi?id=1889859
7. [primary, agent check 2026-10-22] NSS tip certdata.txt and nss.h — https://hg.mozilla.org/projects/nss/raw-file/tip/lib/ckfw/builtins/certdata.txt
8. [primary, agent check] Chromium root_store.textproto (version_major 43) — https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.textproto
9. [primary, agent check] Mozilla Remote Settings security-state/onecrl — https://firefox.settings.services.mozilla.com/v1/buckets/security-state/collections/onecrl/records
10. [primary, agent check] curl CA bundle — https://curl.se/ca/cacert.pem ; Homebrew formula — https://formulae.brew.sh/api/formula/ca-certificates.json
11. [primary, agent check] certifi 2026.10.19, PyPI 2026-10-20 — https://pypi.org/project/certifi/ ; bundle — https://raw.githubusercontent.com/certifi/python-certifi/2026.10.19/certifi/cacert.pem
12. [primary, agent check] Debian changelog, ca-certificates 20260816+nmu1, 2026-10-20 — https://sources.debian.org/data/main/c/ca-certificates/20260816%2Bnmu1/debian/changelog
13. [primary] Go release history, go1.26.10 — https://go.dev/doc/devel/release
14. [primary] MITRE CVE-2026-111943, published 2026-10-21 — https://cveawg.mitre.org/api/cve/CVE-2026-111943
15. [primary data] crt.sh lookup — https://crt.sh/?q=E7568FE6E12331F4FD7DE61DA4C7559D0F8EB192A218D4741A3BA75184333838
16. [primary, content unverified] Bugzilla attachment 9665772, third-party proof of concept, 2026-10-21 — https://bugzilla.mozilla.org/attachment.cgi?id=9665772
17. [secondary, original analysis] Scott Helme, "Eight Bits of Trust," 2026-10-20 — https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/
18. [secondary] The Register, 2026-10-20 — https://www.theregister.com/security/2026/10/20/indian-certification-authority-emudhras-private-keys-compromised-one-of-them-was-the-number-4/5304312
19. [secondary] Help Net Security, 2026-10-21 — https://www.helpnetsecurity.com/2026/10/21/emudhra-certificates-private-keys-compromised/
20. [secondary] daily.dev aggregator, 2026-10-20 — https://daily.dev/posts/emudhra-intermediate-ca-keys-compromised-go-mozilla-chrome-apple-and-microsoft-distrust-eight-ce-a03ptohlj
21. [secondary, search snippet] econotimes, Chrome to remove emSign ECC Root CA - G3 — https://econotimes.com/Google-to-Remove-emSign-ECC-Root-CA-G3-From-Chrome-Root-Store-1758763
22. [primary, background] Chromium Root Store FAQ (general program guidance; it doesn't mention eMudhra) — https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md

**Unknowns:**
- **Apple and Microsoft:** no primary statement found. The Chrome ~27 Oct date is from a secondary source only. Chromium's commit log returned 401.
- **NSS 3.131.1 tag:** unverified; tip is 3.132. Node, Amazon Linux 2023 and NixOS status came only from secondary sources and wasn't used.
- **Mozilla's JSON files:** impacted-intermediates.json and roots.json weren't retrieved.
- **Timing gaps:** two pairs of times don't line up, and neither has been explained.
  - The key-only OneCRL records are stamped 22:00:05 UTC on 17 Oct, but Mozilla says its block finished at 22:59 UTC.
  - Bugzilla 2083449 was created 18 Oct at 12:06 UTC, but Mozilla says it "received" the report 17 Oct at 20:06 UTC.
  - Bug 2083382, which might explain them, is restricted.
- **Code-signing exposure:** unknown in Firefox, Apple and Microsoft, as is the status of emSign Root CS CA - G3. The six key-only OneCRL records from 17 Oct aren't named.
- **Chrome:** still evaluating eMudhra's remaining CA [S1].
- **Issuance after the block:** the agent spot-checked one hash in crt.sh and didn't sweep CT logs in full.
- **CCADB incident report:** not found. The CCADB IDs come only from the notice.
- **Proof-of-concept attachment:** its claims (a OneCRL gap, the CRL revocation time) are unverified.
- **Not checked:** Java, Windows, Android, Ubuntu, Alpine, Arch and Debian stable.
- **Root cause:** eMudhra's report isn't published yet.
