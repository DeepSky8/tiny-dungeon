import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

const Welcome = () => {
    let navigate = useNavigate();
    const [localChar,] = useLocalStorageState('localChar')
    const [charCreated, setCharCreated] = useState(false)

    useEffect(() => {
        if (
            (localChar !== undefined)
            &&
            (localChar.charName.length > 0 && localChar.trade.length > 0 & localChar.belief.length > 0)
        ) {
            setCharCreated(true)
        } else {
            setCharCreated(false)
        }
    }, [localChar])

    const charSheetClick = () => {
        if (
            (localChar !== undefined)
            &&
            (localChar.charName.length > 0 && localChar.trade.length > 0 & localChar.belief.length > 0)
        ) {
            navigate('/characterSheet')
        }
    }


    return (
        <div className="welcome__container">

            <div className="welcome__container--logo"            >
                <img
                    className="welcome__logo--image"
                    alt='Tiny Dungeon logo'
                    src="https://firebasestorage.googleapis.com/v0/b/tinydungeon-85b41.appspot.com/o/TinyDungeonLogo.png?alt=media&token=b9381aef-c3ca-4a3f-beb8-4760d4517e46" />
            </div>
            <div className="welcome__container--buttons">
                <div className="welcome__container--button">
                    <Link to={'/newCharacter/heritage'}>
                        <img
                            className="welcome__creation--button"
                            alt='Character Creation button'
                            src="src\assets\creation-centered-transparent-brown.png" />
                    </Link>
                </div>

                <div className="welcome__container--button">
                    <div
                        onClick={charSheetClick}
                        className=""
                    >
                        <img className={`welcome__creation--button ` + (charCreated ? "" : 'faded')} alt='Character Creation button' src="src\assets\characterSheet-button-transparent-brown.png" />
                    </div>
                </div>
            </div>

            <div className="welcome__container--attribution">
                <Link
                    className="welcome__attribution--link"
                    to={'/attribution'}
                >
                    Attribution
                </Link>
            </div>
        </div>
    )
}

export default Welcome