// components/layouts/AdminLayout.tsx
import { ReactNode, useState } from "react";
import { Box, useDisclosure, Portal } from "@chakra-ui/react";
import Navbar from "@/components/navbar/NavbarAdmin";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/contexts/SidebarContext";
import routes from "../routes"; // Adjust the path to your routes

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { onOpen } = useDisclosure();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      <Sidebar routes={routes} display="none" />
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
          <Navbar onOpen={onOpen} secondary={false} message={""} brandText={""} logoText={""} fixed={false} />
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

export default AdminLayout;

// components/layouts/CountLeadLayout.tsx
// const CountLeadLayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <Box>
//       <Navbar />
//       <Sidebar />
//       <Box>{children}</Box>
//     </Box>
//   );
// };

// export default CountLeadLayout;