"use client";

import React, { useContext } from "react";
import useSWR from "swr";
import { boardsFetcher } from "../util/fetcher";
import AddBoardModal from "./(Modals)/AddBoardModal";
import AppContext from "./(providers)/contextProvider";
import Boards from "./Boards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { showSidebar, selectedBoard } = useContext(AppContext);

  const { data: boards } = useSWR("/api/getBoards", boardsFetcher);

  console.log("boards", boards);

  return (
    <main className="grid grid-cols-10 grid-rows-1 min-h-screen min-w-full ">
      {showSidebar && <Sidebar boards={boards} />}
      <div
        className={`col-span-10 flex flex-col ${
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
