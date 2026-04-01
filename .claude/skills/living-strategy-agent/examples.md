# Examples — prompts and expected behavior

## 1. Full build request

**User:** “Build me a living strategy agent for our consumer brand in KSA and UAE. We need weekly briefs for the marketing team and eventually email delivery.”

**Expected behavior:** Ask for or assume defaults for anything missing (cadence weekly, output web + email). Produce HTML prototype guidance, configured system prompt with MENA markets named, roadmap, and mention optional `optional-runtime/` scripts only if they want automation.

---

## 2. “Just build it”

**User:** “I need the strategy agent thing from your skill — no time for config, just build it.”

**Expected behavior:** Apply defaults (Consumer brand, generic markets, weekly, web + email, manual inputs). Deliver prototype + system prompt + roadmap without blocking on long questionnaires.

---

## 3. B2B SaaS focus

**User:** “Living strategy agent for B2B SaaS selling to mid-market US. Focus on pipeline and competitor feature releases.”

**Expected behavior:** Emphasize pipeline signals, content engagement, competitor launches in inputs; system prompt stresses lead-gen channels and ICP; consider compliance note if claims-sensitive.

---

## 4. Weekly brief only (no code)

**User:** “Don’t build HTML — just give me this week’s brief. Here are our trends: … events: … competitors: … brand: …”

**Expected behavior:** Run the mandatory output structure only (markdown brief). No requirement to output code. Still follow tone, prioritization, and sections.

---

## 5. Memory on

**User:** “Use last week’s focus: we pushed TikTok creators in UAE. Outcome: +18% engagement but conversions flat. Here’s this week’s sheet data: …”

**Expected behavior:** Inject prior week in the agreed memory format; avoid repeating failed recommendations without acknowledging outcome; connect this week’s actions to last week’s learning.

---

## 6. Custom sources — websites and competitor Instagram handles

**User:** “Build this week’s strategy using these websites and competitor Instagram usernames: our site `https://brand.example`, `https://campaign.example/eid`, competitors `https://rival.example` and Instagram `@rival_official` / `@rival_mena`.”

**Expected behavior:** Populate `custom_sources.websites` and `custom_sources.competitors` (and `usernames` with platform hints). Brief **names those URLs and handles** in trend signals and actions; does not replace them with “competitors on Instagram.”

---

## 7. Creators and brand sites

**User:** “Track these creators — TikTok `@creator_a`, `@creator_b` — and these brand sites: our `https://us.brand.example` and regional `https://ksa.brand.example`.”

**Expected behavior:** `custom_sources.usernames` and `custom_sources.websites` filled; recommendations reference **creator handles and domains** explicitly.

---

## 8. Provided-only monitoring list

**User:** “Use **only** the provided source list for monitoring this week — no extra competitor guesses: newsletters X and Y, `r/ourcategory`, Discord `#competitor-intel`, keywords …”

**Expected behavior:** Set `source_scope` to `provided_only` and put those items under `newsletters`, `communities`, `keywords`. Brief treats the list as the monitoring boundary; anything beyond it is labeled **`[INFERRED]`** or omitted for factual “what we are watching” claims.

---

## 9. Communities and newsletters for signals

**User:** “Monitor **Morning Briefing**, **Category Weekly**, and **r/brandcategory** for signals; here’s what we saw this week: …”

**Expected behavior:** `custom_sources.newsletters` and `custom_sources.communities` populated; trend signals tie back to those **names** when interpreting the user’s observations.

---

## 10. Trigger phrases

Phrases that should activate this skill include: **strategy agent**, **living strategy**, **weekly marketing brief**, **trend monitoring agent**, **AI marketing advisor**, **automated strategy**, and requests to **watch trends** and **tell the team what to do next**.
