# Changelog

Manage CHANGELOG.md. Modes: view (default), generate, retroactive, update, entry.

## Step 0 — Load Config
```bash
cat ~/.claude/obsidian-config.md 2>/dev/null || echo "NOT_FOUND"
```
Parse: PROJECTS, DEVLOG, SPRINTS, OWNER, `vault_path`.
Set: PROJECT_NAME, PROJECT_PATH, JOURNAL_PATH, TODAY.

**Vault access is filesystem, not MCP.** No Obsidian MCP server is configured and none is
needed. Resolve vault-relative paths as `{vault_path}/{path}` and use ordinary file tools.
The mirror write at the end is a plain overwrite. Obsidian does not need to be running.
Write LF line endings.

## Step 1 — Identify Mode
- /changelog → view
- /changelog generate → generate from sprints + git + journal
- /changelog retroactive → archaeological reconstruction
- /changelog update → add entry for work since last entry
- /changelog entry {text} → manually add one entry

## Step 2 — Check State
```bash
cat CHANGELOG.md 2>/dev/null || echo "NOT_FOUND"
git log --oneline --format="%h %ad %s" --date=short 2>/dev/null | head -20
basename $(pwd)
```
Also read any closed sprint files from {SPRINTS} and recent Journal entries.

## MODE: view
Display CHANGELOG.md. If missing: "Run /changelog generate to build one."

## MODE: generate
Priority order: closed sprint files > journal entries > git commits.
Sprint files: read all Sprint-{N}-*-closed.md, extract shipped/carried items.
Journal entries: read all {JOURNAL_PATH}/*.md, extract commit summaries.
Git: fill gaps where no sprint or journal coverage exists.
Write CHANGELOG.md with sprint-based entries (or date-based for gaps), newest first.
Auto-escalate to retroactive if no sprint files and no journal entries found.

## MODE: retroactive
For projects with no structured history. Run full git archaeology:
```bash
git log --no-merges --format="%H|%ad|%s" --date=short
git log --no-merges --diff-filter=A --name-only --format="==%ad==" --date=short
git log --all --oneline --decorate | head -50
git tag --sort=-creatordate
```
Also read any source files to infer feature boundaries.
Group commits into milestones. Label all entries [from git], [inferred], or [reconstructed].
Write retroactive CHANGELOG.md with header noting reconstruction.

## MODE: update
Get last changelog entry date. Get commits since then + any new [x] sprint items.
Prepend new entry above first existing entry.

## MODE: entry {text}
Map verb to section: Shipped/Added/Built → Shipped, Fixed/Resolved → Fixed,
Refactored/Improved → Improved, Removed/Deprecated → Removed.
Prepend single entry for today.

## After any write: mirror to Obsidian
Write full CHANGELOG.md to {PROJECT_PATH}/CHANGELOG-mirror.md (overwrite).
Append to {DEVLOG}/{TODAY}.md:
  ## {NOW} - Changelog {mode}: {PROJECT_NAME}
  **Type**: docs
  **Summary**: {what was added or generated}

## Rules
- Newest entries always at top. Never append to bottom.
- Sprint files and Journal are authoritative over raw git.
- Be specific — commit-level detail, not vague summaries.
- Retroactive confidence labeling is mandatory.
- CHANGELOG.md in repo root is always source of truth.
