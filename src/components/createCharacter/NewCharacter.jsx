import React, { useReducer } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet } from "react-router";

const NewCharacter = () => {
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)

    return (
        <div className="newC__container">
            <Outlet />
        </div>
    )
}

export default NewCharacter