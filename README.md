# AI Context Handoff Kit

A dependency-free starter kit for turning a half-finished AI-assisted task into a clear, portable handoff. It is designed for teams that switch between coding agents, IDEs, and human reviewers.

## Why it exists

Most AI workflow failures are not model failures: the next person or tool does not know the real goal, current state, decisions already made, or how to verify the result. A compact handoff packet makes those facts explicit.

## What's included

- `context-packet.schema.json` — a portable JSON Schema for handoffs.
- `examples/context-packet.example.json` — a realistic filled-out packet.
- `templates/CONTEXT.md` — a human-readable companion template.
- `scripts/validate-context-packet.mjs` — a small validator with no packages to install.
- `test/validate-context-packet.test.mjs` — regression tests for the validator.

## Quick start

1. Copy `examples/context-packet.example.json` to your project.
2. Replace the example data with the actual task state.
3. Validate it:

```bash
node scripts/validate-context-packet.mjs examples/context-packet.example.json
```

4. Give the packet and relevant files to the next agent, teammate, or reviewer.

## Packet design

The packet intentionally separates:

- **Goal** — the outcome, not a list of keystrokes.
- **Current state** — what exists and what changed.
- **Decisions** — settled tradeoffs, so they are not re-litigated.
- **Verification** — commands or checks that prove completion.
- **Risks and blockers** — facts that may change the next action.

Use relative paths whenever possible and never put credentials, access tokens, or private customer data in a packet.

## Example service offer

This kit can be used as the basis of a fixed-scope **AI Workflow & Context Audit**:

- Map one real AI-assisted workflow.
- Identify context loss, duplicate work, and risky handoffs.
- Deliver a tailored packet template and validation checklist.
- Suggested fixed price: **US$150**, delivered within two business days.

The audit is intentionally concrete: the client receives usable workflow material, not a generic AI strategy document.

## License

MIT. See `LICENSE`.
