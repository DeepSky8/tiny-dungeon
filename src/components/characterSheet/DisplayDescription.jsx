import React from "react";
import DisplayHeritage from "./DisplayHeritage";

const DisplayDescription = ({ char, dispatchChar, heritage }) => {


    // Eventually add more story-driven fields in the Display Heritage section
    // such as Homeland, Age, eyes/hair
    return (
        <div className="displayDescription__container">
            <DisplayHeritage
                heritage={heritage}
                trade={char.trade}
                dispatchChar={dispatchChar}
            />
        </div>
    )
}

export default DisplayDescription