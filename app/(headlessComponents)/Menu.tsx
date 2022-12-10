"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import AppContext from "../(providers)/contextProvider";

export default function MenuComponent() {
  const { data: session } = useSession();
  const { setShowEditBoardModal } = useContext(AppContext);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-1 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-primary border-gray-400 shadow-lg ring ring-black ring-opacity-5 focus:outline-none   ">
          <div className="px-1 py-1  ">
            <Menu.Item>
              {({ active }) => (
                <div
                  // onClick={() => signOut()}
                  className={`${
                    active
                      ? "bg-primary text-white cursor-default "
                      : "text-gray-900 bg-white dark:text-gray-100 dark:bg-dark-side/80 "
                  } group flex w-full items-center  px-2 py-2 text-sm font-semibold  `}
                >
                  {session && (
                    <div className="flex flex-row items-center overflow-hidden space-x-1.5 ">
                      <Image
                        width={24}
                        height={24}
                        src={session?.user?.image!}
                        alt="user"
                        className=" rounded-full"
                      />
                      <p title={session.user?.name || ""} className="truncate">
                        {session.user?.name}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setShowEditBoardModal(true);
                  }}
                  className={`${
                    active
                      ? "bg-primary text-white"
                      : "text-gray-900 bg-white dark:text-gray-100 dark:bg-dark-side/80 "
                  } group flex w-full items-center  px-2 py-2 text-sm font-semibold  `}
                >
                  Edit Board
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active
                      ? "bg-primary text-white"
                      : "text-gray-900 bg-white dark:text-gray-100 dark:bg-dark-side/80 "
                  } group flex w-full items-center px-2 py-2 text-sm font-semibold  `}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
