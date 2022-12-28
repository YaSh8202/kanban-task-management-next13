"use client";

import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import MyModal from "../(headlessComponents)/ModalComponent";
import { useForm, Resolver, useFieldArray } from "react-hook-form";
import Image from "next/image";
import iconCross from "public/assets/icon-cross.svg";
import { useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import {
  boardsFetcher,
  columnsFetcher,
  TasksFetcher,
} from "../../util/fetcher";
import Select from "../(headlessComponents)/Select";
import AppContext from "../(providers)/contextProvider";
import { Column, Task } from "../../typings";
import { takeCoverage } from "v8";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  task: Task;
};

function ViewTaskModal({ isOpen, setIsOpen, task }: Props) {
  const { selectedBoard } = useContext(AppContext);
  const [taskState, setTaskState] = useState<Task>(task);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const {
    data: columns,
    error,
    mutate,
  } = useSWR(`/api/getColumns?boardId=${selectedBoard?.id}`, columnsFetcher);

  const initialColumn =
    columns &&
    (columns.filter((col) => col.name === task.status)[0] || columns[0]);
  const [selectedColumn, setSelectedColumn] =
    useState<Column | undefined>(initialColumn);

  const {
    data: prevColTasks,
    error: prevError,
    mutate: prevMutate,
  } = useSWR(
    `/api/tasks/${columns?.find((col) => col.name === task.status)?.id}`,
    TasksFetcher
  );
  const {
    data: newColTasks,
    error: newError,
    mutate: newMutate,
  } = useSWR(`/api/tasks/${selectedColumn?.id}`, TasksFetcher);
  const onClose = async () => {
    closeModal();

    const uploadTaskToUpstash = async () => {
      const res = await fetch("/api/tasks/editTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newColumnId: selectedColumn?.id,
          columnId: columns?.find((col) => col.name === task.status)?.id,
          task: { ...taskState, status: selectedColumn?.name },
        }),
      });
      const { task: newTask } = await res.json();
      return newTask;
    };
    const newTask = await uploadTaskToUpstash();

    await prevMutate();
    await newMutate();
  };

  const deleteTask = async () => {
    const deleteFromRedis = async () => {
      try {
        const res = await fetch("/api/tasks/deleteTask", {
          method: "DELETE",
          body: JSON.stringify({
            columnId: initialColumn?.id,
            taskId: task.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { tasks: newTasks } = await res.json();
        return newTasks;
      } catch (e) {
        console.log(e);
      }
    };
    prevMutate(deleteFromRedis, {
      optimisticData: prevColTasks?.filter((t) => t.id !== task.id),
      rollbackOnError: true,
    });
    closeModal();
  };

  return (
    <>
      <MyModal isOpen={isOpen} closeModal={onClose}>
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-dark-side p-6 text-left align-middle shadow-xl transition-all space-y-4 ">
          <div className="flex flex-row items-center justify-between">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50 mb-1 "
            >
              {taskState.title}
            </Dialog.Title>
            <button onClick={() => setIsDeleteModalOpen(true)}>
              <TrashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          </div>
          <div className="">
            <p className="text-gray-400 text-sm ">{taskState.description}</p>
          </div>
          <form>
            <label className="">
              Subtasks({taskState.subtasks.filter((s) => s.isCompleted).length}{" "}
              of {taskState.subtasks.length})
            </label>
            <div className="space-y-2 mt-2 ">
              {taskState.subtasks.map((sub) => (
                <div
                  className="flex items-center py-1.5 px-2 bg-light-main dark:bg-dark-main space-x-2 rounded-md"
                  key={sub.id}
                >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    checked={sub.isCompleted}
                    onChange={(e) => {
                      setTaskState((prev) => ({
                        ...prev,
                        subtasks: prev.subtasks.map((s) => {
                          if (s.id === sub.id) {
                            return {
                              ...s,
                              isCompleted: e.target.checked,
                            };
                          }
                          return s;
                        }),
                      }));
                    }}
                    className="w-4 h-4 text-primary  rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checked:bg-primary bg-primary "
                  />
                  <label>{sub.name}</label>
                </div>
              ))}
            </div>
          </form>
          <div>
            <label>Status</label>
            <Select
              selected={selectedColumn ?? null}
              setSelected={setSelectedColumn}
              options={columns ?? null}
            />
          </div>
        </Dialog.Panel>
      </MyModal>
      <MyModal
        isOpen={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white dark:bg-dark-side p-6 text-left align-middle shadow-xl transition-all space-y-4 flex flex-col ">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50 mb-1 "
          >
            Are you sure you want to delete this task?
          </Dialog.Title>
          <div className="ml-auto flex flex-row items-center self-end space-x-2 ">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
              }}
              className="text-gray-400 hover:text-gray-500 px-1 "
            >
              Cancel
            </button>
            <button
              onClick={deleteTask}
              className="text-red-400 hover:text-red-500 ml-2 px-1  "
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </MyModal>
    </>
  );
}

export default ViewTaskModal;
