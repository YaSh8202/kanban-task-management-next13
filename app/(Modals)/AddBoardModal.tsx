"use client";

import { Dialog } from "@headlessui/react";
import React, { useContext } from "react";
import MyModal from "../(headlessComponents)/ModalComponent";
import { useForm, Resolver, useFieldArray } from "react-hook-form";
import Image from "next/image";
import iconCross from "public/assets/icon-cross.svg";
import { useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import { boardsFetcher } from "../../util/fetcher";
import AppContext from "../(providers)/contextProvider";

type Props = {
  data?: {
    id: string;
    name: string;
    columns: {
      id: string;
      name: string;
    }[];
  };
};

type FormValues = {
  name: string;
  columns: {
    name: string;
  }[];
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Board Name is required",
          },
        }
      : values.columns.length === 0
      ? {
          columns: {
            type: "required",
            message: "Please add at least 1 column",
          },
        }
      : values.columns.some((column) => !column.name)
      ? {
          columns: {
            type: "required",
            message: "Column name is required",
          },
        }
      : {},
  };
};

function AddBoardModal({ data }: Props) {
  const {
    showBoardModal: isOpen,
    setShowBoardModal: setIsOpen,
    setSelectedBoard,
  } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: "",
      columns: [{ name: "" }],
    },
  });
  const { data: session } = useSession();
  const {
    data: boards,
    error,
    mutate,
  } = useSWR("/api/getBoards", boardsFetcher);

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
    rules: {
      required: "Please add at least 1 column",
      validate: (value) => value.length > 0 || "Please add at least 1 column",
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = handleSubmit(async (data) => {
    closeModal();
    const clientBoard = {
      id: uuid(),
      name: data.name,
      columns: data.columns.map((col) => uuid()),
    };

    const uploadBoardToUpstash = async () => {
      const newBoard = await fetch("/api/addBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          board: {
            name: data.name,
            id: clientBoard.id,
            columns: data.columns.map((col, i) => ({
              id: clientBoard.columns[i],
              name: col.name,
              tasks: [],
            })),
          },
        }),
      });
      const { board } = await newBoard.json();
      return [board, ...boards!];
    };
    await mutate(uploadBoardToUpstash, {
      optimisticData: [...boards!, clientBoard],
      rollbackOnError: true,
    });
    setSelectedBoard(clientBoard);

    reset();
  });

  return (
    <MyModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-side p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50 "
        >
          Add New Board
        </Dialog.Title>
        <form
          role={"newBoardForm"}
          className="mt-3 flex flex-col space-y-4 "
          onSubmit={onSubmit}
        >
          <div className="flex flex-col space-y-0.5 ">
            <label className="text-sm text-gray-600 font-medium dark:text-gray-300 ">
              Board Name
            </label>
            <input
              className="px-3 py-2 border border-gray-200 rounded-md placeholder:text-sm dark:border-gray-600 outline-none bg-transparent"
              {...register("name")}
              placeholder="e.g. Web Design"
            />
            {errors?.name && (
              <p className="text-red-400 text-xs ">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="text-sm mb-1 text-gray-600 font-medium dark:text-gray-300 ">
              Board Columns
            </label>

            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex flex-row items-center space-x-2 pb-3"
                >
                  <input
                    className="px-3 py-2 border border-gray-200 rounded-md placeholder:text-sm dark:border-gray-600 outline-none bg-transparent flex-1 "
                    {...register(`columns.${index}.name`)}
                    placeholder="e.g. Web Design"
                  />
                  <button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <Image src={iconCross} alt="cross" />
                  </button>
                </div>
              );
            })}

            {errors.columns && (
              <p className="text-red-400 text-sm">{errors.columns?.message}</p>
            )}
            <button
              type="button"
              data-cy={"addColumn"}
              onClick={() => {
                append({ name: "" });
              }}
              className="bg-transparent text-primary w-full py-1.5 rounded-full font-semibold hover:bg-light-main dark:hover:bg-gray-300 duration-100  "
            >
              +Add New Column
            </button>
          </div>

          <button
            className="bg-primary text-white w-full py-1.5 rounded-full font-semibold opacity-90 hover:opacity-100 duration-100"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Dialog.Panel>
    </MyModal>
  );
}

export default AddBoardModal;
