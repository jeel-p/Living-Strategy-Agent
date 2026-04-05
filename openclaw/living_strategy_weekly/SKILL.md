---
name: living_strategy_weekly
description: Weekly intelligence run—Reddit, Quora, trends, news, SOT—then second-order reasoning and LinkedIn + blog calendars. Same behavior as living-strategy-plugin weekly-brief; use when plugin slash commands are unavailable.
version: 1.0.0
---

# Weekly living strategy run (project skill)

Same orchestration as **`plugins/living-strategy-plugin/skills/weekly-brief/`**. Use **`./outputs.md`** and **`./examples.md`** in this folder.

**VoC / Reddit–Quora:** Follow **`plugins/living-strategy-plugin/skills/reddit_quora_market_intelligence/reference.md`** in this repository.

**Google Trends–style:** Follow **`plugins/living-strategy-plugin/skills/google_trends_report/SKILL.md`** in this repository.

## User input

Collect: markets, industry, brand URL, persona, service priorities, custom_sources, competitors, memory.

## Research sequence

1. Reddit & Quora (matrix search, fetch, extract per reference above).
2. Google Trends report workflow on URL/keywords when applicable.
3. Live news (7–14 days), SOT fetches, social if needed.
4. Normalize, weight, second-order audience reasoning.

## Output

Follow **`outputs.md`** in this folder exactly.

## Large prompts

Two-turn workflow: message 1 = skill name only + “inputs next”; message 2 = full paste.
