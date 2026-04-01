# Spec alignment — source markdown to packaged skill

This document maps `docs/source-spec.md` (the original `living-strategy-agent-full.md` content) to the files in this repository.

| Source section / concept | Where it lives in this repo |
|--------------------------|-----------------------------|
| YAML `name` / `description` | `skill.json`, `SKILL.md` frontmatter, `README.md` |
| Triggers and “when to use” | `skill.json` `triggers` / `when_to_use`, `SKILL.md` “When to use”, `examples.md` |
| What the skill produces (prototype, prompt, roadmap, assets) | `README.md`, `SKILL.md` “Purpose” and “Skill output presentation order”, `outputs.md` deliverable bundle |
| Step 1 — configuration table | `inputs.md`, `SKILL.md` “Before you build”, `skill.json` `inputs` |
| Custom watchlists (URLs, handles, communities, etc.) | `custom_sources` + `source_scope` in `inputs.md`, `SKILL.md`, `examples.md`, `docs/customization-guide.md`, `docs/custom-source-support-report.md`; runtime: `generate_brief.py`, `fixtures/sample_inputs.json`, `optional-runtime/prompts/*.md` |
| “Just build it” defaults | `inputs.md`, `SKILL.md`, `skill.json` `defaults_if_just_build_it` |
| Step 2 — HTML prototype | `SKILL.md` “HTML prototype expectations”; detailed HTML notes remain in `docs/source-spec.md` |
| Step 3 — six non-negotiable prompt elements | `SKILL.md` “The six non-negotiable elements” |
| Mandatory output structure (full template) | `SKILL.md`, `outputs.md`; full template text also in `optional-runtime/prompts/` |
| Tone and style rules | `SKILL.md` “Tone and style”; embedded in system prompt template |
| Step 4 — automation pipeline / stack diagram | Summarized in `SKILL.md` “Optional automation”; full detail in `docs/source-spec.md` and `optional-runtime/README.md` |
| Step 5 — memory (MVP vs production) | `SKILL.md` “Memory behavior”, `inputs.md`; Supabase/SQL in source → **optional** advanced path only in `docs/source-spec.md` and optional scripts |
| Step 6 — deliver order | `SKILL.md`, `outputs.md` |
| Customization by industry table | `docs/customization-guide.md` (expanded from source table) |
| Quality checklist | `SKILL.md`, `outputs.md` (quality bar), `troubleshooting.md` |
| System prompt template + variables + memory injection format + versioning | `SKILL.md`; `optional-runtime/prompts/system-prompt.template.md` and `system-prompt.current.md` |
| Build roadmap phases, Python snippets, GitHub Actions, Notion, requirements | `docs/source-spec.md` (unchanged); **optional** Python under `optional-runtime/scripts/` |

## Design choice: skill-first

- **Core:** Instructions, templates, checklists, and examples — no `.env` or infrastructure required.
- **Secondary:** Automation, Sheets API, Supabase, schedulers — preserved in **source spec** and **optional-runtime** for users who opt in.
