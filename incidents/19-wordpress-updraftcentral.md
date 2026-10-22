# #19 — WordPress: stolen UpdraftCentral keys used to backdoor sites (plus Rank Math PRO)

> **Thread item:** "19. WordPress: hackers stole a plugin maker's keys and used them to plant backdoors on websites"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** TeamUpdraft, Patchstack, Nethemba

**Additional details:** teamupdraft.com was compromised and its customer database likely accessed. 99 backdoor plugin names have been seen. Separately, Rank Math PRO 3.0.123 downloaded during its Oct 15–16 window was backdoored. [Nethemba checker](https://nethemba.com/updraftcentral-backdoor-analysis/).

- **What happened:**
  - **17–18 Oct 2026:** TeamUpdraft, the developer of UpdraftPlus, found unauthorised access to teamupdraft.com. It says "a compromised key" gave access, and "we believe our customer database was accessed" [1].
  - **18 Oct 15:32 to 19 Oct 09:23** (Patchstack gives no time zone) [2]:
    - The attacker sent `plugin.upload_plugin` commands through UpdraftCentral, the remote-management service.
    - Those commands installed backdoor plugins under 99 different names [2][3].
    - The backdoors grant admin-level access [2][3].
  - **19 Oct:**
    - TeamUpdraft released UpdraftPlus 1.26.13 (Free) and 2.26.13 (Premium). These versions disconnect older UpdraftCentral connections.
    - Patchstack said that day that no plugin update had stopped the campaign [1][2][3].

- **Identifiers:**
  - **Vendor and products** [1]:
    - TeamUpdraft.
    - UpdraftPlus Free 1.26.x and Premium 2.26.x.
    - UpdraftCentral cloud, UpdraftVault and UpdraftClone.
    - Self-hosted UpdraftCentral isn't affected.
  - **Versions:**
    - Clean: 1.26.13 / 2.26.13 [1][3].
    - The vendor gives 1.26.12 / 2.26.12 as the minimum [1]. Nethemba says those versions don't delete any keys [3].
    - There's no malicious UpdraftPlus release. The backdoors are separate plugins [2][3].
  - **Vulnerability IDs:**
    - No CVE has been assigned for the key compromise [1][2].
    - A related flaw, CVE-2026-10795 (CVSS 8.1), was fixed in 1.26.5 / 2.26.5 in June 2026. Versions 1.26.4 / 2.26.4 and older were exposed [2][3].
    - Patchstack's incident card rates it CVSS 9.8 but gives no Patchstack ID [2].
  - **Install base:**
    - UpdraftPlus has 4M+ active installs [2][3].
    - BleepingComputer's figure of ~400,000 exposed sites comes from a search summary, and its basis is unknown [4].
  - **Rank Math PRO** [5]:
    - Malicious: 3.0.123. Clean: 3.0.124.
    - Download window: 20:02 UTC on 15 Oct to 07:12 UTC on 16 Oct.
    - What identifies a bad copy is when it was downloaded, not its version number.

- **Who's affected / exposure:**
  - **UpdraftPlus sites with a live UpdraftCentral key** (stored in the `updraft_central_localkeys` option) [2][3]:
    - A pre-ticked "Add this website to UpdraftCentral" checkbox may have created a key without the owner noticing.
    - Keys don't expire [2].
  - **Free users:**
    - The vendor says free users without a teamupdraft.com account don't need to do anything [1].
    - Patchstack and Nethemba say to check every site anyway [2][3].
  - **Also at risk:**
    - teamupdraft.com account holders, and UpdraftCentral, Vault and Clone customers [1].
    - Rank Math PRO buyers who downloaded it during the window [5].

- **Fix / patch / mitigation:**
  1. **Delete every UpdraftCentral key on every site,** even after updating. Removing the site from the UpdraftCentral dashboard isn't enough [2][3].
     - CLI: `wp option delete updraft_central_localkeys`
     - In WordPress: Advanced Tools > UpdraftCentral
  2. **Update** to 1.26.13 / 2.26.13 or later, and still do step 1 [1][3].
  3. **Change passwords** [1][3]:
     - Change your teamupdraft.com password. Type the URL yourself rather than following a link.
     - Reset 2FA, and change any passwords you reused elsewhere.
     - Premium users: clear the saved password in `updraftplus-addons_options` [3].
  4. **If you find a backdoor plugin** [2][3]:
     - Revoke the key.
     - Deactivate the plugin.
     - Move its folder outside the web root.
     - Don't "fix" the plugin, because doing so switches it on.
  5. **If a rogue account or trigger shows up in your logs,** treat the site as fully compromised [1][2][3]:
     - Restore a backup from before 17 Oct.
     - Check files against a clean copy of WordPress.
     - Audit admin accounts.
     - Reset passwords, end all sessions and enable 2FA.
  6. **Rank Math** [5]:
     - Update to 3.0.124.
     - Treat any site that had 3.0.123 active during the window as compromised.
     - Restore from a backup taken before 20:02 UTC on 15 Oct.
     - Rotate credentials.
     - Remove leftover files, admin users and scheduled tasks.

- **IOCs / detection:**
  - **IPs:** 43.250.53.42; 2a09:bac5:4e21:2e3c::49b:9 [2][3].
  - **UpdraftCentral domains** seen sending the commands: probe.central.updraftplus.com and 0.central.updraftplus.com [3]. No attacker-owned domain has been reported [2].
  - **Attack request:** `POST /` with the user agent `WordPress/6.4; class-udrpc.php`. Legitimate traffic includes a version and teamupdraft.com [2][3].
  - **Backdoor plugins:**
    - Description: "Small maintenance toolkit: keeps option storage tidy."
    - Sample slugs: load-stack-35c, text-gantry-eb0, src-lab, boost-kit, site-health-cache [2][3].
    - Also check `wp-content/plugins/<slug>/` and leftovers in `wp-content/upgrade/` [3].
  - **Rogue accounts** [2][3]:
    - Usernames: data-ops43, media-staff96, system_team850.
    - Display name: "Site Tools."
    - Emails at @example.org or @example.com.
    - Look for users who have the editor role plus `manage_options`.
  - **Database options:** `updraft_central_localkeys`, `*_sync_token` and `<slug>_uid` [2][3].
  - **Trigger:** a query parameter that starts with `_` followed by 4–10 letters or digits, carrying a 32-character value. Sample: `_9f5696` [2][3].
  - **Log line:** "Command received: plugin.upload_plugin" from probe.central.updraftplus.com [3].
  - **Hashes and checker:** Nethemba lists SHA-256 hashes and publishes a read-only checker script, `check-updraftcentral.php` [3]. They aren't reproduced here. Compare the script's hash against Nethemba's before running it.
  - **Rank Math:** rank1cdn[.]com, according to secondary reporting [5].

- **Priority for practitioners:**
  - **Rotate secrets and patch now (UpdraftPlus):**
    - Delete UpdraftCentral keys today.
    - Update to 1.26.13 / 2.26.13 or later.
    - Change your teamupdraft.com password.
  - **Hunt for compromise:** on every site that held an UpdraftCentral key.
  - **Rank Math:** hunt only if a 3.0.123 copy was downloaded on 15–16 Oct.

- **Sources:**
  1. [primary] TeamUpdraft, "TeamUpdraft security incident: What customers need to know," published 19 Oct 2026, updated 20–21 Oct. https://teamupdraft.com/blog/security-incident-october-2026/
  2. [primary, security firm] Patchstack (Dave Jong), "Stolen UpdraftCentral Keys Are Backdooring WordPress Sites," 19 Oct 2026, updated 19 Oct. https://patchstack.com/articles/updraftcentral-key-compromise-wordpress-backdoors/
  3. [primary, security firm] Nethemba, "UpdraftCentral backdoor analysis," published 19 Oct 2026, updated 22 Oct. https://nethemba.com/updraftcentral-backdoor-analysis/
  4. [secondary] BleepingComputer, "Stolen UpdraftCentral keys used to backdoor WordPress sites," date unverified. Page returned 403; search summary only. https://www.bleepingcomputer.com/news/security/stolen-updraftcentral-keys-used-to-backdoor-wordpress-sites/
  5. [secondary] Rank Math coverage, date unverified (about 16–19 Oct). Details come from a search summary of outlets quoting the vendor's notice. The BleepingComputer page returned 403 and may not be the original source. https://www.bleepingcomputer.com/news/security/wordpress-seo-plugin-rank-math-compromised-to-backdoor-websites/

- **Unknowns:**
  - **Unfinished checks:** the agent's web tools hit the session limit after 10 calls. These weren't checked:
    - rankmath.com's own notice.
    - Any advisory from Wordfence, Sucuri or WPScan.
    - Notices on wordpress.org and make.wordpress.org.
    - The full text of [4] and [5].
    - So everything about Rank Math rests on secondary sources.
  - **The vendor's compromise:** which key TeamUpdraft lost, how it was compromised, and whether customer data was copied.
  - **Conflicts in the fix guidance:**
    - The vendor's minimum (1.26.12) versus 1.26.13.
    - The 22:00 BST 18 Oct cutoff versus a release after 22:00 BST 19 Oct.
    - Nethemba says 1.26.13 misses keys created on 18 Oct between 12:07 and 21:00 UTC (unverified).
  - **Forced update:** the vendor says WordPress.org pushed the update to all users (quoted in [3]). This wasn't checked on wordpress.org.
  - **Scale:** no victim count has been published. For Rank Math, the attack vector, the install count and whether any credentials were stolen are all unknown.
  - **Accuracy of quotes and IOCs:** they came through fetch tools that summarize pages, not the raw HTML, so re-check them before blocking anything. A garbled version string in [2] wasn't used.
  - **CVE-2026-10795** wasn't checked in NVD or CVE.org.
