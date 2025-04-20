import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <CssBaseline />
      <App />
  </StrictMode>
);

// to stop from opening inspect page
{/* <div onContextMenu={e=>e.preventDefault()}>
  <App/>
</div> */}