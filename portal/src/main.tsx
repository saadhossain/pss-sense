import ReactDOM from "react-dom/client";
import App from "./App";
import DataProvider from './context/AuthProvider';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DataProvider>
    <App />
  </DataProvider>
);
