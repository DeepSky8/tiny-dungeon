import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import Home from "../components/home/Home.jsx";
import CreateTrait from "../components/createItems/CreateTrait.jsx";
import CreateScroll from "../components/createItems/CreateScroll.jsx";
import CreateWeaponGroup from "../components/createItems/CreateWeaponGroup.jsx";
import NewCharacter from "../components/createCharacter/NewCharacter.jsx";
import CharName from "../components/createCharacter/CharName.jsx";
import DisplayTraits from "../components/editItems/DisplayTraits.jsx";
import CreateHeritage from "../components/createItems/CreateHeritage.jsx";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFoundPage />,
        element: <Home />,
        children: [
            {
                path: "/newCharacter",
                errorElement: <NotFoundPage />,
                element: <NewCharacter />,
                children: [
                    {
                        path: "/newCharacter/name",
                        errorElement: <NotFoundPage />,
                        element: <CharName />,
                    }
                ]
            },

        ]
    },
    {
        path: "/createTrait",
        errorElement: <NotFoundPage />,
        element: <CreateTrait />
    },
    {
        path: "/createHeritage",
        errorElement: <NotFoundPage />,
        element: <CreateHeritage />
    },
    {
        path: "/displayTraits",
        errorElement: <NotFoundPage />,
        element: <DisplayTraits />
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