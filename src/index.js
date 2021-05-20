import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/Router";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppRouter />
    <ToastContainer
      position="top-right"
      hideProgressBar={true}
      autoClose={5000}
      newestOnTop={true}
      closeOnClick={true}
    />
  </StrictMode>,
  rootElement
);
