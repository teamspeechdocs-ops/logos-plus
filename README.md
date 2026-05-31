# LOGOS+ — Debate Evidence Search

A Logos-style front-end that searches the **live** openCaselist index
(Apache Solr full-text, refreshed hourly) — so it covers current evidence,
not a frozen snapshot.

## How it works

```
browser  ──►  /api/search  ──►  Netlify function  ──►  api.opencaselist.com/v1/search
(token in header)               (adds caselist_token cookie, server-side)
```

A serverless proxy is required because the API doesn't send browser CORS
headers, and it keeps your token out of the public bundle. Your token lives
only in your browser tab (sessionStorage) and is sent per request.

## Confirmed API contract

- `GET /v1/search?q={query}&shard={shard}` — both **required**
- 200 → array of `{ id, shard, content, path }`
- error → `{ message }`

`shard` = event + 2-digit season start year. This build searches only the two
policy caselists — `hspolicy{yy}` (HS Policy) and `ndtceda{yy}` (College
Policy / NDT-CEDA). Only the **last five seasons** are offered, and the newest
one auto-rolls by date (a new season appears after ~July, so you never edit
code each year — and a not-yet-populated upcoming season never shows up as a
dead shard). You can select **at most three seasons** at a time. Pick events
with the checkboxes and seasons with the pills; the app builds shard names for
you.

### Being a good neighbor

opencaselist is a free, community-run server with its own rate limiters. This
client throttles itself: at most 3 requests in flight, a short gap between
launches, a debounce so a search can't re-fire mid-run, and hard caps (≤2
events × ≤3 seasons = 6 requests max per search). Please don't loosen these —
it's what keeps token-based access welcome.

## Deploy (Netlify, same flow as Logos)

1. Push this folder to a GitHub repo.
2. Netlify → Add new site → Import from Git → pick the repo.
3. `netlify.toml` is read automatically. Deploy.
4. Open the site, paste your `caselist_token`, search.

Run locally with `npx netlify-cli dev` (a plain file-open won't run the function).

## Getting your token

Logged in at opencaselist.com → DevTools → Application → Cookies →
copy the value of `caselist_token`.

## If something's off

- **401 / "Missing token"** → token expired; log in again and re-copy it.
- **No results on a season** → that shard may not exist yet (e.g. a brand-new
  season). Try a previous season pill.
- **Different result fields than expected** → the client maps `content`→snippet
  and `path`→link; adjust `normalize()`/`linkFor()` in `public/index.html`.
