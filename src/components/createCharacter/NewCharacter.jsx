import React, { useReducer } from "react";
import { charReducer, defaultChar } from "../../reducers/charReducer";
import { Outlet } from "react-router";

const NewCharacter = () => {
    const [char, dispatchChar] = useReducer(charReducer, defaultChar)

    return (
        <div className="newC__container">
            <div className="newC__spacer">
                <Outlet
                    context={[char, dispatchChar]}
                />
            </div>
        </div>
    )
}

export default NewCharacter