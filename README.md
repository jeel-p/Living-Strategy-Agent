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

---

## Installation

There are three supported paths: **local CLI** (clone), **`npx` from GitHub**, and **`npx` from npm** (after you publish). **Manual copy** remains a first-class fallback.

### A. Clone and use the CLI locally (recommended for development)

```bash
git clone https://github.com/jeel-p/Living-Strategy-Agent.git
cd Living-Strategy-Agent
npm install   # optional: no dependencies; install links bin if you use npm link
node bin/living-strategy-agent.js help
```

Install the skill into **another** project (current directory by default):

```bash
cd /path/to/your-project
node /path/to/Living-Strategy-Agent/bin/living-strategy-agent.js install
# or, from the repo root after npm link:
living-strategy-agent install --target /path/to/your-project
```

### B. `npx` from GitHub (no global install)

Works **now**, as long as the repo contains a valid `package.json` and `bin` (this repo does). npm downloads the package and runs the CLI (needs **network**):

```bash
npx github:jeel-p/Living-Strategy-Agent help
npx github:jeel-p/Living-Strategy-Agent install --target .
npx github:jeel-p/Living-Strategy-Agent verify
npx github:jeel-p/Living-Strategy-Agent doctor
```

**Caveat:** `npx github:…` behavior depends on your **npm** version; if a command fails, use **clone + local bin** or **publish to npm** (below).

### C. `npx` from npm (after you publish)

After `living-strategy-agent` is published to the npm registry:

```bash
npx living-strategy-agent help
npx living-strategy-agent install --target .
npx living-strategy-agent verify
```

Until publish, prefer **B** or **A**.

### D. Manual installation (no Node)

1. Clone: `git clone https://github.com/jeel-p/Living-Strategy-Agent.git`
2. Copy `.claude/skills/living-strategy-agent/` into your project’s `.claude/skills/` directory.
3. See [`.claude/skills/living-strategy-agent/install.md`](.claude/skills/living-strategy-agent/install.md).

---

## CLI usage

| Command | Purpose |
|--------|---------|
| `living-strategy-agent help` | Commands and examples |
| `living-strategy-agent install` | Copy skill into `<target>/.claude/skills/living-strategy-agent/` |
| `living-strategy-agent verify` | Check required files (this package or `--target`) |
| `living-strategy-agent doctor` | Environment / path sanity checks |
| `living-strategy-agent export` | Write `dist/living-strategy-agent/` bundle (skill + `skill.json` + `CLAUDE.md`) |

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
| Install refuses to overwrite | Pass `--force`, or delete ` .claude/skills/living-strategy-agent/` first. |
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
