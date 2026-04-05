# Install — use this skill in another project

If your environment supports it, you can install via the **Node CLI** (`living-strategy-agent install`) — see the **Install** and **CLI usage** sections in the repository [`README.md`](https://github.com/jeel-p/Living-Strategy-Agent/blob/main/README.md). Commands: `help`, `install`, `verify`, `doctor`, `export`.

**Claude Code:** Prefer the **`plugins/living-strategy-plugin/`** package in this repo (namespaced `/living-strategy-plugin:weekly-brief` and `/living-strategy-plugin:setup`). See **`plugins/living-strategy-plugin/README.md`**.

## Copy the skill folder

This repository uses the path:

```text
.claude/skills/living-strategy-agent/
```

### Claude Code / OpenClaw-style layouts

1. Clone or copy this repository (`git clone https://github.com/jeel-p/Living-Strategy-Agent.git`).
2. Copy the entire folder `living-strategy-agent/` from `.claude/skills/` into your target project’s `.claude/skills/` directory (create `skills` if needed).
3. Restart or rescan skills if your tool caches them.

**OpenClaw YAML:** `SKILL.md` frontmatter uses **single-line** `description` and **`name: living_strategy_agent`** so OpenClaw’s parser can load the skill (multi-line `description: >` breaks execution).

**OpenClaw with internet / MCP:** Enable **web search**, **URL fetch**, or any research MCP your host supports so the skill can **ground** weekly briefs (see **OpenClaw and tool-capable runtimes** in `SKILL.md`). The skill text does not add network by itself—the **host** must expose tools. If tools are off, behavior falls back to pasted inputs only.

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

The skill instructions themselves do **not** need `.env`, a database, or a server. **Networked research** uses the host’s tools (OpenClaw, browser MCP, etc.), not credentials inside this folder. Any API keys apply only if you choose to run `optional-runtime` scripts or a custom prototype that calls an API.
