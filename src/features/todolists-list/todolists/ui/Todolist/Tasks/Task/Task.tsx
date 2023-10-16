import React, { ChangeEvent, FC } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.slice";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import s from "features/todolists-list/todolists/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = React.memo(({ task: { id: taskId, status, title }, todolistId }) => {
  const { updateTask, removeTask: removeTaskThunk } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTaskThunk({ taskId, todolistId });
  };

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId, todolistId, domainModel: { status } });
  };

  const changeTitleHandler = (newValue: string) => {
    updateTask({ taskId, todolistId, domainModel: { title: newValue } });
  };

  return (
    <div key={taskId} className={status === TaskStatuses.Completed ? `${s.completed} ${s.container} ` : s.container}>
      <Checkbox checked={status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />
      <div className={s.spanCont}>
        <EditableSpan value={title} onChange={changeTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
