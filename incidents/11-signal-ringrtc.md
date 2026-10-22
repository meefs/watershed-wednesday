# #11 — Signal / RingRTC: hangup may not fully tear down a call (CVE-2026-113380)

> **Thread item:** "11. Signal: a bug could leave your mic and camera on after you hang up"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Signal fix commit, CVE record, GitHub Advisory

**Additional details:** Flaw in RingRTC, Signal's shared calling library. It's triggered by a participant who floods the call's event queue. No exploitation reports were found in the sources checked. [ACN CSIRT advisory](https://www.acn.gov.it/portale/en/w/risolta-vulnerabilita-in-signal-ringrtc).

- **What happened:**
  - **4 Sep 2026:** RingRTC commit 4b1b6fa, "Ensure calls terminate completely in corner cases," added a 5-second termination timeout and a terminate-requested flag. RingRTC v2.72.0 was tagged the same day. Neither the commit title nor the visible diff mentions a CVE or security [4][5][6].
  - **10 Sep and 1 Oct:** Android 8.27.0 (10 Sep) and Desktop 8.29.0 (1 Oct) are the builds checked that pin RingRTC 2.72.0 [7][8][9][10]. Italy's national CSIRT (ACN) also lists iOS 8.30.0 as the first fixed iOS build, which couldn't be verified [15].
  - **20 Oct 2026:** MITRE published CVE-2026-113380 (CVSS 4.0 score 9.3, CWE-754). NVD and GHSA followed the same day [1][2][3].
    - **Trigger:** someone on the call floods the call's state-machine (FSM) event queue, so the victim's local hangup doesn't fully tear down the call [1][17].
    - **Who can trigger it:** any participant in the call, remotely, with no privileges (AV:N/PR:N) [1].
    - **Exploitation:** no reports found in the sources checked [16].

- **Identifiers:**
  - **Advisory IDs:** CVE-2026-113380 and GHSA-5c63-xm6f-r368. The GitHub advisory is still "Unreviewed," with its affected and patched fields set to "Unknown" [1][2][3].
  - **Score:** CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:P/VC:H/VI:H/VA:N/SC:H/SI:N/SA:N/S:P, 9.3 Critical, CWE-754 [1].
  - **Fix:** commit 4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3 [4], tag v2.72.0 [5].
  - **First fixed versions:**
    - RingRTC: 2.72.0 [1][5].
    - Signal Desktop: 8.29.0, which pins RingRTC 2.72.0 [7][15].
    - Signal Android: 8.27.0, which pins org.signal:ringrtc-android 2.72.0 [9][15].
    - Signal iOS: 8.30.0, according to ACN only; unverified [15].
  - **Later versions:** Android 8.31.0 pins RingRTC 2.72.1 [11]. The latest npm release is 2.73.0 [13].

- **Who's affected / exposure:**
  - **Signal users** on Android, Desktop or iOS builds below the first fixed versions above.
  - **Other apps** that bundle RingRTC before 2.72.0, including npm @signalapp/ringrtc and Maven org.signal:ringrtc-android [1][11][13][15].
  - **What exploitation takes:** the attacker has to be on a call with the victim; no local access is needed. In the write-up's scenario, the victim hangs up but "media keeps reaching the attacker" [17].
  - **Classification:** ACN classes it as Information Disclosure [15].

- **Fix / patch / mitigation:**
  - **Users:** update Signal on every device to a current supported release. Android 8.27.0 and Desktop 8.29.0 pin RingRTC 2.72.0 [7][9]. ACN reports iOS 8.30.0 as the cutoff [15]; that iOS threshold was not independently rechecked during publication. Newer builds are already out:
    - Android 8.32.2, marked Latest on GitHub on 19 Oct [12].
    - Desktop 8.32.0, marked Latest on 20 Oct [8].
    - iOS 8.34 on the App Store [14].
  - **Developers:** move to RingRTC 2.72.0 or later [1][4].
  - **Workaround:** Signal hasn't documented one. The write-up suggests confirming the call has ended before discussing anything sensitive, but that's a precaution, not a fix [17].

- **IOCs / detection:** none documented in any source the agent read [1][3][17]. No source says whether the operating system's mic or camera indicator shows the stuck call.

- **Priority for practitioners:**
  - **Patch now.**
  - No exploitation reports were found in the sources checked [16], and no source calls for hunting for compromise or rotating secrets.

- **Sources:**
  1. [primary] MITRE CVE JSON record CVE-2026-113380, published 2026-10-20: https://cveawg.mitre.org/api/cve/CVE-2026-113380
  2. [primary] NVD record (API), published 2026-10-20, status "Awaiting Analysis": https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-113380
  3. [primary] GitHub Advisory GHSA-5c63-xm6f-r368, 20 Oct 2026, Unreviewed: https://github.com/advisories/GHSA-5c63-xm6f-r368
  4. [primary] signalapp/ringrtc fix commit 4b1b6fa, dated 4 Sep 2026: https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3 (date header: https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3.patch)
  5. [primary] signalapp/ringrtc release v2.72.0, tagged 04 Sep (year not on page): https://github.com/signalapp/ringrtc/releases/tag/v2.72.0
  6. [primary] signalapp/ringrtc CHANGELOG, v2.72.0 entry, undated: https://github.com/signalapp/ringrtc/blob/main/CHANGELOG.md
  7. [primary] Signal-Desktop v8.29.0 package.json, pins @signalapp/ringrtc 2.72.0: https://github.com/signalapp/Signal-Desktop/blob/v8.29.0/package.json
  8. [primary] Signal-Desktop releases: v8.29.0 on 01 Oct; v8.32.0 on 20 Oct, Latest (no year shown): https://github.com/signalapp/Signal-Desktop/releases
  9. [primary] Signal-Android v8.27.0 gradle/libs.versions.toml, pins ringrtc-android 2.72.0: https://github.com/signalapp/Signal-Android/blob/v8.27.0/gradle/libs.versions.toml
  10. [primary] Signal-Android v8.27.0 release, 10 Sep, labeled Pre-release; notes mention no calls or security: https://github.com/signalapp/Signal-Android/releases/tag/v8.27.0
  11. [primary] Signal-Android v8.31.0 gradle/libs.versions.toml, pins ringrtc-android 2.72.1: https://github.com/signalapp/Signal-Android/blob/v8.31.0/gradle/libs.versions.toml
  12. [primary] Signal-Android releases: v8.32.2 on 19 Oct, Latest; v8.33.0 pre-release on 21 Oct: https://github.com/signalapp/Signal-Android/releases
  13. [primary] npm registry, @signalapp/ringrtc, dist-tag latest 2.73.0: https://registry.npmjs.org/@signalapp/ringrtc
  14. [primary] Apple App Store listing for Signal, current 8.34 (relative date only): https://apps.apple.com/us/app/signal-private-messenger/id874139669
  15. [secondary, national CSIRT] ACN CSIRT Italia advisory AL03/261020/CSIRT-ITA, 20 Oct 2026. First-fixed versions: RingRTC 2.72.0, Android 8.27.0, iOS 8.30.0, Desktop 8.29.0: https://www.acn.gov.it/portale/en/w/risolta-vulnerabilita-in-signal-ringrtc
  16. [secondary] The Register, 21 Oct 2026: https://www.theregister.com/security/2026/10/21/signal-bug-could-keep-your-mic-and-camera-on-after-hangup/5304528
  17. [secondary] Unattributed GitHub write-up "Flooded Call Event Queue Blocks Local Hang-Up," undated; author not confirmed as the discoverer: https://github.com/Imahian/Notes/tree/main/docs/CVEs/CVE-2026-113380

- **Unknowns:**
  - **Signal's own channels weren't checked:** its blog, support pages, release-note text, and official X or Mastodon posts. The agent hit its rate limit first. The Register says Signal didn't respond to its outreach [16].
  - **Discovery:** the discoverer, the report date and the disclosure timeline appear in none of [1][2][3][17].
  - **iOS 8.30.0:** this comes only from ACN [15].
    - The Signal-iOS v8.30.0 Podfile.lock returned 404.
    - The App Store's 8.30 history entry wasn't retrieved.
  - **Desktop timing:** The Register's "September" claim is unverified [16], and the earliest Desktop build that pins 2.72.0 is unknown.
  - **Android 8.27.0:** labeled Pre-release on GitHub [10]. The Play Store rollout and which RingRTC version 8.26.x pinned weren't checked.
  - **Video:** no source confirms video is affected. No proof-of-concept was run or downloaded.
  - **Severity conflicts:** the VulDB (CVSS v3 4.3) and TheHackerWire (0) ratings appear only in search snippets, and https://vuldb.com/vuln/422659 returned 403.
  - **CISA KEV status** comes only from The Register [16].
  - **Quoting:** the fetch tool paraphrased the second half of MITRE's description, so quote [1] directly before using its exact wording.
  - **npm:** the publish date for 2.72.0 wasn't captured, and 2.73.0 wasn't reviewed.
  - **Older issues:** Signal-iOS issues #4628 (https://github.com/signalapp/Signal-iOS/issues/4628) and #5895 (https://github.com/signalapp/Signal-iOS/issues/5895) turned up in search as older "mic or camera still active" reports. They weren't read, and no source ties them to this CVE.
