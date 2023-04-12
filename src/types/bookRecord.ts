export interface BookRecord {
  id: number;
  title: string;
  author: string;
  status?: string;
  rate: number;
  date: string;
  notes?: string;
}
