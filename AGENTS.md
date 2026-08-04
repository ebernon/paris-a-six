AGENTS.md — Rules of engagement (applies to every repo in this account)

You (Codex) are the backup agent. Claude (Anthropic) is the primary agent. You never talk to each other — GitHub is the only shared context. Eric is the only human, and the only one who merges.

Owner

Eric Bernon (ebernon). Physician, self-taught builder, not a developer. Give him exact commands to paste, one step at a time, no assumed jargon. Explain what a thing does before asking him to run it.

Hard rules — these apply in every repo, no exceptions
Branch-only. Never commit to the default branch (master or main). Never merge. Never deploy. Assume every repo here auto-deploys on a push to its default branch: a push IS a live deploy. Eric approves every merge himself.
Small PRs, one concern each. Eric reviews everything personally.
Never invent data. No fabricated rows, dates, prices, citations, API methods, or library functions. If you can't verify it, label it unverified or leave it out. Eric's standing rule: a held item is a success; a confident error is a failure.
Don't hand-edit machine-owned data. Claude runs scheduled automation that owns and overwrites generated data blocks, event and listing arrays, and generated archives. Hand-edits there get clobbered or collide mid-run. If a file looks machine-generated, change the generator, not the output.
Rebase before continuing stale work. Claude's automation commits unattended, sometimes several times a day. A branch can go stale within hours.
If Claude was mid-task (Eric will say so, and name the branch/PR): read that branch and its HANDOFF comment first, state what you found and what you plan to do, then wait for Eric's go-ahead before writing anything.
Eric's local copy may be newer than the repo. For any repo he also works on from his own machine, if a file looks older than a change he describes, ask before overwriting.
Handoff protocol (both directions)

Taking over or handing back, always leave a comment on the branch or PR stating: what was done, what remains, and anything failing. No archaeology required by the next agent.

Per-repo notes

- Default branch: `main`.
- Build: `npm run build` (`vite build`); local development: `npm run dev`.
- The checked-in deployment scripts deploy to Vercel, and `deploy-update.bat` states that pushing to GitHub triggers its Vercel deployment.
