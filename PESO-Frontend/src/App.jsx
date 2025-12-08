import React from "react";
import AppRoutes from "./router/AppRoutes";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Arimo", sans-serif`,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}
