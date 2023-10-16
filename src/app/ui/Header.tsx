import React from "react";
import { useSelector } from "react-redux";
import { AppBar, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus } from "app/app.selectors";
import LogoutButton from "app/ui/LogoutButton";

const Header = () => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">News</Typography>
        {isLoggedIn && <LogoutButton />}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};

export default Header;
