"use client";

import React, { useContext } from "react";
import useSWR from "swr";
import { boardsFetcher } from "../util/fetcher";
import AddBoardModal from "./(Modals)/AddBoardModal";
import EditBoardModal from "./(Modals)/EditBoardModal";
import AppContext from "./(providers)/contextProvider";
import Boards from "./Boards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { showSidebar, selectedBoard } = useContext(AppContext);

  const { data: boards } = useSWR("/api/getBoards", boardsFetcher);

  return (
    <main className="grid grid-cols-10 grid-rows-1 h-screen w-screen ">
      <Sidebar boards={boards} />
      <div
        className={`col-span-10 flex flex-col h-full transition-all duration-300 ${
          showSidebar ? "md:col-span-8" : "md:col-span-10"
        }    `}
      >
        <Navbar selectedBoard={selectedBoard} />
        <Boards />
        <AddBoardModal />
      </div>
    </main>
  );
}

export default Dashboard;
