#!/usr/bin/env bash
set -euo pipefail
cls=$(grep -E '^data_classification:' .project-meta.yaml 2>/dev/null | sed -E 's/.*:[[:space:]]*//; s/[[:space:]]*(#.*)?$//' || echo "")
[ "$cls" = "phi" ] && exit 0
sig='fhir|hl7|hapi|smart-on-fhir|hchb|pointcare|clinical|patient'
manifests=$(git ls-files package.json 'requirements*.txt' pyproject.toml 2>/dev/null || true)
[ -z "$manifests" ] && exit 0
hit=$(echo "$manifests" | xargs grep -niE "$sig" 2>/dev/null || true)
if [ -n "$hit" ]; then
  echo "RE-CLASSIFY: PHI-adjacent dependency in a non-phi repo — review classification:" >&2
  echo "$hit" >&2; exit 1
fi
exit 0
