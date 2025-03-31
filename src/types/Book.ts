export interface Book {
  title: string;
  genre: string;
  author: string;
  read: boolean;
  links?: {
    self?: string;
    filterByThisGenre?: string;
  };
  _id?: string;
  __v?: number;
}
