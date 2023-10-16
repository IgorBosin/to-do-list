import React from "react";
import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth.slice";

const Header = () => {
  const { logout } = useActions(authThunks);

  const logoutHandler = () => logout();

  return (
    <Button color="inherit" onClick={logoutHandler}>
      Log out
    </Button>
  );
};

export default Header;
