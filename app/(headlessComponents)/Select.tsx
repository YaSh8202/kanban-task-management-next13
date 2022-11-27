"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ChevronDownIcon from "public/assets/icon-chevron-down.svg";
import { Column } from "../../typings";

type Props = {
  options: Column[] | null;
  selected: Column | null;
  setSelected: (value: Column) => void;
};

export default function Select({ options, selected, setSelected }: Props) {

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none  focus-visible:ring-1 focus-visible:ring-gray-300 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm border-gray-200 dark:border-gray-600 border ">
          <span className="block truncate">{selected?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Image
              src={ChevronDownIcon}
              className="h-2 w-3 text-gray-400"
              alt="downIcon"
              // aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className=" relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-main dark:text-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options &&
              options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "text-primary font-medium bg-gray-200"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : ""
                        }`}
                      >
                        {person.name}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    // </div>
  );
}
