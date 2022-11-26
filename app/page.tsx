"use client";

import React, { useContext } from "react";
import useSWR from "swr";
import { boardsFetcher } from "../util/fetcher";
import AppContext from "./(providers)/contextProvider";
import Boards from "./Boards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { showSidebar, selectedBoard } = useContext(AppContext);

  const {
    data: boards,
    error,
    mutate,
  } = useSWR("/api/getBoards", boardsFetcher);

  return (
    <main className="grid grid-cols-10 grid-rows-1 h-screen w-screen overflow-hidden">
      {showSidebar && <Sidebar boards={boards} />}
      <div
        className={`col-span-10  ${
          showSidebar ? "md:col-span-8" : "md:col-span-10"
        }    `}
      >
        <Navbar selectedBoard={selectedBoard} />
        <Boards />
      </div>
    </main>
  );
}

export default Dashboard;
