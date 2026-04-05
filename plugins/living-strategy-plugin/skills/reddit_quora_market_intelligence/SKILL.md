---
name: reddit_quora_market_intelligence
description: Deep-mine Reddit and Quora for pain points, behavioral trends, and product discussions. Use for authentic human insight, competitive social proof, and niche audience language—prefer over generic web search for those goals.
---

# Reddit & Quora market intelligence

Extract **pain points**, **behavioral trends**, and **product/solution maps** from Reddit and Quora. Pair with **`weekly-brief`** inside this plugin for a full weekly intelligence run.

Read **`reference.md`** in this folder for query matrices, extraction templates, subreddit hints, and report skeleton.

## Step 0 — Clarify research brief

| Parameter | Example |
|-----------|---------|
| Brand/Company | Horizon BizCo |
| Target persona | UAE SMEs, finance leads, foreign entrants |
| Domain | Tax, audit, compliance |
| Geography | UAE / GCC |
| Research goal | Pain points + solutions discussed |

Infer persona from company + domain when possible; ask only if unclear.

## Step 1 — Build search query matrix

Combine **persona**, **problem**, **domain**, **solution-seeking** terms.

- **Reddit:** `site:reddit.com [persona] [problem/domain] [signal word]`
- **Quora:** `site:quora.com [persona] [domain] [question signal]`

Run **6–10+** searches; cast wide then narrow. See **`reference.md`** for example matrices.

## Step 2 — High-signal posts

Prioritize: questions with **10+ comments**, frustration language, solution threads, comparisons, **recent** (12–18 months preferred). Skip spam, single-comment noise, off-topic.

## Step 3 — Fetch and extract

For each high-signal thread, use **web fetch** or browser when needed. Extract using the **POST EXTRACTION TEMPLATE** in **`reference.md`** (pain point, persona signal, tone, solutions, unmet need, quote, URL).

Aim for **10–15+** posts when tools allow; fewer if limited—state so in the report.

## Step 4 — Intelligence report

Synthesize into the **MARKET INTELLIGENCE REPORT** structure in **`reference.md`**: top pain points, products in use, behavioral trends, persona deep dive, strategic opportunities, **all sources** with links.

## Quality rules

- **3+ independent mentions** before calling something a validated trend.
- **Preserve exact user language** in quotes.
- Note geography (India vs UAE vs global) when queries or solutions differ.
- Separate **doctor-recommended** vs **peer-recommended** vs **self-discovered** when visible.

## When to run

- Before weekly content planning when **voice-of-customer** and **language** matter.
- Whenever the user asks what Reddit/Quora say about **[persona]** in **[domain]**.
