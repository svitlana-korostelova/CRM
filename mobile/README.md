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

## Running the Mobile App

### First Time Setup:
```bash
# 1. Install dependencies
npm install

# 2. Install iOS dependencies
cd ios
pod install
cd ..
```

### Development Workflow:

**Terminal 1 - Start Metro Bundler:**
```bash
npm start
```
Keep this terminal open. Metro will:
- Bundle JavaScript code
- Watch for file changes
- Show compilation errors

**Terminal 2 - Run iOS App:**
```bash
npm run ios
```
This will:
- Build iOS app
- Launch iOS Simulator
- Connect to Metro bundler

### Verifying Mobile App is Running

**Check iOS Simulator:**
- Simulator should open automatically
- App should display without crashes
- Check for red error screens

**Check Metro Bundler:**
- Should show: `Metro waiting on port 8081`
- Watch for compilation errors
- Check network requests to backend

**Check Backend Connection:**
- Ensure backend is running on `http://localhost:3000`
- Check Metro logs for API requests
- Verify no CORS errors

### Troubleshooting:

**App won't start:**
- Clean build: `cd ios && xcodebuild clean && cd ..`
- Reset Metro: `npm start -- --reset-cache`
- Reinstall pods: `cd ios && pod install && cd ..`

**Metro bundler issues:**
- Kill process: `lsof -ti:8081 | xargs kill -9`
- Restart: `npm start -- --reset-cache`

**Backend connection issues:**
- Verify backend is running: `curl http://localhost:3000/api/health`
- Check `mobile/src/store/api/api.ts` has correct `BASE_URL`
- For iOS Simulator, use `http://localhost:3000` (not `127.0.0.1`)

## Development Commands

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
