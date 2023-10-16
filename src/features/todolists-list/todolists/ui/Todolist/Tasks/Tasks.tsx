import React, { FC } from "react";
import { Task } from "features/todolists-list/todolists/ui/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice";
import { useSelector } from "react-redux";
import { selectTasks } from "features/todolists-list/tasks/model/tasks.selectors";

type Props = {
  todolist: TodolistDomainType;
};

const Tasks: FC<Props> = ({todolist}) => {
  const tasks = useSelector(selectTasks)[todolist.id]

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task
          key={t.id}
          task={t}
          todolistId={todolist.id}
        />
      ))}
    </div>
  );
};

export default Tasks;