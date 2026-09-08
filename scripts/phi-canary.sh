#!/usr/bin/env bash
set -euo pipefail
cls=$(grep -E '^data_classification:' .project-meta.yaml 2>/dev/null | sed -E 's/.*:[[:space:]]*//; s/[[:space:]]*(#.*)?$//' || echo "")
[ "$cls" = "phi" ] && { echo "phi repo — full PHI gate applies; canary skipped"; exit 0; }
# Structured identifiers: SSN + US date-of-birth shapes. Add your MRN regex locally.
pat='(\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b)|(\b(0[1-9]|1[0-2])[/-](0[1-9]|[12][0-9]|3[01])[/-](19|20)[0-9]{2}\b)'
# pat="$pat|(<YOUR-MRN-REGEX>)"   # fill in locally; do not paste real format into chat/logs
# Globs EXTENDED for this repo: its content is .astro/.html/.ts/.css/.js, and the
# upstream list (md/txt/csv/json/yaml/yml/sql) reads none of them. Probed 2026-09-08:
# an SSN in probe.md tripped the canary while the same SSN in probe.astro and
# probe.html came back "canary clean". A gate that reads nothing passes everything.
files=$(git ls-files '*.md' '*.txt' '*.csv' '*.json' '*.yaml' '*.yml' '*.sql' \
                     '*.astro' '*.html' '*.ts' '*.tsx' '*.js' '*.jsx' '*.css')
[ -z "$files" ] && { echo "canary clean ($cls) — no text/data files"; exit 0; }
hits=$(echo "$files" | xargs grep -nE "$pat" 2>/dev/null || true)
if [ -f .phi-canary-allow ]; then
  # Filter out comment/blank lines BEFORE using as -F pattern set.
  # An empty pattern in -Ff matches every line (silent disable); comment lines would otherwise act as filters.
  hits=$(echo "$hits" | grep -vFf <(grep -vE '^[[:space:]]*(#|$)' .phi-canary-allow) || true)
fi
if [ -n "$hits" ]; then
  echo "CANARY TRIPPED on a non-phi repo. Re-classify to phi, or allowlist with justification:" >&2
  echo "$hits" >&2; exit 1
fi
echo "canary clean ($cls)"; exit 0
