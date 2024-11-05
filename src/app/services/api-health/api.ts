export interface ApiStatus {
  title: string;
  endpoint: string;
  status?: boolean;
}
export const apiUrl: string = 'https://book-api-bx2r.onrender.com';
export const endpoints: ApiStatus[] = [
  { title: 'Books', endpoint: `${apiUrl}/books` },
  { title: 'Customers', endpoint: `${apiUrl}/customers` },
  { title: 'Reservations', endpoint: `${apiUrl}/reservations` }
];