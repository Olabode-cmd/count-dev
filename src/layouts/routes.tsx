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

import { LuJoystick } from 'react-icons/lu';

// Admin Imports
import MainDashboard from '@/pages';
import CountSession from '@/pages/admin/session';
import Warehouse from '@/pages/admin/warehouse';
import Report from '@/pages/admin/report';

import CountDashboard from '@/pages/count-lead/default';
import CountLeadSession from '@/pages/count-lead/session';

import CounterDashboard from '@/pages/counter/default';
import CounterSession from '@/pages/counter/session';

import ControllerDashboard from '@/pages/controller/default';
import ControllerSession from '@/pages/controller/session';
import ControllerReport from '@/pages/controller/report';
import ControllerWarehouse from '@/pages/controller/warehouse';

import { ReactNode } from 'react';
import Roles from '@/pages/controller/roles';

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
      <Icon
        as={MdAccessTime}
        width="20px"
        height="20px"
        mt={1}
        color="inherit"
      />
    ),
    component: CountLeadSession,
    layout: "/count-lead",
    roles: ["count-lead"],
  },
  {
    path: "/default",
    name: "Dashboard",
    icon: (
      <Icon as={MdHome} width="20px" height="20px" mt={1} color="inherit" />
    ),
    component: CounterDashboard,
    layout: "/counter",
    roles: ["counter"],
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
    component: CounterSession,
    layout: "/counter",
    roles: ["counter"],
  },
  {
    path: "/default",
    name: "Dashboard",
    icon: (
      <Icon as={MdHome} width="20px" height="20px" mt={1} color="inherit" />
    ),
    component: ControllerDashboard,
    layout: "/controller",
    roles: ["controller"],
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
    component: ControllerSession,
    layout: "/controller",
    roles: ["controller"],
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
    component: ControllerWarehouse,
    layout: "/controller",
    roles: ["controller"],
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
    component: ControllerReport,
    layout: "/controller",
    roles: ["controller"],
  },
  {
    path: "/roles",
    name: "Roles",
    icon: (
      <Icon
        as={LuJoystick}
        width="20px"
        height="20px"
        mt={1}
        color="inherit"
      />
    ),
    component: Roles,
    layout: "/controller",
    roles: ["controller"],
  },
];

export default routes;
