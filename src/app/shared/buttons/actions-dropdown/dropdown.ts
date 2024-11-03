export interface DropdownActions {
  id?: string;
  title: string;
  icon?: string;
  href?: string;
  action?: () => void;
}