import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { DifficultyProvider } from "./context/DifficultyLevel";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DifficultyProvider>
      <RouterProvider router={router}></RouterProvider>
    </DifficultyProvider>
  </React.StrictMode>,
);
