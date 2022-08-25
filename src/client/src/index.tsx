import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { GameStatusProvider } from "./context/GameStatusProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GameStatusProvider>
        <App />
      </GameStatusProvider>
    </AuthProvider>
  </React.StrictMode>
);
