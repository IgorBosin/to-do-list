import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/todolists-list/todolists/model/todolists.slice";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./todolists/ui/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTodolists } from "features/todolists-list/todolists/model/todolists.selectors";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, [fetchTodolists, isLoggedIn]);

  const addTodolistCallback = useCallback(
    (title: string) => {
      return addTodolist(title).unwrap();
    },
    [addTodolist],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
