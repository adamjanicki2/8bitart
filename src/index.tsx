import React from "react";
import ReactDOM from "react-dom/client";
import "@adamjanicki/ui/style.css";
import "@adamjanicki/ui-extended/style.css";
import "tachyons/css/tachyons.min.css";
import "src/style.css";
import App from "src/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
