---
name: google_trends_report
description: Trend intelligence from a company website using web fetch and search. Use when the user provides a URL plus trends, industry research, market insights, or Google Trends language. Directional signals only unless the host exposes real Trends data.
version: 1.0.0
---

# Google Trends Report

## Execution contract (OpenClaw)

The OpenClaw agent **parses YAML frontmatter with single-line keys only**. This file follows that rule.

**Always complete a successful run:** respond with the **full report** in the **Report format** section in one turn. Do not end with only a tool error or “I could not run the skill.”

1. **Tool failures or timeouts:** Use fewer steps—at least **4** web searches if search works; **1–2** URL fetches. If fetch fails, search for the company name plus site domain, then mark uncertain rows **Unclear** and say what failed in **Company overview** or **Sources**.
2. **No network tools:** Still output the report using any pasted URL text or search snippets you have; state clearly that signals are **not web-grounded**.
3. **Never empty sections:** Use **Unclear**, **N/A**, or honest limitations rather than skipping headings.

Produces a **structured trend intelligence report** for a company starting from its **website URL**. The workflow uses **URL fetch** and **web search** to infer what is rising, stable, or declining in their space (Google Trends–style questions; not official API numbers unless your host provides them).

**Requires a connected runtime** (OpenClaw, agents with search + fetch) for best results.

---

## OpenClaw and tools

Use whatever the host provides, under common names:

| Capability | Typical names |
|------------|----------------|
| Load pages | `web_fetch`, URL fetch, MCP extract, `mcp_web_fetch`, browser snapshot |
| Find signals | Web search, news search, “parallel web search” MCP |

If **fetch** fails for a URL, try **www** vs apex domain, `/about`, `/services`, or a browser tool for JS-heavy sites.

---

## Workflow

### Step 1 — Analyze the company website

Fetch the **homepage** and, when useful, **About**, **Services**, **Products** (paths like `/about`, `/services`, `/product`, `/solutions`).

Extract:

- **Core services / products** (explicit list)
- **Industry / vertical** (e.g. SaaS, healthcare, e-commerce, fintech)
- **Target audience** (B2B, B2C, enterprise, SMB, consumers)
- **Geographic focus** (local, national, global)
- **Positioning / differentiators**

If the homepage is thin, fetch extra paths before asking the user.

### Step 2 — Derive search keywords

From the extraction, build:

- **5–8 primary keywords** (exact product/service names from the site)
- **5–8 industry category keywords** (broader)
- **3–5 competitor or alternative keywords** (only if inferable from the site or public context—do not invent brands)
- **3–5 emerging / tech keywords** relevant to the space

### Step 3 — Research trends via web search

Use **targeted searches** (adapt the **year** to match **Report Date**—e.g. current calendar year). Example patterns:

```text
"[keyword] trend [YEAR]"
"[keyword] Google Trends rising"
"[industry] trending topics [YEAR]"
"[service category] market growth [YEAR]"
"[industry] emerging trends"
"what's trending in [industry] [YEAR]"
"[keyword] search interest" OR "search volume trend"
```

Also run:

- `Google Trends [primary keyword]` (to find commentary and direction—not a guarantee of live chart data)
- `[industry] consumer behavior [YEAR]`
- `[industry] most searched topics [YEAR]`
- Competitor names **only if known** + `market share` OR `trend`

**Search budget:** Aim for **8–12 searches** when stable; **12–18** only if the host allows many rounds. If the host limits tool calls or errors, do **at least 4** searches covering primary keywords + industry, then stop and state *"Search rounds limited—findings are directional."*

### Step 4 — Synthesize the report

Use **only** evidence from fetched pages and search results. **Do not** invent precise Google Trends index numbers, percentages, or dates. Use **directional** language: *rising / cooling / stable / unclear* with reasoning.

Every external claim should trace to a **source** listed in **Sources & research basis** with **markdown links** `[title](https://...)`.

---

## Report format

Output **clean Markdown** using this structure (emoji optional; keep sections even if you drop emoji):

```markdown
# Trend Intelligence Report: [Company Name]
**Website**: [URL] | **Report date**: [YYYY-MM-DD] | **Industry**: [Detected industry]

---

## Company overview
[2–3 sentences: what they do, who they serve, positioning]

**Core services identified:**
- [Service 1]
- [Service 2]
- …

---

## Top trending topics for your business

For each trend (aim for **6–10** distinct topics):

### 1. [Trend name]
**Relevance to you**: [Which service/product this ties to]
**Trend direction**: Rising | Declining | Stable | Unclear — *[never fabricate a chart; infer from sources]*
**Why it matters**: [2–3 sentences, evidence-based]
**Opportunity**: [Specific action]

*(Repeat for each trend.)*

---

## Industry momentum summary

[One paragraph: growth vs fragmentation vs consolidation; macro story.]

**Growth signals:**
- [Signal with linked or named source]
- [Signal 2]

**Caution signals:**
- [Risk or cooling trend]
- [Risk 2]

---

## Keyword trends breakdown

| Topic / keyword | Direction | Momentum (qualitative) | Notes |
|-------------------|-----------|-------------------------|-------|
| … | Rising / Stable / Declining / Unclear | High / Med / Low | [brief context + source if key] |

---

## Strategic recommendations

### Quick wins (0–3 months)
1. …
2. …

### Medium-term (3–12 months)
1. …
2. …

### Watch list
- …
- …

---

## Trends to avoid / de-prioritize
[2–3 areas that look declining, saturated, or poorly evidenced—say so honestly]

---

## Sources & research basis
- [Article or page title](https://...) — what it supported
- …
```

**Minimum coverage:** At least **6** distinct trend topics when evidence exists; if thin, include fewer but label gaps. Prefer **8+** search rounds when the environment allows; **4** is acceptable when tools fail—say so under **Sources** or **Industry momentum**.

---

## Quality standards

- **Specific:** Name real topics from sources—not “AI is big” without evidence.
- **Company-linked:** Each trend should connect to an identified service or positioning when possible.
- **Directional honesty:** Rising/declining/stable/**unclear** with reasoning; no fake Google Trends numbers.
- **Linked sources:** Use `[label](https://...)` in **Sources & research basis** and inline where helpful.
- **No hallucination:** Gaps → *"No reliable public signal found"* or **Unclear** direction.
- **Niche sites:** Add extra searches (see edge cases).

---

## Edge cases

**Sparse website:** Ask: *"I found limited copy on the site—what are your top 2–3 services or markets so I can tighten keywords?"*

**Very niche industry:** At least **3** dedicated niche queries before broadening.

**Non-English site:** Match query language to the **page language** and primary market.

**SaaS / tech:** Add searches like `[category] Product Hunt`, `[category] VC investment trends [YEAR]` (when relevant).

**Local businesses:** Add `[service] trend [city or region] [YEAR]`.

---

## When not to use this skill

- **No URL and no company name** — ask for a website or clear brand context first.
- **Legal / financial decisions** — trend reports are **not** investment or compliance advice.
