import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Wumble from "./projects/Wumble/Wumble.jsx";
import ErrorPage from "./error.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "../node_modules/@chakra-ui/react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <ErrorPage />,
  },
  {
    path: "wumble",
    element: <Wumble />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
