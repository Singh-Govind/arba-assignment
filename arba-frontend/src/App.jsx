import { useEffect } from "react";
import "./App.css";

import AllRoutes from "./pages/AllRoutes";
import useLocalUser from "./hooks/useLocalUser";
import { Box } from "@mui/material";

function App() {
  const { loginFromLocalStorage } = useLocalUser();

  useEffect(() => {
    loginFromLocalStorage();
  }, []);

  return (
    <Box>
      <AllRoutes />
    </Box>
  );
}

export default App;
