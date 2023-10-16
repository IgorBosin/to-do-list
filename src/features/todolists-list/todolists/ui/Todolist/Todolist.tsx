import React, { FC, memo, useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import FilterTasksButtons from "features/todolists-list/todolists/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import Tasks from "features/todolists-list/todolists/ui/Todolist/Tasks/Tasks";
import TodolistTitle from "features/todolists-list/todolists/ui/Todolist/TodolistTitle/TodolistTitle";
import s from './Todolist.module.css'

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist: FC<Props> = memo(({ todolist }) => {
  const { addTask, fetchTasks } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, [fetchTasks, todolist.id]);

  const addTaskCallBack = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [addTask, todolist.id],
  );

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </>
  );
});
