import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";
import "./App.css";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import Header from "app/ui/Header";
import AppRoutes from "app/routes/AppRoutes";

function App() {
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <Header />
        <Container fixed>
          <AppRoutes />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
