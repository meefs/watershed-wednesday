# #13: HTTP/3, "Header Accordions" QPACK amplification (FoxIO)

> **Thread item:** "13. HTTP/3: a single connection can crash 7 of the 10 web server types tested"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** FoxIO research; quic-go and quiche advisories

**Additional details:** FoxIO's "Header Accordions" QPACK amplification attack, with a public PoC. Affected: quic-go (so Caddy, Traefik, cloudflared), quiche, lsquic/OpenLiteSpeed, Bun, aioquic/mitmproxy, h3 and Wireshark. Not affected: Google quiche, IIS, ngtcp2/nghttp3, Envoy.

- **What happened:**
  - **The disclosure:** on Oct 20, 2026, Sébastien Féry of FoxIO published "Header Accordions: QPACK amplification attacks against HTTP/3 servers," with proof-of-concept code [1][2].
  - **The attack:** a remote client with no credentials can make an HTTP/3 server allocate "tens to thousands of times more memory than it sends." In FoxIO's words, "One connection is enough to OOM or pin a default-configured server" [1].
  - **Root cause** [1][3][4]: implementations either don't limit the size of decoded headers, limit it incompletely, or check the limit too late. They also leave out the 32-byte overhead counted for each header field.

- **Identifiers:**
  - **Research:** "Header Accordions" (QPACK amplification), by Sébastien Féry, FoxIO [1].
  - **CVEs:**
    - CVE-2025-64702: quic-go [3]
    - CVE-2026-12523: Cloudflare quiche [4]
    - CVE-2025-13945: Wireshark, per FoxIO's mapping [5]
    - FoxIO lists no CVE for lsquic/OpenLiteSpeed, Bun, aioquic/mitmproxy or h3 [1].
  - **CERT/CC VU#:** none found.
  - **Not this research,** though easy to confuse with it:
    - XRING / XQUIC, July 2026 [16]
    - "CDN Tsunami," an HTTP/3-to-HTTP/1.1 amplification attack [17]
    - nginx CVE-2026-42530, reported by a secondary source only [18]

- **Who's affected / exposure** (product, whether vulnerable, fix or advisory):
  - **quic-go:** vulnerable through 0.56.0; fixed in 0.57.0 [3]. FoxIO notes it sits behind Caddy, Traefik and cloudflared [1].
    - **Caddy:** the v2.11.7 go.mod pins quic-go v0.63.0 [9]. Fixed at that tag, but the shipped binaries weren't checked. No Caddy advisory surfaced. The Fedora EPEL tracker still reads ASSIGNED, last changed June 13 [13].
    - **Traefik:** the v3.7.16 go.mod pins quic-go v0.62.0 [9], so it's fixed. The advisory in its release notes, GHSA-hrpp-p4fc-wwf8, is about an unrelated ForwardAuth identity leak [10].
    - **cloudflared:** tag 2026.10.3 requires quic-go v0.59.1 but swaps it for a fork by chungthuang [9]. Whether the fork has the fix is unverified.
  - **Cloudflare quiche:** vulnerable below 0.29.3; fixed in 0.29.3 (Jul 14, 2026; CVSS 7.5). The same advisory also covers a separate bug in frame pre-allocation [4].
  - **lsquic:** vulnerable below 4.9.0; fixed in 4.9.0 (Jul 15, 2026). The latest release is 4.10.2 [6].
    - The 4.9.0 changelog entry reads "Limit number of buffered header sets." It doesn't mention decoded-size expansion, so tying it to this attack is FoxIO's mapping [6].
  - **OpenLiteSpeed:** vulnerable below 1.9.2 [1]. Version 1.9.2 bundles lsquic 4.9.3, and 1.9.3 bundles lsquic 4.10.0 [7].
  - **Bun:** vulnerable. Version 1.4.3 was still unpatched as of Oct 20; the issue was reported May 24 [1].
    - Version 1.4.4 shipped Oct 22 [8]. Its notes list security fixes for TLS, WebSocket, database clients and the package manager. No QPACK or HTTP/3 fix appeared in the part of the notes that was read [8]. Unconfirmed.
  - **aioquic:** vulnerable and unpatched [1]. mitmproxy and hypercorn use it. The latest PyPI release is 1.7.0 (Oct 16), with no security note [11].
  - **mitmproxy:** vulnerable and unpatched [1]. Not checked directly.
  - **h3 (hyperium, Rust):** vulnerable and unpatched.
    - The maintainer closed the report on Dec 5, 2025, calling the library alpha [1].
    - The newest release, h3-v0.0.8, fixes a different bug, a QPACK integer overflow [12].
  - **Wireshark:** vulnerable per FoxIO. Affected versions are 4.6.0–4.6.1 and 4.4.0–4.4.11; fixed in 4.6.2 and 4.4.12 [5].
  - **Not affected, per FoxIO:** Google quiche, IIS http.sys, ngtcp2/nghttp3 and Envoy [1].
    - nghttp3 only signals that the limit was hit, so applications built on it have to enforce the limit themselves [1].
  - **Not covered by FoxIO:** nginx, H2O, HAProxy and msquic. Their status is unknown.

- **Fix / patch / mitigation:**
  - **Upgrade:**
    - quic-go to 0.57.0 or later [3]
    - quiche to 0.29.3 or later [4]
    - lsquic to 4.9.0 or later, and OpenLiteSpeed to 1.9.2 or later [1][6][7]
    - Wireshark to 4.6.2 or 4.4.12 or later [5]
  - **Where no fix exists yet** [1]:
    - **Bun:** keep HTTP/3 servers off exposed networks.
    - **h3:** set `max_field_section_size`.
    - **mitmproxy:** run with `--set http3=false`.
  - **No vendor workaround:** the quic-go and quiche advisories list none [3][4]. FoxIO's restrictions above are specific to Bun, mitmproxy and h3 [1]; they are not a blanket instruction to block UDP port 443 or disable every HTTP/3 deployment.

- **IOCs / detection:**
  - **Version fingerprints:** FoxIO publishes JA4Scan-QUIC fingerprints for builds from before the fixes [1]. The exact strings are in FoxIO's post and weren't copied here. The agent reads them as identifying the software stack and version, not the configuration.
    - quic-go 0.56.0
    - quiche 0.29.2
    - OpenLiteSpeed 1.9.1 (lsquic 4.8.2)
    - Bun 1.4.3
    - aioquic 1.7.0
    - mitmproxy 12.2.3
    - h3 0.0.8
  - **Runtime signal:** in FoxIO's lsquic tests, the cgroup's memory.events file recorded more than 900 hits on its memory limit [1].
  - **Exploitation:** none reported. FoxIO's summary claims denial of service only [1], and secondary coverage says no exploitation has been observed [14].

- **Priority for practitioners:**
  - **Patch now:** quic-go, quiche, lsquic/OpenLiteSpeed and Wireshark. Also check which quic-go version is inside any Caddy, Traefik or cloudflared build you run.
  - **Notify & monitor, and restrict exposure:** Bun, h3 and aioquic/mitmproxy, until a fix ships.
  - **Rotate secrets:** no; no data theft has been reported.
  - **Detection limits:** the fingerprints identify tested software builds and the memory metrics indicate resource exhaustion; neither establishes a host compromise [1].

- **Sources:**
  1. [primary] FoxIO, "Header Accordions: QPACK amplification attacks against HTTP/3 servers" (Sébastien Féry), Oct 20, 2026. https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers
  2. [primary] FoxIO-LLC, blog_poc, `headeraccordions` folder. Not run; no README or license in the capture. https://github.com/FoxIO-LLC/blog_poc
  3. [primary] quic-go GHSA-g754-hx8w-x2g6, Dec 11, 2025. https://github.com/quic-go/quic-go/security/advisories/GHSA-g754-hx8w-x2g6
  4. [primary] cloudflare/quiche GHSA-4fgf-9xrr-88gf, Jul 14, 2026. https://github.com/cloudflare/quiche/security/advisories/GHSA-4fgf-9xrr-88gf
  5. [primary] Wireshark wnpa-sec-2025-07, Dec 3, 2025. https://www.wireshark.org/security/wnpa-sec-2025-07.html
  6. [primary] lsquic CHANGELOG (4.9.0, 2026-07-15; 4.10.2, 2026-10-17). https://github.com/litespeedtech/lsquic/blob/master/CHANGELOG
  7. [primary] OpenLiteSpeed releases (1.9.2 Aug 6; 1.9.3 Sep 30). https://github.com/litespeedtech/openlitespeed/releases
  8. [primary] Bun v1.4.4, Oct 22, 2026. https://github.com/oven-sh/bun/releases/tag/bun-v1.4.4 and https://bun.com/blog/bun-v1.4.4 (about 100k of 136k characters read)
  9. [primary] go.mod at release tags, read through a summarizing fetch:
     - caddy v2.11.7: https://raw.githubusercontent.com/caddyserver/caddy/v2.11.7/go.mod
     - traefik v3.7.16: https://raw.githubusercontent.com/traefik/traefik/v3.7.16/go.mod
     - cloudflared 2026.10.3: https://raw.githubusercontent.com/cloudflare/cloudflared/2026.10.3/go.mod
  10. [primary] Traefik GHSA-hrpp-p4fc-wwf8. https://github.com/traefik/traefik/security/advisories/GHSA-hrpp-p4fc-wwf8
  11. [primary] aioquic on PyPI (1.7.0, Oct 16, 2026). https://pypi.org/project/aioquic/
  12. [primary] hyperium/h3 releases. https://github.com/hyperium/h3/releases
  13. [secondary, packager tracker] Red Hat Bugzilla 2423096 (Fedora EPEL 9, caddy), last changed 2026-06-13. https://bugzilla.redhat.com/show_bug.cgi?id=2423096
  14. [secondary] The Hacker News, Oct 22, 2026. Fetch returned 403; search snippet only. https://thehackernews.com/2026/10/new-qpack-flaws-can-crash-http3-servers.html
  15. [secondary] Lilting Channel (Ikesan), translation, Oct 22, 2026. https://lilting.ch/en/articles/http3-qpack-header-amplification
  16. [secondary] The Hacker News, XRING/XQUIC, July 2026. Snippet only. https://thehackernews.com/2026/07/unpatched-xring-flaw-in-xquic-lets.html
  17. [secondary] Rescana, "CDN Tsunami," 2026. Snippet only. https://www.rescana.com/post/cdn-tsunami-critical-http-3-to-http-1-1-protocol-translation-vulnerability-triggers-up-to-350x-dos-amplification-across
  18. [secondary] SOC Prime, CVE-2026-42530 (nginx), 2026. Snippet only; not verified. https://socprime.com/blog/cve-2026-42530-critical-nginx-http-3-flaw-can-trigger-dos-and-possible-rce/

- **Unknowns:**
  - **Bun 1.4.4:** whether it fixes the QPACK expansion. Its security-fix line doesn't name it, and the last ~36k characters of the release post weren't read.
  - **Shipped binaries:** the go.mod checks show dependency versions only. They don't show what the Caddy, Traefik or cloudflared binaries actually contain, or whether HTTP/3 is turned on.
  - **cloudflared's fork:** whether the chungthuang replacement includes the 0.57.0 fix. The fork's pseudo-version is based on v0.45.1.
  - **Still unconfirmed:**
    - whether FoxIO's Wireshark CVE mapping is right;
    - mitmproxy and h3 status beyond what their release pages say;
    - status for nginx, H2O, HAProxy and msquic.
  - **CERT/CC:** no VU# turned up in search, and kb.cert.org wasn't checked directly.
  - **Not reproduced:** the agent didn't reproduce FoxIO's results or inspect the proof-of-concept code. Nothing was installed or run.
