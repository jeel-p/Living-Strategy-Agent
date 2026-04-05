# Inputs — required and optional configuration

Prompt patterns that use these fields (including `custom_sources`) are in **`examples.md`** in this folder.

## Required to tailor the agent (ask if missing)

| Input | Description |
|-------|-------------|
| **industry** | Vertical (e.g. Consumer brand, E-commerce, B2B SaaS, Hospitality, Retail, Healthcare, Finance). |
| **markets** | Geography or segments (e.g. MENA, SEA, US/Europe, Global, single country). |
| **cadence** | Weekly (default), bi-weekly, or monthly. |
| **output_format** | Where briefs go: Notion, Email, Slack, PDF, Web viewer. |
| **client_type** | Internal team vs external client-facing deliverable. |
| **data_sources** | What signals feed the agent: free tools, paid APIs, manual research, etc. **In OpenClaw or any host with web/MCP tools**, include live **search + URL fetch** for grounding (see **OpenClaw and tool-capable runtimes** in `SKILL.md`). |

## Custom sources (`custom_sources`) — optional but recommended when users name URLs, handles, or watchlists

Use a **single structured object** so websites, handles, and communities stay **explicit** in prompts and outputs (not lost inside free text).

### Shape (JSON-friendly; arrays of strings unless noted)

| Key | Holds |
|-----|--------|
| **`websites`** | Brand site, campaign landing pages, market or regulator pages, docs — full URLs or canonical domains. |
| **`usernames`** | Social handles with platform hint when possible, e.g. `Instagram @brand`, `TikTok @creator`, `X @handle`, `LinkedIn company/brand`. |
| **`competitors`** | Competitor homepages, product pages, or their social handles. |
| **`communities`** | Subreddit names (`r/...`), Discord/Slack channel names, Facebook groups, niche forums. |
| **`newsletters`** | Named newsletters, Substacks, industry digests. |
| **`keywords`** | Topics, hashtags, or search phrases to monitor. |
| **`notes`** | Freeform: e.g. “Only these 3 creators this sprint,” locale, or caveats (string or short list). |

Empty categories can be omitted. The model should **still** receive `trends` / `events` / `competitors` / `brand_context` as usual; `custom_sources` **adds** an explicit, categorized watchlist.

### Source scope (`source_scope`) — optional

| Value | Meaning |
|-------|---------|
| *(omit or `"open"`)* | User-provided sources are **priority** inputs; you may add reasonable [INFERRED] context. |
| **`provided_only`** | Treat **`custom_sources`** as the **exclusive** monitoring set for this run: ground claims in those names/URLs/handles; label broader extrapolation **`[INFERRED]`**. |

## Structured weekly inputs (for each brief run)

The model should expect a consistent bundle each cycle:

| Field | Role |
|-------|------|
| **Trends** | Topics, search spikes, viral patterns. |
| **Events** | Cultural moments, holidays, launches. |
| **Competitors** | Moves observed this period. |
| **Brand context** | Campaigns, goals, constraints. |
| **`custom_sources`** | Categorized watchlist: websites, usernames, competitors, communities, newsletters, keywords, notes (see above). |

Optional but valuable:

| Field | Role |
|-------|------|
| **Feedback on last week** | What happened after prior recommendations. |
| **Past briefs / memory** | Injected per memory rules in `SKILL.md`. |
| **`source_scope`** | `open` (default) or `provided_only` — see above. |

## Defaults (“just build it”)

If the user does not specify:

- **Industry:** Consumer brand  
- **Markets:** Generic / configurable  
- **Cadence:** Weekly  
- **Output:** Web viewer + Email  
- **Data sources:** Manual inputs (MVP), or **live web + fetch** when the runtime exposes those tools (default for connected OpenClaw-style runs)

## Client profile fields (embedded in system prompt)

Used in `CLIENT PROFILE` when instantiating the template:

- Industry, markets, brand stage, KPIs, current campaign focus.

## Compliance / guardrails (when relevant)

For regulated or sensitive industries, add a `COMPLIANCE_NOTE` (e.g. legal review flags, disclaimers). See `docs/customization-guide.md`.
