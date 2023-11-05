import React from "react";
import { useRoutes } from "react-router-dom";
import CardHeroes from "./Pages/CardHeroes";
import HomePage from "./Pages/HomePage";

function AppRouter() {
  const routes = useRoutes([
    { path: "/cardHeroes", element: <CardHeroes /> },
    { path: "/", element: <HomePage /> },
  ]);

  return routes;
}

export default AppRouter;
