"use client";

import React, { useContext } from "react";
import AppContext from "./(providers)/contextProvider";
import Boards from "./Boards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { showSidebar } = useContext(AppContext);

  return (
    <main className="grid grid-cols-10 grid-rows-1 h-screen w-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <div
        className={`col-span-10  ${
          showSidebar ? "md:col-span-8" : "md:col-span-10"
        }    `}
      >
        <Navbar />
        <Boards />
      </div>
    </main>
  );
}

export default Dashboard;
