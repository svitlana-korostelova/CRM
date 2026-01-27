# CRM Mobile Application

React Native mobile application for the CRM system.

## Technology Stack

- **React Native**: 0.82.0
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **React Navigation**: Navigation
- **React Native Paper**: UI components
- **TypeScript**: Type safety

## Prerequisites

- Node.js >= 18
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)
- React Native CLI

## Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

3. Start Metro bundler:
```bash
npm start
```

4. Run on iOS simulator:
```bash
npm run ios
```

## Project Structure

```
mobile/
├── src/
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── store/            # Redux store and API
│   │   ├── api/         # RTK Query API
│   │   └── slices/      # Redux slices
│   ├── database/         # SQLite database service
│   │   ├── database.ts   # Database initialization
│   │   ├── migrations/   # Database migrations
│   │   └── models/       # Database models/types
│   ├── theme/            # Theme configuration
│   └── types/            # TypeScript types
├── ios/                  # iOS native code
├── App.tsx               # App entry point
└── package.json
```

## Development

- **Start Metro**: `npm start`
- **Run iOS**: `npm run ios`
- **Run Android**: `npm run android`
- **Lint**: `npm run lint`
- **Test**: `npm test`

## Notes

- iOS is the priority platform
- Android support will be added in MVP phase
- Follow TDD principles for all business logic
- Ensure code compiles and runs before committing
