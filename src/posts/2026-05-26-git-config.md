---
title: ".gitconfig"
date: 2026-05-26
tags:
  - posts
  - git
  - tooling
  - config
excerpt: "A tour of the aliases that ."
layout: post.njk
---

I've been accumulating aliases in my `.gitconfig` for years. Most of these commands are the byproduct of repetition.

## Aliases

```ini
[alias]
  st  = status
  co  = checkout
  br  = branch --sort=-committerdate
  lg  = log --oneline
  po = pull origin
  pom = pull origin main
  caan = ! git add . && git commit -a --amend --no-edit
  rpom = ! git co main && git refresh && git pull origin main
  refresh = ! git fetch --all && git remote prune origin
  amnesia=update-index --assume-unchanged
  recall=update-index --no-assume-unchanged
  forgetfulness=! git ls-files -v | grep ^[a-z]
```

### `st` → `git status`

The full status output. It’s my default “what changed?” command.

### `co` → `git checkout`

Mostly muscle memory for branch switching.

Ways I use it:

- `git co main` to switch branches.
- `git co -b feat/new-post` to create and switch.
- `git co <commit-sha>` when I need to inspect old state.

### `br` → `git branch --sort=-committerdate`

Shows recently active branches first instead of alphabetical order.

Ways I use it:

- `git br` to scan active branches.
- `git br -a` to include remote branches.

### `lg` → `git log --oneline`

Quick commit history, minimal noise.

Ways I use it:

- `git lg` for recent commits.
- `git lg -n 100` for a deeper look.
- `git lg --author="<author>"` to filter by author.

### `po` → `git pull origin`

Shortcut for pulling from `origin` without retyping the remote name.

Ways I use it:

- `git po main` to pull `origin/main`.
- `git po <branch>` to pull a specific remote branch.

### `pom` → `git pull origin main`

One command to sync the current branch with `origin/main`.

### `caan` → `git add . && git commit -a --amend --no-edit`

Re-amends the latest commit with current changes, keeping the same message.

Ways I use it:

- `git caan` right after noticing a small omission.
- `git caan` during local cleanup before pushing.

Important: amending rewrites commit history. Avoid it after the commit is shared.

### `refresh` → `git fetch --all && git remote prune origin`

Refreshes remote refs and removes stale `origin/*` branches.

Ways I use it:

- `git refresh` before branch cleanup.
- `git refresh && git br -a` to see a clean remote branch list.

### `rpom` → `git co main && git refresh && git pull origin main`

My “reset context” command: switch to `main`, refresh remotes, then pull latest `main`.

Ways I use it:

- `git rpom` when I return to a repo after a few days.
- `git rpom` before branching for new work.

### `amnesia` → `git update-index --assume-unchanged`

Tells Git to temporarily ignore local edits to a tracked file.

Ways I use it:

- `git amnesia .env.local` for machine-specific config.
- `git amnesia path/to/file` for local-only tweaks.

### `recall` → `git update-index --no-assume-unchanged`

Reverses `amnesia` so Git tracks changes to that file again.

Ways I use it:

- `git recall .env.local` when I want the file visible to status/diff again.
- `git recall path/to/file` before intentional commits.

### `forgetfulness` → `git ls-files -v | grep ^[a-z]`

Lists files currently marked with `assume-unchanged` (the ones Git is “forgetting”).

Ways I use it:

- `git forgetfulness` to audit hidden files.
- `git forgetfulness | awk '{print $2}'` to get just the filenames.
