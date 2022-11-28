"use client";

import { Dialog } from "@headlessui/react";
import React, { useContext, useState } from "react";
import MyModal from "../(headlessComponents)/ModalComponent";
import { useForm, Resolver, useFieldArray } from "react-hook-form";
import Image from "next/image";
import iconCross from "public/assets/icon-cross.svg";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import {
  columnsFetcher,
  TasksFetcher,
} from "../../util/fetcher";
import Select from "../(headlessComponents)/Select";
import AppContext from "../(providers)/contextProvider";
import { Column } from "../../typings";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type FormValues = {
  title: string;
  description: string;
  subtasks: { name: string }[];
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "Task title is required",
          },
        }
      : {},
    //   : values.columns.length === 0
    //   ? {
    //       columns: {
    //         type: "required",
    //         message: "Please add at least 1 column",
    //       },
    //     }
    //   : values.columns.some((column) => !column.name)
    //   ? {
    //       columns: {
    //         type: "required",
    //         message: "Column name is required",
    //       },
    //     }
    //   : {},
  };
};

function AddTaskModal({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ name: "" }],
    },
  });
  const { selectedBoard } = useContext(AppContext);
  const {
    data: columns,
    error,
    mutate,
  } = useSWR(["/api/getColumns", selectedBoard?.id], columnsFetcher);

  const [selectedColumn, setSelectedColumn] = useState<Column | null>(
    columns ? columns[0] : null
  );

  const {
    data: tasks,
    error: taskError,
    mutate: taskMutate,
  } = useSWR(`/api/tasks/${selectedColumn?.id}`, TasksFetcher);

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
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
    const clientTask = {
      boardId: selectedBoard?.id,
      columnId: selectedColumn?.id,
      task: {
        ...data,
        id: uuid(),
        status: selectedColumn?.name,
        subtasks: data.subtasks.map((subtask) => ({
          ...subtask,
          id: uuid(),
          isCompleted: false,
        })),
      },
    };

    const uploadTaskToUpstash = async () => {
      const newTask = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientTask),
      });
      const { task } = await newTask.json();
      return [...tasks!, task];
    };

    await taskMutate(uploadTaskToUpstash, {
      optimisticData: [...tasks!, clientTask.task],
      rollbackOnError: true,
    });
    // alert(JSON.stringify({ ...data, status: selectedColumn }));
    reset();
  });

  return (
    <MyModal
      isOpen={isOpen}
      closeModal={() => {
        setIsOpen(false);
      }}
    >
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-side p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50 "
        >
          Add New Task
        </Dialog.Title>
        <form className="mt-3 flex flex-col space-y-4 " onSubmit={onSubmit}>
          <div className="flex flex-col space-y-0.5 ">
            <label className="text-sm text-gray-600 font-medium dark:text-gray-300 ">
              Title
            </label>
            <input
              className="px-3 py-2 border border-gray-200 rounded-md placeholder:text-sm dark:border-gray-600 outline-none bg-transparent"
              {...register("title")}
              placeholder="e.g. Take Coffee break"
            />
            {errors?.title && (
              <p className="text-red-400 text-xs ">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-0.5 ">
            <label className="text-sm text-gray-600 font-medium dark:text-gray-300 ">
              Description
            </label>
            <textarea
              className="px-3 py-2 border border-gray-200 rounded-md placeholder:text-sm dark:border-gray-600 outline-none bg-transparent"
              {...register("description")}
              placeholder="e.g. Take Coffee break"
            />
            {errors?.title && (
              <p className="text-red-400 text-xs ">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="text-sm mb-1 text-gray-600 font-medium dark:text-gray-300 ">
              Subtasks
            </label>

            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex flex-row items-center space-x-2 pb-3"
                >
                  <input
                    className="px-3 py-2 border border-gray-200 rounded-md placeholder:text-sm dark:border-gray-600 outline-none bg-transparent flex-1 "
                    {...register(`subtasks.${index}.name`)}
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

            {errors.subtasks && (
              <p className="text-red-400 text-sm">{errors.subtasks?.message}</p>
            )}
            <button
              type="button"
              onClick={() => {
                append({ name: "" });
              }}
              className="bg-white text-primary w-full py-1.5 rounded-full font-semibold hover:bg-light-main dark:hover:bg-gray-300 duration-100  "
            >
              +Add New Subtask
            </button>
          </div>
          <div className="flex flex-col space-y-0.5 ">
            <label className="text-sm text-gray-600 font-medium dark:text-gray-300 ">
              Status
            </label>
            <Select
              selected={selectedColumn}
              setSelected={setSelectedColumn}
              options={columns ? columns : null}
            />
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

export default AddTaskModal;
