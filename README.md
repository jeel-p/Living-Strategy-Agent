# Living Strategy Agent — public skill repository

This repository packages a **Living Strategy Agent** skill: an AI workflow that turns weekly market signals (trends, events, competitors, brand context) into **repeatable, prioritized marketing strategy briefs**.

## What problem it solves

Teams need recurring strategic direction that stays aligned with **changing markets**, **competitors**, and **culture**—without generic “post on social” advice. This skill encodes how to configure the **system prompt**, **mandatory brief structure**, **tone rules**, **memory behavior**, and **quality bar**, plus optional paths to prototypes and automation.

## What you get

| Piece | Purpose |
|-------|---------|
| `.claude/skills/living-strategy-agent/SKILL.md` | **Main installable skill** — full instructions and system prompt template |
| `examples.md`, `inputs.md`, `outputs.md` | Prompts, configuration, and exact output shape |
| `install.md`, `troubleshooting.md` | Copy instructions and common fixes |
| `docs/` | Source spec, alignment notes, industry customization |
| `optional-runtime/` | **Optional** Python prompts/scripts for advanced automation — **not** required to use the skill |

**No database, API server, `.env`, or scheduler is required** to use the skill as instructions inside Claude or similar assistants.

## Install

Repository: [github.com/jeel-p/Living-Strategy-Agent](https://github.com/jeel-p/Living-Strategy-Agent)

### Run from GitHub (`npx`)

```bash
npx github:jeel-p/Living-Strategy-Agent help
npx github:jeel-p/Living-Strategy-Agent install
npx github:jeel-p/Living-Strategy-Agent verify
```

*(Requires a published CLI in this repo; if those commands are not available yet, use [manual install](#manual-install) below.)*

### Run from npm (when published)

If this package is published to npm under a package name, use that name instead of the placeholder:

```bash
npx <package-name> help
npx <package-name> install
npx <package-name> verify
```

### Manual install

1. Clone the repository:

   ```bash
   git clone https://github.com/jeel-p/Living-Strategy-Agent.git
   cd Living-Strategy-Agent
   ```

2. Copy `.claude/skills/living-strategy-agent/` into your project’s `.claude/skills/` directory (see [`install.md`](.claude/skills/living-strategy-agent/install.md)).

## Use

- Invoke the skill when building or running a **living strategy** / **weekly marketing brief** / **trend monitoring** workflow.
- Provide **industry**, **markets**, **cadence**, **output format**, **client type**, and **data sources** when you can; if you say **“just build it,”** the skill uses documented defaults (Consumer brand, weekly, web + email, manual inputs).
- Optional structured **`custom_sources`**: categorized watchlists (websites, social handles, competitors, communities, newsletters, keywords, notes) so URLs and `@handles` stay explicit in prompts and briefs. See `inputs.md` and `docs/custom-source-support-report.md`.
- The model must follow the **mandatory brief sections** and **tone rules** in `SKILL.md` and `outputs.md`.

## Repository layout

```text
living-strategy-agent/
  README.md
  LICENSE
  CLAUDE.md
  skill.json
  .claude/skills/living-strategy-agent/
    SKILL.md
    examples.md
    inputs.md
    outputs.md
    install.md
    troubleshooting.md
  docs/
    source-spec.md
    spec-alignment.md
    customization-guide.md
    custom-source-support-report.md
  optional-runtime/
    README.md
    prompts/
    scripts/
```

## License

See `LICENSE`.
