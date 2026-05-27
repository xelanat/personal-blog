---
title: "Aliases in my .gitconfig"
date: 2026-05-26
tags:
  - posts
  - git
  - tooling
  - config
excerpt: "Intuitive shortcuts."
layout: post.njk
---

Aliases I've accumulated in my `.gitconfig` over the years, mostly as a byproduct of repetition.

# Aliases

Full list of aliases, with breakdowns below.

```ini
[alias]
  st  = status
  co  = checkout
  br  = branch --sort=-committerdate
  lg  = log --oneline
  po = pull origin
  pom = pull origin main
  caan = ! git add . && git commit -a --amend --no-edit
  rpom = ! git co main && git refresh && git pom
  refresh = ! git fetch --all && git remote prune origin
  amnesia=update-index --assume-unchanged
  recall=update-index --no-assume-unchanged
  forgetfulness=! git ls-files -v | grep ^[a-z]
```

## Speed & Brevity

Make commands feel like hot keys.

```ini
[alias]
  st  = status
  co  = checkout
  br  = branch --sort=-committerdate
  lg  = log --oneline
  po = pull origin
  pom = pull origin main
```

### `git st` → `git status`

The full status output. It’s my default “what changed?” command.

### `git co` → `git checkout`

I'm aware that `git switch` and `git restore` are preferred, but I have yet to consistently adopt these due to my muscle memory for this shortcut.

Ways I use it:

- `git co main` to switch branches.
- `git co -b feat/new-post` to create and switch.
- `git co <commit-sha>` when I need to inspect old state.

### `git br` → `git branch --sort=-committerdate`

Shows recently active branches first instead of alphabetical order.

Ways I use it:

- `git br` to scan active branches.
- `git br -a` to include remote branches.

### `git lg` → `git log --oneline`

Quick commit history, minimal noise.

Ways I use it:

- `git lg` for recent commits (but ).
- `git lg -n 100` for a deeper look.
- `git lg --author="<author>"` to filter by author.

### `git po` → `git pull origin`

Shortcut for pulling from `origin` without retyping the remote name.

Ways I use it:

- `git po <branch>` to pull a specific remote branch.

### `git pom` → `git pull origin main`

One command to sync the current branch with `origin/main`.

## Composites

These are my bread and butter.

```ini
[alias]
  caan = ! git add . && git commit -a --amend --no-edit
  rpom = ! git co main && git refresh && git pom
  refresh = ! git fetch --all && git remote prune origin
```

### `git caan` → `git add . && git commit -a --amend --no-edit`

Woah, you can do that? Yes, you `caan`!

Amends the latest commit with current changes, keeping the same message. In practice, this feels like right-click + save.

Reasons to use it:

- During local cleanup of commits before pushing. Get rid of those bad-habit commits with just `"fix"`, `"wip"`, or `"changes"` in the message.
- To keep commit history clean after addressing suggestions in PR review.
- You might pay less attention to this if you're squashing, but there are valid reasons to merge a PR while preserving a more detailed commit history. Example:
    - commit1: `refactor: move utility function to shared folder for reusability`
    - commit2: `feat: implement new component that relies on that utility function`.

**Note**: Amending rewrites commit history. Force pushes will be needed if the commit is already shared, so be cognizant of the potential risks.

### `git refresh` → `git fetch --all && git remote prune origin`

I do this frequently to ensure that my local branches are up to date with remote, and that I'm not harboring any stale remote branches.

### `git rpom` → `git co main && git refresh && git pom`

_Note: This includes a nested call to `git refresh` and `git pom`._

I pronounce this "arr palm". My “reset context” command: switch to `main`, refresh remotes, then pull latest `main`. I use this primarily before starting a new branch off of main, or when completing Task A and starting Task B.


## Amnesia Toolkit

These commands were handed down to me from a former manager. They're rarely used but very useful.

```ini
[alias]
  amnesia=update-index --assume-unchanged
  recall=update-index --no-assume-unchanged
  forgetfulness=! git ls-files -v | grep ^[a-z]
```

### `git amnesia` → `git update-index --assume-unchanged`

Tells Git to temporarily ignore local edits to a tracked file.

If you're not yet sure of whether to stash or commit, use `git amnesia <filepath>` for local-only tweaks.

### `git recall` → `git update-index --no-assume-unchanged`

Reverses `amnesia` so Git tracks changes to that file again.

### `git forgetfulness` → `git ls-files -v | grep ^[a-z]`

Lists files currently marked with `assume-unchanged` (the ones Git is “forgetting”).
