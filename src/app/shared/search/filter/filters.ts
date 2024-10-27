/**
 * @konstantinosporo
 * @description
 * Filter interface
 */
export interface Filter {
  id: FilterID;
  title: string;
  isChecked: boolean;
}
/**
 * @konstantinosporo
 * Custom enum for better readability.
 * Can add more filters ids.
 */
export enum FilterID {
  ALL = 'all',
  AVAILABLE = 'available'
}
/**
 * @konstantinosporo
 * @description
 * Dynamic filter list 
 */
export const filterList: Filter[] = [
  { id: FilterID.ALL, title: 'All Books', isChecked: true },
  { id: FilterID.AVAILABLE, title: 'Available Books', isChecked: false },
];
