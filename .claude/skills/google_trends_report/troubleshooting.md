# Troubleshooting

## Skill fails to load or execute in OpenClaw

**Cause:** Invalid YAML frontmatter (for example multi-line `description: >`) or wrong folder/`name` mismatch.

**Fix:** Use the repo’s **`SKILL.md`** as-is: **single-line** `description`, **`name: google_trends_report`**, folder **`google_trends_report`**. Restart the session or run `openclaw gateway restart` after edits. See **install.md** (OpenClaw parser rules).

## Report feels generic

**Cause:** Too few searches or no fetch of the real site.

**Fix:** Fetch homepage + `/about` / `/services`; run **8+** search rounds when tools allow; tie each trend to a **specific source link**.

## “Google Trends numbers” appear

**Cause:** Model invented index values.

**Fix:** Use **directional** language only unless the host exposes real Trends data. Mark charts as **unclear** if not from a tool.

## Fetch blocked or 403

**Cause:** Site blocks bots or needs JS.

**Fix:** Try browser tool; try `www` vs non-www; note **limited crawl** in **Industry momentum** and rely more on search snippets (with links).

## Too many tool calls

**Cause:** Host caps searches.

**Fix:** Prioritize primary + industry keywords; state **search budget limited** in **Sources**.

## Wrong industry detected

**Cause:** Homepage is vague or multi-vertical.

**Fix:** Ask the user to confirm **industry and top services** before finalizing **Keyword trends** table.
