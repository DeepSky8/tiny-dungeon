import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";

const Home = () => {
    return (
        <div className="home__container">
            <Header />
            <Outlet />
        </div>
    )
}

export default Home