/**
 * Row shape for the `clients` SQLite table (see data-model.md).
 */
export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  avatar_url: string | null;
  notes: string | null;
  /** JSON array of tag strings */
  tags: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_favorite: number;
  created_at: string;
  updated_at: string;
  synced_at: string | null;
  /** SQLite INTEGER: 0 or 1 */
  is_deleted: number;
}
