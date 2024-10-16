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