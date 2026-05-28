# Leo Look Up

Devotional companion app for Catholic faithful, built around the visit of Pope Leo XIV to Madrid (June 6–9, 2026) and designed as a permanent spiritual companion.

[![App Store](https://img.shields.io/badge/App%20Store-Live-161B33?style=flat-square&logo=appstore)](https://apps.apple.com/es/app/leo-look-up/id6773494248)
[![Privacy Policy](https://img.shields.io/badge/Privacy-Policy-161B33?style=flat-square)](https://mparraga17.github.io/leo-apostolic/)
[![Terms of Use](https://img.shields.io/badge/Terms-of%20Use-C9A55A?style=flat-square)](https://mparraga17.github.io/leo-apostolic/terms-es.html)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> **Live on the App Store** · Built end-to-end as a product portfolio piece: from market research and feature prioritization to engineering, monetization design and post-launch growth.

---

## Product overview

A free mobile app that helps Spanish-speaking Catholics follow Pope Leo XIV's pontificate. Built solo and shipped to the Apple App Store under the [Pizco Deploy](https://apps.apple.com/es/app/leo-look-up/id6773494248) brand.

**Target audience**: practicing Catholics in Spain (~30M Catholics, ~10M practicing), papal-event pilgrims, parish groups and parents looking for accessible religious content.

**Strategic insight**: a once-in-a-generation event (papal visit to Madrid, June 2026) creates a short-lived demand spike for a focused, ad-light, high-trust devotional companion — and the residual product (prayers, hymnal, places, shop) keeps post-event retention as a daily companion app.

---

## Core features

| Tab | What it solves | Key UX decision |
|-----|---------------|-----------------|
| **Today** | First-screen anchor: countdown to the visit, saint of the day, daily Pope quote, rotating prayer. | Pull-to-refresh + dynamic widget that adapts after the event ends, so the app stays useful long-term. |
| **Events** | 17 papal events from the official Vatican source, with a real-time "Where the Pope is now" widget and contextual suggestions for nearby cultural sites during free time. | Suggestions only fire during papal free time, not during events — protects the devotional experience. |
| **Places** | 15 hand-picked cultural-religious sites in Madrid and its region (Almudena, El Prado, El Escorial, Cartuja del Paular and more). | Hand-curation > directory: every place is editorially justified to fit the user's spiritual context. |
| **Prayers** | 11 traditional Catholic prayers in Spanish and Latin (public domain), including the rosary, Magnificat, Salve Regina and more. | Bilingual toggle (Latin/Spanish) — designed for traditional and modern audiences alike. **Ad-free** (deliberate). |
| **Hymnal** | 7 traditional liturgical chants with full lyrics (public domain) plus curated Spotify links to contemporary religious music. | Spotify links only — no audio reproduction inside the app, keeping copyright surface area at zero. **Ad-free** (deliberate). |
| **Shop** | Curated selection of books, encyclicals, religious souvenirs, kids' content and event flags via Amazon affiliate links. | "Featured" carousel rotates categories so no two consecutive items belong to the same category — feels editorial, not list-y. |
| **Local notifications** | 15-minute reminders before each public papal event. | All on-device. No servers, no push tokens, no privacy footprint. |

---

## Monetization model

This app deliberately ships as a **free, ad-supported product with affiliate revenue**, rather than freemium or paid. The decision is rooted in user research (devotional users won't pay upfront) and intent fit (peregrinos browse books and souvenirs as part of the experience).

### Two revenue streams

#### 1. Google AdMob — banner + interstitial

| Where | Why |
|-------|-----|
| Banner on **Today**, **Events**, **Places**, **Shop** | High-traffic, non-devotional surfaces. Banner is adaptive size, fails silently if no fill. |
| Interstitial when closing **Event detail** or **Place detail** modals | Triggers on natural session pauses (the user just finished consuming content), not interruptive pop-ups. |
| **No ads** on **Prayers** or **Hymnal** | Devotional content stays sacred. Trust > short-term ARPU. |

**Frequency design** (`src/services/adManager.ts`):
- 2 modal closes of grace period for new users (first session never sees an interstitial)
- After grace, interstitial every 2 modal closes
- Shared counter across Events and Places, so opening 1 event + 1 place still triggers correctly
- Only shows if SDK reports `loaded === true`, otherwise re-loads silently for next attempt

**ATT compliance**: App Tracking Transparency prompt is shown after a soft delay so the user has context before consenting.

#### 2. Amazon Associates EU — `pizcodeploy-21`

The Shop section curates 14+ products (books, encyclicals, calendars, kids' books, flags for event days) linked to Amazon Spain through the `pizcodeploy-21` tracking ID.

- All product links go through `buildAmazonUrl(asin)` → automatic tag injection
- Predefined search shortcuts ("Rosaries", "Crucifixes", "Bibles", etc.) also tag-aware via `buildAmazonSearchUrl(query)`
- Disclosure shown at the bottom of the Shop screen ("As an Amazon Associate, Pizco Deploy earns from qualifying purchases…")
- Privacy policy explicitly mentions the program with the legally required wording for Amazon EU compliance

**Why an umbrella tag, not a per-app tag**: future Pizco Deploy apps will share the same parent account but use individual Tracking IDs (`leolookup-21`, `nextapp-21`, etc.) for per-app analytics inside the same Associates dashboard.

### Revenue model assumptions (transparent, internal estimates)

| DAU level | AdMob (€/month) | Affiliates (€/month) | Total (€/month) |
|-----------|-----------------|----------------------|-----------------|
| 50 | 2–5 | <1 | 3–6 |
| 200 | 8–20 | 1–3 | 10–25 |
| 1,000 | 40–100 | 5–15 | 50–120 |
| 5,000 | 200–500 | 25–80 | 250–600 |

This isn't a "make-millions" play. The portfolio value is in shipping a complete monetized product end-to-end and learning the operations of an indie publishing studio.

---

## Product KPIs (post-launch)

What I'm tracking after launch to inform v1.2+:

- **Acquisition**: organic App Store impressions, conversion to install, sources (search vs referral vs QR campaigns in physical churches).
- **Activation**: % of new users who open ≥ 2 tabs in first session, % who reach Events tab.
- **Retention**: D1, D7, D30 retention. Hypothesis: pilgrims drop hard after June 9, but Prayers/Hymnal users retain at >30% D30.
- **Engagement**: avg sessions/week, avg session length, modal opens per session.
- **Monetization**:
  - AdMob: eCPM, CTR, fill rate, frequency cap saturation
  - Amazon: clicks → Amazon, conversion rate, average order value of attributed purchases, qualifying-sales counter (180-day Amazon EU rule)
- **Quality**: crash-free sessions %, cold-start time, ad-load failure rate.

I don't run analytics inside the app yet (privacy-first MVP). For v1.2 I'll evaluate adding a privacy-respecting analytics SDK with explicit consent.

---

## Roadmap

### Shipped (v1.0 — May 2026)
- Six core tabs, splash, About modal, share to social
- Local notifications for papal events
- Bilingual support (es / en)
- Privacy-first MVP: zero PII, no analytics, no servers

### Shipped (v1.1 — June 2026)
- Google AdMob (banner + interstitial) with ATT prompt
- New "Banderas" (flags) category in the Shop for event days
- Amazon Associates EU integration with `pizcodeploy-21` tracking ID
- Updated Privacy Nutrition Label (App Store) and public privacy policy

### Backlog (candidates for v1.2+)
- Privacy-respecting analytics with explicit consent
- Sharable prayer cards (image generation for social media)
- Push notifications backed by a minimal serverless backend (subject to a clear privacy review)
- Liturgical calendar view with feast days and color codes
- Audio rosary (with controls, background play, sleep timer)
- Pope news feed via official RSS sources

### Decided NOT to ship (and why)
- ❌ User accounts → no value to the user, only data liability
- ❌ Premium tier → wrong willingness-to-pay for the audience
- ❌ Custom audio reproductions of modern songs → copyright minefield
- ❌ Maps inside the app → reuse OS maps app instead, smaller binary, fewer permissions
- ❌ Server-side push → would require GDPR-compliant infra and processor agreements; cost/benefit doesn't justify it yet

---

## Tech stack

- React Native + Expo SDK 54
- TypeScript (strict mode)
- Functional components with hooks
- `react-native-google-mobile-ads` (AdMob)
- `expo-tracking-transparency` (iOS ATT)
- `expo-localization` + custom i18n provider (es / en)
- iOS-first design language: BlurView tabs, page-sheet modals, hairline separators, navy + gold palette

---

## Project structure

```
LeonApostolico/
├── App.tsx                    # Splash + 6 tabs + ad init wiring
├── app.json                   # Expo config: AdMob IDs, ATT message, plugins
├── eas.json                   # EAS build profiles + auto-increment build number
├── docs/                      # Privacy policy & terms (served via GitHub Pages)
└── src/
    ├── theme/                 # Design system (colors, typography, spacing)
    ├── i18n/                  # Spanish + English copy
    ├── components/            # Reusable UI (TabBar, AdBanner, AboutModal, etc.)
    ├── screens/               # Today, Events, Places, Prayers, Hymnal, Shop
    ├── data/                  # Static content (prayers, events, places, products)
    ├── models/                # TypeScript types
    ├── services/              # Notifications, ads init, ad frequency manager
    ├── config/                # AdMob unit IDs (test / production switch)
    └── utils/                 # Helpers (papal location, suggestions, share)
```

---

## Getting started

Requirements: Node.js LTS, an Expo account, and an Apple Developer account if you want to build for iOS.

```bash
# Install dependencies
npm install

# Run in Expo Go (limited — native modules like AdMob disabled)
npx expo start

# Build a native development client (recommended for full feature testing)
eas build --platform ios --profile development
npx expo start --dev-client

# Production build for App Store
eas build --platform ios --profile production
eas submit --platform ios --latest
```

In dev builds, AdMob always serves Google's official Test IDs to avoid policy violations. The production switch is `USE_PRODUCTION_ADS` in `src/config/ads.ts`.

---

## Privacy and licensing

The app uses Google AdMob for advertising and the Amazon Associates EU program for affiliate links. No accounts, no analytics, no first-party servers. Read the full [Privacy Policy](https://mparraga17.github.io/leo-apostolic/privacy-en.html) and [Terms of Use](https://mparraga17.github.io/leo-apostolic/terms-en.html).

Source code is released under the MIT License (see [LICENSE](LICENSE)). Devotional texts in Latin and Spanish are public domain. Modern songs (Hakuna Group Music and others) are linked via Spotify and never reproduced inside the app.

---

## Contact

For questions, issues, partnerships or feedback:

- Email: [pizcodeploy@gmail.com](mailto:pizcodeploy@gmail.com)
- App Store: [Leo Look Up](https://apps.apple.com/es/app/leo-look-up/id6773494248)

---

*Madrid · MMXXVI · Pizco Deploy*
