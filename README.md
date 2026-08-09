# 🎯 365 Goals Monorepo

> A mobile-first PWA for tracking yearly goals, pace, and milestones.

---

## 📁 Project Structure

```text
365-goals/
├── README.md                   ← Root overview + AI onboarding instructions
├── pnpm-workspace.yaml         ← Monorepo config
├── package.json
│
├── .context/                   ← 🧠 AI context & memory
│   ├── project.md              ← Project goals, tech stack, scope
│   ├── memory.md               ← Persistent AI memory (decisions, next steps)
│   └── snippets.md             ← Reusable patterns & code snippets
│
├── .design/                    ← 🎨 Design system
│   ├── DESIGN.md               ← Master guide
│   └── apple-design-skill.md   ← Apple-style fluid UI rules
│
├── apps/                       ← 📦 Applications
│   ├── web/                    ← React 18 + Vite PWA frontend
│   └── api/                    ← Hono + Vercel serverless functions API
│
└── packages/                   ← 📦 Shared packages
    └── shared/                 ← Zod schemas & shared calculation logic
```

---

## 🤖 Vibe Coding Workflow

**Start of every session** → AI reads:
1. `.context/project.md` — what is this project?
2. `.context/memory.md` — what did we do last time and what's next?
3. `.design/DESIGN.md` — what are the visual rules?

**End of every session** → AI updates:
1. `.context/memory.md` — log new decisions and blockers.
2. `.context/snippets.md` — add any new reusable patterns discovered.
