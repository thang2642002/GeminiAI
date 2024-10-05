import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/app.js";
import "./index.css";
import ChatDetails from "./pages/ChatDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="chat/info"/>,
      },
      {
        path: "chat/info",
        element: <ChatDetails />,
      },
      {
        path: "chat/:id",
        element: <ChatDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
