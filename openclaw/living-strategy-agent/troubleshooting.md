# Troubleshooting — common mistakes and fixes

## Generic or vague briefs

**Symptom:** Recommendations say “social media,” “post more,” or lack platform and market names.

**Fix:** Reinforce system prompt **SPECIFICITY** rules; require named platforms and markets in every action. Re-run or rewrite with TikTok/Instagram/etc. plus geography.

---

## Wrong structure

**Symptom:** Missing **What NOT to do**, extra invented sections, or wrong section order.

**Fix:** The brief must follow the exact section list in `outputs.md` and `SKILL.md`. Remove extra headings; add missing **What NOT to do** and **Next week setup**.

---

## Too long or padded

**Symptom:** Brief takes more than ~3 minutes to read or restates all inputs.

**Fix:** Apply **BREVITY** rules: cut preamble and input echo; keep **Strategic read** to 2–3 sentences.

---

## No clear priority

**Symptom:** Six equal-priority actions or unclear #1 for the next 48 hours.

**Fix:** **Do immediately** allows **one** action only. Rank trend signals; state the single top strategic insight in the headline.

---

## Memory ignored or inconsistent

**Symptom:** Repeats last week’s failed play or ignores stated outcomes.

**Fix:** Inject **CONTEXT FROM PREVIOUS WEEKS** using the format in `SKILL.md`; cap at four weeks with monthly compression for older history.

---

## Prototype does not stream

**Symptom:** UI waits for full generation before showing text.

**Fix:** Prefer streaming APIs and progressive render; align with quality checklist in `SKILL.md`.

---

## Compliance-sensitive industry

**Symptom:** Healthcare/finance recommendations without disclaimers or legal flags.

**Fix:** Add `COMPLIANCE_NOTE` and industry-specific instructions from `docs/customization-guide.md`.

---

## Confusing skill vs optional code

**Symptom:** User thinks they must run Python or set up Supabase to “use” the skill.

**Fix:** Clarify: the **skill** is the instructions and templates. **optional-runtime/** is for advanced automation only.

---

## OpenClaw: briefs feel stale or offline-only

**Symptom:** Trend signals read like generic training data; URLs in `custom_sources` were not checked.

**Fix:** In OpenClaw (or the host), enable **web search**, **URL fetch**, or **MCP** tools per your project settings. The skill instructs the model to **use** those tools when present—see **OpenClaw and tool-capable runtimes** in `SKILL.md`. If tools are disabled, only pasted inputs apply.
