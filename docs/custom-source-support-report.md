# Custom source support — audit report

**Date:** 2026-04-01  
**Scope:** Documentation + optional runtime path for `custom_sources`.

## What was already supported

- **Unstructured text:** Weekly inputs `trends`, `events`, `competitors`, and `brand_context` could contain URLs, handles, or names, but nothing in the repo **named** or **validated** that pattern.
- **Tone rules:** SPECIFICITY already pushed named platforms and markets; it did **not** distinguish **user-supplied source labels** from **model-inferred** trends.
- **Runtime:** `generate_brief.py` passed only the four text fields (plus optional feedback and memory). No dedicated block for watchlists or categorized sources.

## What was missing

- A **structured** field such as `custom_sources` with categories (websites, usernames, competitors, communities, newsletters, keywords, notes).
- **Documentation** of expected formats and of **priority**: use provided sources first, cite them by name, avoid collapsing into vague phrases.
- **Explicit model instructions** for **verified vs inferred** labeling when users constrain scope (e.g. “only these sources”).
- **Prompt templates** (`SKILL.md`, `optional-runtime/prompts/*.md`) that **consume** `custom_sources`.
- **Runtime** `build_user_prompt` (and system prompt text) **injecting** that structured data.

## What changed

| File | Change |
|------|--------|
| `.claude/skills/living-strategy-agent/inputs.md` | Documented `custom_sources` schema, optional `source_scope`, examples |
| `.claude/skills/living-strategy-agent/SKILL.md` | Custom sources section; system prompt additions (CUSTOM SOURCES POLICY + placeholder); prototype note; checklist |
| `.claude/skills/living-strategy-agent/examples.md` | Examples for URLs, handles, creators, communities, “only provided sources” |
| `.claude/skills/living-strategy-agent/outputs.md` | Source specificity and verified vs inferred in trend signals |
| `docs/customization-guide.md` | Section on `custom_sources` and scope |
| `README.md` | Mention of structured custom sources |
| `skill.json` | `custom_sources`, `source_scope` in inputs metadata |
| `CLAUDE.md` | Pointer to custom sources in inputs |
| `optional-runtime/prompts/system-prompt.template.md` | `{{CUSTOM_SOURCES_POLICY}}` + variable line for policy |
| `optional-runtime/prompts/system-prompt.current.md` | Embedded CUSTOM SOURCES POLICY text |
| `optional-runtime/scripts/generate_brief.py` | `format_custom_sources_block()`, user prompt injection; memory anchor fix |
| `optional-runtime/fixtures/sample_inputs.json` | Rich `custom_sources` + `source_scope` example |
| `docs/spec-alignment.md` | Row mapping custom sources to skill/runtime files |
| `optional-runtime/README.md` | Fixture + `custom_sources` documented for JSON inputs |

## Support level: docs only vs docs + runtime

- **Docs + skill instructions:** Full — users and models can follow `custom_sources` from `inputs.md`, `SKILL.md`, and examples.
- **Runtime:** **Supported** — `generate_brief.py` injects a **CUSTOM SOURCES (USER-PROVIDED)** section into the user message when `custom_sources` is present; system prompts include **CUSTOM SOURCES POLICY** so the model prioritizes named sources and preserves specificity.

No crawlers, schedulers, or APIs were added; the repo stays lightweight.

## Files touched (complete list)

- `.claude/skills/living-strategy-agent/inputs.md`
- `.claude/skills/living-strategy-agent/SKILL.md`
- `.claude/skills/living-strategy-agent/examples.md`
- `.claude/skills/living-strategy-agent/outputs.md`
- `README.md`
- `CLAUDE.md`
- `skill.json`
- `docs/customization-guide.md`
- `docs/spec-alignment.md`
- `docs/custom-source-support-report.md` (this file)
- `optional-runtime/prompts/system-prompt.template.md`
- `optional-runtime/prompts/system-prompt.current.md`
- `optional-runtime/scripts/generate_brief.py`
- `optional-runtime/fixtures/sample_inputs.json`
- `optional-runtime/README.md`
