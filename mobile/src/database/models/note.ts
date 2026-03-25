/**
 * Row shape for the `notes` SQLite table (see data-model.md).
 */
export interface Note {
  id: string;
  content: string;
  client_id: string | null;
  deal_id: string | null;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
