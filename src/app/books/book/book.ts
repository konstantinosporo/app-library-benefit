//TODO Delete this interface
/**
 * @konstantinosporo
 * @description
 * A simple book interface.
 * Subject to change depending the given instrctions and API.
 */
export interface Book {
  title: string;
  author: string;
  realeaseDate: Date;
  description: string;
  availability: boolean;
  readinTime: string;
  imageUrl: string;
}
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
  available?: string;
  createdOn: Date;
}

