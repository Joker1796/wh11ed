# Contributing

Thanks for helping. This page is how a change travels from your branch to wh-rules.ru. What the
code expects of you (bilingual data, gates, UI conventions) is in [`CLAUDE.md`](./CLAUDE.md) and
the scoped `CLAUDE.md` files it lists. Read the one for the directory you touch.

## Branches

| Branch | What it is | Who writes to it |
|---|---|---|
| `main` | **What is live on wh-rules.ru.** The base for every new change. | Only a finished release lands here. Nobody commits to it directly. |
| `release/X.Y.Z` | The next release, being assembled. | Maintainers: they merge checked work into it and write the changelog entry. |
| `review/pr-N` | A maintainer's copy of your PR, where it is checked and finished. | Maintainers. |
| your branch (`feat/…`, `fix/…`) | Your work. | You. |

`main` changes once per release, not several times a day. Everyone, maintainers included, starts
from a `main` that matches production and does not move under them.

## Sending a change

1. Branch from the current `main`: `git switch -c feat/short-name origin/main`.
2. Before you push, run `npm run lint`, `npm test`, `npm run build`, plus the gates for what you
   touched (`npm run parity` for any rule text; the rest are in `src/data/CLAUDE.md` → Data gates).
3. Open a pull request **against `main`**. Describe what it does and how you checked it.
4. CI runs the same checks. On a first-time contributor's PR GitHub waits until a maintainer
   presses "Approve and run". If CI is not running yet, that is the reason.

A PR is **not merged with the GitHub button.** A maintainer merges your branch into
`review/pr-N`, fixes and polishes it there if needed, and merges that into the open
`release/X.Y.Z`. Your PR shows as **merged** once that release reaches `main`. GitHub closes it
by itself, because your commits are now in `main`. Until then it stays open. That is expected.

If `main` moves while your PR is open (a release went out), merge or rebase it onto the new
`main` yourself and resolve the conflicts on your side. Then push again.

## Releasing (maintainers)

1. **Cut** the release branch from `main` when the first change for it is ready:
   `git switch -c release/X.Y.Z main`, where `X.Y.Z` is the next patch after `package.json`'s
   version (or the minor/major the release deserves).
2. **Collect.** Each change is first a branch of its own (`feat/…`, `fix/…`, `review/pr-N`), checked
   there and merged into the release with `git merge --no-ff`. A contributor's PR goes into
   `review/pr-N` by **merge** (`git fetch origin pull/N/head:refs/pr/N`, then `git merge
   refs/pr/N`), never by cherry-pick. A cherry-pick makes new commits, so GitHub would never see
   the PR as merged.
3. **Changelog.** The entry for `X.Y.Z` goes into `src/data/changelog.js` on the release branch.
4. **Deploy** from the release branch with a clean tree (`npm run deploy`, see
   [`DEPLOY.md`](./DEPLOY.md)). `deploy.sh` refuses any other branch when it bumps the version. It
   also refuses when the bump would not produce the version the branch is named after. After a
   successful deploy it commits the bump, pushes the release branch, fast-forwards `main` to it and
   pushes `main`.
5. **Clean up.** Delete the merged `release/…` and `review/…` branches. Everything still in flight
   rebases or merges onto the new `main`.

**Urgent fix in production.** Same path, shorter: `release/X.Y.(Z+1)` from `main`, the fix, deploy.
If a release branch is already open, merge `main` into it afterwards so it carries the fix too.

Only `wh11ed` works this way. `wh11ed-api` and the data repositories keep their own flow.
