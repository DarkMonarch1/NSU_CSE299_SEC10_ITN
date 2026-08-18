import csv
import re
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = (BASE_DIR / ".." / "Data").resolve()


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
    if not text or text.lower().startswith("sl") or text.lower().startswith("dept") or text.lower().startswith("order") or text.lower().startswith("north"):
        return None

    # Handle comma-separated vs space-separated
    if "," in text:
        parts = [p.strip() for p in text.split(",") if p.strip()]
        # Check if first item or second item is numeric ID
        valid_id = None
        for p in parts[:4]:
            clean_p = p.replace('"', '').strip()
            if clean_p.isdigit() and len(clean_p) >= 5:
                valid_id = clean_p
                break
        if not valid_id:
            return None

        # Extract name from string
        name = "Unknown Graduate"
        degree = "B.S. in Computer Science"
        for p in parts:
            if re.search(r"^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+", p):
                name = p
                break
        return {
            "nsuId": valid_id,
            "fullName": name,
            "degree": degree,
            "procession": "1",
        }

    tokens = text.split()
    if len(tokens) < 3 or not tokens[0].isdigit():
        return None

    nsu_id = tokens[1] if tokens[1].isdigit() else tokens[0]

    # Find degree pattern or name
    # Common degree prefixes: B., M., BS, MS, BBA, MBA, B.Arch, B.Pharm, B.Sc
    degree_idx = -1
    for idx, token in enumerate(tokens[2:], start=2):
        clean_tok = token.upper().rstrip(".")
        if clean_tok in ["B.ARCH", "BARCH", "BBA", "MBA", "BS", "MS", "B.SC", "BSC", "B.PHARM", "BPHARM", "LL.B", "LLB", "MA", "BA"]:
            degree_idx = idx
            break

    if degree_idx != -1:
        name_tokens = tokens[2:degree_idx]
        degree_tokens = tokens[degree_idx:]
    else:
        # Fallback: assume last token is procession or degree, and middle is name
        if tokens[-1].isdigit():
            name_tokens = tokens[2:-1]
            degree_tokens = ["B.S. in Computer Science"]
        else:
            name_tokens = tokens[2:]
            degree_tokens = ["B.S. in Computer Science"]

    full_name = " ".join([t for t in name_tokens if not t.isdigit() and len(t) > 0]).strip() or "NSU Graduate"
    degree_val = " ".join(degree_tokens).strip() or "B.S. in Computer Science"
    procession_val = tokens[-1] if tokens[-1].isdigit() else "1"

    return {
        "nsuId": nsu_id,
        "fullName": full_name,
        "degree": degree_val,
        "procession": procession_val,
    }


def load_company_details() -> list[dict[str, str]]:
    path = (DATA_DIR / "Company Details.csv").resolve()
    if not path.exists():
        return []
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
    path = (DATA_DIR / filename).resolve()
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
