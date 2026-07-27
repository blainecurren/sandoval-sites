# Project Breakdown

Deep-analyze every source file and scaffold a full architecture map into Obsidian.

## Step 0 — Load Config
```bash
cat ~/.claude/obsidian-config.md 2>/dev/null || echo "NOT_FOUND"
```
Parse: OWNER, PROJECTS, `vault_path`. Set: PROJECT_NAME, PROJECT_PATH, TODAY.

**Vault access is filesystem, not MCP.** No Obsidian MCP server is configured and none is
needed. Resolve every vault-relative path as `{vault_path}/{path}` and use ordinary file
tools: Read for `obsidian_get_file_contents`, Read+append+Write for `obsidian_append_content`,
`ls`/`find` for `obsidian_list_files_in_dir`. Obsidian does not need to be running.
Write LF line endings.

## Step 1 — Identify Project
```bash
basename $(pwd) && pwd
ls package.json pyproject.toml Cargo.toml go.mod 2>/dev/null
git remote get-url origin 2>/dev/null; git log --oneline -10 2>/dev/null
```

## Step 2 — Full Directory Scan
```bash
find . -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' \
  -not -path '*/build/*' -not -path '*/__pycache__/*' -not -path '*/.venv/*' \
  -not -name '*.lock' -not -name '*.min.*' | sort
find . -type f -not -path '*/node_modules/*' -not -path '*/.git/*' \
  | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -20
```

## Step 3 — Read Key Config Files
cat package.json, pyproject.toml, docker-compose.yml, Dockerfile, .env.example,
README.md, CLAUDE.md, CHANGELOG.md — all that exist.

## Step 4 — Classify the Project
Stack, type, architecture pattern. Map every folder to a domain:
Entry Points, API/Routes, Business Logic, Data/Models, Infrastructure, Auth,
Utilities, UI/Frontend, Tests, DevOps, Types, Scripts.

## Step 5 — Deep File Analysis
Read EVERY source file (use view_range for files >300 lines).
For each file extract: purpose, domain, exports, imports, key logic (name/inputs/outputs
/side effects for each significant function), data flow, integration points, TODOs.

## Step 6 — Write to Obsidian
Use obsidian_append_content for all files. Write in this order:

{PROJECT_PATH}/Breakdown/INDEX.md — master index with stats, domain map, env vars,
  dependency graph, entry points, all open TODOs aggregated
{PROJECT_PATH}/Breakdown/{Domain}/README.md — per-domain overview and file list
{PROJECT_PATH}/Breakdown/{Domain}/{filename}.md — per-file deep notes
{PROJECT_PATH}/Breakdown/Data-Flow.md — primary request/data path narrative
{PROJECT_PATH}/Breakdown/Dependencies.md — internal + external dependency map

## Step 7 — Log to DevLog
Append to {DEVLOG}/{TODAY}.md and {PROJECT_PATH}/Journal/{TODAY}.md:
  ## {NOW} - Breakdown: {PROJECT_NAME}
  **Type**: docs
  **Summary**: Generated breakdown — {file count} files, {domain count} domains

## Step 8 — Summary
Breakdown complete — {PROJECT_NAME}
Files analyzed: {count} · Domains: {list} · Notes created: {count}
Vault: {PROJECT_PATH}/Breakdown/INDEX.md

## Rules
- Read every file. No skipping.
- For large files (>300 lines): use view_range in chunks.
- If >100 source files: ask user for Full vs Core mode before starting.
- **Never write to the repo.** This command only writes into the vault, under
  `{vault_path}/{PROJECT_PATH}/Breakdown/`. The repo is read-only here.
- Wikilinks must be vault-absolute (`[[Projects/{name}/Breakdown/INDEX|INDEX]]`) or
  same-folder (`[[Data-Flow]]`). **Obsidian does not resolve `../` in wikilinks** — a
  `[[../INDEX]]` renders as a broken link.
