import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {


    return (
        <div className="welcome__container">

            <div className="welcome__container--logo"            >
                <img className="welcome__logo--image" alt='Tiny Dungeon logo' src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/TinyDungeonLogo.png?alt=media&token=b9381aef-c3ca-4a3f-beb8-4760d4517e46" />
            </div>

            <div className="welcome__container--button">
                <Link to={'/newCharacter/heritage'}>
                    <img className="welcome__creation--button" alt='Character Creation button' src="src\assets\creation-centered-transparent-brown.png" />
                </Link>
            </div>
            <div className="welcome__container--button">

                <Link to={'/characterSheet'}>
                    <img className="welcome__creation--button" alt='Character Creation button' src="src\assets\characterSheet-button-transparent-brown.png" />
                </Link>
            </div>

            <div className="welcome__container--attribution">
                <Link
                    className="welcome__attribution--link"
                    to={'/attribution'}
                >Attribution</Link>
            </div>
        </div>
    )
}

export default Welcome