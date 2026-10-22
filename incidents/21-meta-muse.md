# #21 — Meta Muse: shared chat links publicly discoverable ("GhostShares")

> **Thread item:** "21. Meta Muse: Meta's AI agent exposed users' personal and business secrets"
> **Tier:** Month-level · **Researched:** 2026-10-22

**Confirmed by:** Claroc research; Meta paused the feature

**Additional details:** Researcher Claroc's "GhostShares": 6,800+ share hostnames can be found through passive DNS, and the links don't expire. Meta paused sharing on Oct 20 ([Engadget/Ars](https://www.engadget.com/2292281/meta-suspends-muse-chats-sharing-feature-after-it-left-private-details-exposed/)). A separate macOS app flaw was hotfixed in September.

- **What happened:**
  - **Sept 8, 2026:** Meta launched Muse, a personal AI agent [1][2].
    - **How sharing worked:** a shared chat became a page at `<title>-<random ID>.cf.metaaiusercontent.com`, and anyone with the link could open it [1].
    - **How the pages leaked:** opening a page triggers a DNS lookup of its hostname. Passive-DNS providers record those lookups and make them searchable, so nobody had to guess the random IDs [1].
    - **What it wasn't:** the sources read describe no prompt injection and no leakage between users [1][3].
  - **Oct 8–18, 2026:** Claroc found and reported the issue [1][3].
    - **Oct 8:** reported to Meta's bug bounty program.
    - **Oct 18:** published its write-up, "GhostShares."
    - **Findings:** one passive-DNS query returned more than 6,800 hostnames. Claroc opened a few hundred, and almost every live share loaded with no login.
    - **Sensitive content:** dozens held items like a loan application, a bank fraud alert, prep notes for an executive-search call, and a staff vacation calendar.
  - **Oct 20, 2026:** after Ars Technica asked, Meta said it "paused this functionality while we review this report and consider changes to how these links can be discovered" [3].

- **Identifiers:**
  - **Product:** Muse, Meta's personal AI agent [2]. Not to be confused with Muse Spark, Meta's model family [5].
  - **Hosts:** muse.ai and cf.metaaiusercontent.com [1].
  - **Research name:** "GhostShares" [1].
  - **Bug bounty:** reported Oct 8; no report ID given [1].
  - **macOS flaw:** no CVE surfaced [4]. The setting involved is `endo_voyager_dictation_endpoint` [4].

- **Who's affected / exposure:**
  - **Anyone who shared a Muse chat, and anyone who holds those links.** Share pages were observed from about a month after the Sept 8 launch [1].
  - **Links persist:** Meta's help page, as quoted by Claroc, says links don't expire and can be reshared [1]. That page covers Meta AI, not Muse specifically.
  - **Businesses whose staff shared work chats** [1][3].
  - **Mac users with Muse's macOS app** [4].

- **Fix / patch / mitigation:**
  - **Meta's response:** it paused sharing on Oct 20 [3].
  - **Claroc's retest (Oct 20):** 40 links that used to open no longer load. But passive-DNS records of the old hostnames are still searchable [1].
  - **No user steps given:** Ars Technica offered users no steps to revoke, delete or change settings [3].
  - **Training opt-out:** Engadget's launch coverage (excerpt only) says users can opt out of having their data used for AI training [9].
  - **Admins, per Claroc** (whose post ends with a pitch for its own product) [1]:
    - Block muse.ai and metaaiusercontent.com at DNS or a proxy.
    - Alert when someone creates a public share.
    - Add share links to your AI-use policy.
  - **Mac:** Meta reportedly shipped a hotfix about 12 hours after the flaw was reported on Sept 21 [4]. The fixed version is unverified.

- **IOCs / detection:**
  - **Domains:**
    - muse.ai (share pages live under the /s path).
    - cf.metaaiusercontent.com (search this suffix in passive DNS).
    - Claroc withheld the real hostnames [1].
  - **Saved scans:** urlscan.io has 75+ saved scans of share pages [1].
  - **macOS setting:** `endo_voyager_dictation_endpoint` [4].
  - **Misuse:** no evidence found [1].

- **Priority for practitioners:**
  - **Notify & monitor.**
    - Block or alert on the two domains.
    - Audit staff share links for company data.
    - Treat anything already shared as public.
  - **macOS fix status:** the hotfix version and date have not been verified here; see Unknowns.
  - **If a shared chat exposed a password:** change that affected password. [NIST SP 800-63B-4, §3.1.1.2](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/) requires password changes on evidence of compromise. This applies general authentication guidance; it is not a Meta incident instruction or evidence that credentials were exposed in this case.

- **Sources:**
  1. [primary] Claroc Research Team, "GhostShares," Oct 18, 2026 (updated Oct 20). https://blog.claroc.io/ghostshares-muse-passive-dns
  2. [primary] Meta Newsroom, "Introducing Muse: The World's First Personal AI Agent Built for Everyone," Sept 2026 (listing only; not fetched). https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
  3. [secondary] Engadget, relaying Ars Technica, Oct 20, 2026. https://www.engadget.com/2292281/meta-suspends-muse-chats-sharing-feature-after-it-left-private-details-exposed/
  4. [secondary] Forkast, Muse macOS zero-day, Sept 2026 (search summary only). https://forkast.news/meta-patched-its-muse-macos-zero-day-just-before-connect-the-dispute-over-who-could-exploit-it-remains-open/
  5. [primary] Meta Newsroom, "Introducing Muse Spark," Apr 2026 (title only). https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/
  6. [secondary] TIME, Oct 6, 2026 (summary only). https://time.com/article/2026/10/06/meta-muse-ai-agent-privacy/
  7. [secondary] Tom's Hardware, Sept 30, 2026 (summary only). https://www.tomshardware.com/tech-industry/artificial-intelligence/metas-muse-ai-agent-accused-of-accessing-sensitive-user-data-on-iphone-and-mac-without-permission-agent-shocks-reporter-by-referring-to-confidential-messages-it-wasnt-granted-access-to
  8. [secondary] Atlanta News First, Oct 9, 2026 (summary only). https://www.atlantanewsfirst.com/2026/10/09/metas-new-muse-ai-agent-raises-privacy-concerns/
  9. [secondary] Engadget, Muse launch coverage, undated (excerpt only). https://engadget.com/2253133/meta-reveals-its-ai-agent-that-can-shop-send-emails-and-plan-trips-on-your-behalf/
  10. [secondary] IBTimes SG, Oct 2026 (summary only; attribution conflict). https://www.ibtimes.sg/meta-pauses-muse-ai-chat-sharing-after-6800-private-conversation-links-found-online-95347
  11. [secondary] 404 Media, Muse tag page (Oct 5 VM-escape item; headline only). https://www.404media.co/tag/muse/
  12. [secondary] AI Incident Database, "muse spark 1.1" entity, undated (listing only). https://incidentdatabase.ai/es/entities/muse-spark-1.1/

- **Unknowns:**
  - **Sources not read directly** (the agent hit the session limit mid-run):
    - Meta's launch and help pages.
    - The Ars Technica original.
    - Wardle's write-up.
    - Sources 6–8 and 11.
    - Quotes came through a fetch tool that summarizes pages, so verify the exact wording.
  - **Meta's pause statement:** no Meta newsroom statement was found; the statement is secondhand. IBTimes attributes a similar line to a spokesperson quoted by The Verge [10], which conflicts with the Ars Technica attribution [3].
  - **Scale:** the number of affected users hasn't been reported. Claroc opened only "a few hundred" of the 6,800+ hostnames.
  - **Timing of exposure:** unknown how long shares stayed live, and whether anyone else accessed them earlier.
  - **Revoking or deleting:** unverified. A search summary says deleting a chat doesn't erase what Muse learned from it. The help page wasn't retrieved.
  - **Restored sharing:** unknown whether sharing has been turned back on.
  - **macOS hotfix:** version and date are unverified. Searches found no CVE, formal advisory or bounty ID.
  - **Possibly related items, unverified:**
    - The VM-escape report [11].
    - The link to the Muse Spark 1.1 incident [12]. Meta hasn't verified it, according to a summary.
  - **Regulators:** statements from the Irish DPC, the FTC or the EU weren't searched before the limit hit.
  - **Prompt injection in search results:** the results contained embedded "REMINDER" instructions. The agent treated them as data, not as instructions.
