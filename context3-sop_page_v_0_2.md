# SOP v0.2 – One‑Page‑at‑a‑Time

*A living document: keep it short, tweak as we learn.*

---

## 1. Ground Rules

| Rule                                                                        | Why                    |
| --------------------------------------------------------------------------- | ---------------------- |
| **Stack is frozen** – Next 14, Tailwind 4, shadcn/ui, Supabase JS 2         | Stops version drift    |
| **One Git branch = one page**                                               | Easy rollback          |
| **Never invent a component** – use what’s already in `components/`          | Prevents build errors  |
| **Images local, **``**, max 1600 px**                                       | Performance & SEO      |
| **TypeScript **`` & `pnpm lint` must pass                                   | Catch bugs early       |
| **LLM MUST *****think hard***** & *****double‑check***** before finishing** | Reduces hallucinations |

---

## 2. Five‑Step Loop (do this for **each** page)

| #     | Actor               | Action                                                                                                                                                                                    | Output              |
| ----- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **1** | **You**             | Open a GitHub issue *“Build **`/slug`**”*. Add source URL, route, notes.                                                                                                                  | Issue text          |
| **2** | **LLM – Extractor** | Pull clean HTML/text/images from the source. **Think hard, then double‑check** the JSON.                                                                                                  | `content/slug.json` |
| **3** | **You**             | Quick skim: copy complete? alt‑text ok? Adjust if needed.                                                                                                                                 | Approved JSON       |
| **4** | **LLM – Coder**     | Generate `app/slug/page.tsx` only with existing components. Add `generateMetadata()`. Download images. **Before returning, think hard and double‑check the code compiles & meets rules.** | Pull Request        |
| **5** | **You or 2nd LLM**  | `pnpm lint && pnpm build`, view page, run Lighthouse. If all good → merge; else comment & retry.                                                                                          | Merged page         |

*Fail‑fast:* If a step fails, fix it **before** moving on.

---

## 3. Quick Review Checklist (Step 5)

1. Build passes `pnpm lint && pnpm build`.
2. No unknown components; prop names match.
3. SEO basics:
   - One `<h1>`
   - Title ≤ 60 chars, meta description ≤ 160
   - Local Open‑Graph image
4. Lighthouse: LCP < 2.5 s, CLS < 0.1
5. ≥ 300 words unique copy.

---

## 4. Prompt Snippets

### Extractor

```
You are Extractor. **Think hard** about structure, then scrape {URL}. Output JSON array:
[
  { "section": "hero", "html": "...", "img_urls": ["..."] },
  ...
]
Rules:
- Keep <h1‑6>, <p>, <ul>, <strong>. Strip inline styles & scripts.
- No paraphrasing.
- **Double‑check** the JSON is valid and complete before final answer.
```

### Coder

````
You are Coder. Input: content/slug.json. **Think step‑by‑step** about mapping to components, then output app/slug/page.tsx (Next 14, TSX).
Constraints:
- Use only components in /components.
- next/image with local images under public/slug/.
- Add export async function generateMetadata() with title, description, og tags.
- Tailwind: max 6 classes per element.
- **Double‑check**: code compiles, obeys rules.
Return ONLY the TSX inside ```tsx blocks.
````

---

## 5. How to Evolve This Doc

- When a pain‑point or confusion appears, jot it in the PR.
- After merge, update this SOP accordingly (v0.3, v0.4, …).

> **Keep it simple.** If this SOP no longer fits on one screen, we’re over‑engineering.

