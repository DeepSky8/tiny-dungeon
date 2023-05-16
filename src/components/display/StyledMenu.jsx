import React, { useEffect, useState } from "react";
import { updateHeritageID } from "../../actions/charActions";

const StyledMenu = ({
    menuID,
    selectStatement,
    array,
    arrayIDRef,
    arrayTitleRef,
    state,
    dispatchState,
    stateIDRef,
    closeMenuArrayIDs,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    useEffect(() => {
        closeMenuArrayIDs.forEach(element => {
            if (document.getElementById(element)) {
                return (
                    document
                        .getElementById(element)
                        .addEventListener('click', closeMenu)
                )
            }
        });

        return (() => {
            closeMenuArrayIDs.forEach(element => {
                if (document.getElementById(element)) {
                    return (
                        document
                            .getElementById(element)
                            .removeEventListener('click', closeMenu)
                    )
                }
            });
        })
    }, [])

    const handleClick = (id) => {
        dispatchState(updateHeritageID(id))
        toggleMenu()
    }

    const getTitle = () => {
        const objectIndex = array.map(object => object[`${arrayIDRef}`]).indexOf(state[`${stateIDRef}`])
        const title = (objectIndex > -1 ? array[objectIndex][arrayTitleRef] : selectStatement)
        return title
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
                                handleClick(item[`${arrayIDRef}`])
                            }}
                        >
                            {item[`${arrayTitleRef}`]}
                        </li>
                    )
                    )}
                </span>
            }
        </div>
    )
}

export default StyledMenu

