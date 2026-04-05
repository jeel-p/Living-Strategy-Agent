# Living Strategy Agent

**A Claude / OpenClaw–style skill** plus a small **Node.js installer CLI**. It turns weekly market signals (trends, events, competitors, brand context, optional `custom_sources`) into **repeatable, prioritized marketing strategy briefs**—without building a backend.

**Repository:** [github.com/jeel-p/Living-Strategy-Agent](https://github.com/jeel-p/Living-Strategy-Agent)

---

## What this skill does

- Encodes **system prompt** patterns, **mandatory brief sections**, **tone rules**, **memory behavior**, and a **quality checklist**.
- Supports structured **`custom_sources`** (websites, handles, communities, newsletters, keywords) so names stay explicit in outputs.
- Ships **optional** Python helpers under `optional-runtime/` only if you want automation—**not** required to use the skill.

---

## Who it is for

- Marketing / strategy teams who want **weekly** or **recurring** briefs aligned to real signals.
- Developers embedding skills in **Claude Code**, **OpenClaw**, or similar layouts that read `.claude/skills/<name>/`.
- Maintainers who want a **publishable npm package** and **verifiable** installs.

---

## Requirements

- **Node.js [16.7.0](https://nodejs.org/) or newer** (for `fs.cpSync`, used by the CLI). Check with `node -v`.

Using the skill in Claude (or a compatible assistant) does **not** require Node; Node is only for the optional installer CLI below.

---

## How to use this skill

After you install the skill files into your project (see [Installation](#installation)), load the skill in your assistant and **talk to it in natural language**. The skill defines **how** to think (system prompt pattern, mandatory brief sections, tone rules)—it is not a hosted service you “log into.”

**Two typical asks:**

1. **Build / configure the agent** — You want the HTML prototype guidance, filled system prompt, and roadmap (for demos or handoff).
2. **Run this week’s brief** — You paste **trends**, **events**, **competitors**, **brand context**, and optionally **`custom_sources`**; you get one markdown brief in the fixed section order (`outputs.md`).

### Demo prompt (copy-paste)

After the skill is loaded in your assistant, paste the block below to run a **weekly brief** with realistic GCC skincare context. Edit the bullets to match your brand, or use as-is to see the full brief shape.

```text
Using the living strategy skill, generate this week’s marketing strategy brief.

Markets: UAE and KSA.
Industry: consumer brand (skincare).

Trends: TikTok “glass skin” routine clips trending in Dubai; Instagram Reels for SPF + makeup hybrid up week-on-week in Riyadh.

Events: humidity peak season; long weekend inbound tourism bump.

Competitors: Brand X doubled Instagram Stories placements in UAE; Brand Y launched a 7-day UGC challenge on TikTok KSA with two mid-tier creators.

Brand context: we’re protecting margin this month — awareness is OK but prioritize consideration and site visits; ROAS floor 2.0 on paid social.

Name specific platforms and markets in every priority action. Keep the mandatory brief sections and under ~3 minutes to read.
```

For **setup** (“build the agent”) instead of a weekly brief, try:  
`Build me a living strategy agent for a consumer skincare brand in UAE and KSA. Use defaults where I don’t specify, and give me the system prompt outline plus roadmap.`

### Typical workflow

1. **Install** the skill folder into `.claude/skills/living-strategy-agent/` ([manual](#d-manual-installation-no-node) or [CLI](#cli-usage)).
2. **Provide business context** — industry, markets, cadence, where briefs should go (email, Notion, etc.), and whether the deliverable is internal or client-facing.
3. **Add sources and scope** — competitors, URLs, handles, communities, newsletters, keywords (`custom_sources` in `inputs.md`) so recommendations stay specific.
4. **Generate the weekly strategy brief** — paste this week’s signals; ask for the brief only if you do not need a full “build.”
5. **Refine next week** — share what happened after last week’s top actions (memory); ask for the next brief so recommendations compound.

### Example prompts (copy-paste)

These mirror **[`.claude/skills/living-strategy-agent/examples.md`](.claude/skills/living-strategy-agent/examples.md)** — use that file for the full catalog (industries, custom sources, memory, constraints).

1. **Setup with defaults:**  
   `Build me a living strategy agent for a consumer brand. Use defaults where I don’t specify.`

2. **This week’s brief only:**  
   `Using the living strategy skill, produce this week’s strategy brief. Trends: … Events: … Competitors: … Brand context: … Markets: UAE and KSA.`

3. **Custom sources + weekly brief:**  
   `Weekly brief. Track these explicitly in your analysis: our site https://ourbrand.com, competitor Instagram @rival_gcc, newsletter “Retail Gulf Digest”. Here’s what we saw this week: …`

**Full scenarios, industry-specific prompts, and output constraints** → [`examples.md`](.claude/skills/living-strategy-agent/examples.md).

---

## Installation

You can install the skill in **six** ways: **clone + CLI**, **`npx` from GitHub**, **`npx` from npm** (after publish), **manual copy** (no Node), **OpenClaw paste bundle**, and **Claude Code plugin** (see below). Pick one.

### A. Clone and use the CLI locally (recommended for development)

This package has **no npm dependencies**—the CLI uses only Node built-ins. You do **not** need `npm install` unless you want `npm link` or to rely on `npm run` scripts.

```bash
git clone https://github.com/jeel-p/Living-Strategy-Agent.git
cd Living-Strategy-Agent
node bin/living-strategy-agent.js help
# optional: npm link   # then use `living-strategy-agent` on your PATH
```

Install the skill into **another** project (current directory by default):

```bash
cd /path/to/your-project
node /path/to/Living-Strategy-Agent/bin/living-strategy-agent.js install
# or, from the repo root after npm link:
living-strategy-agent install --target /path/to/your-project
```

### B. `npx` from GitHub (no global install)

You can run the CLI **without publishing to npm** by letting `npx` fetch this repo from GitHub (needs **network**). That relies on npm’s support for the `github:` specifier (typical in **npm 7+**; use a current LTS Node/npm if unsure):

```bash
npx github:jeel-p/Living-Strategy-Agent help
npx github:jeel-p/Living-Strategy-Agent install --target .
npx github:jeel-p/Living-Strategy-Agent verify
npx github:jeel-p/Living-Strategy-Agent doctor
```

**Limits:** Behavior varies by **npm major version** and CLI flags (`npx` may prompt to install—use `npx --yes …` in CI). If `github:` fails, use **section A** (clone + `node bin/…`) or publish and use **section C**.

### C. `npx` from npm (after you publish)

After `living-strategy-agent` is published to the npm registry:

```bash
npx living-strategy-agent help
npx living-strategy-agent install --target .
npx living-strategy-agent verify
```

Until publish, prefer **A** (most reliable) or **B** if `npx github:` works on your machine.

### D. Manual installation (no Node)

1. Clone: `git clone https://github.com/jeel-p/Living-Strategy-Agent.git`
2. Copy `.claude/skills/living-strategy-agent/` into your project’s `.claude/skills/` directory.
3. See [`.claude/skills/living-strategy-agent/install.md`](.claude/skills/living-strategy-agent/install.md).

### E. OpenClaw (copy-paste bundle)

Use **[`openclaw/`](openclaw/)**: copy **`living-strategy-agent/`** and/or **`google_trends_report/`** into your OpenClaw skills directory (see [`openclaw/README.md`](openclaw/README.md)). After editing skills under `.claude/skills/`, run **`npm run sync:openclaw`** to refresh the bundle.

### F. Claude Code plugin (namespaced slash skills)

The repo includes a **local marketplace** at **[`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json)** (plugin **v1.1+**: weekly orchestrator, **Reddit/Quora** skill, **Google Trends** skill, LinkedIn + blog calendars). Copying a folder into `~/.claude/plugins/` alone **does not** register it.

**Install (inside Claude Code):**

```text
/plugin marketplace add /path/to/Living-Strategy-Agent
/plugin install living-strategy-plugin@living-strategy-agent
/reload-plugins
```

**Update after changes:**

```text
/plugin marketplace update living-strategy-agent
/plugin install living-strategy-plugin@living-strategy-agent
/reload-plugins
```

**One-session dev load:**

```bash
claude --plugin-dir ./plugins/living-strategy-plugin
```

**Skills:** `/living-strategy-plugin:weekly-brief`, `:reddit_quora_market_intelligence`, `:google_trends_report`, `:setup`; agent **marketing-strategist**. Details: [`plugins/living-strategy-plugin/README.md`](plugins/living-strategy-plugin/README.md).

---

## CLI usage

| Command | Purpose |
|--------|---------|
| `living-strategy-agent help` | Commands and examples |
| `living-strategy-agent install` | Copy skill into `<target>/.claude/skills/living-strategy-agent/` |
| `living-strategy-agent verify` | Check required files (this package or `--target`) |
| `living-strategy-agent doctor` | Environment / path sanity checks |
| `living-strategy-agent export` | Write `dist/living-strategy-agent/` bundle (skill + `skill.json` + `CLAUDE.md`) |

**npm script:** `npm run sync:openclaw` — refreshes [`openclaw/living-strategy-agent/`](openclaw/) from `.claude/skills/living-strategy-agent/` (plus `skill.json` / `CLAUDE.md` / `LICENSE` in `openclaw/`).

**Install flags:**

| Flag | Meaning |
|------|---------|
| `--target <path>` | Project root (default: current working directory) |
| `--force` | Overwrite existing skill files without prompting |
| `--dry-run` | Print what would be copied |
| `--mode project` | Default: install into `.claude/skills/…` |
| `--mode export` | Same as running `export` into `<target>/dist/living-strategy-agent` |

**Examples:**

```bash
living-strategy-agent install --dry-run
living-strategy-agent install --target ~/projects/my-app --force
living-strategy-agent verify --target ~/projects/my-app
living-strategy-agent export --out ./dist/living-strategy-agent
```

The installer **does not** copy `optional-runtime/` or create `.env` files.

---

## Verification

From the repository root (or after install via `npx`):

```bash
npm run verify
# same as:
node bin/living-strategy-agent.js verify
```

Check an installed tree:

```bash
living-strategy-agent verify --target /path/to/project
```

---

## Repository layout

```text
Living-Strategy-Agent/
  package.json              # npm metadata + bin
  bin/living-strategy-agent.js
  cli/                      # help, install, verify, doctor, export
  lib/                      # installer, verifier, paths, logger, cli router
  scripts/                  # sync-openclaw.js
  .claude-plugin/           # marketplace.json (Claude Code: install living-strategy-plugin@living-strategy-agent)
  openclaw/                 # paste bundle: living-strategy-agent + google_trends_report (see openclaw/README.md)
  plugins/living-strategy-plugin/   # Claude Code plugin (.claude-plugin + skills + agents)
  skill.json
  CLAUDE.md
  CHANGELOG.md
  .claude/skills/living-strategy-agent/   # installable skill (primary artifact)
    SKILL.md
    examples.md
    inputs.md
    outputs.md
    install.md
    troubleshooting.md
  docs/                     # specs, guides, installation-matrix, release-checklist
  optional-runtime/         # optional Python automation (not installed by CLI)
```

---

## Optional runtime

Python scripts under `optional-runtime/` are **optional** reference code (brief generation, file-based memory). They require your own API keys and are **not** installed by the Node CLI.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| `npx github:…` fails | Use a current npm, or clone the repo and run `node bin/living-strategy-agent.js …`. |
| Install refuses to overwrite | Pass `--force`, or remove `.claude/skills/living-strategy-agent/` first. |
| Verify fails on target | Re-run `install` from a full clone; check paths with `doctor`. |
| Wrong folder | `install` / `doctor` use the **current working directory** unless you pass `--target`. |

More: [`troubleshooting.md`](.claude/skills/living-strategy-agent/troubleshooting.md).

---

## Development and release

- **Verify before pack:** `npm run verify` (also runs as `prepack` before `npm pack`).
- **Dry run:** `living-strategy-agent install --dry-run`.
- **Publish:** bump `version` in `package.json`, then `npm publish` (see [`docs/release-checklist.md`](docs/release-checklist.md)).

See also [`docs/installation-matrix.md`](docs/installation-matrix.md) and [`CHANGELOG.md`](CHANGELOG.md).

---

## License

See [LICENSE](LICENSE) (MIT).
