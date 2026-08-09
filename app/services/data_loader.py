import csv
import re
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / ".." / "Data"


def read_csv_rows(path: Path) -> list[list[str]]:
    rows: list[list[str]] = []
    with path.open("r", encoding="utf-8", errors="ignore") as csvfile:
        for raw_line in csvfile:
            line = raw_line.strip()
            if not line:
                continue
            rows.append([line])
    return rows


def parse_convocation_raw_line(raw_line: str) -> dict[str, Any] | None:
    text = raw_line.strip().strip('"').strip("'").strip()
    if not text or text.lower().startswith("sl#") or text.lower().startswith("procession"):
        return None

    tokens = text.split()
    if len(tokens) < 6 or not tokens[0].isdigit() or not tokens[1].isdigit():
        return None

    nsu_id = tokens[1]
    room = tokens[-1] if tokens[-1].upper().startswith("SAC") else ""
    procession = tokens[-2] if room and tokens[-2].isdigit() else ""

    if room and procession:
        degree_tokens = tokens[4:-2]
    else:
        degree_tokens = tokens[4:-1]

    if len(degree_tokens) < 1:
        return None

    # Name is all tokens before the first degree-looking token. We use a simple heuristic.
    name_tokens = []
    degree_start = len(degree_tokens)
    for idx, token in enumerate(degree_tokens):
        if re.match(r"^[A-Z][a-zA-Z\.]*$", token) and token.upper().endswith("ARCH"):
            degree_start = idx
            break
    if degree_start == 0:
        degree_start = len(degree_tokens) - 2

    name_tokens = degree_tokens[:degree_start]
    degree_value = " ".join(degree_tokens[degree_start:]).strip()
    full_name = " ".join(name_tokens).strip() or "Unknown Graduate"

    return {
        "nsuId": nsu_id,
        "fullName": full_name,
        "degree": degree_value,
        "procession": procession,
    }


def load_company_details() -> list[dict[str, str]]:
    path = (BASE_DIR / ".." / "Data" / "Company Details.csv").resolve()
    with path.open("r", encoding="utf-8", errors="ignore") as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader if row and any(cell.strip() for cell in row)]

    if not rows:
        return []

    headers = [header.strip() for header in rows[0]]
    return [
        {headers[i]: cell.strip() for i, cell in enumerate(row) if i < len(headers)}
        for row in rows[1:]
    ]


def load_convocation_list(filename: str, batch_name: str) -> list[dict[str, Any]]:
    path = (BASE_DIR / ".." / "Data" / filename).resolve()
    if not path.exists():
        return []

    alumni: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8", errors="ignore") as csvfile:
        for raw_line in csvfile:
            parsed = parse_convocation_raw_line(raw_line)
            if parsed:
                parsed["id"] = f"{batch_name.lower().replace(' ', '-')}-{len(alumni) + 1}"
                parsed["batch"] = batch_name
                alumni.append(parsed)

    return alumni
