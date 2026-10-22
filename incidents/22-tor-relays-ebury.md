# #22 — Tor: operator relays hijacked by Ebury, SSH traffic intercepted

> **Thread item:** "22. Tor: 333 relays hijacked to steal logins"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Tor Project

**Additional details:** Relay hosts were infected with Ebury 1.8.3, an OpenSSH backdoor. Port-22 traffic was redirected to interception servers. The relays are flagged BadExit. An independent count puts it at 333 relays ([kaba.cx](https://kaba.cx/posts/20261020_Tor/)). [Operator checklist](https://forum.torproject.org/t/tor-relays-security-incident-affecting-some-relay-operators/22231).

- **What happened:**
  - **Aug 2026:** attackers broke into Linux servers running Tor relays and installed Ebury 1.8.3 [9].
  - **From 2 Oct (09:35, time zone not stated):** SSH traffic on port 22 was redirected to 12 interception servers, while web traffic passed through normally [9].
  - **Relay configs changed:** attackers edited operators' torrc files, turning some relays that weren't exits into exits [1][9].
  - **4–5 Oct:**
    - Kaba, the independent researcher, says the relays were marked BadExit on Sunday 4 Oct [9].
    - Tor's 5 Oct notice says affected relays are being flagged and rejected [1].
  - **Scale:** 333 is about 11–12% of the 2,713 exit relays running today, according to Tor Metrics [8][9].
    - "Running" means listed in the latest consensus [7].
    - That's today's count, not the number before the incident.
  - **Hijacked, not attacker-run:** the sources describe legitimate operators' relays being taken over, not new relays set up by attackers [1][9].

- **Identifiers:**
  - **Tor versions:** none published [1][9].
  - **Relay fingerprints, IPs and ASNs:** none published in the sources read [1][3][9].
  - **Malware:** Ebury 1.8.3, "an OpenSSH backdoor and credential stealer for Linux" [9]. Ebury researcher Marc-Etienne M. Léveillé's reply also identifies the version as 1.8.3 [3].
  - **Persistence:** "root cron persistence via a fake uppercase CRON daemon" [1].
  - **Attacker:**
    - Tor names no actor [1].
    - Kaba suggests a "financially motivated crime group" but calls it "just speculation" [9].
    - Two labels are unverified and aren't attributions:
      - "Quetzalcoatl": a thread subject mentions "two Quetzalcoatl relay servers" [3], and CyberInsider refers to a "Quetzalcoatl operator" [10].
      - "BTCMITM20": appears only in [11], with no source given.

- **Who's affected / exposure:**
  - **Relay operators on breached Linux hosts.** Tor says the old relay keys "must be treated as stolen" [2].
  - **SSH users:** anyone who connected over SSH through Tor exits between 2 and 5 Oct, accepted a changed host key, and typed a password [9].
  - **Tor Browser users browsing the web:** no source reports any theft of web credentials [9].

- **Fix / patch / mitigation:**
  - **No client patch exists.**
    - Tor Browser 15.0.26 (21 Oct) is unrelated; it blocks the compromised eMudhra intermediate certificates [5].
    - Nothing in Tor's blog listing [4] or the October tor-relays archive [6] ties a release to this incident.
  - **Relay operators: follow Tor's checklist** [2].
    - **Check for tampering:**
      - Look in torrc and any `%include` files for changes to ExitRelay, ExitPolicy, ContactInfo, MyFamily or Nickname.
      - Look for port-22 NAT redirects with `nft list ruleset` and `iptables -t nat -S`.
      - Look at open connections with `ss -tnp`.
      - Verify the tor binary with `debsums tor` or `rpm -V tor`.
      - Look for new users, authorized_keys entries, cron jobs and systemd units.
    - **If you suspect a compromise** [2]:
      - Take the relay offline.
      - Preserve the disk and logs.
      - Reinstall the system.
      - Create a new relay identity.
      - Rotate every credential.
      - Report it to bad-relays@lists.torproject.org.
  - **SSH users:** verify the presented host-key fingerprint against a trusted known value and investigate an unexpected change. OpenSSH documents this verification and warns that changed host identities can indicate spoofing or interception: [OpenSSH ssh(1), Verifying host keys](https://man.openbsd.org/ssh#VERIFYING_HOST_KEYS). This is general SSH guidance, not a Tor-specific mitigation notice.
  - The reported interception concerned SSH traffic, rather than browser HTTPS traffic [9].
  - **Check any shell one-liners** from the 8 Oct reply before running them [3].

- **IOCs / detection:**
  - **Forged SSH host key:** the ED25519 key seen in the researcher's warning is `SHA256:6baCZCPsl+AfQuujUS81fMEE/C7UeJ+AwjrImqmDB3E` [9]. It was read through a fetch tool that summarizes pages, so re-check the original before blocking on it.
  - **Host signs:**
    - A fake root cron job named in uppercase as "CRON" [1].
    - Port-22 NAT redirects [2].
    - An Exit flag or exit policy you never set. Check your relay in Tor Metrics Relay Search [2].
  - **BadExit count:** 45 running relays carry the BadExit flag today [8]. Without fingerprints, they can't be tied to this incident.

- **Priority for practitioners:**
  - **Hunt for compromise:** relay operators, now.
  - **SSH password exposure:** Kaba describes theft when a user accepts the false host identity and completes password login [9]. For a password exposed through such interception, change the affected password under [NIST SP 800-63B-4's compromised-password guidance](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/). Use of a Tor exit alone does not establish that a password was stolen.
  - **Awareness only:** ordinary Tor Browser users.
  - **No patch applies.**

- **Sources:**
  1. [primary] Tor Project, tor-relays list, "Security incident affecting some relay operators" (hiro), 5 Oct 2026. https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays@lists.torproject.org/thread/WOHPLKCSHYXFTBRZXDENDKJZMBMPLMG5/
  2. [primary] Same notice, Tor Project forum mirror (2 replies, no official update when read). https://forum.torproject.org/t/tor-relays-security-incident-affecting-some-relay-operators/22231
  3. [primary] tor-relays reply by Ebury researcher Marc-Etienne M. Léveillé, 8 Oct 2026. https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays%40lists.torproject.org/thread/RXWGWYYYKBDEBNXC2C3NYIQ2HHHWXL7O
  4. [primary] Tor Project blog listing, posts 29 Sep–21 Oct 2026. https://blog.torproject.org/
  5. [primary] Tor Project, "New Release: Tor Browser 15.0.26," 21 Oct 2026. https://blog.torproject.org/new-release-tor-browser-15026/
  6. [primary] tor-relays October 2026 archive (10 of 16 threads visible). https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays@lists.torproject.org/2026/10/
  7. [primary] Tor Metrics, Onionoo protocol docs. https://metrics.torproject.org/onionoo.html
  8. [primary] Tor Metrics, Onionoo live counts, 22 Oct 2026. https://onionoo.torproject.org/summary?type=relay&flag=Exit&running=true (2,713) and https://onionoo.torproject.org/summary?type=relay&flag=BadExit&running=true (45)
  9. [secondary: independent researcher, not Tor] Kaba, write-up, 20 Oct 2026. https://kaba.cx/posts/20261020_Tor/
  10. [secondary] CyberInsider (Alex Lekander), 21 Oct 2026. https://cyberinsider.com/tor-removes-hundreds-of-compromised-relays-used-to-hijack-ssh-logins/
  11. [secondary] Cyber Kendra, 15 Oct 2026. https://www.cyberkendra.com/2026/10/tor-relays-hacked-to-intercept-ssh-connections.html

- **Unknowns:**
  - **Initial access:** how the hosts were first broken into isn't established [1][9]. Kaba: "no one really knows" [9].
  - **Relay counts:**
    - Neither 333 nor 377 can be checked without fingerprints.
    - The agent didn't pull a pre-incident count of exit relays.
    - A figure of 7.46% of consensus weight appears only in a search summary, and its source wasn't found.
    - "24 non-exits converted" appears only in [10].
  - **How sources were read:** figures from [1], [3] and [9] came through fetches that summarize the page, not the raw HTML.
  - **Not retrieved:**
    - The Hacker News returned HTTP 403.
    - SC World, Risky Bulletin, Mallory, GBHackers and SecurityOnline were seen only as search snippets.
  - **Mailing lists not fully read:**
    - The tor-announce archive didn't render.
    - Six of the 16 tor-relays threads for October weren't visible.
    - A 1AEO thread on exit DNS health checks (13 Oct) may be where the 377 count came from; it wasn't read.
    - Threads titled "Authority Amplified Attack" and "900 Mbps" look unrelated and weren't read.
  - **Detection script:** ESET's updated Ebury detection script is unverified, because the link in [3] was cut off.
