"""File-based brief history for MVP memory injection (no database required)."""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any

_DEFAULT_ROOT = Path(__file__).resolve().parent.parent
_DATA_DIR = _DEFAULT_ROOT / "data"
_STORE_FILE = _DATA_DIR / "brief_history.json"


@dataclass
class BriefRecord:
    client_id: str
    week_date: str
    brief_text: str
    brief_summary: str | None = None
    feedback: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "client_id": self.client_id,
            "week_date": self.week_date,
            "brief_text": self.brief_text,
            "brief_summary": self.brief_summary,
            "feedback": self.feedback,
        }

    @classmethod
    def from_dict(cls, d: dict[str, Any]) -> BriefRecord:
        return cls(
            client_id=d.get("client_id", "default"),
            week_date=str(d.get("week_date", "")),
            brief_text=d.get("brief_text", ""),
            brief_summary=d.get("brief_summary"),
            feedback=d.get("feedback"),
        )


def _load_all(path: Path = _STORE_FILE) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    with path.open(encoding="utf-8") as f:
        raw = json.load(f)
    if not isinstance(raw, list):
        return []
    return raw


def _save_all(rows: list[dict[str, Any]], path: Path = _STORE_FILE) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2, ensure_ascii=False)


def save_brief(
    record: BriefRecord,
    *,
    path: Path = _STORE_FILE,
    keep_last: int = 20,
) -> None:
    rows = _load_all(path)
    rows.append(record.to_dict())
    rows.sort(key=lambda r: r.get("week_date", ""), reverse=True)
    if len(rows) > keep_last:
        rows = rows[:keep_last]
    _save_all(rows, path)


def get_past_briefs(
    client_id: str,
    *,
    limit: int = 4,
    path: Path = _STORE_FILE,
) -> list[dict[str, Any]]:
    rows = [r for r in _load_all(path) if r.get("client_id") == client_id]
    rows.sort(key=lambda r: r.get("week_date", ""), reverse=True)
    return rows[:limit]


def format_memory_for_prompt(past: list[dict[str, Any]], inject_last: int = 2) -> str:
    """Build CONTEXT FROM PREVIOUS WEEKS block for the system prompt."""
    if not past:
        return ""
    lines = [
        "CONTEXT FROM PREVIOUS WEEKS:",
        "Use this to avoid repeating recommendations that have already been made, and to reference "
        "outcomes where feedback was provided.",
        "",
    ]
    for row in past[:inject_last]:
        wd = row.get("week_date", "?")
        summary = row.get("brief_summary") or _snippet(row.get("brief_text", ""))
        fb = row.get("feedback") or "No feedback recorded"
        lines.append(f"WEEK OF {wd}:")
        lines.append(f"Top recommendation / summary: {summary}")
        lines.append(f"Client feedback / outcome: {fb}")
        lines.append("")
    return "\n".join(lines).strip()


def _snippet(text: str, max_len: int = 400) -> str:
    t = text.strip().replace("\n", " ")
    if len(t) <= max_len:
        return t
    return t[: max_len - 3] + "..."


def today_iso() -> str:
    return date.today().isoformat()
