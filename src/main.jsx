import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Await, createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/MainLayout.jsx";
import hero from "./components/hero.jsx";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AuthProvider from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: async () => {
          const res = await fetch("http://localhost:5000/coffees");
          const data = await res.json();
          return data;
        },
        Component: hero,
      },

      { path: "/add_coffee", Component: AddCoffee },

      {
        path: "/coffee/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/coffees/${params.id}`);
          const data = await res.json();
          return data;
        },
        Component: UpdateCoffee,
      },
      {
        path: "/auth/login",
        Component: Login,
      },

      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
