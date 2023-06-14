import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="header__container">
            <Link
                className="header__link"
                to={"/"}
            >
                <img
                    className="header__castle--image"
                    src="src\assets\castle-brown-small.png"
                    alt="brown castle tower with door"
                />
                <img
                    className="header__logo--image"
                    src="src\assets\TinyDungeonLogo.png"
                    alt="Tiny Dungeon logo"
                />
                <img
                    className="header__castle--image"
                    src="src\assets\castle-brown-small.png"
                    alt="brown castle tower with door"
                />
            </Link>

        </div>
    )
}

export default Header

//                 <div className="material-symbols-outlined filled float-left">home</div>
//                 <div className="title">Tiny Dungeon</div>
