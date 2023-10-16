import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/todolists-list/TodolistsList";

function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<TodolistsList />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
