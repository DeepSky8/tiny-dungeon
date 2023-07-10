import React, { useState } from "react";
import TapOpen from "../TapOpen";

const StyledMenu = ({
    menuID,
    selectStatement,
    missingTitle,
    array,
    arrayIDRef,
    arrayTitleRef,
    state,
    stateIDRef,
    onSelection
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const getTitle = () => {
        const object = array.find(element => element[`${arrayIDRef}`] === state[`${stateIDRef}`])
        const title = (object === undefined ? selectStatement : object[arrayTitleRef])
        return (title === '' ? missingTitle : title)
    }

    return (
        <div className="sMenu__container">
            <span
                id={menuID}
                onClick={toggleMenu}
                className={`sMenu__button`}>
                {getTitle()}
            </span>

            {
                menuOpen &&
                <span className="sMenu__tray">
                    {array.map(item => (
                        <li
                            key={item[`${arrayIDRef}`]}
                            className={`sMenu__option`}
                            onClick={() => {
                                onSelection(item);
                                toggleMenu();
                            }}
                        >
                            {(item[`${arrayTitleRef}`] === '' ? missingTitle : item[`${arrayTitleRef}`])}
                        </li>
                    )
                    )}
                </span>
            }
            <TapOpen />
        </div>
    )
}

export default StyledMenu

