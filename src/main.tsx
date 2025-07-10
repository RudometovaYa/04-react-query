import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/* import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; */
import "./index.css";
import App from "./components/App/App";
// Нормалізація стилів
import "modern-normalize";
// Глобальні стилі (додатково)
/* import "./global.css"; */

// src/main.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
