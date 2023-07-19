import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "../node_modules/@chakra-ui/react";
import "./index.css";

const breakpoints = {
  sm: "500px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
