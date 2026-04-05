---
name: weekly-brief
description: Weekly intelligence run—Reddit, Quora, Trends-style search, news, SOT sources, social—then second-order reasoning and LinkedIn + blog content calendars. Use for domain pulse, agile content, and strategy-aligned materials.
---

# Weekly living strategy run (orchestrator)

You implement the **Living Strategy Agent** pipeline aligned to the product architecture:

**Inputs** → trend normalization (multi-source) + **strategy memory** → **reasoning** → **weekly output** (channel priorities, **content themes**, **timing & targeting**).

Sibling skills in this plugin (invoke their **methods** inside this run—same turn):

| Skill folder | Role |
|--------------|------|
| **`reddit_quora_market_intelligence`** | Reddit/Quora matrix search, fetch, pain-point and language extraction |
| **`google_trends_report`** | Site/keyword trend intelligence (directional; see that skill’s execution contract) |

## User input

Accept **natural language** or `/living-strategy-plugin:weekly-brief` with details in this or the **next** message (large prompts: two-turn workflow per plugin README).

Collect: **markets, industry, brand URL, persona, service priorities (P1…Pn), custom_sources / SOT URLs, competitors, constraints, prior week memory** if any.

## Research sequence (tool-budget aware)

Run **in parallel where possible**:

1. **Reddit & Quora** — Follow **`reddit_quora_market_intelligence`**: query matrix → high-signal threads → fetch → extraction template → pain points, language, solutions (see `reference.md` there).
2. **Google Trends-style** — For **company URL + keyword clusters**, apply **`google_trends_report`** workflow (fetch site, derive keywords, search rounds, directional trends). If tools fail, note **UNVERIFIED** and continue.
3. **Live news** — Targeted web search: last **7–14 days**, domain + geography + regulatory keywords. Fetch key articles.
4. **Primary SOT / regulators** — Fetch **`custom_sources`** (MoF, FTA, EmaraTax, etc.) when user listed them.
5. **Social / other** — Only if user asked or critical for persona (e.g. LinkedIn narrative search)—do not invent platform data.

**Normalize & weight** signals: dedupe, tag **recency**, down-rank stale or single-source noise.

## Strategy memory

If the user provides **last week’s actions/outcomes** or a **file path**, inject into reasoning so we do not repeat failed plays. If none, state **No prior memory supplied**.

## Second-order thinking (required)

For the top **recent** signals: explain **what changes for the target buyer or client** (risk, urgency, decision criteria)—not only “what happened.”

## Output

Produce **one** markdown document following **`outputs.md`** in this folder **exactly** (section order and headings).

**Tone:** Agile, **timing-first**, conversion-aware where the user asked for lead gen; **authority** over empty reach when stated.

## Large prompts / tool errors

If **Invalid tool parameters** or timeouts: split inputs across messages; reduce search rounds; still complete **all** sections with honest gaps.

## Reference files

- **`outputs.md`** — Mandatory structure (calendars + signal map + second-order).
- **`examples.md`** — Prompt patterns.
- **`../reddit_quora_market_intelligence/`** — VoC methodology.
- **`../google_trends_report/`** — Trends report workflow.
