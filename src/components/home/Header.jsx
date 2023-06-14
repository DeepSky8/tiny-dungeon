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
                    src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/castle-brown-small.png?alt=media&token=6b326e88-0c75-4d48-9b52-eba362a06fe2"
                    alt="brown castle tower with door"
                />
                <img
                    className="header__logo--image"
                    src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/TinyDungeonLogo.png?alt=media&token=b9381aef-c3ca-4a3f-beb8-4760d4517e46"
                    alt="Tiny Dungeon logo"
                />
                <img
                    className="header__castle--image"
                    src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/castle-brown-small.png?alt=media&token=6b326e88-0c75-4d48-9b52-eba362a06fe2"
                    alt="brown castle tower with door"
                />
            </Link>

        </div>
    )
}

export default Header

//                 <div className="material-symbols-outlined filled float-left">home</div>
//                 <div className="title">Tiny Dungeon</div>
