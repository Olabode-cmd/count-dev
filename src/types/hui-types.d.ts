export interface RoutesType {
  roles: string[];
  name: string;
  layout: string;
  component: () => JSX.Element;
  icon: JSX.Element | string;
  path: string;
  secondary?: boolean;
}