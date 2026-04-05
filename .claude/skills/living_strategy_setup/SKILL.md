---
name: living_strategy_setup
description: Build the living strategy agent package—HTML prototype guidance, system prompt, roadmap. Same as living-strategy-plugin setup; use when plugin namespace is unavailable.
version: 1.0.0
---

# Living strategy agent — setup / build

Same as **`plugins/living-strategy-plugin/skills/setup/`**.

## Deliverables (in order)

1. **Working HTML prototype** — inputs for trends, events, competitors, brand context, optional `custom_sources`; markdown brief output.
2. **System prompt** — filled from canonical **`.claude/skills/living-strategy-agent/SKILL.md`** template sections.
3. **Build roadmap** — prototype → memory → optional `optional-runtime/`.

## Defaults

Consumer brand, generic markets, weekly, web + email when user says “just build it.”

## Do not

Imply hosted backend; require Python/API keys for core package.

For **this week’s run only**, use **`living_strategy_weekly`** (or plugin **`weekly-brief`**).
