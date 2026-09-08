# Data Classification Standard

Every repo declares a `data_classification` in `.project-meta.yaml` before its first merge.

## Tiers
- **phi** — stores/processes/transmits health information tied to identifiable people, or
  connects to HCHB / FHIR / PointCare / any patient-data source, or is built for clinical
  ops. Gets the full PHI gate (Presidio, no-real-data policy, BAA review before any
  third-party processor). Could-foreseeably-ingest-PHI also counts (e.g., a general tool
  someone may paste a clinical note into).
- **sensitive** — non-PHI but confidential: trading/financial logic, internal IT tooling,
  anything with proprietary IP or production secrets. Private repo; third-party processors
  are a judgment call on IP grounds; no PHI layer.
- **personal** — experiments, hobby code, OSS candidates. Baseline guardrails only.

## The test
Ask: does it touch health data tied to people? Connect to HCHB/FHIR/clinical systems? Could
it foreseeably ingest PHI? Is it for clinical operations? **When in doubt, classify up** —
over-protecting a personal repo is cheap; under-protecting a PHI repo is a breach. Record a
one-line reason.

## Re-classification triggers (it's not set-once)
- The PHI canary fires on a non-phi repo → re-classify or justify-allowlist.
- A PHI-adjacent dependency (fhir, hl7, hchb, pointcare, clinical) appears in a non-phi
  repo → re-review the classification.

## Suppression discipline
Canary allowlist entries (`.phi-canary-allow`) require a justification and are reviewed in
the PR. Never blanket-disable. A real PHI hit is never allowlisted — it's removed.

## Compliance note
These controls lower the probability of PHI exposure; they don't guarantee it. Whether a
given posture is sufficient (e.g., no-BAA) is a documented risk decision owned by HIPAA
compliance, not IT alone.
