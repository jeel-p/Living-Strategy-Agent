# Customization guide — industries, markets, and outputs

Use this to adapt the Living Strategy Agent **system prompt** and **input emphasis** without changing the mandatory **brief structure** (see `outputs.md`).

## Industry overlays

| Industry | Emphasize in inputs | Add to system prompt / client profile |
|----------|---------------------|----------------------------------------|
| **E-commerce** | Sales velocity, cart abandonment, promo calendar | Tie language to **conversion** and revenue; seasonal peaks |
| **B2B SaaS** | Pipeline signals, content engagement, competitor releases | **Lead gen** channels, **ICP** clarity in actions |
| **Consumer brand** | Social trends, cultural moments, influencers | **Brand tone** fit; **cultural sensitivity** check |
| **Hospitality** | Bookings, seasonality, review sentiment | **Occupancy** context; direct booking vs OTA |
| **Retail** | Foot traffic, inventory, competitive pricing | **Local** nuance; in-store vs online split |
| **Healthcare** | Regulatory calendar, patient search trends, awareness campaigns | **Compliance:** flag recommendations needing legal/clinical review |
| **Finance** | Sentiment, regulatory news, competitor products | **Conservative** tone; **disclaimer** in output when required |

## Markets and regions

- Replace generic “markets” with **named countries, cities, or corridors** (e.g. KSA, UAE, SEA hubs).
- Adjust **pill labels** in a prototype to match the client’s footprint.
- In tone rules, require **platform + market** pairs (e.g. TikTok KSA, Instagram Reels UAE), not region-agnostic advice.

## Output destination

| Output | Skill impact |
|--------|----------------|
| **Web viewer** | Default-friendly; prototype is a natural fit. |
| **Email** | Define subject line pattern and one-screen body or link to full brief. |
| **Slack** | Short summary + link; avoid walls of text in-channel. |
| **Notion** | Page title pattern: “Strategy Brief — [date]”; properties for markets/status if used. |
| **PDF** | Same markdown structure; ensure headings map cleanly for export. |

## Cadence

- **Weekly:** Default `CADENCE` / `PERIOD` (e.g. “week” / “7 days”).
- **Bi-weekly / monthly:** Widen “time window” language in trend signals and “do this week” to match the real planning cycle.

## Compliance and sensitivity

Add a **`COMPLIANCE_NOTE`** (and optional `{{#if COMPLIANCE_NOTE}}` block) when:

- Clinical, financial, or legal claims could appear.
- Cultural or political events require extra care.

Instruct the model to **mark** uncertain items (e.g. `[LEGAL REVIEW NEEDED]`) rather than avoiding the section.

## Memory by maturity

- **Early:** Sheet tab or text files; inject last **two** of **four** stored briefs.
- **Later:** Structured feedback fields and optional database; still cap injected history per `SKILL.md`.

## Custom sources (`custom_sources`)

Use a structured object so **URLs, `@handles`, subreddits, newsletter names, and keywords** stay stable week to week:

- **websites** — Own domains, **campaign landing pages**, regional sites, key competitor URLs.
- **usernames** — Instagram / TikTok / X / LinkedIn handles; include platform in the string when ambiguous.
- **competitors** — Competitor homepages or socials the team tracks every week.
- **communities** — `r/...`, Discord/Slack names, forums.
- **newsletters** — Named digests the team actually reads.
- **keywords** — Hashtags, product/category phrases, campaign codenames.
- **notes** — “Creator sprint list,” locale rules, or “do not track brand X here.”

**`source_scope`:** Use **`provided_only`** when the user wants the brief to assume **no extra** monitored entities beyond the list (strategy extrapolation may still be `[INFERRED]`). Use **`open`** (default) when the list is a **priority** anchor but broader context is allowed.

Prototype and Sheet designs can add a JSON field, repeating section, or separate columns that map into this object; the skill does not require a specific UI.
