import type {CallOutcome} from '../../navigation/types';

/**
 * Row shape for the `call_logs` SQLite table (see data-model.md).
 */
export interface CallLog {
  id: string;
  client_id: string;
  deal_id: string | null;
  duration_seconds: number;
  outcome: CallOutcome;
  notes: string | null;
  called_at: string;
  created_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
