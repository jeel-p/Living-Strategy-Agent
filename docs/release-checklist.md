# Release checklist

Use before tagging or `npm publish`.

## Pre-release

- [ ] `node bin/living-strategy-agent.js verify` passes on a clean clone.
- [ ] `npm pack --dry-run` lists only intended files (skill, `bin/`, `cli/`, `lib/`, metadata).
- [ ] README install instructions match actual commands (GitHub `npx`, local `node bin/…`, post-publish `npx living-strategy-agent`).
- [ ] `CHANGELOG.md` updated with version and date.
- [ ] `package.json` `version` bumped per semver.

## Publish to npm (optional)

- [ ] Logged in: `npm whoami`.
- [ ] `npm publish` (uses `prepack` → `verify`).
- [ ] Confirm package page: `https://www.npmjs.com/package/living-strategy-agent` (after first publish).
- [ ] Git tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.

## Post-release

- [ ] Smoke test: `npx living-strategy-agent@latest verify`.
