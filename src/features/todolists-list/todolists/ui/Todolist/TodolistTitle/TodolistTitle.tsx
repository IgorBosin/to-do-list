import React, {FC, useCallback} from 'react';
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "common/hooks";
import {TodolistDomainType, todolistsThunks} from "features/todolists-list/todolists/model/todolists.slice";

type Props = {
  todolist: TodolistDomainType;
};

const TodolistTitle: FC<Props> = ({todolist}) => {
  const {removeTodolist, changeTodolistTitle,} = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  };

  const changeTodolistTitleCallback = useCallback((title: string) => {
    changeTodolistTitle({id: todolist.id, title});
  }, [changeTodolistTitle, todolist.id])

  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <Delete/>
      </IconButton>
    </h3>
  );
};

export default TodolistTitle;