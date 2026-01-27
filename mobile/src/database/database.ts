/**
 * SQLite Database Service
 * 
 * Provides database initialization, connection management, and CRUD operations
 * for offline-first architecture.
 */

import SQLite from 'react-native-sqlite-storage';

// Enable promise-based API
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export interface DatabaseResult {
  insertId?: number;
  rowsAffected: number;
  rows: any[];
}

export interface QueryOptions {
  params?: any[];
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private dbName: string = 'CRM.db';
  private isInitialized: boolean = false;

  /**
   * Initialize database connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized && this.db) {
      console.log('Database already initialized');
      return;
    }

    try {
      this.db = await SQLite.openDatabase({
        name: this.dbName,
        location: 'default',
      });

      this.isInitialized = true;
      console.log('Database initialized successfully');

      // Run initial migrations
      await this.runMigrations();
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  /**
   * Run database migrations
   */
  private async runMigrations(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      // Create migrations table to track applied migrations
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          applied_at INTEGER NOT NULL
        )
      `);

      // Get applied migrations
      const [result] = await this.db.executeSql(
        'SELECT name FROM migrations ORDER BY applied_at'
      );
      const appliedMigrations = result.rows.raw().map((row: any) => row.name);

      // Run pending migrations
      // For now, we'll create a test table to verify database works
      if (!appliedMigrations.includes('001_create_test_table')) {
        await this.db.executeSql(`
          CREATE TABLE IF NOT EXISTS test_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            value TEXT,
            created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
            updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
          )
        `);

        await this.db.executeSql(
          'INSERT INTO migrations (name, applied_at) VALUES (?, ?)',
          ['001_create_test_table', Date.now()]
        );
      }
    } catch (error) {
      console.error('Migration error:', error);
      throw error;
    }
  }

  /**
   * Execute a SQL query
   */
  async query(
    sql: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResult> {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.');
    }

    try {
      const [result] = await this.db.executeSql(
        sql,
        options.params || []
      );

      return {
        rowsAffected: result.rowsAffected,
        insertId: result.insertId,
        rows: result.rows.raw(),
      };
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  /**
   * Insert data into a table
   */
  async insert(
    table: string,
    data: Record<string, any>
  ): Promise<number> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');

    const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

    const result = await this.query(sql, {params: values});
    return result.insertId || 0;
  }

  /**
   * Query data from a table
   */
  async select(
    table: string,
    where?: string,
    params?: any[],
    orderBy?: string,
    limit?: number
  ): Promise<any[]> {
    let sql = `SELECT * FROM ${table}`;

    if (where) {
      sql += ` WHERE ${where}`;
    }

    if (orderBy) {
      sql += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      sql += ` LIMIT ${limit}`;
    }

    const result = await this.query(sql, {params});
    return result.rows;
  }

  /**
   * Update data in a table
   */
  async update(
    table: string,
    data: Record<string, any>,
    where: string,
    whereParams?: any[]
  ): Promise<number> {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), ...(whereParams || [])];

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;

    const result = await this.query(sql, {params: values});
    return result.rowsAffected;
  }

  /**
   * Delete data from a table
   */
  async delete(
    table: string,
    where: string,
    params?: any[]
  ): Promise<number> {
    const sql = `DELETE FROM ${table} WHERE ${where}`;

    const result = await this.query(sql, {params});
    return result.rowsAffected;
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isInitialized = false;
      console.log('Database closed');
    }
  }

  /**
   * Get database instance (for advanced operations)
   */
  getDatabase(): SQLite.SQLiteDatabase | null {
    return this.db;
  }

  /**
   * Check if database is initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.db !== null;
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
