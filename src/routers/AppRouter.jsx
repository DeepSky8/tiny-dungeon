import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import Home from "../components/home/Home.jsx";
import CreateTrait from "../components/createItems/createTrait.jsx";
import CreateScroll from "../components/createItems/createScroll.jsx";
import CreateWeaponGroup from "../components/createItems/createWeaponGroup.jsx";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFoundPage />,
        element: <Home />
    },
    {
        path: "/createTrait",
        errorElement: <NotFoundPage />,
        element: <CreateTrait />
    },
    {
        path: "/createScroll",
        errorElement: <NotFoundPage />,
        element: <CreateScroll />
    },
    {
        path: "/createWeaponGroup",
        errorElement: <NotFoundPage />,
        element: <CreateWeaponGroup />
    }
])

export default AppRouter 