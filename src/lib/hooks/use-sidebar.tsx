"use client";

import * as React from "react";

const LOCAL_SIDEBAR_STORAGE_KEY = "sidebar";

interface AdminSidebarContext {
  isAdminSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
}

const AdminSidebarContext = React.createContext<
  AdminSidebarContext | undefined
>(undefined);

export function useAdminSidebar() {
  const context = React.useContext(AdminSidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface AdminSidebarProviderProps {
  children: React.ReactNode;
}

export function AdminSidebarProvider({ children }: AdminSidebarProviderProps) {
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_SIDEBAR_STORAGE_KEY);
    if (value) {
      setIsAdminSidebarOpen(JSON.parse(value));
    }
    setIsLoading(false);
  }, []);

  const toggleSidebar = () => {
    setIsAdminSidebarOpen((value) => {
      const newState = !value;
      localStorage.setItem(LOCAL_SIDEBAR_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <AdminSidebarContext.Provider
      value={{
        isAdminSidebarOpen: isAdminSidebarOpen,
        toggleSidebar: toggleSidebar,
        isLoading,
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}
