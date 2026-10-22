# #25: OVHcloud CLI, GitHub release binaries swapped for a secrets stealer ("envchecker")

> **Thread item:** "25. OVHcloud: hackers slipped a password stealer into a cloud company's official tool"
> **Tier:** Also serious · **Researched:** 2026-10-22

**Confirmed by:** OVHcloud (GitHub advisory)

**Additional details:** ~250 downloads. A developer's account keys were stolen, and OVHcloud links the wallet involved to the GlassWorm actor. `go install`, source builds and the Docker image are unaffected. [OpenSourceMalware](https://opensourcemalware.com/blog/glassworm-hacks-ovh-clouds-cli-tool).

- **What happened:**
  - **19 Oct 2026, 14:47–16:21 UTC+2** (12:47–14:21 UTC, 94 minutes): the GitHub Release binaries of the OVHcloud CLI (`ovhcloud`), versions v0.11.0 through v0.15.0, were replaced with builds containing a credential-harvesting module named "envchecker." The source tags and the CI pipeline weren't changed [1][2][8][10].
  - **How the attacker got in:** OVHcloud says the swap was done with stolen keys from one developer's account [7].
    - That developer's personal repos had also been compromised in March 2026, and the same crypto wallet shows up in both [7].
    - Server logs first show the attacker using the access on 5 Mar 2026 [9].
  - **Cleanup:**
    - The malicious files were deleted at 16:21 UTC+2 [2].
    - v0.16.0 came out on 19 Oct as the "Latest" release. It's immutable and has a signed tag [3].
    - The advisory was published on 20 Oct by rbeuque74 [1].

- **Identifiers:**
  - **Product:** the OVHcloud CLI, `ovhcloud`, from the repo ovh/ovhcloud-cli. Only its GitHub Release downloads were affected. No npm or PyPI package was reported [1][4].
  - **Malicious versions:** v0.11.0, v0.12.0, v0.13.0, v0.14.0, v0.15.0 [1].
  - **Clean versions:** v0.10.0 and v0.16.0 [1][8][10].
  - **Advisory and issue IDs:**
    - GHSA-862f-55f5-vmvw [1]
    - ovh/ovhcloud-cli#300 [2]
    - OSV and the GitHub Advisory API both returned 404 for the GHSA ID [6].
    - No MAL or CVE ID was seen [1][6].

- **Who's affected / exposure:**
  - **Affected:** anyone who "downloaded or updated" v0.11.0–v0.15.0 during the 94-minute window [1].
    - Secondary sources name three ways people got it: the install.sh script, Homebrew and direct downloads [8][9][10].
    - The advisory reports about 250 downloads [1].
  - **Not affected:**
    - Downloads made before the window [9].
    - `go install`, builds from source, and the Docker image [8][9][10].
    - For v0.15.0, the i386, Windows arm64 and WASM builds. The person who reported the issue, and OpenSourceMalware, both saw these left untouched [2][9].

- **Fix / patch / mitigation:**
  1. **Replace the CLI.** Install v0.16.0 or later and delete any v0.11.0–v0.15.0 binaries [1][3].
  2. **Check suspect binaries without running them** [1][9][10]:
     - Compare the binary's MD5 with the list in the advisory's appendix.
     - Look in your temp directory for folders named `envchecker-[0-9]{9-10}`.
     - Don't trust the `checksums.txt` on the release page, because the attacker rewrote it too.
  3. **If a build from the window ran, treat every secret on that machine as compromised** [9].
     - Rotate them from a different machine [9].
     - Start with the advisory's list: AWS, GCP, Azure, DigitalOcean, Docker, Kubernetes, Terraform, SSH, .netrc, git and npm [1].
     - Also rotate your OVH API and consumer keys and `~/.ovh.conf`. The advisory leaves these out [9][1].
     - OVHcloud's CEO: "If you are affected, please change all the secrets on your disk" [7].
  4. **Harden your pipeline.**
     - Pin the expected SHA-256 of the binary in CI and check it on every run [2][9].
     - Verify v0.16.0 with `gh attestation verify` [9]. Whether the attestation exists is unconfirmed; see Unknowns.
  5. **Block outbound traffic** to 45.32.148[.]174 and the Solana RPC hosts below, on any build host that doesn't need Solana [9][1].

- **IOCs / detection:**
  - **MD5s of the malicious binaries**, from the advisory's appendix. They weren't checked against a download [1].
    - Darwin_arm64: 6f2f086239f3d88eb2750e871901927d
    - Darwin_x86_64: 347e65eb7f2d78d1c6872690272a6cc3
    - Linux_arm64: 01f57206d37c28cf711677f612052913
    - Linux_x86_64: 301bff0b51980b9e76c93633e7cfd3bd
    - Windows ovhcloud.exe: 6a3cf153338c416169cda2fe704c8848
  - **SHA-256 of the v0.15.0 Linux_arm64 archive** [2][9]:
    - Clean: 5c2beb56e6d83a4b426565a1557791ef759316abcc4effb38dd627c90aeb80e0
    - Swapped: 3833daffcaaaab27e4e0e0833240ffcb1df8df648f4ec0bc4a75c176e28933cb
  - **VirusTotal sample SHA-256s** listed in the advisory [1]:
    - e9c31dca232cdaa8058cb59eadf425c182a23afb6ddb057eb92eda13b850dff4
    - 3c10bd782cd0dc5f720a33570af4651814cb82917e54d27ffce3849a3c5cef2a
    - 3cbe1ac592beeca7ce0ad0ba945349a9ef33ef0f1324935c3a115f30b1d0c927
    - 25c68c5e9ae23883aebda59f4b6a7df78e1ce8aae5e4b4ba636419497d54bbec
    - f97284530343b3903ffd19bbe70ab6f62e36f04eb7e5f885934bd21d10899e8a
  - **A build marker the reporter spotted** [2][9]:
    - Running `go version -m` on a bad binary shows `vcs.revision` 5ead8ef9b43d354dfb5caadff803b11afc8c5c58 with `vcs.modified=true`, or "+dirty".
    - Don't rely on this marker alone:
      - Commit 5ead8ef also appears in the changelog for the clean v0.16.0 [3].
      - A search summary claims The Hacker News found the same markers on clean v0.16.0. That's unverified.
  - **Temp folder:** `envchecker-[0-9]{9-10}`. The malware never deletes it [1].
  - **Files the malware reads:** the advisory lists 33 paths in total [1]. They include:
    - `~/.ssh`
    - `~/.aws/credentials`
    - `~/.kube/config`
    - `~/.config/gcloud/*`
    - `~/.azure/*`
    - `~/.docker/config.json`
    - `~/.netrc`
    - `~/.gitconfig`
    - `~/.terraform.d/credentials.tfrc.json`
    - `~/.claude`
    - the `state.vscdb` files of VS Code and Cursor
  - **Network:**
    - Exfiltration endpoint: hxxps://45.32.148[.]174/upload. The advisory calls it time-sensitive [1].
    - 162.33.177[.]177 was used for persistence on the developer's Mac [1][7].
    - Solana RPC hosts [1]:
      - solana.drpc[.]org
      - solana-rpc.publicnode[.]com
      - solana.api.pocket[.]network
      - api.mainnet-beta.solana[.]com
      - solana.api.onfinality[.]io/public
  - **Wallets:**
    - BHaDaVbdCYFNaKZGn7yLXFneWoJHZgLiBYkHxVrjyALF is the wallet the exfiltration RPC calls use [1].
    - BjVeAjPrSKFiingBn4vZvghsGj9KCE8AJVtbc9S8o8SC is the wallet in the editor extension, according to OVHcloud [7]. OpenSourceMalware calls it the March loader's dead drop [9].
  - **On the developer's Mac:**
    - The editor extension `color-picker-universal` 2.8.91, installed 2025-10-20.
    - A Node service registered through a plist [1][7].
  - **Uploader account:** "HassenBF" (GitHub ID 4911006, according to OpenSourceMalware). It may be a victim's account rather than the attacker's [2][9].
  - **The March loader** (a separate earlier payload, not the CLI) [9]:
    - `preinstall.js` SHA-256: 43df42fd79f6f81e530892b54634598770d6e496796a863c596e616bcb3fec70
    - Second stage SHA-256: 0f79989912572a24ba13baabb32b3fd084496271c51448d47b66fe1aedbf293c
    - On macOS it writes `~/init.json`.

- **Priority for practitioners:**
  1. **Patch now:** remove v0.11.0–v0.15.0 and install v0.16.0.
  2. **Hunt for compromise:** look for a download during the window, an envchecker folder, or a matching MD5 [1][9].
  3. **Rotate secrets** only on machines where a build from the window actually ran [1][9].

- **Sources:**
  1. [primary] OVHcloud maintainers, GitHub Security Advisory GHSA-862f-55f5-vmvw "ovhcloud-cli security incident - October 19th, 2026," published 20 Oct 2026 by rbeuque74 — https://github.com/ovh/ovhcloud-cli/security/advisories/GHSA-862f-55f5-vmvw
  2. [primary] ovh/ovhcloud-cli issue #300, opened 19 Oct and closed 20 Oct 2026, with OVH maintainer comments — https://github.com/ovh/ovhcloud-cli/issues/300
  3. [primary] ovh/ovhcloud-cli release v0.16.0, 19 Oct 2026 — https://github.com/ovh/ovhcloud-cli/releases/tag/v0.16.0
  4. [primary] OVHcloud docs, "Getting Started with OVHcloud CLI" (footer says last updated 13 Oct 2025; no advisory) — https://docs.ovhcloud.com/en/guides/manage-and-operate/cli/getting-started
  5. [primary] CERT-FR alert listing, cert.cyber.gouv.fr (latest items 21 Oct 2026; no OVH entry) — https://cert.cyber.gouv.fr/
  6. [primary, lookup] OSV and the GitHub Advisory API, both 404 for GHSA-862f-55f5-vmvw — https://api.osv.dev/v1/vulns/GHSA-862f-55f5-vmvw ; https://api.github.com/advisories/GHSA-862f-55f5-vmvw
  7. [secondary, quotes OVHcloud statements and CEO Octave Klaba's X posts] The Stack, published 20 Oct 2026, updated 21 Oct — https://thestack.technology/ovhcloud-cli-repo-compromised-customer-reports-incident/
  8. [secondary] SecurityWeek (Eduard Kovacs), 21 Oct 2026 — https://www.securityweek.com/hijacked-developer-account-used-to-plant-stealer-in-ovhcloud-cli/
  9. [secondary] OpenSourceMalware, 20 Oct 2026 — https://opensourcemalware.com/blog/glassworm-hacks-ovh-clouds-cli-tool
  10. [secondary] IT-Connect (Florian Burnel), 20 Oct 2026 — https://www.it-connect.tech/ovhcloud-cli-binaires-on-github-were-tampered-with-by-an-infostealer/

- **Unknowns:**
  - **How the developer account was first compromised:** OVHcloud gives no cause [7]. OpenSourceMalware's theory, an infostealer or a stolen token, is unproven [9].
  - **The uploader:** it's unclear whether "HassenBF" belongs to the attacker or is a victim. Sources disagree: "not a public member" of the organization [2][9] versus "legitimate contributor" [10].
  - **Not done by the agent:** it didn't analyze the payload, test the exfiltration endpoints, or download anything.
  - **Homebrew and the CLI's self-update feature:** unresolved. The advisory says nothing [1], and IT-Connect calls self-update affected "in principle" [10].
  - **The MD5 list:**
    - It came from the advisory through a fetch tool. Two separate extractions agreed.
    - The advisory doesn't say which version each hash belongs to.
    - The hashes weren't checked against a real download [1].
  - **Whether v0.16.0 is verifiably genuine:**
    - GitHub shows the GPG key on the tag as expired [3].
    - The list of release files didn't load, so whether an attestation exists is unconfirmed.
    - OpenSourceMalware says a JSON attestation exists [9].
  - **Unread sources:**
    - The Hacker News article (https://thehackernews.com/2026/10/hackers-hijack-five-ovhcloud-cli.html) returned HTTP 403, so its "+dirty on clean v0.16.0" claim is unverified.
    - OVHcloud's promised post-mortem ("in the coming days," per issue #300 [2]) wasn't found.
    - Klaba's X posts weren't read directly. They're quoted via [7] and [8].
  - **CERT-FR:** its homepage listing has no OVH entry [5], but that isn't an exhaustive search of its alerts. cert.ssi.gouv.fr redirects to cert.cyber.gouv.fr.
