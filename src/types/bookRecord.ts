export interface BookRecord {
  id: number;
  title: string;
  author: string;
  status?: string | number;
  rate: number;
  date: string;
  notes?: string;
}
