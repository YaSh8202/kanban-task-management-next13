"use client";

import Image from "next/image";
import React, { Fragment, useContext, useEffect, useState } from "react";
import darkLogo from "../public/logo-dark.svg";
import lightLogo from "../public/assets/logo-light.svg";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import MemoIconBoard from "./(iconsSvgr)/IconBoard";
import AppContext from "./(providers)/contextProvider";
import { Board } from "../typings";
import { Transition } from "@headlessui/react";

type Props = {
  boards: Board[] | undefined;
};

function Sidebar({ boards }: Props) {
  const {
    setShowSidebar,
    setSelectedBoard,
    selectedBoard,
    setShowBoardModal,
    showSidebar,
  } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(showSidebar);

  function addNewBoard() {
    setShowBoardModal(true);
  }

  function resetSidebar() {
    setIsOpen(false);
    setTimeout(() => {
    setShowSidebar(false);
    }, 300);
  }

  useEffect(() => {
    setIsOpen(showSidebar);
  }, [showSidebar]);

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <aside className=" bg-clip-border absolute md:relative w-4/5 md:w-auto z-10 flex flex-col h-full items-start  md:col-span-2 py-3 border-r dark:border-gray-600 bg-white dark:bg-dark-side shadow">
        <div className="ml-4 lg:ml-6 h-12 flex items-center pr-4 ">
          <Link href="/" className=" relative w-32 h-6  ">
            <Image
              alt="logo"
              src={darkLogo}
              layout={"fill"}
              className="block dark:hidden"
            />
            <Image
              alt="logo"
              src={lightLogo}
              layout={"fill"}
              className="hidden dark:block"
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col mt-6 items-start justify-between w-full px-5  ">
          <div className="flex flex-col w-full  ">
            <p className="text-gray-600 dark:text-gray-400 font-medium text-xs tracking-widest ">
              ALL BOARDS ({boards?.length})
            </p>
            <div className="mt-3 flex flex-col space-y-1 ">
              {boards ? (
                boards
                  .sort((a, b) => {
                    return a.name?.localeCompare(b.name);
                  })
                  .map((board) => (
                    <button
                      key={board.id}
                      onClick={() => {
                        setSelectedBoard(board);
                        if (window.innerWidth < 768) setShowSidebar(false);
                      }}
                      className={` rounded-r-full  py-2.5 w-full text-left pl-5 flex flex-row items-center space-x-2 ml-[-20px] ${
                        selectedBoard && selectedBoard.id === board.id
                          ? "bg-primary text-white "
                          : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 "
                      }  `}
                    >
                      <MemoIconBoard className="text-inherit" />
                      <p className="font-semibold">{board.name}</p>
                    </button>
                  ))
              ) : (
                <p>Loading...</p>
              )}
              <button
                onClick={addNewBoard}
                className=" rounded-r-full  py-2.5 w-full text-left pl-5 flex flex-row items-center space-x-2 ml-[-20px] text-primary  duration-100 hover:brightness-125 "
              >
                <MemoIconBoard className="text-primary" />
                <p>+Create New Board</p>
              </button>
            </div>
          </div>
          <div className="w-full">
            <ThemeSwitch />
            <button
              onClick={resetSidebar}
              className="mt-4 mb-6 flex items-center space-x-2  "
            >
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                  className="fill-gray-600 dark:fill-dark-gray"
                />
              </svg>
              <p className="text-gray-600 dark:text-dark-gray text-sm ">
                Hide Sidebar
              </p>
            </button>
          </div>
        </div>
      </aside>
    </Transition>
  );
}

export default Sidebar;
