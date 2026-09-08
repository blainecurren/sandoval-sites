#!/usr/bin/env bash
set -euo pipefail
meta=".project-meta.yaml"
[ -f "$meta" ] || { echo "BLOCK: $meta missing — declare a data classification." >&2; exit 1; }
val=$(grep -E '^data_classification:' "$meta" | head -1 | sed -E 's/^data_classification:[[:space:]]*//; s/[[:space:]]*(#.*)?$//')
case "$val" in
  phi|sensitive|personal) echo "classification: $val"; exit 0 ;;
  *) echo "BLOCK: data_classification must be phi|sensitive|personal (got '${val:-unset}')." >&2; exit 1 ;;
esac
