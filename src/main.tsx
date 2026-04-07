import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tokens/reset.css";
import "./tokens/tokens.css";
import "./tokens/global.css";
import App from "./App";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
