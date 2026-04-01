# Install — use this skill in another project

If your environment supports it, you can install via the **Node CLI** (`living-strategy-agent install`) — see the **Install** and **CLI usage** sections in the repository [`README.md`](https://github.com/jeel-p/Living-Strategy-Agent/blob/main/README.md). Commands: `help`, `install`, `verify`, `doctor`, `export`.

## Copy the skill folder

This repository uses the path:

```text
.claude/skills/living-strategy-agent/
```

### Claude Code / OpenClaw-style layouts

1. Clone or copy this repository (`git clone https://github.com/jeel-p/Living-Strategy-Agent.git`).
2. Copy the entire folder `living-strategy-agent/` from `.claude/skills/` into your target project’s `.claude/skills/` directory (create `skills` if needed).
3. Restart or rescan skills if your tool caches them.

Resulting path in the **destination** project:

```text
your-project/.claude/skills/living-strategy-agent/
  SKILL.md
  examples.md
  inputs.md
  outputs.md
  install.md
  troubleshooting.md
```

## Verify

- `SKILL.md` is present (main definition).
- Optional: copy `docs/` for customization and source alignment; not required for the skill to run.

## Optional automation

Python helpers and prompt files live in this repo under `optional-runtime/`. Copy that folder only if you want reference scripts; they are **not** required to install or use the skill.

## No environment required

The skill instructions themselves do **not** need `.env`, a database, or a server. Any API keys apply only if you choose to run `optional-runtime` scripts or a custom prototype that calls an API.
