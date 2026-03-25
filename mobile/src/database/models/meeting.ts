/**
 * Row shape for the `meetings` SQLite table (see data-model.md).
 */
export interface Meeting {
  id: string;
  title: string;
  client_id: string | null;
  deal_id: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
