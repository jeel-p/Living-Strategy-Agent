# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-04-01

### Added

- Node.js **CLI** (`living-strategy-agent`): `help`, `install`, `verify`, `doctor`, `export`.
- `package.json` with `bin`, `files` whitelist, `engines`, and `prepack` verification.
- Libraries: `lib/installer.js`, `lib/verifier.js`, `lib/paths.js`, `lib/logger.js`.
- Documentation: this changelog, installation matrix, release checklist.

### Behavior

- **install** copies only `.claude/skills/living-strategy-agent/` into the target project (non-destructive by default; `--force` to overwrite).
- **export** writes `dist/living-strategy-agent/` with skill tree plus `skill.json` and `CLAUDE.md`.
- **verify** checks required skill files and (for package verify) `skill.json`, `CLAUDE.md`, `package.json`.

[1.0.0]: https://github.com/jeel-p/Living-Strategy-Agent
