/**
 * Database Models and Types
 *
 * TypeScript interfaces for database entities
 */

export type {CallLog} from './callLog';
export type {Client} from './client';
export type {Deal} from './deal';
export type {Meeting} from './meeting';
export type {Note} from './note';
export type {Task} from './task';

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
