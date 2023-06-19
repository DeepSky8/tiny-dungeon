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
import CharacterSheet from "../components/characterSheet/CharacterSheet.jsx";
import DisplayWeaponGroups from "../components/editItems/DisplayWeaponGroups.jsx";
import CreateWeapon from "../components/createItems/CreateWeapon.jsx";
import DisplayWeapons from "../components/editItems/DisplayWeapons.jsx";
import DisplayScrolls from "../components/editItems/DisplayScrolls.jsx";
import Welcome from "../components/home/Welcome.jsx";
import Attribution from "../components/home/Attribution.jsx";
import AuthCode from "../components/authenticate/AuthCode.jsx";
import AuthWrapper from "../components/authenticate/AuthWrapper.jsx";
import AuthWrapperCreate from "../components/authenticate/AuthWrapperCreate.jsx";
import AdminPage from "../components/admin/AdminPage.jsx";
import AdminCode from "../components/admin/AdminCode.jsx";
import AuthPage from "../components/authenticate/AuthPage.jsx";
import RegisterPage from "../components/authenticate/RegisterPage.jsx";
import ResetPage from "../components/authenticate/ResetPage.jsx";
import Settings from "../components/admin/Settings.jsx";
import CharactersOverview from "../components/gameMom/CharactersOverview.jsx";

const AppRouter = createBrowserRouter([

    {
        path: "/",
        errorElement: <NotFoundPage />,
        element: <Home />,
        children: [
            {
                index: true,
                errorElement: <NotFoundPage />,
                element: <Welcome />,

            },
            {
                path: '/settings',
                errorElement: <NotFoundPage />,
                element: <Settings />,
            },
            {
                path: "/attribution",
                errorElement: <NotFoundPage />,
                element: <Attribution />
            },
            {
                path: "/authenticate/:back?",
                errorElement: <NotFoundPage />,
                element: <AuthPage />
            },
            {
                path: "/register/:back?",
                errorElement: <NotFoundPage />,
                element: <RegisterPage />
            },
            {
                path: "/reset/:back?",
                errorElement: <NotFoundPage />,
                element: <ResetPage />
            },
            {
                path: "/join/:passthrough?",
                errorElement: <NotFoundPage />,
                element: <AuthCode />
            },
            {
                path: "/settings/:back?",
                errorElement: <NotFoundPage />,
                element: <Settings />
            },
            {
                element: <AuthWrapper />,
                children: [
                    {
                        path: "/newCharacter",
                        errorElement: <NotFoundPage />,
                        element: <NewCharacter />,
                        children: [
                            {
                                path: "heritage",
                                errorElement: <NotFoundPage />,
                                element: <CharHeritage />,
                            },
                            {
                                path: "traits",
                                errorElement: <NotFoundPage />,
                                element: <CharTraits />,
                            },
                            {
                                path: "weaponGroup",
                                errorElement: <NotFoundPage />,
                                element: <CharWeaponGroup />,
                            },
                            {
                                path: "weapon",
                                errorElement: <NotFoundPage />,
                                element: <CharWeapon />,
                            },
                            {
                                path: "familiar",
                                errorElement: <NotFoundPage />,
                                element: <CharFamiliar />,
                            },
                            {
                                path: "backstory",
                                errorElement: <NotFoundPage />,
                                element: <CharBackstory />,
                            },
                        ]
                    },
                    {
                        path: "/characterSheet",
                        errorElement: <NotFoundPage />,
                        element: <CharacterSheet />,

                    },
                ]
            },
            {
                path: '/adminAccess',
                errorElement: <NotFoundPage />,
                element: <AdminCode />,
            },
            {
                element: <AuthWrapperCreate />,
                errorElement: <NotFoundPage />,
                children: [
                    {
                        path: '/admin',
                        element: <AdminPage />,
                        errorElement: <NotFoundPage />,
                        children: [
                            {
                                path: 'gameMom',
                                element: <CharactersOverview />,
                                errorElement: <NotFoundPage />,
                            },
                            {
                                path: "createTrait",
                                errorElement: <NotFoundPage />,
                                element: <CreateTrait />
                            },
                            {
                                path: "createHeritage",
                                errorElement: <NotFoundPage />,
                                element: <CreateHeritage />
                            },
                            {
                                path: "displayTraits",
                                errorElement: <NotFoundPage />,
                                element: <DisplayTraits />
                            },
                            {
                                path: "displayHeritages",
                                errorElement: <NotFoundPage />,
                                element: <DisplayHeritages />
                            },
                            {
                                path: "displayWeaponGroups",
                                errorElement: <NotFoundPage />,
                                element: <DisplayWeaponGroups />
                            },
                            {
                                path: "displayWeapons",
                                errorElement: <NotFoundPage />,
                                element: <DisplayWeapons />
                            },
                            {
                                path: "displayScrolls",
                                errorElement: <NotFoundPage />,
                                element: <DisplayScrolls />
                            },
                            {
                                path: "createScroll",
                                errorElement: <NotFoundPage />,
                                element: <CreateScroll />
                            },
                            {
                                path: "createWeaponGroup",
                                errorElement: <NotFoundPage />,
                                element: <CreateWeaponGroup />
                            },
                            {
                                path: "createWeapon",
                                errorElement: <NotFoundPage />,
                                element: <CreateWeapon />
                            },
                        ]
                    },

                ]
            },
        ]
    },



])

export default AppRouter