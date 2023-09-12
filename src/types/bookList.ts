import { BookRecord } from './bookRecord';

export interface BookList {
  booksList: BookRecord[];
  totalPages: number;
}
