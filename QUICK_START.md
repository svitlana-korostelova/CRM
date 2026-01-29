# Quick Start Guide

## Running Backend + Mobile App

### Prerequisites
- Node.js 18+
- Xcode (for iOS)
- PostgreSQL (Supabase recommended)

### Step 1: Start Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run dev
```

**Verify backend is running:**
```bash
curl http://localhost:3000/api/health
```

Should return: `{"status":"ok",...}`

### Step 2: Start Mobile App

**Terminal 1 - Metro Bundler:**
```bash
cd mobile
npm install
cd ios && pod install && cd ..
npm start
```

**Terminal 2 - iOS App:**
```bash
cd mobile
npm run ios
```

### Verify Everything Works

✅ **Backend**: `http://localhost:3000/api/health` returns OK  
✅ **Mobile**: iOS Simulator opens, app displays without errors  
✅ **Connection**: Mobile app can reach backend (check Metro logs)

### Troubleshooting

**Backend not starting:**
- Check `.env` file exists with correct `DATABASE_URL`
- Verify PostgreSQL is running/accessible
- Check port 3000 is free: `lsof -i :3000`

**Mobile app not connecting:**
- Ensure backend is running first
- Check `mobile/src/store/api/api.ts` has `BASE_URL = 'http://localhost:3000/api'`
- For iOS Simulator, use `localhost` not `127.0.0.1`

**Metro bundler issues:**
- Reset cache: `npm start -- --reset-cache`
- Kill process: `lsof -ti:8081 | xargs kill -9`
