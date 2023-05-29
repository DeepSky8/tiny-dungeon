import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import Home from "../components/home/Home.jsx";
import CreateTrait from "../components/createItems/CreateTrait.jsx";
import CreateScroll from "../components/createItems/CreateScroll.jsx";
import CreateWeaponGroup from "../components/createItems/CreateWeaponGroup.jsx";
import NewCharacter from "../components/createCharacter/NewCharacter.jsx";
import DisplayTraits from "../components/editItems/DisplayTraits.jsx";
import CreateHeritage from "../components/createItems/CreateHeritage.jsx";
import DisplayHeritages from "../components/editItems/DisplayHeritages.jsx";
import CharHeritage from "../components/createCharacter/heritage/CharHeritage.jsx";
import CharTraits from "../components/createCharacter/traits/CharTraits.jsx";
import CharWeaponGroup from "../components/createCharacter/weaponGroup/CharWeaponGroup.jsx";
import CharWeapon from "../components/createCharacter/weaponGroup/CharWeapon.jsx";
import CharBackstory from "../components/createCharacter/backstory/CharBackstory.jsx";
import CharFamiliar from "../components/createCharacter/familiar/CharFamiliar.jsx";
import DisplayCharacter from "../components/displayCharacter/DisplayCharacter.jsx";
import DisplayWeaponGroups from "../components/editItems/DisplayWeaponGroups.jsx";
import CreateWeapon from "../components/createItems/CreateWeapon.jsx";
import DisplayWeapons from "../components/editItems/DisplayWeapons.jsx";

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
                        path: "/newCharacter/heritage",
                        errorElement: <NotFoundPage />,
                        element: <CharHeritage />,
                    },
                    {
                        path: "/newCharacter/traits",
                        errorElement: <NotFoundPage />,
                        element: <CharTraits />,
                    },
                    {
                        path: "/newCharacter/weaponGroup",
                        errorElement: <NotFoundPage />,
                        element: <CharWeaponGroup />,
                    },
                    {
                        path: "/newCharacter/weapon",
                        errorElement: <NotFoundPage />,
                        element: <CharWeapon />,
                    },
                    {
                        path: "/newCharacter/familiar",
                        errorElement: <NotFoundPage />,
                        element: <CharFamiliar />,
                    },
                    {
                        path: "/newCharacter/backstory",
                        errorElement: <NotFoundPage />,
                        element: <CharBackstory />,
                    },
                ]
            },
            {
                path: "/displayCharacter",
                errorElement: <NotFoundPage />,
                element: <DisplayCharacter />,

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
        path: "/displayHeritages",
        errorElement: <NotFoundPage />,
        element: <DisplayHeritages />
    },
    {
        path: "/displayWeaponGroups",
        errorElement: <NotFoundPage />,
        element: <DisplayWeaponGroups />
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
    },
    {
        path: "/createWeapon",
        errorElement: <NotFoundPage />,
        element: <CreateWeapon />
    },
    {
        path: "/displayWeapons",
        errorElement: <NotFoundPage />,
        element: <DisplayWeapons />
    },
])

export default AppRouter 