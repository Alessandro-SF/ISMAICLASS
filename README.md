# UFC Fight Tracker

A modern, responsive UFC statistics dashboard built for an AI in Business course. Use it to browse recent results,
upcoming fight cards, fighter profiles and head-to-head comparisons. All of it is built on **real, verified data**
from the UFC's official statistics provider.

## Features

- **Dashboard**: next-event hero with countdown, quick stats for the last two months (finish rate, KO/TKOs,
  submissions, significant strikes, takedowns), method-of-victory and finishes-per-event charts, upcoming and recent
  events, and featured headliners.
- **Upcoming events**: every scheduled event in the next two months with date, venue, main and co-main events, the
  full card (weight classes, records, photos) and a days-remaining countdown.
- **Results**: winner and loser, method, round and time, plus knockdowns, significant strikes, takedowns and submission
  attempts for every bout. You can filter by method, weight class or fighter.
- **Event pages**: the full card for each event, with per-event totals.
- **Fighter profiles**: nickname, country of birth, weight class, W-L-D record, age, height, reach, stance, strikes
  landed/absorbed per minute, striking accuracy and defense, takedown average, accuracy and defense, submission
  average, a skill radar chart, the most recent fight and any upcoming fight.
- **Fighter comparison**: pick any two profiled fighters to compare records, physical attributes, striking, grappling
  and recent form, with side-by-side bars and an overlaid radar chart. The URL can be shared, e.g.
  `/compare?a=islam-makhachev&b=ian-machado-garry`.
- **Dynamic date window**: the app shows events from two months before to two months after *today*. Add
  `?today=YYYY-MM-DD` to preview another reference date (e.g. `?today=2026-10-08`).

## Data

| Source | Used for |
| --- | --- |
| [ufcstats.com](http://ufcstats.com) (official UFC stats) | Results, per-fight stats, upcoming cards, fighter career stats |
| [ufc.com](https://www.ufc.com/athletes) athlete pages | Nicknames, place of birth, fighter photos |
| [Wikipedia: 2026 in UFC](https://en.wikipedia.org/wiki/2026_in_UFC) | Venues, attendance, events not yet on ufcstats.com |

The snapshot was taken on **October 9, 2026** and covers events from Aug 8 to Dec 12, 2026: 9 completed events with
115 bouts, 9 scheduled events, and 68 full fighter profiles. Raw transcriptions live in `src/data/raw/`, and
`src/data/index.js` parses them. Nothing is generated. Fields a source doesn't provide are shown as **N/A**.
See the in-app **Data** page for the full list of limitations. The main one is that there is no free, official,
browser-accessible UFC API, so the app ships a dated snapshot rather than live data.

## Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · Recharts · React Router 6. It is deployed on Netlify (see `netlify.toml`).

## Development

```bash
npm install
npm run dev      # local dev server
npm test         # data integrity + date-window tests (node:test)
npm run build    # production build to dist/
```

## Deploying to Netlify

`netlify.toml` already sets the build command (`npm run build`), the publish directory (`dist`), Node 20, and an SPA
redirect so deep links like `/fighters/islam-makhachev` work.

1. In Netlify, choose **Add new site → Import an existing project → GitHub**, then select this repository.
2. Choose the **`main`** branch. Netlify reads the build settings from `netlify.toml`.
3. Click **Deploy**. Every push to `main` then redeploys automatically.

---

Independent educational project. Not affiliated with or endorsed by the UFC. Fighter photos © UFC.
