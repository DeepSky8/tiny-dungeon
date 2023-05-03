import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import Home from "../components/home/Home.jsx";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFoundPage />,
        element: <Home />
    }
])

export default AppRouter 