# Examples

Use these prompts **after** the skill is available in your assistant (e.g. skill installed per `install.md`).  
Two kinds of ask:

- **Setup / “build the agent”** — prototype, system prompt, roadmap (when the user wants the full package).
- **Weekly execution** — this week’s brief only, using trends / events / competitors / brand context (and optional `custom_sources`, memory).

Defaults when the user says “just build it”: Consumer brand, generic/configurable markets, weekly cadence, web viewer + email, manual data inputs. See `inputs.md`.

---

## Quick start

Copy-paste any of these to get started fast:

1. **Setup with defaults:**  
   `Build me a living strategy agent for a consumer brand. Use defaults where I don’t specify — I just need it working.`

2. **This week’s brief only:**  
   `Using the living strategy skill, produce this week’s strategy brief. Trends: [paste]. Events: [paste]. Competitors: [paste]. Brand context: [paste]. Markets: UAE and KSA.`

3. **Tight geography:**  
   `Weekly marketing brief for our brand — focus only on UAE and KSA. Name TikTok and Instagram Reels with the market in every action. Here’s this week’s intel: …`

4. **OpenClaw / connected runtime (use web tools first):**  
   `Weekly living strategy brief. You have search and URL fetch — verify anything time-sensitive for UAE/KSA before you write. Trends: [paste rough signals]. Competitors: [names or URLs]. Brand context: [paste]. custom_sources: { "websites": ["https://…"], "keywords": ["…"] }. Ground the Trend signals in what you find; mark [UNVERIFIED] if you cannot verify.`

---

## Common usage

### Basic default (setup request)

- **Scenario:** Marketing lead wants the full agent package without a long questionnaire.
- **User prompt:**  
  `Build me a living strategy agent for a consumer brand. I don’t have time to configure everything — use your documented defaults and give me the prototype outline, system prompt, and roadmap.`
- **What the skill should do:** Apply defaults (Consumer brand, generic markets, weekly, web + email, manual inputs). Deliver: HTML prototype guidance, configured system prompt, build roadmap, optional pointer to `optional-runtime/` only if they ask for automation. Do not imply a hosted backend exists unless they implement it.

---

### Fully specified setup

- **Scenario:** Team knows exactly how they work and want the agent configured up front.
- **User prompt:**  
  `Set up a living strategy agent with: industry = E-commerce (fashion), markets = UAE + KSA, cadence = weekly, output = Notion for internal team + PDF for the client, client type = external client deliverable, data sources = manual research + Shopify analytics summaries I’ll paste weekly. Then give me the system prompt and roadmap.`
- **What the skill should do:** Bake all parameters into `CLIENT PROFILE` and inputs; outputs match their channels (Notion + PDF); clarify manual vs automated delivery. Weekly briefs later use the same structure.

---

### Weekly brief generation (execution, not full build)

- **Scenario:** User only wants the markdown brief for this cycle.
- **User prompt:**  
  `Don’t build code — generate this week’s living strategy brief only.

  **Trends:** Search up for “modest fashion layering” in UAE; short-form try-on content up week-on-week on TikTok in KSA.

  **Events:** Long weekend inbound travel; competitor teasing a Ramadan capsule.

  **Competitors:** Competitor X doubled Meta spend in Dubai; Competitor Y launched a micro-influencer reel series in Riyadh.

  **Brand context:** We’re mid-awareness flight; ROAS target 2.2; no new hero video until next sprint.

  Markets: UAE, KSA.`
- **What the skill should do:** Produce the **mandatory brief sections** only (`outputs.md`): headline through Next week setup; named platforms and markets; one “do immediately” action; “what NOT to do”; under ~3 minutes read. No requirement to output HTML unless they switch to a setup request.

---

## Industry examples

### E-commerce (fashion)

- **Scenario:** Conversion and promo calendar matter; tie actions to revenue.
- **User prompt:**  
  `Weekly strategy brief for our E-commerce fashion brand in UAE and KSA. Trends: cart abandonment ticking up on mobile checkout in UAE. Events: end-of-season sale noise. Competitors: rival running 30% off sitewide with heavy Meta retargeting. Brand context: we’re protecting margin — prioritize high-AOV bundles. Give me platform-specific actions (TikTok Shop, Instagram Shopping, Meta) with markets named.`
- **Why this fits:** Skill emphasizes specificity, prioritization, and channel language; E-commerce overlay from `customization-guide.md` applies (velocity, promos, conversion).

---

### B2B SaaS

- **Scenario:** Pipeline and competitor feature noise; ICP matters.
- **User prompt:**  
  `Living strategy brief for B2B SaaS — US mid-market buyers. Trends: competitor A shipped an AI feature and is flooding LinkedIn with comparison ads. Events: our webinar in 10 days. Competitors: two rivals published pricing pages with aggressive annual discounts. Brand context: pipeline down 8% QoQ; we need qualified demos, not vanity reach. Name LinkedIn and relevant channels explicitly.`
- **Why this fits:** Skill supports lead-gen framing and competitor moves; B2B SaaS customization stresses pipeline and ICP.

---

### Consumer brand (beauty)

- **Scenario:** Cultural moments and tone; default-adjacent industry.
- **User prompt:**  
  `Consumer beauty brand — GCC focus. Weekly brief. Trends: ingredient-led TikTok clips gaining traction in UAE. Events: regional humidity spike driving “long-wear” searches. Competitors: brand Z running UGC with dermatologist cameos. Brand context: we’re repositioning as “clinical but approachable”; avoid hype claims.`
- **Why this fits:** Default industry is consumer brand; skill’s tone rules and cultural fluency apply directly.

---

### Healthcare

- **Scenario:** Compliance-sensitive; flag legal review where needed.
- **User prompt:**  
  `Strategy brief for a healthcare provider marketing team (US). Trends: patient search up for “annual wellness” in our metros. Events: flu season messaging window. Competitors: regional hospital system promoting same-day appointments on Google LSA. Brand context: all paid claims must pass medical marketing review — flag anything that needs [LEGAL REVIEW NEEDED].`
- **Why this fits:** Skill allows `COMPLIANCE_NOTE` and healthcare row in customization guide; outputs must not invent clinical claims.

---

### Finance

- **Scenario:** Conservative tone; disclaimers where required.
- **User prompt:**  
  `Weekly brief for a retail banking brand in UAE. Trends: rate chatter driving comparison searches; competitor app pushed a limited-time deposit rate. Events: regulatory calendar quiet this week. Competitors: neo-bank app campaign on Instagram Reels UAE. Brand context: marketing must include standard product disclaimers in customer-facing copy recommendations.`
- **Why this fits:** Finance row in customization guide; conservative tone and disclaimer discipline in outputs.

---

## Custom source examples

### Websites + competitor handles on the weekly brief

- **Scenario:** User names URLs and Instagram handles so the model does not collapse them to “competitors.”
- **User prompt:**  
  `This week’s brief — use these as explicit monitoring sources in your reasoning:

  custom_sources:
  - websites: https://ourbrand.com, https://ourbrand.com/ae/ramadan
  - competitors: https://competitor.com, Instagram @competitor_gcc
  - usernames: TikTok @ourbrand_official, Instagram @ourbrand_ae

  Trends: [paste]. Events: [paste]. Competitors (what we saw): [paste]. Brand context: [paste].`
- **Expected behavior:** Trend signals and actions **name** those URLs and handles where relevant; no vague “social” only. If the user also pastes free text under “Competitors,” reconcile with named handles.

---

### Communities + newsletters + keywords

- **Scenario:** Signals come from named digests and forums.
- **User prompt:**  
  `Weekly brief. Monitor these explicitly: newsletters “Retail Gulf Digest” and “Category Signal”; communities r/gulfbeauty and our Slack #market-intel. Keywords: “modest fashion UAE”, “heat-proof makeup”. Here’s what we observed this week: …`
- **Expected behavior:** `custom_sources.newsletters`, `communities`, `keywords` populated; brief ties observations back to those **names**.

---

### Provided-only list (constrained monitoring)

- **Scenario:** User forbids inventing extra competitors beyond the list.
- **User prompt:**  
  `Use ONLY these sources for what we’re formally tracking this week — label anything beyond that as [INFERRED]: source_scope = provided_only. custom_sources: websites […], newsletters […], keywords […]. Here’s what we saw: …`
- **Expected behavior:** Factual “what we watch” stays on-list; broader market takes marked `[INFERRED]`.

---

## Memory-aware examples

### Prior week outcome baked in

- **Scenario:** User gives feedback so the agent does not repeat a failed play blindly.
- **User prompt:**  
  `Weekly brief with memory. Last week’s top ask was to scale Instagram Reels in UAE with creator B. Outcome: +14% engagement, add-to-cart flat. This week:

  Trends: …  
  Events: …  
  Competitors: …  
  Brand context: we’re holding spend until Eid creative lands.`

- **Expected behavior:** Inject prior week per `SKILL.md` memory format; acknowledge outcome; adjust recommendations (e.g. test creative or landing, not just “more Reels”).

---

### Structured memory line

- **Scenario:** Quick shorthand for assistants that prefer one block.
- **User prompt:**  
  `Previous week: top recommendation = shift 20% of UAE spend to TikTok Spark Ads on three creators. Outcome = CPA down 9% but volume capped. Now generate this week’s brief with: trends … events … competitors … brand …`
- **Expected behavior:** Same as above — memory informs **Strategic read** and **Priority actions** without repeating the same bet without learning.

---

## Output-aware examples

### Email-ready (single screen)

- **Scenario:** User wants copy that fits an email body, not a Notion page.
- **User prompt:**  
  `Give me this week’s living strategy brief in email-ready form: short subject line idea + body under ~250 words, still using the full mandatory sections in order — but tighten prose so an exec can skim in under 3 minutes. Markets: KSA and UAE. [paste trends / events / competitors / brand]`
- **Expected behavior:** Keep **all** sections (`outputs.md`); compress wording; respect sub–3-minute read rule; still name platforms and markets specifically.

---

### UAE and KSA only (geographic constraint)

- **Scenario:** Global brand but this sprint is GCC-only.
- **User prompt:**  
  `Weekly brief — restrict all recommendations to UAE and KSA only. Do not suggest EU or US tactics. TikTok and Instagram Reels must include the market in every priority action. Trends: …`
- **Expected behavior:** No off-scope markets; SPECIFICITY rules satisfied.

---

### Under three minutes to read

- **Scenario:** User cites the skill’s own quality bar.
- **User prompt:**  
  `Produce this week’s brief. Hard constraint: the whole thing must be readable in under 3 minutes — no filler, no repeating my bullets back. Prioritize ruthlessly. [paste inputs]`
- **Expected behavior:** BREVITY + PRIORITIZATION rules; still all mandatory sections.

---

## Trigger phrases

Phrases that should activate this skill include: **strategy agent**, **living strategy**, **weekly marketing brief**, **trend monitoring agent**, **AI marketing advisor**, **automated strategy**, and requests to **watch trends** and **tell the team what to do next**.

See also: `inputs.md`, `outputs.md`, `SKILL.md`, and `docs/customization-guide.md`.
