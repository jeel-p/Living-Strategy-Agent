# Optional runtime — advanced automation (not required)

This folder holds **reference** prompts and Python scripts for teams that want to automate brief generation outside a chat UI. **Installing or using the skill** in `.claude/skills/living-strategy-agent/` does **not** require anything here.

## What is here

| Path | Purpose |
|------|---------|
| `prompts/system-prompt.template.md` | Configurable template with `{{VARIABLE}}` placeholders |
| `prompts/system-prompt.current.md` | Example filled prompt (Consumer brand defaults) |
| `scripts/generate_brief.py` | Load prompt + inputs → call Anthropic Messages API (streaming optional) |
| `scripts/memory.py` | File-based JSON store for last few briefs (MVP; no database) |
| `scripts/run_weekly.py` | Glue: inputs JSON → memory → generate → deliver |
| `scripts/deliver.py` | Write brief to disk; extend with your own Notion/Email/Slack |
| `fixtures/sample_inputs.json` | Example input JSON; includes optional `custom_sources` and `source_scope` |

## Setup (only if you use this folder)

1. Use Python 3.10+.
2. Install dependencies: `pip install -r requirements.txt` (from this directory).
3. Set environment variables **in your shell or secret manager** — this repo does **not** ship a `.env` file:
   - `ANTHROPIC_API_KEY` — required for live generation
   - `WEEKLY_INPUTS_PATH` — optional path to JSON inputs (defaults to `fixtures/sample_inputs.json`)

## Inputs JSON shape

See `fixtures/sample_inputs.json`. Fields align with the skill: `trends`, `events`, `competitors`, `brand_context`, plus `industry`, `markets`, optional `feedback_last_week`, optional structured **`custom_sources`** (websites, usernames, competitors, communities, newsletters, keywords, notes) and optional **`source_scope`** (`open` or `provided_only`).

## Security

- Do not commit API keys or `data/` brief history to version control.
- `data/` is listed in `.gitignore` under `optional-runtime/`.

## Relationship to the skill

The **authoritative** behavior and section order are in `SKILL.md` at the repo root. These scripts are **one possible** implementation for engineers who want automation; they are not the core product.
