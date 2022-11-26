"use client";
import React, { createContext, useState } from "react";

const AppContext = createContext({
  showSidebar: true,
  setShowSidebar: (show: boolean) => {},
  showBoardModal: false,
  setShowBoardModal: (show: boolean) => {},
  showTaskModal: false,
  setShowTaskModal: (show: boolean) => {},
});

export default AppContext;

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        showBoardModal,
        setShowBoardModal,
        showTaskModal,
        setShowTaskModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
