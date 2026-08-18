AGENTS.md — Repository working agreement

Codex and Claude may both work on this repository. Git history and repository documentation are the durable shared context; preserve each other's work and leave the repository understandable for the next agent.

Owner

Eric Bernon (ebernon). Physician, self-taught builder, not a developer. Give him exact commands to paste, one step at a time, no assumed jargon. Explain what a thing does before asking him to run it.

Direct-to-production authorization

Work directly on `main` by default. A requested code change authorizes Codex or Claude to commit, push to `main`, and deploy the live app without a separate merge or deploy confirmation. Do not create a branch or pull request unless Eric explicitly asks for one or branch protection requires it. A push to `main` that auto-deploys production is authorized, so sync with the remote first, preserve concurrent work, run the complete relevant validation, inspect the final diff, and verify the live deployment afterward. This section supersedes the previous branch-only / never-merge / never-deploy rule.

Hard rules

Keep each commit focused on one concern so changes remain easy to understand and revert.
Never invent data. No fabricated rows, dates, prices, citations, API methods, or library functions. If you can't verify it, label it unverified or leave it out. Eric's standing rule: a held item is a success; a confident error is a failure.
Don't hand-edit machine-owned data. Claude runs scheduled automation that owns and overwrites generated data blocks, event and listing arrays, and generated archives. Hand-edits there get clobbered or collide mid-run. If a file looks machine-generated, change the generator, not the output.
Pull before editing and re-check `origin/main` before pushing. Claude's automation or another agent may commit unattended, so even a recent checkout can be stale.
If Claude or Codex was mid-task, inspect its commits, branch/PR if one exists, and HANDOFF notes before continuing. Continue directly when the requested intent and safe next action are clear; ask Eric only when proceeding would require guessing or overwriting unmerged work.
Eric's local copy may be newer than the repo. For any repo he also works on from his own machine, if a file looks older than a change he describes, ask before overwriting.
Handoff protocol (both directions)

Record what was done, what remains, and anything failing in the commit message, relevant issue/PR, or a repository handoff note. No archaeology required by the next agent.

Per-repo notes

- Default branch: `main`.
- Build: `npm run build` (`vite build`); local development: `npm run dev`.
- The checked-in deployment scripts deploy to Vercel, and `deploy-update.bat` states that pushing to GitHub triggers its Vercel deployment.
