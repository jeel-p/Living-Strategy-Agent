"""Orchestrate one run: load inputs, pull memory, generate brief, save + optional delivery hooks."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

_SCRIPTS = Path(__file__).resolve().parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from deliver import deliver_to_file, send_email_brief, send_slack_notification, send_to_notion
from generate_brief import generate_brief
from memory import BriefRecord, get_past_briefs, save_brief, today_iso

_ROOT = Path(__file__).resolve().parent.parent


def run() -> None:
    fixture = _ROOT / "fixtures" / "sample_inputs.json"
    inp_path = Path(os.environ.get("WEEKLY_INPUTS_PATH", str(fixture)))
    inputs = json.loads(inp_path.read_text(encoding="utf-8"))
    client_id = inputs.get("client_id", "default")

    past = get_past_briefs(client_id)
    # Non-streaming capture for saving
    brief_text = generate_brief(inputs, past_records=past, stream=False)

    week = inputs.get("week_date") or today_iso()
    record = BriefRecord(
        client_id=client_id,
        week_date=str(week),
        brief_text=brief_text,
        brief_summary=None,
        feedback=inputs.get("feedback_last_week"),
    )
    save_brief(record)

    out_path = deliver_to_file(brief_text)
    print(f"Wrote brief to {out_path}", file=sys.stderr)

    notion_url = send_to_notion(brief_text, inputs)
    send_email_brief(brief_text, inputs, notion_url)
    send_slack_notification(notion_url, str(inputs.get("markets", "")))


if __name__ == "__main__":
    run()
