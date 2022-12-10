"use client";
import React, { createContext, useState } from "react";
import { Board } from "../../typings";

const AppContext = createContext<{
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  showBoardModal: boolean;
  setShowBoardModal: (value: boolean) => void;
  showTaskModal: boolean;
  setShowTaskModal: (value: boolean) => void;
  selectedBoard: Board | null;
  setSelectedBoard: (value: Board | null) => void;
  showEditBoardModal: boolean;
  setShowEditBoardModal: (value: boolean) => void;
}>({
  showSidebar: true,
  setShowSidebar: (show: boolean) => {},
  showBoardModal: false,
  setShowBoardModal: (show: boolean) => {},
  showTaskModal: false,
  setShowTaskModal: (show: boolean) => {},
  selectedBoard: null,
  setSelectedBoard: (board: any) => {},
  showEditBoardModal: false,
  setShowEditBoardModal: (show: boolean) => {},
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
  const [selectedBoard, setSelectedBoard] = useState<null | Board>(null);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        showBoardModal,
        setShowBoardModal,
        showTaskModal,
        setShowTaskModal,
        selectedBoard,
        setSelectedBoard,
        showEditBoardModal,
        setShowEditBoardModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
