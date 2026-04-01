# Installation matrix

How users can get the skill and CLI, and what to expect.

| Method | Needs network | Needs Node | Installs CLI | Installs skill into a project | Notes |
|--------|---------------|------------|--------------|------------------------------|--------|
| Manual copy | Only for `git clone` | No | No | Yes (by hand) | Copy `.claude/skills/living-strategy-agent/`. |
| Clone + `node bin/...` | Clone only | Yes (≥ 16.7) | Run via path | Yes (`install`) | Full control; no npm publish required. |
| `npx github:jeel-p/Living-Strategy-Agent` | Yes | Yes | Yes | Yes (`install`) | Depends on npm/npx resolving GitHub spec. |
| `npm link` (in clone) | No | Yes | Global-like | Yes | For local dev. |
| `npx living-strategy-agent` | Yes | Yes | Yes | Yes | **After** package is published to npm. |

**Skill artifact:** always `.claude/skills/living-strategy-agent/` (markdown skill files).

**Not installed by CLI:** `optional-runtime/`, `.env`, backend services.
