# CLAUDE.md — repo guidance for Claude-compatible usage

## What this repo is

A **portable skill package** for building and operating a **Living Strategy Agent**: recurring, signal-driven marketing strategy briefs with a fixed professional structure. The canonical behavior lives in `.claude/skills/living-strategy-agent/SKILL.md`.

## What this repo is not

The core product is **not** a backend service, scheduled job, or database. Do not treat `optional-runtime/` as required for installation or for answering strategy questions. Those files exist only as **advanced reference implementations**.

## How to use this repository in Claude

1. **Load the skill** by including `SKILL.md` (and as needed `inputs.md`, `outputs.md`) in the project context or by copying the skill into `.claude/skills/` per `install.md`.
2. **When the user’s goal matches the triggers** (weekly brief, trend agent, living strategy, competitive intelligence, etc.), follow the skill: gather inputs, apply defaults if they say “just build it,” and produce outputs in the **mandatory section order**. If the user names URLs, handles, communities, or watchlists, capture them in **`custom_sources`** (see `inputs.md`) and **do not collapse** them to vague labels in the brief.
3. **Preserve business rules:** specificity (named platforms/markets), prioritization (single “do immediately” action), “what NOT to do,” memory injection format when history exists, sub–3-minute readability, and **source-name preservation** when `custom_sources` is present.
4. **Deliverables order:** working HTML prototype when building an agent artifact → system prompt → roadmap → offer next steps (Sheet/Notion/automation pointers).

## Files to prioritize

| File | Role |
|------|------|
| `SKILL.md` | Full skill definition and system prompt template |
| `outputs.md` | Exact brief structure |
| `examples.md` | Invocation patterns |
| `docs/customization-guide.md` | Industry-specific overlays |

## Optional runtime

If the user explicitly wants automation, GitHub Actions, Sheets, or APIs, refer them to `optional-runtime/README.md` and remind them that API keys and cloud resources are **their** operational concern.
