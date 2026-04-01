# Outputs — mandatory brief structure

Every weekly strategy brief **must** use exactly these sections, in this order. Do not add top-level sections. Do not skip sections.

## Document shape

1. **Title line** — `# [Week headline — one punchy sentence for the single most important insight]`

2. **Strategic read** — `## Strategic read`  
   Two to three sentences: interpretation for this brand now; underlying shift; signal for roughly the next four weeks. **Not** a summary of pasted inputs.

3. **Trend signals** — `## Trend signals (ranked by urgency)`  
   Per signal: precise what/where/metric; why it matters for this brand; time window (e.g. 48h vs 3 weeks); strength **HIGH | MEDIUM | WATCH**.  
   When the user supplied **`custom_sources`**, tie signals to **named sources** where relevant (site, handle, community, newsletter) instead of vague “competitors” or “social.” If something is extrapolated beyond the provided list, mark it **`[INFERRED]`** (especially when `source_scope` is `provided_only`).

4. **Priority actions** — `## Priority actions`  
   - `### Do immediately (next 48 hours)` — **One** action: channel, market, format/audience, why now, expected outcome.  
   - `### Do this week` — Two to three actions with what, where, why this week.  
   - `### Watch and hold` — One to two items with **If [X] by [date], then [Y].**

5. **Budget and channel guidance** — `## Budget and channel guidance`  
   Increase / reduce / hold with rationale; if no budget numbers, use relative priority (high / medium / low / pause).

6. **What NOT to do** — `## What NOT to do this week`  
   One to two items with reasoning.

7. **Next week setup** — `## Next week setup`  
   One preparatory action this week for stronger execution next week.

## Length and quality bar

- Readable in **under three minutes** (no filler).
- **Specificity:** named platforms and markets throughout; **preserve user-provided source names** (URLs, `@handles`, `r/subreddit`, newsletter titles) when `custom_sources` is present.
- **One** clear #1 priority for the 48-hour block.

## Deliverable bundle (what the skill produces)

When “building the agent,” outputs are presented in this order:

1. Working **HTML prototype** (or equivalent) — streaming preferred.
2. **System prompt** — full configured text, separate from UI.
3. **Build roadmap** — phased checklist toward optional automation.
4. **Next-step offer** — Sheet template, delivery format, or pointers to `optional-runtime/` for scripts.
