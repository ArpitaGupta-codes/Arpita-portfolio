from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
PUBLIC = ROOT / "public"
errors = []
warnings = []

def read(path):
    return path.read_text(encoding="utf-8")

required = ["package.json", "index.html", "src/main.jsx", "src/App.jsx", "src/index.css", "README.md"]
for rel in required:
    if not (ROOT / rel).is_file():
        errors.append(f"Missing required file: {rel}")

try:
    json.loads(read(ROOT / "package.json"))
except Exception as exc:
    errors.append(f"Invalid package.json: {exc}")

source_files = list(SRC.rglob("*.js")) + list(SRC.rglob("*.jsx"))
import_re = re.compile(r'''(?:from\s+|import\s*\(\s*)["'](\.{1,2}/[^"']+)["']''')
for path in source_files:
    for raw in import_re.findall(read(path)):
        candidate = (path.parent / raw).resolve()
        candidates = [
            candidate, candidate.with_suffix(".js"), candidate.with_suffix(".jsx"),
            candidate / "index.js", candidate / "index.jsx"
        ]
        if not any(p.is_file() for p in candidates):
            errors.append(f"Broken import in {path.relative_to(ROOT)}: {raw}")

image_re = re.compile(r'''["'](/images/[^"']+)["']''')
for path in source_files:
    for ref in image_re.findall(read(path)):
        if not (PUBLIC / ref.lstrip("/")).is_file():
            errors.append(f"Missing image in {path.relative_to(ROOT)}: {ref}")

combined = "\n".join(read(p) for p in source_files)
for token in ["your-email@example.com", "EMAIL_PLACEHOLDER", "// rest of the code", "TODO: implement"]:
    if token in combined:
        errors.append(f"Placeholder/incomplete token remains: {token}")

screenshot_count = len(list((PUBLIC / "images/smart-kirana").rglob("*.png")))
if screenshot_count < 30:
    errors.append(f"Expected at least 30 Smart Kirana PNG assets, found {screenshot_count}")

# Basic delimiter balance check (ignores quoted strings approximately).
for path in source_files:
    text = read(path)
    stripped = re.sub(r'(["\']).*?(?<!\\)\1', '', text, flags=re.S)
    for left, right in [("{", "}"), ("[", "]"), ("(", ")")]:
        if stripped.count(left) != stripped.count(right):
            warnings.append(f"Delimiter count differs in {path.relative_to(ROOT)} for {left}{right}")

print(f"Checked {len(source_files)} JS/JSX source files.")
print(f"Checked {screenshot_count} Smart Kirana PNG assets.")
if warnings:
    print("\nWarnings:")
    for warning in warnings:
        print(" -", warning)
if errors:
    print("\nErrors:")
    for error in errors:
        print(" -", error)
    sys.exit(1)
print("\nStatic verification passed.")
