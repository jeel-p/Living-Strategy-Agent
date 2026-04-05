# Living Strategy Plugin (Claude Code)

[Claude Code plugin](https://code.claude.com/docs/en/plugins) for the **Living Strategy Agent** — **v1.1.0** adds multi-source weekly intelligence, **Reddit/Quora** skill, **Google Trends report** skill, and **LinkedIn + blog content calendars** in the main weekly run.

## Primary goal

Each week the agent should **pull signal** from:

- **Reddit & Quora** (voice-of-customer — `reddit_quora_market_intelligence`)
- **Google Trends–style** research (`google_trends_report` on URL/keywords)
- **Live news & events** (search + fetch)
- **Primary SOT / regulators** (user-supplied `custom_sources`)
- **Social** when relevant

Then **normalize and weight** signals, apply **strategy memory** (if the user provides past actions), reason with **second-order** audience effects (“event now → what changes for the buyer”), and output:

- **What’s moving now** (recency)
- **Channel / content priorities**
- **Weekly content calendar — LinkedIn**
- **Weekly content calendar — Website / blog**
- **Audience value summary**
- Plus actions, budget guidance, what not to do, sources

Architecture matches the **inputs → aggregator + memory → brain → weekly output** mental model.

## Skills in this plugin

| Skill | Slash (namespace) | Role |
|-------|-------------------|------|
| **weekly-brief** | `/living-strategy-plugin:weekly-brief` | **Orchestrator** — full weekly run + calendars (`outputs.md`) |
| **reddit_quora_market_intelligence** | `/living-strategy-plugin:reddit_quora_market_intelligence` | Deep Reddit/Quora mining |
| **google_trends_report** | `/living-strategy-plugin:google_trends_report` | URL/keyword trend intelligence |
| **setup** | `/living-strategy-plugin:setup` | Build agent prototype + system prompt + roadmap |

**How to run these (important):** Plugin skills are [slash commands](https://code.claude.com/docs/en/skills). You must type a **leading `/`**, e.g. **`/living-strategy-plugin:setup`**. If you type `living-strategy-plugin:setup` with no slash, Claude Code treats it as a plain skill name and responds with **Unknown skill**.

**Subagent:** **`marketing-strategist`** — delegates across the above.

## Why copying to `~/.claude/plugins/` is not enough

Claude Code **does not** auto-register loose folders. Use **marketplace + install** or **`--plugin-dir`**. See below.

## Install (recommended): marketplace in this repo

```text
/plugin marketplace add D:\Projects\skills\Living-Strategy-Agent
/plugin install living-strategy-plugin@living-strategy-agent
/reload-plugins
```

(Adjust the drive/path to your clone.) Or add the file directly:

```text
/plugin marketplace add D:\Projects\skills\Living-Strategy-Agent\.claude-plugin\marketplace.json
```

## Update the plugin after `git pull` or local edits

```text
/plugin marketplace update living-strategy-agent
/plugin install living-strategy-plugin@living-strategy-agent
/reload-plugins
```

If the UI still shows old behavior:

```text
/plugin uninstall living-strategy-plugin@living-strategy-agent
/plugin install living-strategy-plugin@living-strategy-agent
/reload-plugins
```

**One-session dev (always reads latest files on disk):**

```bash
claude --plugin-dir D:\Projects\skills\Living-Strategy-Agent\plugins\living-strategy-plugin
```

## Copy-paste prompts

- **`skills/weekly-brief/examples.md`** — orchestrator
- **`skills/reddit_quora_market_intelligence/examples.md`** — VoC-only
- **`skills/google_trends_report/examples.md`** — trends report only

## Ollama / custom `claude` launchers

Non-standard binaries may not expose **`/plugin`** fully — use **`--plugin-dir`** or an official [Claude Code](https://code.claude.com/en/setup) build.

## Relationship to the repo

- Canonical **skills** also live under **`.claude/skills/`** (e.g. `living-strategy-agent`, `google_trends_report`). The plugin **bundles** copies for Claude Code; align changes when you evolve behavior.

## Tracking outputs over time

No built-in DB — append weekly outputs to a project file (e.g. `strategy-briefs/2026-W14.md`) if you want history.

## Troubleshooting: “Unknown skill: living-strategy-plugin:setup” (or `:weekly-brief`)

Try these in order:

1. **Use a leading slash** — Run **`/living-strategy-plugin:setup`**, not `living-strategy-plugin:setup`. Same for **`/living-strategy-plugin:weekly-brief`**.

2. **Refresh a stale install** — If **`/plugin install`** says *already installed*, the cached copy under **`~/.claude/plugins/cache`** may be old (e.g. before the **`setup`** skill existed). Prefer [Update the plugin](#update-the-plugin-after-git-pull-or-local-edits), then **`/reload-plugins`**.

   If you still need a clean reinstall: **`/plugin uninstall`** may refuse when the plugin is listed in **`.claude/settings.json`** (team scope). Then either:

   - **Press Enter** on the prompt to **disable only for you** via **`.claude/settings.local.json`** (same effect as uninstall for your machine; teammates unchanged), then **`/plugin install …`** again; or  
   - **Edit `.claude/settings.json`** (with team agreement), remove **`living-strategy-plugin@living-strategy-agent`** from **`enabledPlugins`**, commit, then uninstall/reinstall; or  
   - Use **`claude --plugin-dir …/plugins/living-strategy-plugin`** for a session that always reads the folder on disk.

3. **Plugin not loaded** — Install and reload per [Install](#install-recommended-marketplace-in-this-repo), or start with **`--plugin-dir`** pointing at **`plugins/living-strategy-plugin`**.

**Fallback (this repo as project):** Open the **Living-Strategy-Agent** clone so **`.claude/skills/`** is picked up, then use **`/living_strategy_setup`** or **`/living_strategy_weekly`** (underscores match each skill’s `name:` in frontmatter).

## Troubleshooting: “Invalid tool parameters”

Long prompts break some UIs — use **two messages** (slash first, paste second) or a **`brief-input.md`** file. See section above in git history or use two-turn workflow.
