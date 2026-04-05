# Example prompts (plugin)

**Large inputs:** use **two messages** (see plugin `README.md`).

## Full intelligence + calendars (orchestrator)

```text
/living-strategy-plugin:weekly-brief
Full inputs next message.
```

Then paste: markets, industry, P1–Pn service URLs, brand context, custom_sources (SOT), competitors, trends/events hints, and **target audience**. Ask for **LinkedIn + blog calendars** and **second-order** implications.

## Reddit/Quora–heavy VoC

```text
/living-strategy-plugin:weekly-brief Prioritize Reddit and Quora for [persona] in [domain] in [geography]; then Trends and news; output per outputs.md including LinkedIn and blog tables.
```

## Trends-only assist (company URL)

```text
/living-strategy-plugin:weekly-brief Run google_trends_report-style research on https://example.com then fold into weekly-brief outputs with calendars.
```

## Minimal

```text
/living-strategy-plugin:weekly-brief UAE + GCC, tax consultancy, SME + foreign entrants; service priority P1 tax P2 audit; Horizon BizCo; custom_sources: MoF/FTA links user provides.
```
