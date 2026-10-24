# HabitFlow

An original, mobile-first, offline-first habit-tracking Progressive Web App. React + TypeScript + Vite + Dexie/IndexedDB.

## Features
- Create/edit/archive/restore/delete binary and numerical habits; choose days, colors and icons.
- Daily check-ins, partial progress, notes, history calendar, current and longest streaks, 14-day analytics.
- Local-first persistence, JSON export/import, dark mode, standalone installable PWA with offline app shell.
- No account required. Your data stays in this browser/device unless you export it.

## Local development
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Production check: `npm run build` and `npm run preview`.

## Deploy to Vercel
1. Unzip, create a GitHub repository, and push all files (not the enclosing ZIP).
2. Vercel → Add New → Project → import the GitHub repository.
3. Framework preset: **Vite**. Build command: `npm run build`; output directory: `dist` (Vercel normally detects these).
4. Deploy. Open the HTTPS URL on your phone in Chrome → menu → **Install app** or **Add to Home screen**. iOS Safari → Share → Add to Home Screen.

No environment variables or backend needed. `vercel.json` handles SPA route fallback.

## Important behavior
- A daily target must be met to count as a completed day; partial progress is still stored.
- Streaks ignore unscheduled days. An unfinished current day doesn't immediately break a streak.
- Numerical progress uses +/- 1 and a complete/undo button. You can edit historical progress in History.
- Habits are scheduled from their creation date forward. Archived habits retain their history but are omitted from active dashboard and analytics.
- Back up via Settings → Export backup before clearing browser data or changing devices. **Vercel hosts the code, not your personal data.** There is no cloud sync or push reminder in v1.
- Offline use requires one successful online visit to install/cache the application. Google Fonts are optional; system fonts are fallback.

## Structure
- `src/App.tsx`: UI and app actions.
- `src/db.ts`: IndexedDB schema, dates, progress and streak rules.
- `src/style.css`: responsive design and themes.
- `vite.config.ts`: PWA manifest/service worker.
- `public/`: app icons.

## Disclaimer
HabitFlow is an independently developed habit tracker, not affiliated with TickOff or its developer.
