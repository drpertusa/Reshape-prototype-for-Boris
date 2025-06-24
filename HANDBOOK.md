# Reshape Clinic · Developer Handbook (v1.1 – Continuation)  
_Last updated 24 Jun 2025_

> **Why this single file?**  
> *Anyone* (even with no web‑dev background) can open it, see the project’s exact state, and know the next task to work on—without rebuilding or guessing.

---

## 1 · Where We Stand :contentReference[oaicite:0]{index=0}

| Item                        | Value / Link |
| --------------------------- | ------------ |
| **Live site**               | https://playground-lkfok1zxc-alberto-e69d8928.vercel.app |
| **Framework versions**      | Next.js 15.3.3 · Tailwind 4.1.x · shadcn/ui (11 components) |
| **Latest completed tasks**  | Single CTA, nav text update, promo‑banner auto‑dismiss, EMFace dropdown (content OK) |
| **Open issue**              | **Left‑align EMFace dropdown** (currently centred) |
| **Admin area**              | Skeleton ready; login works but no users yet :contentReference[oaicite:1]{index=1} |

---

## 2 · Immediate Priority – Fix EMFace Dropdown Alignment :contentReference[oaicite:2]{index=2}

**Problem**  
The EMFace dropdown is centred. We want it to start directly under the “EMFace” nav label on desktop (≥ 768 px) without breaking EMSculpt Neo’s dropdown.

**Proposed fix (high‑level)**  
1. Edit `components/ui/navigation-menu.tsx`.  
2. Add `md:justify-start` to the `NavigationMenuViewport` wrapper so the whole viewport, not just the content, aligns left:  
   ```tsx
   <NavigationMenuViewport
     className={cn(viewportClassName, "md:justify-start")}
   />

---

## 9 · Development Workflow

**Important**: Always show the deployment URL after making changes so the user can check the live updates.

---

## 10 · Deployment Environment Variables

**Critical for deployment**: The following environment variables must be set in Vercel to prevent MIDDLEWARE_INVOCATION_FAILED errors:

| Variable                    | Purpose | Example Value |
| --------------------------- | ------- | ------------- |
| `NEXT_PUBLIC_SUPABASE_URL`  | Supabase project URL | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `your-anon-key-here` |
| `NEXT_PUBLIC_BASE_URL`      | Application base URL | `https://playground-[hash].vercel.app` |

**How to add**: Use `vercel env add VARIABLE_NAME production` for each variable.

**Note**: These variables are now configured for the current deployment. If you see MIDDLEWARE_INVOCATION_FAILED errors, check that these environment variables are properly set in your Vercel project settings.
