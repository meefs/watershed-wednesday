# #6: LiteLLM PyPI and Docker compromise (v1.107.0)

> **Thread item:** "6. LiteLLM: an AI tool downloaded 3.4 million times a day was poisoned with a password stealer"
> **Tier:** Year-level · **Researched:** 2026-10-22

**Confirmed by:** LiteLLM, PyPI, GitHub Advisory

**Additional details:** Release-pipeline takeover using stolen GitHub CLI tokens. The payload is a credential stealer plus a persistent loader that polls a GitHub dead drop hourly. March's 1.82.7 and 1.82.8 are also malicious, so block them too. [Wiz](https://www.wiz.io/blog/litellm-compromised-steals-credentials) · [GHSA-92x9](https://github.com/advisories/GHSA-92x9-889m-jgmw).

**What happened:**
- **21 Oct 2026, the release.** Seven malicious wheels plus a modified sdist went to PyPI between 11:39:51 and 11:40:13 UTC. Docker tags `v1.107.0`, `latest`, `main-latest` and `main-stable` were pushed at 11:46 UTC.
  - PyPI quarantined/removed 1.107.0 by 13:23 UTC.
  - The Docker tags were removed or repointed by 14:20 UTC [1][3][9].
- **Cause: release-pipeline takeover**, not a dependency or a CI action [3][9].
  - LiteLLM says the attacker had GitHub CLI tokens belonging to three developers, suspected to come from logs of an internet-facing internal deployment.
  - The tokens let the attacker push to a lookalike repo, `Berri-AI/litellm`.
  - An owner's token disabled branch protection, and a second developer's login passed the approval step.
  - The real pipeline then built and signed the artifacts.
  - Initial access is unconfirmed [3].
- **Payload.**
  - A `data = "cook"` line in the maturin config bundled `cook.pth`, `cook.py` and `sitecustomize.py` into the wheels [11][13].
  - `cook.pth` runs every time Python starts, even if litellm is never imported [9].
  - It steals browser passwords, SSH, cloud and AI-tool credentials, and LiteLLM DB provider keys [10].
  - `sitecustomize.py` polls a GitHub dead drop every hour for more code [9].

**Identifiers:**
- **PyPI:** `litellm` **1.107.0**, marked "Release quarantined" [1][2]. Safe pin: **1.106.2** [1][3][4].
- **Docker:** `docker.io/litellm/litellm` and `ghcr.io/berriai/litellm` (plus `-database` and `-non_root`), with the tags above. Index digest `sha256:1bbcb1443bc962e45f5aad53fe3d2c30600e0379715fb6c664cdd3ac126c339e` [3][9][13].
- **OSV:** **MAL-2026-2144** (alias PYSEC-2026-2) lists 1.82.7, 1.82.8 and 1.107.0 [5].
- **GitHub advisories:**
  - **GHSA-92x9-889m-jgmw**: malware, critical, no patched version, updated 22 Oct. No CVE [6].
  - The BerriAI-linked **GHSA-5mg7-485q-xm76** covers only 1.82.7–1.82.8 [7].
  - No BerriAI-authored October GHSA was found on the pages checked.
- **Tracking issue:** BerriAI/litellm **#47826** (open) [4].

**Who's affected / exposure:**
- **PyPI installs:** anyone who installed `litellm==1.107.0`, including unpinned installs, between about 11:40 and 13:23 UTC on 21 Oct [1][3].
- **Docker pulls:** anyone who pulled `v1.107.0`, `latest`, `main-latest` or `main-stable` from Docker Hub or GHCR between 11:46 and 14:20 UTC on 21 Oct [3].
- **Not affected:**
  - The enterprise private registry [3].
  - The companion packages `litellm-proxy-extras` 0.4.110 and `litellm-enterprise` 0.1.78, which were reported clean [9].
- **Treat as leaked:** any affected host with internet egress [3][4].
- **Still malicious from March:** 1.82.7 and 1.82.8 [5][7].

**Fix / patch / mitigation:**
1. **Pin and rebuild.** Pin `litellm==1.106.2`, or rebuild images pinned by digest [3][4][11]. LiteLLM's claim that "all previous versions are safe" [3] is too broad, given March's 1.82.7/1.82.8 [5][6].
2. **Remove the hooks before running any Python** in an affected environment. Don't run `pip` first, because it re-triggers the hooks [3][4].
   - Delete `cook.pth`, `cook.py`, `sitecustomize.py` and their `.pyc` caches.
   - Kill the process holding `/tmp/remote_code_loader.lock`.
   - Rebuild the environment.
3. **Rotate everything the host could reach** [3][10]:
   - LiteLLM DB provider keys (`LiteLLM_CredentialsTable`), master and virtual keys, and the DB password.
   - Cloud instance or task-role credentials.
   - SSH and GPG keys.
   - Git, CI and AI-tool tokens.
   - Browser-saved passwords.
4. **Cloud audit.** Look for `sts:GetCallerIdentity`, then Bedrock `ListFoundationModels`/`ListModels` calls, from `168.100.8[.]57` and `165.227.201[.]8` on 21 Oct between 16:20 and 17:01 UTC [8].
5. **Block and check.** DNS-block `www.litellm[.]dev` and alert on the dead-drop URL [11]. Check the LiteLLM user list for unfamiliar accounts [3].

**IOCs / detection:**
```
sha256 payload (Linux/macOS)
cook.pth            7f191632e7320705d154b85204f1ae546b543acbd7e8861229b76f5042b92bdb
cook.py             9dd0a3926f96a37eb86cf1ee2310d9be93139cc4ebef3ef9e2efe9531390be25
sitecustomize.py    34bef04fe88ac9d0aae0475630b1738681d15b94f233ac8aa46eacf5968305fa
sha256 wheels/sdist
macosx_10_12_x86_64    7598727f209d717041db37f7dca271d3a7d328a279890e0e1d55375729aeb86d
macosx_11_0_arm64      0aaf7ba346d41ef2f40390436738b001180d5a1c03aa093f121078a9969d9a1a
manylinux_2_28_x86_64  462d0c9f67ca522d9e0e4acd245e90b36ce0d5353604a66bb7c43a1ec4a6fcf7
manylinux_2_28_aarch64 668169d35b87bf51324080390b1b1c5ab12bd335cfe5f1a99e3689abd5e02ae6
musllinux_1_2_x86_64   1bbce8caa94f01c0aaa0b7ddae51553a8a32e1ce53d96d44fe583272aff7ad00
musllinux_1_2_aarch64  c2e32d0ce2548aa662c18bf5001911a79fe5b30cf8357132275add02fdcde054
win_amd64              12d4ccc5c6f8d35cf4f2cf233b7f3e418e863e657d81ff5f5fc9e210005b9484
sdist                  2befe2a79fb4fbbd9a543b5b40b530c8cffa8771bab22b8fb22b2e4ae3b1f819
```
- **Hash agreement.** The wheel hashes agree across [4][8][9][11][13]. The sdist hash appears only in [4][9]. Windows payload hashes (CRLF variants) are in [9][13].
- **Host markers:** `/tmp/.pc_once_72129118c59f5636c0bb`, `/tmp/remote_code_loader.lock`, and the env var `PRIVCOLLECT_ACTIVE=1` [4][9][13].
- **Network** [9][11]:
  - POST to `www[.]litellm[.]dev/healthcheck` with the header `X-Token: XWiA8gZNa7NcX2XRoAEb` and an MSIE 7.0 User-Agent.
  - Dead drop at `raw.githubusercontent[.]com/letters9813/pythonclient-test/main/domain.txt` (the account has since been removed).
  - Second stage at `http://<domain>/codepy`.
  - OSV's IOC block still lists only `litellm.cloud`, from March [5].
- **Git:**
  - About ten commits that aren't on any branch or tag, by `ckdi82fkoos@proton.me` and `Berri-AI@users.noreply.github.com`. Keep them for forensics [8][11].
  - Socket reports that the bad image's provenance names `Berri-AI/litellm`, while v1.106.2's names `BerriAI/litellm` [13].
- **Agent-suggested read-only checks** (not from a source):
  - `find / -path '*site-packages*' \( -name cook.pth -o -name cook.py -o -name sitecustomize.py \) 2>/dev/null`, then run `shasum -a 256` on any hits. A stock `sitecustomize.py` can be legitimate, so match against the hashes above.
  - `rg -n '1\.107\.0' uv.lock requirements*.txt poetry.lock 2>/dev/null` to check lockfiles.

**Priority for practitioners:**
- **Hunt for compromise and rotate secrets** on hosts exposed through 1.107.0 or the affected tags. Treat affected hosts with internet egress as leaked; rotation does not depend on finding an IOC [3][4].
- **Patch now** by pinning 1.106.2 everywhere [3][4].

**Sources:**
1. [primary] PyPI, litellm 1.107.0 page, 21 Oct 2026. https://pypi.org/project/litellm/1.107.0/
2. [primary] PyPI, litellm release history. https://pypi.org/project/litellm/#history
3. [primary] LiteLLM, "Contained: Oct 21, 2026 LiteLLM release v1.107.0 Compromised" (last update 20:30 UTC). https://docs.litellm.ai/blog/security-incident-oct-21-2026
4. [primary] BerriAI/litellm issue #47826, 21–22 Oct 2026, from a third-party reporter (signed Upwind). https://github.com/BerriAI/litellm/issues/47826
5. [primary] OSV MAL-2026-2144, modified 21 Oct 2026. https://api.osv.dev/v1/vulns/MAL-2026-2144
6. [primary] GitHub Advisory DB GHSA-92x9-889m-jgmw, updated 22 Oct 2026. https://github.com/advisories/GHSA-92x9-889m-jgmw
7. [primary] GitHub Advisory DB GHSA-5mg7-485q-xm76, Mar 2026. https://github.com/advisories/GHSA-5mg7-485q-xm76
8. [secondary] Wiz, 21 Oct 2026. https://www.wiz.io/blog/litellm-compromised-steals-credentials
9. [secondary] SafeDep, 21 Oct 2026. https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/
10. [secondary] Aikido, 21 Oct 2026. https://www.aikido.dev/blog/litellm-compromised-infostealer-rat
11. [secondary] Mend, 21 Oct 2026. https://www.mend.io/blog/litellm-1-107-0-compromised/
12. [secondary] OX Security, 21 Oct 2026. https://www.ox.security/blog/litellm-1-107-0-compromised-with-a-rat-infostealer/
13. [secondary] Socket, 21 Oct 2026. https://socket.dev/blog/litellm-compromise
14. [secondary] Snyk, 24 Mar 2026. https://snyk.io/blog/poisoned-security-scanner-backdooring-litellm/
15. [secondary, stats] pypistats, no snapshot date shown. https://pypistats.org/packages/litellm
16. [primary] GitHub API, tag ref check (v1.106.2 exists). https://api.github.com/repos/BerriAI/litellm/git/ref/tags/v1.106.2

**Unknowns:**
- **Initial access and actor.** The entry point is unconfirmed, and no actor has been named [3][12].
- **Tag `v1.107.0`.** LiteLLM says the GitHub tag is clean [3]. However, `api.github.com/repos/BerriAI/litellm/git/ref/tags/v1.107.0` and the v1.107.0 release page both returned 404, while v1.106.2 resolves [16]. The tag may have been deleted; this is unresolved.
- **PyPI digests.** PyPI's JSON endpoint for 1.107.0 returned 404, so PyPI-side digests weren't checked. 1.106.2 was uploaded on 21 Oct at 10:44Z, and its "clean" status rests on checks by LiteLLM and the issue reporter [3][4].
- **Scope.** The victim count, the volume of exfiltrated data, and whether any second-stage code ran are unknown. The dead drop was empty, and SafeDep couldn't retrieve the server address [4][9].
- **Gaps in coverage.**
  - The pypistats snapshot date is unknown [15].
  - LiteLLM's promised 22:30 UTC update and any posts on X weren't seen [3].
- **Caveats on sources.**
  - Quotes come from a small model's extraction of fetched pages, so re-read the originals before quoting.
  - Coverage by StepSecurity, Chainguard, Endor Labs, Sonatype and The Hacker News was seen only in search snippets, not fetched.
