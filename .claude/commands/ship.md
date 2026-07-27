# Ship Changes

After making changes and testing, commit and push to git, update project docs,
and sync everything to Obsidian.

## Important Rules
- Do NOT include "Generated with Claude" in commit messages
- Do NOT include Co-Authored-By attribution
- Use conventional commit format only: `type: description`

## Instructions
$ARGUMENTS

---

## Step 0 — Load Config
```bash
cat ~/.claude/obsidian-config.md 2>/dev/null || echo "NOT_FOUND"
```
If NOT_FOUND: tell the user to run /project-init first, then stop.
Parse and store: OWNER, PROJECTS, DEVLOG, ADR, SPRINTS, SPRINT_ACTIVE
Resolve: PROJECT_NAME = basename of pwd, PROJECT_PATH = {PROJECTS}/{PROJECT_NAME}
Set TODAY = YYYY-MM-DD, NOW = HH:MM

---

## Step 0.5 — Vault Access (filesystem, not MCP)

No Obsidian MCP server is configured on this machine, and none is needed — the vault is a
plain directory. Parse `vault_path` from the config and resolve every vault-relative path
against it:

```
VAULT         = value of `vault_path`   (e.g. /mnt/c/Users/blain/Documents/dev/Notes)
absolute path = {VAULT}/{vault-relative path}
```

Wherever a step below names an `obsidian_*` tool, use the filesystem equivalent instead:

| Step text says | Actually do |
|---|---|
| `obsidian_get_file_contents` | Read the absolute path. A missing file means "not found" — handle it, don't error out. |
| `obsidian_append_content` | Read + append + Write. If the file doesn't exist, Write it with the specified heading. |
| `obsidian_list_files_in_dir` | `ls` / `find` on the absolute path |
| `obsidian_delete_file` | `rm` the absolute path |
| `obsidian_simple_search` | `grep -r` under `{VAULT}` |

Obsidian does **not** need to be running. It picks up external file changes when it regains
focus. Write LF line endings — the whole vault is LF, including on the Windows mount.

---

## Step 1 — Review Changes
```bash
git status
git diff --stat
git diff --name-status HEAD 2>/dev/null || git diff --name-status
```
Note all modified, added (A), and deleted (D) files.
If no changes, tell the user and stop.

---

## Step 2 — Commit and Push
```bash
git add .
```
Write a specific conventional commit message. No attribution lines.
```bash
git commit -m "{type}: {description}"
git push
git rev-parse --short HEAD
```
Store commit hash as COMMIT_HASH.

---

## Step 3 — Update docs/PROJECT_OVERVIEW.md
```bash
cat docs/PROJECT_OVERVIEW.md 2>/dev/null || echo "NOT_FOUND"
```
If NOT_FOUND: create docs/ and a new PROJECT_OVERVIEW.md.
If found: patch only sections affected by this commit. Do not rewrite the whole file.
If updated: git add docs/PROJECT_OVERVIEW.md && git commit -m "docs: update project overview" && git push

---

## Step 4 — Review and Update CLAUDE.md
```bash
cat CLAUDE.md 2>/dev/null || echo "NOT_FOUND"
```
Update only if triggered by: new packages, new env vars, new folders/files,
scope shift, new integrations, changed commands, new conventions, gotchas discovered,
deprecated features. Otherwise skip and note "CLAUDE.md — no changes needed".
If updated: git add CLAUDE.md && git commit -m "docs: update CLAUDE.md" && git push

---

## Step 5 — Check for ADR-worthy Decisions
Review for: technology choices, trade-offs, design patterns adopted, alternatives
rejected, breaking changes.
If none: skip to Step 6.
If warranted:
- Use obsidian_list_files_in_dir on {ADR} to get next ADR number
- Create {ADR}/ADR-{NNN}-{slug}.md using obsidian_append_content with template:
  ---
  status: accepted
  date: {TODAY}
  deciders: [{OWNER}]
  ---
  # ADR-{NNN}: {Title}
  ## Context / Decision / Consequences / Alternatives / References
- Update {ADR}/Index.md with the new row using obsidian_append_content
- Store ADR_REF for use in Step 7

---

## Step 5.5 — Incremental Breakdown Update (if Breakdown exists)

Check if {PROJECT_PATH}/Breakdown/INDEX.md exists via obsidian_get_file_contents.
If not: skip this step entirely (user hasn't run /breakdown yet).

If exists: perform a lightweight incremental update based on the files
changed in this commit. Do NOT re-read the entire codebase.

### 5.5a — Detect structural changes

From the git diff in Step 1, identify:
- **New source files** (status A) — .js, .jsx, .ts, .tsx, .py, .go, etc.
- **Deleted source files** (status D)
- **Renamed source files** (status R)

Ignore: test files, docs, config, lock files, assets.
If no structural changes: skip to Step 6.

### 5.5b — Classify new files into domains

For each new source file:
1. Read the file (it was just committed — it's fresh)
2. Determine which Breakdown domain it belongs to based on its path
   (e.g., `api/src/routes/` → API Routes, `api/src/services/` → Services,
    `web/src/components/` → UI Components, `api/src/middleware/` → Middleware)
3. Extract: purpose (from top comment or first 20 lines), exports, key functions

### 5.5c — Update per-domain README

For each domain that gained or lost files:
- Read the existing `{PROJECT_PATH}/Breakdown/{Domain}/README.md`
- Add new file entries to the file table
- Remove deleted file entries from the file table
- Do NOT rewrite descriptions of existing files

### 5.5d — Update INDEX.md stats

Read `{PROJECT_PATH}/Breakdown/INDEX.md`. Update only:
- **Stats table** — file counts (increment/decrement)
- **Domain Map table** — file counts per domain
- **Open TODOs** — if the new file contains TODO/FIXME comments, append them

Do NOT rewrite the architecture narrative, data flow, or dependency sections.
Those require a full /breakdown refresh.

### 5.5e — Note in journal

If any Breakdown files were updated, include in the Step 7 journal entry:
  **Breakdown**: updated {Domain}/README.md (+{N} files, -{N} files), INDEX.md stats
  refreshed

### Rules for this step
- Only fires when Breakdown/INDEX.md already exists
- Only processes files with status A, D, or R — not modifications to existing files
- Never re-reads files that weren't part of this commit
- If >10 new files in a single commit, skip and suggest: "Large structural change —
  consider running /breakdown to refresh the full architecture map."
- Modifications to existing file logic, internals, or APIs are NOT tracked here —
  that's what /breakdown is for

---

## Step 6 — Sync Docs to Obsidian
6a. Read docs/PROJECT_OVERVIEW.md, write full content to
    {PROJECT_PATH}/PROJECT_OVERVIEW-mirror.md — always overwrite, never append.
    Prepend: "# Project Overview Mirror — {PROJECT_NAME}\n> Mirrored {TODAY}\n---\n"

6b. If CLAUDE.md was updated in Step 4: read CLAUDE.md, write full content to
    {PROJECT_PATH}/CLAUDE-mirror.md — always overwrite.
    Prepend: "# CLAUDE.md Mirror — {PROJECT_NAME}\n> Mirrored {TODAY}\n---\n"
    Skip this sub-step if CLAUDE.md was not changed.

---

## Step 7 — Log to Obsidian

### 7a. Project Journal (full detail)
Check if {JOURNAL_PATH}/{TODAY}.md exists via obsidian_get_file_contents.
If not: create with heading "# Journal: {TODAY}\n\n---\n"
Append:
  ## {NOW} — {commit message title}
  **Type**: feat|fix|refactor|config|docs|chore
  **Commit**: `{COMMIT_HASH}`
  **Summary**: {one-line}
  **New files**: (omit if none)
  - `{filepath}` — {purpose}
  **Modified**:
  - `{filepath}` — {what changed and why}
  **ADRs**: (omit if none)
  - [[{ADR_REF}]] — {description}
  ---

### 7b. Global DevLog (cross-project, lightweight)
Check if {DEVLOG}/{TODAY}.md exists via obsidian_get_file_contents.
If not: create with heading "# DevLog — {TODAY}\n\n---\n"
Append a lightweight entry — no file lists, just enough for cross-project view:
  ## {NOW} — {PROJECT_NAME}: {commit message title}
  **Type**: feat|fix|refactor|config|docs|chore
  **Commit**: `{COMMIT_HASH}`
  **Summary**: {one-line}
  ---

---

## Step 7.5 — Update Sprint Task Status (if active sprint exists)

Read {SPRINT_ACTIVE} via obsidian_get_file_contents.
If not found or empty: skip this step.

### 7.5a — Extract open tasks

Parse all lines matching `- [ ]` or `- [~]` from the Sprint Backlog section.
For each task, extract the bold title text (e.g., `**A2a. Provision Azure AI Content Safety resource**`).

If no open tasks: skip this step.

### 7.5b — Match commit to sprint tasks

Compare the commit message, changed files, and journal entry against each open task.
Use fuzzy matching — a commit doesn't need to mention the task verbatim. Match on:
- Task title keywords appearing in the commit message
- File paths in the commit matching files mentioned in the task description
- Task ID patterns (e.g., A2a, B1b) appearing in the commit message
- Semantic overlap between what the commit does and what the task describes

### 7.5c — Propose status updates

If matches are found, show them to the user:

  Sprint task matches for this commit:
  - A2a. Provision Azure AI Content Safety resource → mark [x] done?
  - [~] B1a. Application Insights Setup → no change (partial progress)

For each match, suggest one of:
- `[ ]` → `[x]` — if the commit fully completes the task
- `[ ]` → `[~]` — if the commit makes progress but doesn't complete it
- No change — if the match is weak or the task clearly has remaining work

Wait for user confirmation. They may:
- Accept all suggestions
- Accept some and reject others
- Skip entirely ("don't update sprint")

### 7.5d — Apply updates

For confirmed changes:
- Read the full SPRINT-ACTIVE.md content
- Replace the matched task line(s) with updated checkbox status
- Append ` ✅ {TODAY}` to any task marked [x]
- Write the updated content back to {SPRINT_ACTIVE}

Do NOT use obsidian_patch_content for this — read the full file, modify in memory,
then overwrite via obsidian_delete_file + obsidian_append_content (the patch tool
is unreliable with special characters in sprint files).

### 7.5e — Note in summary

If any sprint tasks were updated, include in the Step 8 summary:
  Sprint: {task title} → [x] done

### Rules for this step
- Never auto-update without showing the user first — always propose and wait
- A single commit can match multiple tasks (e.g., a large feature commit)
- A single task can span multiple commits — only suggest [x] when fully done
- If the user says "skip", respect that and move on
- Unplanned work (commits that match no task) is fine — just skip silently
- If the sprint file has formatting issues, log a warning but don't crash

---

## Step 7.9 — Project Deploy / Compliance Tail (OPTIONAL)

The only project-specific part of /ship. Everything above is the universal spine and runs
identically in every repo.

```bash
cat ./.claude/ship-deploy.md 2>/dev/null || echo "NO_TAIL"
```
- If **NO_TAIL**: this repo has no deploy or compliance tail — ship is complete, skip to
  Step 8. This is the normal case for plain repos (no deploy target, no PHI).
- If a tail file is found: follow it now. Honor any `@import`ed compliance docs as hard
  constraints, run any compliance gate BEFORE deploying, and STOP if a gate fails.
- Never invent deploy or compliance steps that are not written in the tail file. Absence of
  a step means "do nothing," not "guess."

Record the outcome (deployed target / compliance gate result, or "spine only") for Step 8.

---

## Step 8 — Final Summary
```
✅ Shipped — {PROJECT_NAME}
Commits: {COMMIT_HASH} {message} (+ docs commits if any)
New files: {list or "none"}
PROJECT_OVERVIEW: {updated / no changes}
CLAUDE.md: {updated / no changes}
Obsidian: Journal ✅ · DevLog ✅ · Mirrors ✅ · ADR {✅ / skipped}
Sprint: {task updated → [x] / no matches / no active sprint}
Deploy tail: {deployed {target} / compliance gate passed / spine only — no tail}
```
