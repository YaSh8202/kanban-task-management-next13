"use client";

import Image from "next/image";
import React, { useContext } from "react";
import addTaskMobile from "../public/assets/icon-add-task-mobile.svg";
import { Board } from "../typings";
import MenuComponent from "./(headlessComponents)/Menu";
import AppContext from "./(providers)/contextProvider";
import LogoMobile from "/public/assets/logo-mobile.svg";

type Props = {
  selectedBoard: Board | null;
};

function Navbar({ selectedBoard }: Props) {
  const { showSidebar, setShowSidebar } = useContext(AppContext);

  return (
    <nav className="h-20 flex w-full items-center border-b dark:border-gray-600 bg-white dark:bg-dark-side px-4 justify-between ">
      <div className="flex flex-row items-end">
        {!showSidebar && (
          // <button className="  rotate-90 " onClick={() => setShowSidebar(true)}>
          <Image
            onClick={() => setShowSidebar(true)}
            src={LogoMobile}
            alt="logoMobile"
            className="mr-3 rotate-90 "
          />
          // </button>
        )}
        <h2 className="text-gray-800 dark:text-white text-xl font-semibold ">
          {selectedBoard ? selectedBoard.name : "Kanban Board"}
        </h2>
      </div>
      <div className="flex flex-row items-center space-x-4 md:space-x-5">
        <button className=" bg-primary/90 px-3 md:px-4 py-2 text-white rounded-full hover:bg-primary hover:shadow-md hover:scale-105 duration-100 ">
          <Image
            src={addTaskMobile}
            alt="add Task"
            className="md:hidden w-4 h-4 "
          />
          <p className="hidden md:block font-medium  ">+Add New Task</p>
        </button>
        <MenuComponent />
      </div>
    </nav>
  );
}

export default Navbar;
