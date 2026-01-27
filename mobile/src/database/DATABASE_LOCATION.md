# Database Location Instructions

## How to Find Database Records on Device

### iOS Simulator

1. **Find the app's data directory:**
   ```bash
   # Get the simulator device ID
   xcrun simctl list devices | grep Booted
   
   # Navigate to app data (replace DEVICE_ID and APP_ID)
   cd ~/Library/Developer/CoreSimulator/Devices/[DEVICE_ID]/data/Containers/Data/Application/[APP_ID]/Documents/
   ```

2. **Or use Finder:**
   - Open Finder
   - Press `Cmd+Shift+G`
   - Enter: `~/Library/Developer/CoreSimulator/Devices/`
   - Find your simulator device folder
   - Navigate to: `data/Containers/Data/Application/[APP_ID]/Documents/`
   - Look for `CRM.db`

3. **Using SQLite command line:**
   ```bash
   # Find the database file
   find ~/Library/Developer/CoreSimulator/Devices -name "CRM.db" 2>/dev/null
   
   # Open with sqlite3
   sqlite3 [path/to/CRM.db]
   
   # Query test_table
   SELECT * FROM test_table;
   ```

### Android Device/Emulator

1. **Using ADB (Android Debug Bridge):**
   ```bash
   # Connect to device
   adb devices
   
   # Find database location (package name is usually com.crmmobile)
   adb shell "run-as com.crmmobile find /data/data/com.crmmobile -name 'CRM.db'"
   
   # Copy database to computer
   adb shell "run-as com.crmmobile cat /data/data/com.crmmobile/databases/CRM.db" > CRM.db
   
   # Or use Android Studio Device File Explorer
   # View → Tool Windows → Device File Explorer
   # Navigate to: /data/data/com.crmmobile/databases/CRM.db
   ```

2. **Database Location:**
   - Path: `/data/data/[package-name]/databases/CRM.db`
   - Default location in react-native-sqlite-storage: `'default'` = app's private database directory

3. **Using Android Studio:**
   - Open Android Studio
   - View → Tool Windows → Device File Explorer
   - Navigate to: `data/data/[package-name]/databases/`
   - Download `CRM.db` file
   - Open with any SQLite viewer (DB Browser for SQLite, etc.)

### Verify Data Persistence (T033)

1. **Insert test data:**
   - Use "Test Database" button in app
   - Or insert manually via code

2. **Close app completely:**
   - iOS: Swipe up and close app
   - Android: Close from recent apps

3. **Reopen app:**
   - Launch app again

4. **Query database:**
   - Use "Test Database" button again
   - Or check database file directly using methods above
   - Data should still be there!

### Quick Test Query

Once you have the database file, you can query it:

```sql
-- List all tables
.tables

-- View test_table structure
.schema test_table

-- Query all records
SELECT * FROM test_table;

-- Query with ordering
SELECT * FROM test_table ORDER BY created_at DESC;

-- Count records
SELECT COUNT(*) FROM test_table;
```
