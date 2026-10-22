# Publication review — October 2026 edition

**Research snapshot:** October 22, 2026. This record describes a targeted publication review, not a fresh independent audit of all 27 incidents. Original incident sources and unresolved questions remain in the detail notes.

## Targeted source checks

| Area | Result and publication change | Evidence |
|---|---|---|
| LiteLLM rotation | The vendor says to assume exfiltration if the affected release ran on an internet-connected host and rotate everything the host could reach. Rotation is not conditional on an IOC finding. The triage, rotation list and detail priority now agree. | [LiteLLM incident response](https://docs.litellm.ai/blog/security-incident-oct-21-2026) |
| NGINX patches | The vendor confirms stable 1.30.6 and mainline 1.31.7 fixes. CSA Singapore recommends immediate patching for its affected configurations. The triage now prioritizes affected installations consistently with the action checklist. | [NGINX advisories](https://nginx.org/en/security_advisories.html), [CSA alert](https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-150/) |
| Signal / RingRTC | Official code and manifests support the library fix and the Android/Desktop builds pinning RingRTC 2.72.0. The iOS 8.30.0 threshold remains attributed to ACN; it was not independently rechecked. The guide recommends a current supported Signal release rather than implying all application thresholds have equal verification. | [Signal fix](https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3), [Desktop manifest](https://github.com/signalapp/Signal-Desktop/blob/v8.29.0/package.json), [Android manifest](https://github.com/signalapp/Signal-Android/blob/v8.27.0/gradle/libs.versions.toml) |
| HTTP/3 QPACK | Original research and library advisories support the affected-stack update guidance, including quic-go 0.57.0 and Cloudflare quiche 0.29.3. Downstream products require checking the actual bundled library and vendor advisory. Unpatched status is an October 2026 snapshot. | [FoxIO research](https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers), [quic-go advisory](https://github.com/quic-go/quic-go/security/advisories/GHSA-g754-hx8w-x2g6), [quiche advisory](https://github.com/cloudflare/quiche/security/advisories/GHSA-4fgf-9xrr-88gf) |
| AOMEI scope | AOMEI recommends updating and scanning. GTIG documents endpoint compromise and NTLM credential coercion but gives no blanket rotation or reimaging prescription. AOMEI was removed from the blanket rotation checklist; its vendor scan, hunt and driver guidance remain. An update alone does not establish a clean endpoint. | [AOMEI response](https://www.aomeitech.com/company/investigating-ephemeral-tampering.html), [GTIG research](https://cloud.google.com/blog/topics/threat-intelligence/investigating-ephemeral-supply-chain-tampering) |

## Editorial consistency

The supply-chain summary now describes exposure review across distinct affected periods. This edition collects disclosures and campaigns; it does not imply that every compromise began during the same week. Supply-chain risk extends beyond this collection, but this guide makes no new statistical claim about its prevalence.

KEV dates are labeled as dates recorded in this research snapshot. CISA remediation obligations concern covered federal agencies; other organizations should prioritize known exploitation under their own response process. Direct CISA guidance pages were inaccessible during the targeted review, so this publication does not claim a fresh verification of their current directive text. See [CISA's KEV guidance](https://www.cisa.gov/known-exploited-vulnerabilities-catalog/reducing-significant-risk-known-exploited-vulnerabilities).

## Limits and source availability

The MITRE CVE API and ACN Signal advisory were not accessible during the targeted spot check. Existing source caveats remain visible. The [original link-availability report](link-check.md) is retained with its original timestamp and status counts; incomplete 303 responses are not successful retrievals. Reachability is not evidence that a source supports a technical claim.

A bounded cross-check of recommendations also removed unsupported universal TiDB API-key rotation, district-wide ETS rotation, Ahold third-party hunts and NGINX session-ticket key rotation. General post-compromise password recovery is explicitly attributed to [CISA recovery guidance](https://www.cisa.gov/stopransomware/ransomware-guide). Tor SSH password handling is scoped to actual interception exposure, with [OpenSSH host verification](https://man.openbsd.org/ssh#VERIFYING_HOST_KEYS) and [NIST compromised-password guidance](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/) distinguished from Tor-specific instructions.

The originating X post is attributed near the top of the guide. The post itself was blocked by X during the publication review; it is credited as the collection's starting point rather than used as the authority for operational recommendations.

## Public artifact boundary

The public repository contains the operations guide, public incident notes, publication documentation and site source. Internal handoff notes, downloaded raw captures, local credentials and generated preview files are excluded. The site build deploys only its generated `dist/` output and offers Markdown downloads of the public guide and notes.

## Site verification

The publication build checked all 27 incident pages, 27 directory entries and 613 local content/asset links. A separate fragment check found no unresolved internal anchors. The staged public files and generated site were checked for private-key blocks and accidental local references; raw captures and handoff notes were excluded. The installed dependency audit reported no known vulnerabilities at publication time.

Browser checks used installed headless Chrome with software WebGL at desktop and 390-pixel mobile widths. All nine fractal fields rendered; separated animation frames changed, settled paused frames matched, and pause persisted after reload. An alternate light theme, large text, 5-pixel terrain and brightness controls worked. Search, response filters, incident navigation, reduced motion, the WebGL-disabled static fallback and bounded scroll movement were exercised. No browser console errors, failed requests or page overflow were observed. Without JavaScript, all 27 incident links remained available.

These checks cover the tested browser and viewports. Native Safari, physical mobile devices and hardware-specific rendering performance were not tested.
