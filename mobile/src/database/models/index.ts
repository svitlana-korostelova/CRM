/**
 * Database Models and Types
 * 
 * TypeScript interfaces for database entities
 */

/**
 * Base model interface that all database entities should extend
 */
export interface BaseModel {
  id: number;
  created_at: number;
  updated_at: number;
}

/**
 * Test table model (for verification)
 */
export interface TestRecord extends BaseModel {
  name: string;
  value?: string;
}

/**
 * Database operation result
 */
export interface DatabaseOperationResult {
  success: boolean;
  id?: number;
  rowsAffected?: number;
  error?: string;
}
