import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="header__container">
            <Link
            className="header__link"
                to={"/"}
            >
                <h3>Tiny Dungeon</h3>
            </Link>

        </div>
    )
}

export default Header