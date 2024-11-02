export interface ApiStatus {
  title: string;
  endpoint: string;
  status?: boolean;
}
export const apiUrl: string = 'https://book-api-bx2r.onrender.com';
export const endpoints: ApiStatus[] = [
  { title: 'Books API', endpoint: `${apiUrl}/books` },
  { title: 'Customers API', endpoint: `${apiUrl}/customers` },
  { title: 'Reservations API', endpoint: `${apiUrl}/reservations` }
];