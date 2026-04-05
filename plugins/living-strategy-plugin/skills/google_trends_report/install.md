# Install

> **Bundled copy** inside **`living-strategy-plugin`** for Claude Code. Canonical source: repo **`.claude/skills/google_trends_report/`** (run `npm run sync:openclaw` to refresh OpenClaw bundles).

## OpenClaw / paste bundle

Copy the folder **`google_trends_report`** from this repository’s **`openclaw/`** directory into your OpenClaw **skills** folder (same pattern as other skills).

## From this monorepo

Canonical files live under:

```text
.claude/skills/google_trends_report/
```

Run **`npm run sync:openclaw`** at the repo root to refresh **`openclaw/google_trends_report/`**.

## OpenClaw parser rules

`SKILL.md` frontmatter must use **single-line** `name`, `description`, and `version`. The embedded OpenClaw parser **does not** support multi-line YAML blocks (for example `description: >` folded scalars). Skill **`name`** in frontmatter is **`google_trends_report`** (snake_case).

## Requirements

- **Network tools:** Web search + URL/page fetch (or browser). The skill is designed for **connected** runtimes.
- **No API keys** in the skill itself. Optional: hosts that expose a real **Google Trends** or analytics API may enrich the report—say so in **Sources** if used.
