export interface RoutesType {
  roles: string[];
  name: string;
  layout: string;
  icon?: React.ReactNode;
  component: React.ElementType;
  secondary?: boolean;
  path: string;
}