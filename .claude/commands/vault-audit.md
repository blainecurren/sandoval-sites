# Vault Audit

Scan the project's Obsidian folder for files outside the managed workflow system.
Classify each as stale (delete), migrate (move content into a managed doc), or keep.

## Step 0 — Load Config
```bash
cat ~/.claude/obsidian-config.md 2>/dev/null || echo "NOT_FOUND"
```
If NOT_FOUND: run /project-init first, then stop.
Parse: OWNER, PROJECTS, SPRINTS, DEVLOG, ADR, `vault_path`
Set: PROJECT_NAME, PROJECT_PATH, JOURNAL_PATH, TODAY, NOW

---

## Step 0.5 — Vault Access (filesystem, not MCP)

No Obsidian MCP server is configured and none is needed. Resolve every vault-relative path
as `{vault_path}/{path}` and substitute filesystem operations for the `obsidian_*` tools
named below:

| Step text says | Actually do |
|---|---|
| `obsidian_list_files_in_dir` | `find` / `ls` on the absolute path |
| `obsidian_get_file_contents` | Read the absolute path |
| `obsidian_append_content` | Read + append + Write |
| `obsidian_delete_file` | `rm` the absolute path — **only after** the Step 4 report is shown and the user confirms that specific file |

⚠️ This command deletes files. Switching to filesystem access removes Obsidian's own
trash/undo safety net — a `rm` here is immediate and permanent, where `obsidian_delete_file`
routes to `.trash`. **Move approved deletions to `{vault_path}/.trash/` instead of `rm`**, so
the existing recovery path is preserved. Never delete without the confirmed report.

Obsidian does not need to be running. Write LF line endings.

---

## Step 1 — Define the Managed File Registry

These files and folders are managed by workflow commands. They are NEVER flagged:

| Path | Managed By |
|---|---|
| {PROJECT_PATH}/Journal/ | /ship |
| {PROJECT_PATH}/ADR/ | /ship |
| {PROJECT_PATH}/Breakdown/ | /breakdown |
| {PROJECT_PATH}/Sprints/ | /sprint-start, /sprint-close |
| {PROJECT_PATH}/CHANGELOG-mirror.md | /ship |
| {PROJECT_PATH}/PROJECT_OVERVIEW-mirror.md | /ship |
| {PROJECT_PATH}/CLAUDE-mirror.md | /ship |
| {PROJECT_PATH}/README.md | /project-init |

Any file or folder NOT in this list is an unmanaged file and must be audited.

---

## Step 2 — Discover All Files

Use obsidian_list_files_in_dir recursively on {PROJECT_PATH}.
Build a complete file tree. For each file, mark it as:
- managed — matches a path in the registry above
- unmanaged — everything else

If no unmanaged files exist: report "Vault is clean — all files are managed." and stop.

---

## Step 3 — Read and Classify Each Unmanaged File

For each unmanaged file, read its contents via obsidian_get_file_contents.
Classify into exactly one of these categories:

### Category A — STALE (recommend delete)

Criteria (any of):
- Content is fully superseded by a managed file (e.g., old code inventory
  replaced by Breakdown/, old mirrors replaced by *-mirror.md)
- One-off task list where all items are [x] completed
- Historical planning notes with no open action items
- Empty or near-empty files (< 3 lines of meaningful content)
- Brainstorm/scratch notes older than 30 days with no forward references

### Category B — MIGRATE (content has value, move to managed location)

Criteria (any of):
- Contains open tasks ([ ] items) → migrate to SPRINT-ACTIVE.md or suggest
  for next /sprint-start backlog
- Contains active roadmap with future dates → keep as standalone doc at
  project root (not buried in a subfolder)
- Contains architectural decisions not captured in ADR/ → create ADR
- Contains operational runbooks or checklists → suggest adding to repo docs/
- Contains meeting notes or interview insights with actionable items →
  extract actions to sprint backlog, archive the rest to Journal

### Category C — KEEP (has ongoing value, not managed by commands)

Criteria (any of):
- Active planning doc with future-dated items and no managed equivalent
- Reference material actively linked from other Obsidian notes
- Stakeholder-facing content (interview guides, presentation notes)

For each file, record: path, category (A/B/C), reason, and migration target
(for category B files).

---

## Step 4 — Present the Audit Report

Show this format:

```
╔══════════════════════════════════════════════════════════════╗
║  Vault Audit — {PROJECT_NAME}
║  {TODAY} · {count} managed files · {count} unmanaged files
╠══════════════════════════════════════════════════════════════╣
║
║  MANAGED (no action needed)
║
║  {folder}/    ✅ {description} — managed by {command}
║  ...
║
╠══════════════════════════════════════════════════════════════╣
║
║  🗑️  STALE — recommend delete
║
║  {filepath}   {reason}
║  ...
║
╠══════════════════════════════════════════════════════════════╣
║
║  📦 MIGRATE — content has value, needs new home
║
║  {filepath}
║    → {migration target} — {what to extract/move}
║  ...
║
╠══════════════════════════════════════════════════════════════╣
║
║  ✅ KEEP — unmanaged but has ongoing value
║
║  {filepath}   {reason}
║  ...
║
╚══════════════════════════════════════════════════════════════╝
```

Wait for user confirmation before proceeding.

---

## Step 5 — Execute Approved Actions

After user confirms (they may override individual items):

**For each STALE file approved for deletion:**
- Delete via obsidian_delete_file

**For each MIGRATE file:**

Open tasks → Sprint backlog:
- Read the file, extract all - [ ] items
- Read {SPRINT_ACTIVE} via obsidian_get_file_contents
- If active sprint exists: ask user "Add {N} tasks to current sprint backlog,
  or hold for next /sprint-start?"
- If no active sprint: write tasks to a temporary
  {PROJECT_PATH}/backlog-import.md for /sprint-start to pick up
- Delete or archive the source file after extraction

Active roadmap → Project root:
- Move file to {PROJECT_PATH}/{filename} (top level, not in a subfolder)
- Add a note: "> Moved from {old path} during vault audit on {TODAY}"

Architectural decisions → ADR:
- Use obsidian_list_files_in_dir on {PROJECT_PATH}/ADR to get next number
- Create {PROJECT_PATH}/ADR/ADR-{NNN}-{slug}.md with standard template
- Extract the decision content from the source file into the ADR
- Update ADR/Index.md
- Delete the source file

Operational content → Repo docs suggestion:
- Do NOT write to the repo filesystem from this command
- Instead, output: "Suggested repo addition: docs/{filename} — run
  /ship after creating it to sync the mirror"
- Keep the Obsidian file as-is until the user acts on the suggestion

**For empty folders after cleanup:**
- Note them in the report (Obsidian auto-removes empty dirs)

---

## Step 6 — Log to Obsidian

### 6a. Project Journal
Append to {JOURNAL_PATH}/{TODAY}.md:
  ## {NOW} — /vault-audit
  **Type**: maintenance
  **Summary**: Vault audit — {deleted} files deleted, {migrated} migrated, {kept} kept
  **Deleted**: {list or "none"}
  **Migrated**: {list with targets or "none"}
  **Kept**: {list or "none"}

### 6b. Global DevLog
Append to {DEVLOG}/{TODAY}.md:
  ## {NOW} — {PROJECT_NAME}: /vault-audit
  **Type**: maintenance
  **Summary**: Cleaned {deleted} stale files, migrated {migrated} to managed locations

---

## Step 7 — Final Summary

```
Vault Audit Complete — {PROJECT_NAME}

Before: {total} files ({managed} managed, {unmanaged} unmanaged)
After:  {total} files ({managed} managed, {kept} unmanaged kept)

Deleted:  {count} stale files
Migrated: {count} files → {targets}
Kept:     {count} unmanaged files (with ongoing value)

Vault health: {✅ Clean / ⚠️ {N} unmanaged files remain}
```

---

## Rules
- Never touch managed files. This command only audits unmanaged files.
- Never delete without showing the audit report first. Always wait for
  user confirmation on the full list before executing any changes.
- Users can override any classification. If they say "keep" on a STALE
  file or "delete" on a KEEP file, respect that.
- Migration extracts, then deletes. Never leave duplicate content in
  both the old and new locations.
- When in doubt, classify as KEEP. It's better to surface a file for
  the user to decide than to silently delete something valuable.
- Date-awareness matters. A file with [ ] items dated 3 months ago
  is stale. A file with [ ] items dated next month is active.
- Check for backlinks. Before classifying as STALE, search for
  [[filename]] references in other vault files. If referenced, flag as
  KEEP with note: "Referenced by {other file}."
- This command is idempotent. Running it twice with no changes between
  runs should produce "Vault is clean" on the second run.
