# OpenClaw bundle

Ready-to-paste copies of skills in this repository, plus shared **`CLAUDE.md`** and **`LICENSE`**.

## Skills in this folder

| Folder | Purpose |
|--------|---------|
| **`living-strategy-agent/`** | Weekly marketing strategy briefs, `custom_sources`, linked sources when tools are on. Uses repo-root **`skill.json`** overlaid at sync time. Frontmatter **`name`:** `living_strategy_agent`. |
| **`google_trends_report/`** | Company URL → trend intelligence report (web fetch + search). Frontmatter **`name`:** `google_trends_report`. **Must** use single-line YAML in `SKILL.md` (OpenClaw parser). |

Copy **each skill folder you need** into your OpenClaw **skills** directory (path varies by version—e.g. `~/.openclaw/skills/`, `skills/` in workspace).

### Layout after paste

```text
<your-openclaw-skills>/
  living-strategy-agent/
    SKILL.md
    skill.json
    …
  google_trends_report/
    SKILL.md
    skill.json
    …
```

## Tooling

- **`living_strategy_agent`:** Enable web search / URL fetch / MCP for grounded briefs and markdown links.
- **`google_trends_report`:** Requires **search + fetch** for best results; skill still **must** output a full report if tools fail (see `SKILL.md` → Execution contract).

## Sync from the repo

From the repository root:

```bash
npm run sync:openclaw
```

This refreshes every skill under **`openclaw/`** from **`.claude/skills/<name>/`**, overlays **`living-strategy-agent/skill.json`** from the repo root, and copies **`CLAUDE.md`** + **`LICENSE`** here.

## OpenClaw frontmatter (important)

OpenClaw’s parser expects **single-line** `name`, `description`, and `version` in `SKILL.md`. Do not use multi-line `description: >` blocks—skills may **fail to load or execute**. Use **`snake_case`** for `name` (see [Creating Skills](https://docs.openclaw.ai/tools/creating-skills)).
