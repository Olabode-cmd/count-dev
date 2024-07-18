// utils/filterRoutes.ts
import { RoutesType } from "@/types/hui-types";

const filterRoutesByLayout = (
  routes: RoutesType[],
  layout: string
): RoutesType[] => {
  return routes.filter((route) => route.layout === layout);
};

export default filterRoutesByLayout;