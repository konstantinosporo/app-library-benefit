
/**
 * @konstantinosporo
 * @description
 * The actual projects Endpoint Book Interface.
 * Endpoint URL: https://book-api-bx2r.onrender.com/books
 */
export interface BookApi{
  _id?: string;
  name: string;
  year: number;
  type: string;
  author: string;
  available?: boolean;
  createdOn: Date;
}

