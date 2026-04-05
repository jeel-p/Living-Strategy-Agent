---
name: setup
description: Build or configure the living strategy agent — HTML prototype guidance, system prompt from template, roadmap, optional Sheet/Notion pointers. Use when the user wants to create the agent, demo, or handoff, not only this week's brief.
---

# Living strategy agent — setup / build

Deliver the **agent package**, not just one weekly brief.

## Deliverables (in order)

1. **Working HTML prototype** — Single-file if possible; streaming if the environment supports it; inputs for trends, events, competitors, brand context, optional `custom_sources`; markdown-rendered brief output.
2. **System prompt** — Filled template: role, CLIENT PROFILE, CUSTOM SOURCES POLICY, CONNECTED RUNTIME if tools exist, mandatory sections from the canonical **Living Strategy Agent** `SKILL.md` in the repo (same structure as `.claude/skills/living-strategy-agent/`).
3. **Build roadmap** — Phased checklist: prototype → memory file/Sheet → optional automation (`optional-runtime/` in repo, optional mention only).

## Defaults

Apply the same “just build it” defaults as in **`../weekly-brief/examples.md`** when the user is vague.

## Do not

- Imply a hosted backend exists unless they deploy one.
- Require Python or API keys for the core package.

If they only wanted **this week’s brief**, point them to **`/living-strategy-plugin:weekly-brief`** instead.
