import type {Priority, TaskStatus} from '../../navigation/types';

/**
 * Row shape for the `tasks` SQLite table (see data-model.md).
 */
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  due_date: string | null;
  client_id: string | null;
  deal_id: string | null;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
