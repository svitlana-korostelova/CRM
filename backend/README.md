# CRM Backend API

Backend API server for the CRM mobile application. Built with Node.js, Express, TypeScript, and Prisma ORM.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database instance (local or remote)
- npm or yarn package manager

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL="postgresql://user:password@localhost:5432/crm?schema=public"
   ```
   
   Replace the `DATABASE_URL` with your PostgreSQL connection string.

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migrations (if needed):**
   ```bash
   npm run prisma:migrate
   ```

## Running the Server

### Development Mode (with hot reload):
```bash
npm run dev
```

**Expected output:**
```
✅ Database connected successfully
🚀 Server running on http://localhost:3000
📊 Environment: development
🔗 Health check: http://localhost:3000/api/health
```

### Production Mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Verifying Backend is Running

### Quick Check:
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-01-27T...","uptime":123.45,"database":"connected"}
```

### Browser Check:
Open `http://localhost:3000/api/health` in your browser.

### Check Server Logs:
Look for these messages in the terminal:
- ✅ `Database connected successfully`
- ✅ `Server running on http://localhost:3000`

### Troubleshooting:

**Backend won't start:**
- Check if port 3000 is already in use: `lsof -i :3000`
- Verify `.env` file exists and has correct `DATABASE_URL`
- Check database connection: `npm run prisma:generate` should succeed

**Database connection fails:**
- Verify PostgreSQL is running (if local)
- Check `DATABASE_URL` in `.env` is correct
- Test connection: `psql $DATABASE_URL` (if psql is installed)

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server and database status

### Root
- **GET** `/` - API information and available endpoints

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Prisma database connection
│   ├── middleware/
│   │   └── errorHandler.ts      # Error handling middleware
│   ├── routes/
│   │   ├── api.ts               # Main API router
│   │   └── health.ts            # Health check endpoint
│   └── server.ts                # Express server entry point
├── prisma/
│   └── schema.prisma            # Prisma schema (PostgreSQL)
├── prisma.config.ts             # Prisma 7 configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── .env                          # Environment variables
├── dist/                         # Compiled JavaScript (generated)
└── README.md                     # This file
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled server
- `npm run dev` - Run server in development mode with hot reload
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Database Connection

The server uses Prisma ORM to connect to PostgreSQL. Make sure your `DATABASE_URL` in `.env` is correctly configured before starting the server.

The server will attempt to connect to the database on startup. If the connection fails, the server will exit with an error.

## Development

- TypeScript is configured with strict mode enabled
- Source files are in `src/`
- Compiled output goes to `dist/`
- Hot reload is enabled in development mode using nodemon

## Notes

- The server includes CORS middleware to allow requests from the mobile app
- Error handling middleware catches and formats all errors
- Health check endpoint verifies both server and database connectivity
