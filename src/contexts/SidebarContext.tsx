import React, { createContext, useState, ReactNode } from "react";

export const SidebarContext = createContext<any>(null);

export const SidebarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [layout, setLayout] = useState<string>("/admin"); // Ensure this default value is correct

  return (
    <SidebarContext.Provider
      value={{ toggleSidebar, setToggleSidebar, layout, setLayout }}
    >
      {children}
    </SidebarContext.Provider>
  );
};