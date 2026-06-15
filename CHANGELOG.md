# Changelog

All notable changes to **Leo Look Up** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project loosely follows [Semantic Versioning](https://semver.org/).

Each entry explains not just *what* changed but *why*, as a product log.

---

## [1.2.2] — 2026-06-10

Banner fill for European users had collapsed under a Google "No CMP" restriction,
and the official visit anthem was released — both addressed here.

### Added
- **Official visit anthem.** "Alza la mirada" (VIVAFE, © 2026) featured in the
  Hymnal in its own section, with a direct Spotify link and its English version
  ("I'll Lift Up My Eyes"). Link only — no lyrics or audio reproduced (copyright).
- **GDPR consent (UMP).** The Google User Messaging Platform consent form is now
  requested at startup for users in the EEA, UK and Switzerland, before the AdMob
  SDK initializes (then ATT on iOS). Shown once; the user's choice is remembered.

### Fixed
- **Banner ad serving in the EEA.** Google had applied a "Consent requirement:
  No CMP" restriction because no GDPR consent message existed, which collapsed
  banner fill for European users. Resolved by publishing a European-regulations
  consent message in AdMob and integrating the UMP SDK in the app. AdMob lifts the
  restriction automatically once consent signals start arriving. Full write-up in
  [LEARNINGS](LEARNINGS.md).

---

## [1.2.1] — 2026-06-07

Trip turned out to be **multi-city** (Madrid, Barcelona/Montserrat, Gran Canaria,
Tenerife), and a critical ad issue had to be addressed fast on a live app.

### Added
- **Multi-city journey model.** Events, traffic closures and places now belong to
  a `city` stage. New `data/cities.ts` is the single source of truth per city
  (localized name, itinerary order, dates, time zone, official traffic sources).
- **City tabs** in Events, Traffic and Places; screens open by default on the
  city where the Pope currently is (`getActiveCity`).
- **Barcelona, Montserrat, Gran Canaria and Tenerife** events from the official
  Vatican itinerary, plus traffic/transport closures (Barcelona City Council +
  TMB, Las Palmas City Council + Guaguas, Mogán) and curated points of interest.
- **Catalan (ca) localization** alongside Spanish and English (auto-detected +
  manual toggle). Static content falls back to Spanish.
- **Events timeline.** Redesigned the Events tab as a vertical timeline with a
  connected rail and per-category nodes (color as data + icon, which also works
  for color-blind users), inline free-time gaps and clearly tappable cards.
  Inspired by Apple Design Award winners (e.g. Structured).
- **"The visit, up to date"** news block on the Today screen.

### Changed
- **Time-zone correctness.** All event/closure times are anchored to each city's
  offset (mainland UTC+2, Canary Islands UTC+1) and computed as absolute instants.
  Fixes wrong countdowns / "in X min" when the device is in another zone (abroad
  or in the Canaries). Displayed time is always the event's local time; a notice
  appears when the device is in a different zone.
- **Past events** fade into a separate section so the timeline foregrounds what's next.
- **Translucent, state-tinted cards** across the app (removed the left color bars).
- **About copy** reworded to describe a practical companion for the visit
  (schedule, traffic, places), not a permanent devotional app.

### Fixed
- ShopScreen referenced missing styles (pre-existing crash risk in the Shop tab).

### Disabled (temporary)
- **Interstitial ads disabled** (banners kept). On some iOS devices the full-screen
  interstitial could render without an accessible close button (X outside the safe
  area) or as a blank screen, trapping the user — a mix of a known SDK status-bar
  issue and a Google-side full-screen-ad regression reported by multiple publishers.
  A status-bar workaround is wired up for when it's safe to re-enable.
  Toggle: `INTERSTITIALS_ENABLED` in `src/config/ads.ts`.

---

## [1.2.0] — 2026-06

### Added
- **Real-time traffic & transport tab** for Madrid (official sources: Madrid City
  Council + EMT), with an active-closures widget on Today and a closures section
  inside each event's detail.
- Corpus Christi event enriched with the procession route, access times and
  eucharistic churches.

### Changed
- Donation wording generalized to "a soup kitchen in the Chamberí district of
  Madrid" (beneficiary not named publicly).
- Banner uses `LARGE_ANCHORED_ADAPTIVE_BANNER` (replaces the deprecated size).

---

## [1.1.0] — 2026-06

### Added
- **Google AdMob** (banner + interstitial) with App Tracking Transparency prompt.
- **Amazon Associates EU** integration (tracking ID `pizcodeploy-21`) in the Shop.
- New "Banderas" (flags) category in the Shop for event days.
- Social commitment: 100% of proceeds pledged to a soup kitchen in Chamberí.

### Changed
- Updated Privacy Nutrition Label (App Store) and public privacy policy.

### Fixed
- ATT prompt now shown after the splash and while the app is `active`
  (Apple Guideline 2.1).

---

## [1.0.0] — 2026-05

### Added
- Initial release: six core tabs (Today, Events, Places, Prayers, Hymns, Shop),
  splash, About modal, share to social.
- Local notifications for public papal events.
- Bilingual support (Spanish / English).
- Privacy-first MVP: zero PII, no analytics, no first-party servers.
