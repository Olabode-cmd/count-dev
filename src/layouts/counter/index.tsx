// components/layouts/AdminLayout.tsx
import { ReactNode, useState } from "react";
import { Box, useDisclosure, Portal } from "@chakra-ui/react";
import Navbar from "@/components/navbar/NavbarAdmin";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/contexts/SidebarContext";
import routes from "../routes";
import filterRoutesByLayout from "../filterRoutes";

const CounterLayout = ({ children }: { children: ReactNode }) => {
  const { onOpen } = useDisclosure();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Filter admin routes
  const counterRoutes = filterRoutesByLayout(routes, "/counter");

  return (
    <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      <Sidebar routes={counterRoutes} display="none" />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <Portal>
          <Navbar
            onOpen={onOpen}
            secondary={false}
            message={""}
            brandText={""}
            logoText={""}
            fixed={false}
          />
        </Portal>
        <Box
          mx="auto"
          p={{ base: "20px", md: "30px" }}
          pe="20px"
          minH="100vh"
          pt="50px"
        >
          {children}
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

export default CounterLayout;