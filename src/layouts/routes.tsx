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
import { ReactNode } from 'react';
// import Warehouse from 'views/admin/warehouse';
// import CountSession from 'views/admin/session';
// import SessionDetails from 'views/admin/session/components/sessionDetails';
// import Report from 'views/admin/report';
// import Reconciliation from 'views/admin/reconciliation';

// import CountDashboard from 'views/count-lead/default';
// import CountDataEntry from 'views/count-lead/data-entry';
// import CountReconciliation from 'views/count-lead/reconciliation';

// Auth Imports
// import SignInCentered from 'views/auth/signIn';

type RoutesType = {
  roles: string[];
  name: string;
  layout: string;
  component: ReactNode;
  icon: string;
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
  // {
  //   path: "/default",
  //   name: "Dashboard",
  //   icon: (
  //     <Icon as={MdHome} width="20px" height="20px" mt={1} color="inherit" />
  //   ),
  //   component: CountDashboard,
  //   layout: "/count-lead",
  //   roles: ["count-lead"],
  // },
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
