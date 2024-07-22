import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdAccessTime,
  MdOutlineFileCopy,
  MdWarehouse,
  MdLock,
  MdBookmarks,
  MdDataSaverOff,
} from "react-icons/md";

// Admin Imports
import MainDashboard from '@/pages';
import CountSession from '@/pages/admin/session';
import Warehouse from '@/pages/admin/warehouse';
import Report from '@/pages/admin/report';

import CountDashboard from '@/pages/count-lead/default';
import CountLeadSession from '@/pages/count-lead/session';
import { ReactNode } from 'react';

type RoutesType = {
  roles: string[];
  name: string;
  layout: string;
  icon?: React.ReactNode;
  component: React.ElementType;
  secondary?: boolean;
  path: string;
};

const routes = [
  {
    path: "/default",
    name: "Dashboard",
    icon: (
      <Icon as={MdHome} width="20px" height="20px" mt={1} color="inherit" />
    ),
    component: MainDashboard,
    layout: "/admin",
    roles: ["admin"],
  },
  {
    path: "/session",
    name: "Count Session",
    icon: (
      <Icon
        as={MdAccessTime}
        width="20px"
        height="20px"
        mt={1}
        color="inherit"
      />
    ),
    component: CountSession,
    layout: "/admin",
    roles: ["admin"],
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    icon: (
      <Icon
        as={MdWarehouse}
        width="20px"
        height="20px"
        mt={1}
        color="inherit"
      />
    ),
    component: Warehouse,
    layout: "/admin",
    roles: ["admin"],
  },
  {
    path: "/report",
    name: "Report",
    icon: (
      <Icon
        as={MdOutlineFileCopy}
        width="20px"
        height="20px"
        mt={1}
        color="inherit"
      />
    ),
    component: Report,
    layout: "/admin",
    roles: ["admin"],
  },
  {
    path: "/default",
    name: "Dashboard",
    icon: (
      <Icon as={MdHome} width="20px" height="20px" mt={1} color="inherit" />
    ),
    component: CountDashboard,
    layout: "/count-lead",
    roles: ["count-lead"],
  },
  {
    path: "/session",
    name: "Count Session",
    icon: (
      <Icon as={MdAccessTime} width="20px" height="20px" mt={1} color="inherit" />
    ),
    component: CountLeadSession,
    layout: "/count-lead",
    roles: ["count-lead"],
  },
  // {
  //   path: "/data-entry",
  //   name: "Data Entry",
  //   icon: (
  //     <Icon
  //       as={MdDataSaverOff}
  //       width="20px"
  //       height="20px"
  //       mt={1}
  //       color="inherit"
  //     />
  //   ),
  //   component: CountDataEntry,
  //   layout: "/count-lead",
  //   roles: ["count-lead"],
  // },
  // {
  //   path: "/reconciliation",
  //   name: "Reconciliation",
  //   icon: (
  //     <Icon
  //       as={MdBookmarks}
  //       width="20px"
  //       height="20px"
  //       mt={1}
  //       color="inherit"
  //     />
  //   ),
  //   component: CountReconciliation,
  //   layout: "/count-lead",
  //   roles: ["count-lead"],
  // },
];

export default routes;
