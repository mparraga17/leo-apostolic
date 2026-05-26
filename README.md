# Leo Apostolic

Devotional companion app for Catholic faithful, built around the visit of Pope Leo XIV to Madrid (June 6–9, 2026), but designed as a permanent spiritual companion.

[![Privacy Policy](https://img.shields.io/badge/Privacy-Policy-161B33?style=flat-square)](https://mparraga17.github.io/leo-apostolic/)
[![Terms of Use](https://img.shields.io/badge/Terms-of%20Use-C9A55A?style=flat-square)](https://mparraga17.github.io/leo-apostolic/terms-es.html)

## Features

- **Today**: dynamic countdown to the papal visit, saint of the day, daily Pope quote, and rotating prayer.
- **Prayers**: 11 traditional Catholic prayers in Spanish and Latin (public domain), including the rosary, Magnificat, Salve Regina and more.
- **Hymnal**: 7 traditional liturgical chants with full lyrics (public domain) plus curated links to contemporary religious music on Spotify.
- **Events**: 17 papal events extracted from the official Vatican source, with a real-time "Where the Pope is now" widget and contextual suggestions for nearby places during free time.
- **Places**: 15 hand-picked cultural-religious sites in Madrid and its region (Almudena, El Prado, El Escorial, Cartuja del Paular and more).
- **Shop**: curated selection of books and items related to Pope Leo XIV via Amazon affiliate links.
- **Local notifications**: 15-minute reminders before each public papal event, scheduled entirely on-device with no servers involved.

## Tech stack

- React Native + Expo SDK 54
- TypeScript (strict mode)
- Functional components with hooks
- iOS-first design language (BlurView tabs, page-sheet modals, hairline separators, navy + gold palette)

## Project structure

```
LeonApostolico/
├── App.tsx                  # Entry point with splash + 6 tabs
├── app.json                 # Expo configuration
├── docs/                    # Privacy policy and terms (GitHub Pages)
└── src/
    ├── theme/               # Design system
    ├── components/          # Reusable UI components
    ├── screens/             # Six main screens
    ├── data/                # Static data (prayers, events, places, etc.)
    ├── models/              # TypeScript types
    ├── services/            # Notifications service
    └── utils/               # Helpers (papal location, suggestions)
```

## Getting started

Requirements: Node.js LTS, an Expo account, and an Apple Developer account if you want to build for iOS.

```bash
# Install dependencies
npm install

# Run in Expo Go (limited — native modules disabled)
npx expo start

# Build a native development client (recommended)
eas build --platform ios --profile development
npx expo start --dev-client
```

## Privacy and licensing

The app does not collect personal data, does not use analytics, and does not require user accounts. Read the full [Privacy Policy](https://mparraga17.github.io/leo-apostolic/privacy-en.html) and [Terms of Use](https://mparraga17.github.io/leo-apostolic/terms-en.html).

Source code is released under the MIT License (see [LICENSE](LICENSE)). Devotional texts in Latin and Spanish are public domain. Modern songs (Hakuna Group Music and others) are linked via Spotify and never reproduced inside the app.

## Contact

For questions, issues, or feedback: [pizcodeploy@gmail.com](mailto:pizcodeploy@gmail.com)

---

*Madrid · MMXXVI*
