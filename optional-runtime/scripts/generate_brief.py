"""Generate a weekly strategy brief via Anthropic Messages API."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

_SCRIPTS = Path(__file__).resolve().parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from memory import format_memory_for_prompt

_ROOT = Path(__file__).resolve().parent.parent
_PROMPTS = _ROOT / "prompts"
_DEFAULT_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
_MEM_ANCHOR = "YOUR BRIEF MUST FOLLOW THIS EXACT STRUCTURE"


def format_custom_sources_block(inputs: dict) -> str:
    """Format structured custom_sources + source_scope for the user message."""
    cs = inputs.get("custom_sources")
    scope = (inputs.get("source_scope") or "open").strip().lower()
    if not cs:
        return ""
    lines: list[str] = [
        "CUSTOM SOURCES (USER-PROVIDED — prioritize in analysis; keep names exact):",
        "",
    ]
    if isinstance(cs, dict):
        sections = (
            ("websites", "Websites & landing pages"),
            ("usernames", "Social / creator handles"),
            ("competitors", "Competitor sites & handles"),
            ("communities", "Communities & forums"),
            ("newsletters", "Newsletters & digests"),
            ("keywords", "Keywords & topics to monitor"),
        )
        for key, title in sections:
            val = cs.get(key)
            if not val:
                continue
            lines.append(f"{title}:")
            if isinstance(val, list):
                for item in val:
                    lines.append(f"  - {item}")
            else:
                lines.append(f"  {val}")
            lines.append("")
        notes = cs.get("notes")
        if notes:
            lines.append("Notes:")
            if isinstance(notes, list):
                for item in notes:
                    lines.append(f"  - {item}")
            else:
                lines.append(f"  {notes}")
            lines.append("")
    else:
        lines.append(str(cs))
        lines.append("")
    if scope == "provided_only":
        lines.append(
            "SCOPE: provided_only — Use ONLY the custom_sources list as the monitoring set for this run; "
            "label extrapolation beyond it as [INFERRED]."
        )
        lines.append("")
    return "\n".join(lines).strip()


def load_system_prompt(
    path: Path | None = None,
    *,
    past_briefs_block: str = "",
    compliance_note: str = "",
) -> str:
    p = path or (_PROMPTS / "system-prompt.current.md")
    text = p.read_text(encoding="utf-8")
    if past_briefs_block.strip() and _MEM_ANCHOR in text:
        text = text.replace(
            _MEM_ANCHOR,
            past_briefs_block.strip() + "\n\n" + _MEM_ANCHOR,
            1,
        )
    elif past_briefs_block.strip():
        text = past_briefs_block.strip() + "\n\n" + text
    if compliance_note.strip():
        text = text.rstrip() + "\n\nCOMPLIANCE:\n" + compliance_note.strip() + "\n"
    return text


def build_user_prompt(inputs: dict, memory_section: str = "") -> str:
    parts = [
        "Here is this week's input data. Generate the weekly strategy brief.",
        "",
        "TREND SIGNALS THIS WEEK:",
        str(inputs.get("trends", "")).strip(),
        "",
        "UPCOMING EVENTS & CULTURAL MOMENTS:",
        str(inputs.get("events", "")).strip(),
        "",
        "COMPETITOR MOVES OBSERVED:",
        str(inputs.get("competitors", "")).strip(),
        "",
        "CURRENT BRAND CONTEXT & GOALS:",
        str(inputs.get("brand_context", "")).strip(),
        "",
    ]
    cs_block = format_custom_sources_block(inputs)
    if cs_block:
        parts.extend([cs_block, ""])
    fb = inputs.get("feedback_last_week")
    if fb:
        parts.extend(["FEEDBACK ON LAST WEEK'S ACTIONS:", str(fb).strip(), ""])
    if memory_section:
        parts.extend(["", memory_section, ""])
    parts.append("Generate the full weekly strategy brief now.")
    return "\n".join(parts)


def generate_brief(
    inputs: dict,
    *,
    past_records: list[dict] | None = None,
    system_prompt_path: Path | None = None,
    stream: bool = True,
) -> str:
    from anthropic import Anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("Set ANTHROPIC_API_KEY in your environment to run generate_brief.")

    past = past_records or []
    past_block = format_memory_for_prompt(past) if past else ""
    system_prompt = load_system_prompt(system_prompt_path, past_briefs_block=past_block)
    user_prompt = build_user_prompt(inputs)

    client = Anthropic(api_key=api_key)
    full_text: list[str] = []

    if stream:
        with client.messages.stream(
            model=_DEFAULT_MODEL,
            max_tokens=4096,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}],
        ) as stream_resp:
            for text in stream_resp.text_stream:
                print(text, end="", flush=True)
                full_text.append(text)
        print()
    else:
        msg = client.messages.create(
            model=_DEFAULT_MODEL,
            max_tokens=4096,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}],
        )
        block = msg.content[0]
        text = block.text if hasattr(block, "text") else str(block)
        full_text.append(text)

    return "".join(full_text)


if __name__ == "__main__":
    fixture = _ROOT / "fixtures" / "sample_inputs.json"
    inp_path = Path(os.environ.get("WEEKLY_INPUTS_PATH", str(fixture)))
    data = json.loads(inp_path.read_text(encoding="utf-8"))
    try:
        generate_brief(data, past_records=None, stream=True)
    except Exception as e:
        print(e, file=sys.stderr)
        sys.exit(1)
