# AGENTS.md

The instructions for every AI agent working here (Codex, Claude Code or any other) live in
`CLAUDE.md` files — the name is historical, the content is not Claude-specific.

- Before a change, inspect the headings of [`CLAUDE.md`](CLAUDE.md), read its introductory
  invariants and the sections relevant to the task. Do not load the whole reference by default.
- Before editing a file, also inspect every `CLAUDE.md` on the path from here to its folder
  (e.g. `src/components/CLAUDE.md`, then `src/components/tracker/CLAUDE.md`). List them with
  `find . -name CLAUDE.md -not -path './node_modules/*'`. The large ones (`roster/`, `tracker/`)
  are read by their headings (`grep -n '^#'`) and the relevant sections, not whole.
- Skills (repeatable procedures) are in `.claude/skills/<name>/SKILL.md`: when a task matches one,
  read it and follow the steps.
