import React from "react";
import Boards from "./Boards";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <main className="grid grid-cols-10 grid-rows-1 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className=" col-span-12 md:col-span-8  " >
        <Navbar />
        <Boards />
      </div>
    </main>
  );
}

export default Dashboard;
