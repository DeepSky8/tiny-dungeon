import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="home__container">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home