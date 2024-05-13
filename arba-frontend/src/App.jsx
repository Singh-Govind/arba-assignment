import { useEffect } from "react";
import "./App.css";

import AllRoutes from "./pages/AllRoutes";
import useLocalUser from "./hooks/useLocalUser";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../therme";

function App() {
  const { loginFromLocalStorage } = useLocalUser();

  useEffect(() => {
    loginFromLocalStorage();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AllRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
