import React, { createContext, useState, ReactNode } from "react";

export const SidebarContext = createContext<any>(null);

export const SidebarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};