"""Deliver brief to local file or stdout (extend for Notion/Email/Slack in your stack)."""

from __future__ import annotations

import os
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_OUT = _ROOT / "data" / "latest_brief.md"


def deliver_to_file(brief_text: str, path: Path | None = None) -> Path:
    out = path or Path(os.environ.get("BRIEF_OUTPUT_PATH", str(_DEFAULT_OUT)))
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(brief_text, encoding="utf-8")
    return out


def deliver_stdout(brief_text: str) -> None:
    print(brief_text)


def send_to_notion(brief_text: str, inputs: dict) -> str:
    """Placeholder: wire Notion API in your deployment; returns empty string if not configured."""
    _ = (brief_text, inputs)
    return os.environ.get("NOTION_PAGE_URL", "")


def send_email_brief(brief_text: str, inputs: dict, notion_url: str = "") -> None:
    """Placeholder: integrate SendGrid/SES in your deployment."""
    _ = (brief_text, inputs, notion_url)


def send_slack_notification(notion_url: str, markets: str) -> None:
    """Placeholder: post summary + link to Slack."""
    _ = (notion_url, markets)
