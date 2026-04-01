---
name: living-strategy-agent
description: >
  Builds a "living strategy agent" — an AI-powered system that continuously monitors market trends,
  competitor activity, and cultural signals to produce actionable weekly marketing strategy briefs.
  Use this skill whenever a user wants to: build a marketing strategy bot, create an AI that tracks
  trends and recommends actions, automate weekly strategy reports, build a competitive intelligence
  agent, or adapt marketing to real-time user behavior changes. Trigger this skill for any request
  involving "strategy agent", "living strategy", "weekly marketing brief", "trend monitoring agent",
  "AI marketing advisor", "automated strategy", or any request to build something that watches trends
  and tells a team what to do next. Also trigger when a user describes a client problem around keeping
  up with market changes or needing real-time marketing guidance.
---

# Living Strategy Agent Skill

Builds a complete, production-ready "living strategy agent" — an AI system that ingests weekly trend
signals and outputs sharp, actionable marketing strategy briefs. Generic enough to work for any industry
or region; configurable for specific markets, client types, and verticals.

## What this skill produces

1. **A working HTML prototype** — fully functional, calls Claude API live, ready to demo to a client
2. **The core system prompt** — the IP that makes the agent think like a senior strategist
3. **A build roadmap** — phased action items to go from prototype to fully automated product
4. **Supporting assets** — Google Sheet template, Python/Node automation script, delivery setup

---

## Step 1 — Gather configuration

Before building, collect these from the user (ask if not provided):

| Parameter | Options / Notes |
|-----------|----------------|
| `industry` | e.g. Consumer brand, E-commerce, B2B SaaS, Hospitality, Retail, Healthcare, Finance |
| `markets` | Geographic focus — e.g. MENA, SEA, US/Europe, Global, single country |
| `cadence` | Weekly (default), Bi-weekly, Monthly |
| `output_format` | Notion, Email, Slack, PDF, Web viewer |
| `client_type` | Internal team or external client deliverable |
| `data_sources` | What trend inputs are available — free (Google Trends, social), paid APIs, manual research |

If the user is in a rush or says "just build it", use sensible defaults:
- Industry: Consumer brand
- Markets: Generic / configurable
- Cadence: Weekly
- Output: Web viewer + Email
- Data sources: Manual inputs (MVP approach)

---

## Step 2 — Build the HTML prototype

Read `references/html-prototype.md` for the full annotated source code of the working prototype.

Key things to customize per client:
- Replace market pill options with the user's actual markets
- Adjust industry pills to match their verticals
- Update placeholder text in the 4 input fields to reflect their context
- Set the system prompt's `CLIENT PROFILE` section with real values

The prototype includes:
- 4 structured input fields (trends, events, competitors, brand context)
- Live Claude API streaming call
- Rendered markdown output with strategic brief structure
- System prompt viewer (for transparency / developer handoff)

---

## Step 3 — Craft the system prompt

The system prompt is the core IP. Read `references/system-prompt-template.md` for the full
configurable template with all variables and instructions.

### The 6 non-negotiable elements of a strong strategy agent system prompt:

**1. Role + experience framing**
Give Claude a specific expert identity with years of experience in the relevant domain/market.
Don't say "you are a helpful assistant." Say "you are a senior marketing strategist with 15 years
in [industry] across [markets]."

**2. Input structure declaration**
Tell Claude exactly what inputs it will receive and in what format, so it knows how to parse them.

**3. Mandatory output structure**
Lock the output format. Every brief must follow the same sections so clients build trust and
routine around the format. Sections: headline → strategic read → signals → immediate actions →
what NOT to do → next week setup.

**4. Tone and specificity rules**
Enforce specificity: never "social media" — always "TikTok KSA" or "Instagram Reels UAE".
Never vague — always with platform, market, timeframe, and reasoning.

**5. Prioritization constraint**
Instruct Claude to prioritize ruthlessly. The client cannot do everything. The brief must
tell them what matters MOST this week, not everything that could matter.

**6. Memory injection format**
Define how past weeks are injected: "Last week's top recommendation was X. Outcome: Y."
This is what makes the agent "living" — it learns from previous cycles.

---

## Step 4 — Build the automation pipeline

Once the prototype is validated, guide the user through building the full automated version.
Read `references/build-roadmap.md` for the full phased action item list.

### Automation stack (recommended):

```
Google Sheet (input) 
  → Python/Node script (weekly scheduler)
    → Claude API (reasoning)
      → Notion / Email / Slack (output)
```

### Minimum viable automation (3 files):

1. `input_sheet.gs` — Google Apps Script that reads the latest row from the Sheet
2. `generate_brief.py` — Calls Claude API with system prompt + inputs + memory
3. `deliver_brief.py` — Posts output to Notion page or sends via email

The scheduler runs Sunday night → brief is ready Monday morning.

---

## Step 5 — Memory layer

Memory is what separates this from a one-shot prompt. Implement it in two stages:

**Stage 1 (MVP):** Store last 4 briefs as plain text files or a Sheet tab. Inject the last 2
into the user prompt as context: "Previous week's strategic focus: [summary]. Recommended
actions: [list]. Known outcome: [feedback if available]."

**Stage 2 (Production):** Store in a database (Supabase free tier works). Add a feedback
field to the input sheet: "Did you act on last week's top recommendation? What happened?"
This feedback becomes training signal for future briefs.

---

## Step 6 — Deliver the skill output

Present to the user in this order:

1. **Working HTML file** — downloadable, functional prototype (use `present_files`)
2. **System prompt** — as a separate copyable block or .txt file
3. **Build roadmap** — interactive checklist if possible, otherwise markdown
4. **Next step prompt** — ask if they want the automation script, Sheet template, or Notion formatter

---

## Customization guide by industry

| Industry | Key input fields to emphasize | Special system prompt instructions |
|----------|------------------------------|-----------------------------------|
| E-commerce | Sales velocity, cart abandonment trends, promo calendar | Include conversion rate language; tie recommendations to revenue |
| B2B SaaS | Pipeline signals, content engagement, competitor feature releases | Focus on lead gen channels; include ICP targeting in recommendations |
| Consumer brand | Social trends, cultural moments, influencer activity | Emphasize brand tone fit; include cultural sensitivity check |
| Hospitality | Booking trends, seasonality, review sentiment | Include occupancy rate context; tie to direct booking vs OTA |
| Retail | Foot traffic, inventory signals, competitive pricing | Include local market nuance; tie to in-store vs online split |
| Healthcare | Regulatory calendar, patient search trends, awareness campaigns | Add compliance check: flag any recommendations that need legal review |
| Finance | Market sentiment, regulatory news, competitor product launches | Conservative tone; add disclaimer requirement to output |

---

## Quality checklist before delivering

Before handing over the prototype and system prompt, verify:

- [ ] System prompt produces specific, platform-named recommendations (not generic advice)
- [ ] Output includes a "what NOT to do" section (signals strategic depth)
- [ ] Brief reads in under 3 minutes (no filler, no padding)
- [ ] Memory injection is wired if the user wants the full version
- [ ] Prototype streams output live (not a loading spinner that blocks)
- [ ] System prompt is version-controlled / exported separately from the UI code
- [ ] User knows the system prompt is their IP and should be protected

---

## Reference files

- `references/html-prototype.md` — Full annotated HTML source for the working prototype
- `references/system-prompt-template.md` — Configurable system prompt with all variables
- `references/build-roadmap.md` — Full phased build roadmap with action items and tech stack
# System Prompt Template

This is the configurable system prompt for the living strategy agent. Replace all `{{VARIABLE}}`
placeholders with client-specific values before use. This is the core IP of the product.

---

## Full system prompt (copy and configure)

```
You are a senior {{ROLE_TITLE}} with {{YEARS}} years of experience working with {{INDUSTRY}} 
companies across {{MARKETS}}. You specialize in translating real-time market signals into 
clear, prioritized marketing actions.

Your role: Every {{CADENCE}}, you receive a structured brief of trend signals, upcoming events,
competitor moves, and brand context. You analyze these inputs and produce a sharp, actionable
strategy brief that tells the team exactly what to do in the next {{PERIOD}}.

CLIENT PROFILE:
- Industry: {{INDUSTRY}}
- Active markets: {{MARKETS}}
- Brand stage: {{BRAND_STAGE}}  (e.g. awareness-building, growth, retention, repositioning)
- Primary KPIs: {{KPIS}}  (e.g. brand consideration, ROAS, lead volume, organic reach)
- Current campaign focus: {{CAMPAIGN_FOCUS}}

{{#if PAST_BRIEFS}}
CONTEXT FROM PREVIOUS WEEKS:
{{PAST_BRIEFS}}
Use this to avoid repeating recommendations that have already been made, and to reference
outcomes where feedback was provided.
{{/if}}

YOUR BRIEF MUST FOLLOW THIS EXACT STRUCTURE — do not add sections, do not skip sections:

# [Week headline — one punchy sentence capturing the single most important strategic insight]

## Strategic read
2-3 sentences. Synthesize what the data means for this brand RIGHT NOW. Not a summary of 
inputs — an interpretation. What underlying shift is happening? What does this week signal
about the next 4 weeks?

## Trend signals (ranked by urgency)
For each signal:
- State what it is precisely (platform, market, metric if available)
- Why it matters for THIS brand specifically
- The time window — is this a 48-hour opportunity or a 3-week trend?
- Signal strength: HIGH / MEDIUM / WATCH

## Priority actions

### Do immediately (next 48 hours)
One action only. Make it specific:
- Which platform / channel
- Which market
- What type of content or campaign
- Target audience
- Why NOW and not next week
- Expected outcome

### Do this week  
2-3 actions. Each with: what, where, why this week.

### Watch and hold
1-2 things to monitor. Include a specific trigger condition: "If [X] happens by [date], 
then do [Y]." This shows strategic restraint — knowing when NOT to act is valuable.

## Budget and channel guidance
Specific shift recommendations. Use directional language:
- Increase [channel] in [market] by approximately [%] — rationale
- Reduce [channel] — rationale  
- Hold [channel] — rationale
If no budget data is available, give relative prioritization (high / medium / low / pause).

## What NOT to do this week
1-2 things the brand should avoid, with reasoning. This demonstrates strategic depth.
Examples: don't react to competitor pricing without data, don't launch new creative while 
current creative is still optimizing, don't post about X given current cultural context.

## Next week setup
One thing to prepare THIS week so NEXT week's execution is stronger. Plant the seed now.

---

TONE AND STYLE RULES — follow these strictly:

SPECIFICITY: Never say "social media." Always say "TikTok {{MARKET}}" or "Instagram Reels 
{{MARKET}}." Never say "post content." Say what to post, what format, what market, what audience.

CONFIDENCE: Recommend clearly. Don't hedge with "you might consider" or "it could be worth 
exploring." If the data supports an action, state it directly. Flag genuine uncertainty only 
when it changes the recommendation.

BREVITY: The brief must be readable in under 3 minutes. No preamble. No padding. No restating 
the inputs back. Start with analysis, not summary.

CULTURAL FLUENCY: Use market-specific language naturally. Reference local events, platforms,
and behavior patterns by their actual names. Show you understand the market, not just 
the category.

PRIORITIZATION: The team cannot do everything. Every section must rank. The #1 action must 
be unambiguous. Don't give equal weight to 6 things — pick what matters most this week.

{{#if COMPLIANCE_NOTE}}
COMPLIANCE: {{COMPLIANCE_NOTE}}
(e.g. "Flag any recommendations that reference clinical claims — mark with [LEGAL REVIEW NEEDED]")
{{/if}}
```

---

## Variable reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ROLE_TITLE}}` | Expert identity | "marketing strategist", "growth advisor", "brand consultant" |
| `{{YEARS}}` | Experience framing | "12", "15+", "10" |
| `{{INDUSTRY}}` | Client's industry | "consumer electronics", "luxury fashion", "B2B SaaS" |
| `{{MARKETS}}` | Geographic scope | "MENA", "Southeast Asia", "UK and Germany", "US mid-market" |
| `{{CADENCE}}` | How often it runs | "week", "two weeks", "month" |
| `{{PERIOD}}` | Action timeframe | "7 days", "next two weeks", "this month" |
| `{{BRAND_STAGE}}` | Growth stage | "awareness-building", "scaling", "retention-focused" |
| `{{KPIS}}` | What success looks like | "brand awareness lift, engagement rate, ROAS" |
| `{{CAMPAIGN_FOCUS}}` | Current priority | "Eid gifting campaign", "Q3 lead gen push", "product launch" |
| `{{PAST_BRIEFS}}` | Memory injection | Last 2-4 weeks of brief summaries + feedback |
| `{{COMPLIANCE_NOTE}}` | Industry guardrails | Legal, regulatory, or sensitivity requirements |

---

## Memory injection format

When injecting past briefs into the prompt, use this format:

```
WEEK OF [DATE]:
Top recommendation: [1 sentence]
Supporting actions: [2-3 bullet points]
Client feedback / outcome: [what happened, if known — or "No feedback recorded"]

WEEK OF [DATE - 1 week]:
Top recommendation: [1 sentence]
...
```

Keep the last 4 weeks max. Beyond that, inject only a summary: "Key themes from the past 
month: [3 bullet points]."

---

## Prompt versioning convention

Save each version as:
```
prompts/
  system_v1.0_2025-03-01.txt   ← original
  system_v1.1_2025-03-15.txt   ← after first client feedback
  system_v2.0_2025-04-01.txt   ← major restructure
  system_current.txt            ← symlink or copy of latest
```

Never overwrite. Always keep history. The system prompt will evolve as you learn what 
outputs the client finds most useful.
# Build Roadmap — Living Strategy Agent

Full phased action plan from MVP prototype to fully automated product.
Estimated total: 3–4 weeks with one developer.

---

## Phase 1 — Data input layer (Days 1–3)

### 1.1 Create the Google Sheet template

Columns (in order):
| Column | Type | Notes |
|--------|------|-------|
| `week_date` | Date | Auto-filled with TODAY() formula |
| `client_id` | Text | For multi-client setups |
| `markets` | Dropdown | Comma-separated, data validation list |
| `industry` | Dropdown | Data validation list |
| `trends` | Long text | Trending topics, search spikes, viral content |
| `events` | Long text | Upcoming cultural moments, holidays, launches |
| `competitors` | Long text | Competitor moves observed this week |
| `brand_context` | Long text | Current campaigns, goals, constraints |
| `feedback_last_week` | Long text | Optional: what happened after last week's actions |
| `status` | Dropdown | Pending / Generating / Done / Error |

Add a second tab: `brief_history` — stores all generated briefs.
Columns: `week_date`, `client_id`, `brief_text`, `generated_at`, `model_used`

### 1.2 Set up Google Sheets API

```bash
# 1. Go to console.cloud.google.com
# 2. Create new project: "strategy-agent"
# 3. Enable Google Sheets API
# 4. Create service account → download credentials.json
# 5. Share the Sheet with the service account email
pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

### 1.3 Sheet reader function

```python
# sheet_reader.py
import json
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SHEET_ID = 'YOUR_SHEET_ID_HERE'

def get_latest_inputs(client_id=None):
    creds = Credentials.from_service_account_file('credentials.json', scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    
    result = sheet.values().get(
        spreadsheetId=SHEET_ID,
        range='Sheet1!A2:J1000'
    ).execute()
    
    rows = result.get('values', [])
    headers = ['week_date','client_id','markets','industry','trends',
               'events','competitors','brand_context','feedback_last_week','status']
    
    records = [dict(zip(headers, row)) for row in rows]
    pending = [r for r in records if r.get('status') == 'Pending']
    
    if client_id:
        pending = [r for r in pending if r.get('client_id') == client_id]
    
    return pending[0] if pending else None
```

---

## Phase 2 — Claude API integration (Days 4–6)

### 2.1 Install Anthropic SDK

```bash
pip install anthropic python-dotenv
```

### 2.2 Environment setup

```bash
# .env file (never commit this)
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_SHEET_ID=1BxiM...
NOTION_API_KEY=secret_...  # if using Notion output
SENDGRID_API_KEY=SG....    # if using email output
```

### 2.3 Core brief generator

```python
# generate_brief.py
import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()
client = Anthropic()

def load_system_prompt(industry, markets, brand_stage="growth", kpis="engagement, brand awareness"):
    with open('prompts/system_current.txt', 'r') as f:
        template = f.read()
    
    return template.replace('{{INDUSTRY}}', industry) \
                   .replace('{{MARKETS}}', markets) \
                   .replace('{{BRAND_STAGE}}', brand_stage) \
                   .replace('{{KPIS}}', kpis) \
                   .replace('{{CADENCE}}', 'week') \
                   .replace('{{PERIOD}}', '7 days') \
                   .replace('{{ROLE_TITLE}}', 'marketing strategist') \
                   .replace('{{YEARS}}', '15+')

def build_user_prompt(inputs, past_briefs=None):
    memory_section = ""
    if past_briefs:
        memory_section = "\nCONTEXT FROM PREVIOUS WEEKS:\n"
        for brief in past_briefs[-4:]:  # last 4 weeks max
            memory_section += f"\nWEEK OF {brief['week_date']}:\n"
            memory_section += brief['brief_summary'] + "\n"
    
    return f"""Here is this week's input data. Generate the weekly strategy brief.

TREND SIGNALS THIS WEEK:
{inputs['trends']}

UPCOMING EVENTS & CULTURAL MOMENTS:
{inputs['events']}

COMPETITOR MOVES OBSERVED:
{inputs['competitors']}

CURRENT BRAND CONTEXT & GOALS:
{inputs['brand_context']}

{f"FEEDBACK ON LAST WEEK'S ACTIONS:{chr(10)}{inputs['feedback_last_week']}" if inputs.get('feedback_last_week') else ""}
{memory_section}
Generate the full weekly strategy brief now."""

def generate_brief(inputs, past_briefs=None):
    system_prompt = load_system_prompt(
        industry=inputs.get('industry', 'Consumer brand'),
        markets=inputs.get('markets', 'Global')
    )
    user_prompt = build_user_prompt(inputs, past_briefs)
    
    print("Generating brief...")
    full_text = ""
    
    with client.messages.stream(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}]
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_text += text
    
    print("\n\nBrief generation complete.")
    return full_text
```

### 2.4 Run and test

```python
# test_run.py — manual test before automating
from sheet_reader import get_latest_inputs
from generate_brief import generate_brief

inputs = get_latest_inputs()
if inputs:
    brief = generate_brief(inputs)
    print(brief)
else:
    print("No pending inputs found in sheet.")
```

---

## Phase 3 — Memory layer (Days 7–10)

### 3.1 Supabase setup (recommended for production)

```sql
-- Run in Supabase SQL editor
CREATE TABLE briefs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id text NOT NULL,
  week_date date NOT NULL,
  industry text,
  markets text,
  inputs jsonb,
  brief_text text,
  brief_summary text,  -- 3-sentence AI-generated summary for memory injection
  model_used text,
  generated_at timestamptz DEFAULT now(),
  feedback text
);

CREATE INDEX ON briefs (client_id, week_date DESC);
```

```bash
pip install supabase
```

```python
# memory.py
from supabase import create_client
import os

supabase = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

def save_brief(client_id, week_date, inputs, brief_text, model_used):
    # Auto-generate summary for memory injection
    summary = generate_summary(brief_text)  # call Claude with a short summarize prompt
    
    supabase.table('briefs').insert({
        'client_id': client_id,
        'week_date': week_date,
        'inputs': inputs,
        'brief_text': brief_text,
        'brief_summary': summary,
        'model_used': model_used
    }).execute()

def get_past_briefs(client_id, limit=4):
    result = supabase.table('briefs') \
        .select('week_date, brief_summary, feedback') \
        .eq('client_id', client_id) \
        .order('week_date', desc=True) \
        .limit(limit) \
        .execute()
    return result.data
```

### 3.2 Brief summary generator (for memory)

```python
def generate_summary(brief_text):
    """Condenses a full brief into 3 sentences for memory injection."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # use Haiku — faster and cheaper for this
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": f"Summarize this marketing strategy brief in exactly 3 sentences. "
                       f"Include: (1) the top recommendation, (2) key reasoning, "
                       f"(3) what to watch next week.\n\n{brief_text}"
        }]
    )
    return response.content[0].text
```

---

## Phase 4 — Automation and delivery (Days 11–16)

### 4.1 Main orchestrator script

```python
# run_weekly.py — the script that gets scheduled
import os
from datetime import date
from sheet_reader import get_latest_inputs, mark_as_generating, mark_as_done
from generate_brief import generate_brief
from memory import get_past_briefs, save_brief
from deliver import send_to_notion, send_email_brief, send_slack_notification

def run():
    print(f"Running strategy agent — {date.today()}")
    
    inputs = get_latest_inputs()
    if not inputs:
        print("No pending inputs. Exiting.")
        return
    
    client_id = inputs.get('client_id', 'default')
    mark_as_generating(client_id)
    
    past_briefs = get_past_briefs(client_id, limit=4)
    brief = generate_brief(inputs, past_briefs)
    
    save_brief(client_id, date.today(), inputs, brief, "claude-sonnet-4-20250514")
    
    # Deliver
    notion_url = send_to_notion(brief, inputs)
    send_email_brief(brief, inputs, notion_url)
    send_slack_notification(notion_url, inputs['markets'])
    
    mark_as_done(client_id)
    print("Done.")

if __name__ == "__main__":
    run()
```

### 4.2 GitHub Actions scheduler

```yaml
# .github/workflows/weekly_brief.yml
name: Weekly Strategy Brief

on:
  schedule:
    - cron: '0 20 * * 0'  # Sunday 8pm UTC (Monday 1am GST / Dubai)
  workflow_dispatch:        # allow manual trigger

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python run_weekly.py
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
```

### 4.3 Notion output writer

```python
# deliver.py
import requests, os

NOTION_API_KEY = os.getenv('NOTION_API_KEY')
NOTION_DATABASE_ID = os.getenv('NOTION_DATABASE_ID')

def send_to_notion(brief_text, inputs):
    headers = {
        "Authorization": f"Bearer {NOTION_API_KEY}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    page = {
        "parent": {"database_id": NOTION_DATABASE_ID},
        "properties": {
            "Name": {"title": [{"text": {"content": f"Strategy Brief — {inputs['week_date']}"}}]},
            "Markets": {"rich_text": [{"text": {"content": inputs['markets']}}]},
            "Status": {"select": {"name": "Published"}}
        },
        "children": [{
            "object": "block",
            "type": "paragraph",
            "paragraph": {"rich_text": [{"text": {"content": brief_text}}]}
        }]
    }
    
    response = requests.post(
        "https://api.notion.com/v1/pages",
        headers=headers,
        json=page
    )
    return response.json().get('url', '')
```

### 4.4 Error alerting

```python
# alerts.py
import smtplib, os
from email.mime.text import MIMEText

def alert_failure(error_message, step):
    """Call this in any except block so failures never go silent."""
    msg = MIMEText(f"Strategy Agent failed at step: {step}\n\nError:\n{error_message}")
    msg['Subject'] = f"[ACTION REQUIRED] Strategy Agent Error — {step}"
    msg['From'] = os.getenv('ALERT_FROM_EMAIL')
    msg['To'] = os.getenv('ALERT_TO_EMAIL')
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(os.getenv('GMAIL_USER'), os.getenv('GMAIL_APP_PASSWORD'))
        server.send_message(msg)
```

---

## Phase 5 — Refinement and scale (Weeks 3–4)

### 5.1 Requirements file

```
# requirements.txt
anthropic>=0.25.0
google-auth>=2.22.0
google-auth-httplib2>=0.1.1
google-api-python-client>=2.100.0
supabase>=1.3.0
python-dotenv>=1.0.0
requests>=2.31.0
sendgrid>=6.11.0
```

### 5.2 Multi-client support

When adding a second client:
1. Add a new row in the Sheet with a unique `client_id`
2. Create a client config file: `clients/client_002.json`
   ```json
   {
     "client_id": "client_002",
     "industry": "E-commerce",
     "markets": "SEA",
     "brand_stage": "scaling",
     "kpis": "ROAS, new customer acquisition",
     "system_prompt_version": "v1.2"
   }
   ```
3. The orchestrator loads this config and fills the system prompt template

### 5.3 Cost tracking

```python
# Add to generate_brief.py after API call
def log_usage(client_id, usage):
    # usage comes from the API response
    input_cost = (usage.input_tokens / 1_000_000) * 3.00   # Sonnet pricing
    output_cost = (usage.output_tokens / 1_000_000) * 15.00
    total = input_cost + output_cost
    print(f"Cost for {client_id}: ${total:.4f} (in: {usage.input_tokens}, out: {usage.output_tokens})")
```

---

## Timeline summary

| Phase | Focus | Duration | Output |
|-------|-------|----------|--------|
| 1 | Data input layer | Days 1–3 | Working Sheet + reader script |
| 2 | Claude API integration | Days 4–6 | Brief generator, tested on real data |
| 3 | Memory layer | Days 7–10 | Supabase + memory injection |
| 4 | Automation + delivery | Days 11–16 | Scheduled, delivered to Notion/Email |
| 5 | Refinement + scale | Weeks 3–4 | Multi-client ready, prompt v2 |

**Total: ~3–4 weeks** with one focused developer.
**Monthly running cost:** $100–500 depending on number of clients and data sources.
# HTML Prototype Reference

This is the annotated source for the working living strategy agent prototype.
It calls the Claude API live and streams the brief output. Use this as the
foundation for demos and client presentations.

## What it includes

- Left sidebar: input panel (4 fields + market/industry configuration)
- Right panel: live streaming brief output with markdown rendering
- System prompt viewer (transparency for developer handoffs)
- Clean dark UI suitable for agency / strategy context

## Key customization points

### 1. Market pills (line ~85)
```html
<!-- Replace with client's actual markets -->
<span class="pill active" data-val="KSA">KSA</span>
<span class="pill active" data-val="UAE">UAE</span>
<span class="pill" data-val="Egypt">Egypt</span>
```

For a Southeast Asia client:
```html
<span class="pill active" data-val="Singapore">Singapore</span>
<span class="pill active" data-val="Indonesia">Indonesia</span>
<span class="pill" data-val="Malaysia">Malaysia</span>
<span class="pill" data-val="Thailand">Thailand</span>
<span class="pill" data-val="Vietnam">Vietnam</span>
```

### 2. Industry pills
Replace the client focus pills to match actual verticals. Keep to 4-5 options max.

### 3. Placeholder text in input fields
Update placeholder and default text to match the client's actual context:
- Replace "هدايا العيد" with relevant local language if applicable
- Update competitor names and event names to be real
- Seed with actual trend data for first demo — don't use placeholder text

### 4. System prompt in buildSystemPrompt()
This is the most important customization. The function takes `clientType` and
`markets` and returns the full system prompt. Replace the template text with
the configured version from `system-prompt-template.md`.

### 5. Model selection
The prototype uses `claude-sonnet-4-20250514`. For production:
- Demos and complex reasoning: `claude-sonnet-4-20250514`
- High-volume, faster output: `claude-haiku-4-5-20251001`
- Always use the latest available model string from docs.anthropic.com

## Output structure the system prompt enforces

```
# [Week headline]

## Strategic read
[2-3 sentence synthesis]

## Trend signals (ranked by urgency)
[Signal 1: HIGH urgency]
[Signal 2: MEDIUM]
[Signal 3: WATCH]

## Priority actions
### Do immediately (next 48 hours)
### Do this week
### Watch and hold

## Budget and channel guidance

## What NOT to do this week

## Next week setup
```

## Hosting options

| Option | Cost | Setup time | Best for |
|--------|------|------------|----------|
| Vercel (static) | Free | 5 min | Quick demos |
| Netlify | Free | 5 min | Quick demos |
| GitHub Pages | Free | 10 min | Version-controlled |
| Custom domain + Vercel | ~$12/yr | 20 min | Client-facing |

For client access, add HTTP Basic Auth via Vercel's password protection feature
(Pro plan, $20/mo) or use a simple query-param token check in JavaScript.

## Adding authentication (simple)

```javascript
// Add to top of <script> block for basic protection
const ACCESS_TOKEN = 'your-secret-token-here';
const urlToken = new URLSearchParams(window.location.search).get('token');
if (urlToken !== ACCESS_TOKEN) {
  document.body.innerHTML = '<div style="padding:40px;text-align:center">Access denied.</div>';
}
// Share link as: https://your-site.vercel.app?token=your-secret-token-here
```

## Converting to a scheduled automated version

The HTML prototype is for demos and manual runs. For full automation:
1. Extract `buildSystemPrompt()` → `prompts/system_current.txt`
2. Extract `buildUserPrompt()` → `generate_brief.py`
3. Extract the `fetch()` API call → wire to Anthropic Python SDK with streaming
4. See `build-roadmap.md` Phase 2 for full code

## File size and performance

- The prototype is a single HTML file (~8KB)
- No external dependencies except Google Fonts
- Streams output token by token — no waiting for full generation
- Works offline except for the API call itself
