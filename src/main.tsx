import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { QueryProvider } from "./lib/query-provider";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <Router>
      <App />
    </Router>
  </QueryProvider>
);
