import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UseWalletProvider } from "use-wallet";
import { connectors } from "./components/connectors";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UseWalletProvider connectors={connectors}>
      <App />
    </UseWalletProvider>
  </React.StrictMode>
);
