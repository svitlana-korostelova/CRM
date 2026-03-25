/**
 * Row shape for the `deals` SQLite table (see data-model.md).
 */
export interface Deal {
  id: string;
  title: string;
  value: number;
  stage_id: string;
  /** 0–100 */
  probability: number;
  expected_close_date: string | null;
  client_id: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
