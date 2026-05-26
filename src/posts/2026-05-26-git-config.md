---
title: "Aliases in my .gitconfig"
date: 2026-05-26
tags:
  - git
  - tooling
  - config
excerpt: "A tour of the aliases that ."
layout: post.njk
---

Aliases I've accumulated in my `.gitconfig` over the years, mostly as a byproduct of repetition.

# Aliases

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

## Speed / Brevity

```ini
[alias]
  st  = status
  co  = checkout
  br  = branch --sort=-committerdate
  lg  = log --oneline
  po = pull origin
  pom = pull origin main
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

- `git lg` for recent commits (but ).
- `git lg -n 100` for a deeper look.
- `git lg --author="<author>"` to filter by author.

### `po` → `git pull origin`

Shortcut for pulling from `origin` without retyping the remote name.

Ways I use it:

- `git po <branch>` to pull a specific remote branch.

### `pom` → `git pull origin main`

One command to sync the current branch with `origin/main`.

## Composites

```ini
[alias]
  caan = ! git add . && git commit -a --amend --no-edit
  rpom = ! git co main && git refresh && git pull origin main
  refresh = ! git fetch --all && git remote prune origin
```

### `caan` → `git add . && git commit -a --amend --no-edit`

Amends the latest commit with current changes, keeping the same message. In practice, this feels like right-click + save.

Ways I use it:

- `git caan` during local cleanup before pushing.
- `git caan` right after addressing a suggestion in a Github PR review.

**Important**: amending rewrites commit history. Avoid it after the commit is shared.

### `refresh` → `git fetch --all && git remote prune origin`

I do this frequently to ensure that my local branches are up to date with remote, and that I'm not harboring any stale remote branches.

### `rpom` → `git co main && git refresh && git pull origin main`

I pronounce this "arr palm". My “reset context” command: switch to `main`, refresh remotes, then pull latest `main`. I use this primarily before starting a new branch off of main, or when completing Task A and starting Task B.

## Amnesia Toolkit

```ini
[alias]
  amnesia=update-index --assume-unchanged
  recall=update-index --no-assume-unchanged
  forgetfulness=! git ls-files -v | grep ^[a-z]
```

These commands were handed down to me from a former manager.

### `amnesia` → `git update-index --assume-unchanged`

Tells Git to temporarily ignore local edits to a tracked file.

If you're not yet sure of whether to stash or commit, use `git amnesia <filepath>` for local-only tweaks.

### `recall` → `git update-index --no-assume-unchanged`

Reverses `amnesia` so Git tracks changes to that file again.

### `forgetfulness` → `git ls-files -v | grep ^[a-z]`

Lists files currently marked with `assume-unchanged` (the ones Git is “forgetting”).
