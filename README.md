# Algo-Rhythm — staging

Internal review build for Tisa's studio site. Not public yet — `noindex`,
no custom domain, linked only from Content Desk's navbar.

Two full design directions, switchable live via the toggle in the top-right
corner (or `?v=a` / `?v=b` in the URL):

- **Cinematic** (`?v=a`) — dark, editorial, slow reveals.
- **Kinetic** (`?v=b`) — bright, bold, loud.

Both pull from the same real portfolio data in `src/data/portfolio.ts` —
the Belgrade Philharmonic numbers, the service list, the client roster.
Headline/subhead/about copy is a draft pass for review, flagged on-page.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — GitHub Actions builds and publishes to GitHub Pages
automatically. One-time setup: in the repo's Settings → Pages, set
**Source** to **GitHub Actions**.

Live at: https://djongo92.github.io/algo-rhythm/
