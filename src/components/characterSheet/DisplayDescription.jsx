import React from "react";
import DisplayHeritage from "./DisplayHeritage";

const DisplayDescription = ({ char, heritage }) => {


    // Eventually add more story-driven fields in the Display Heritage section
    // such as Homeland, Age, eyes/hair
    return (
        <div className="displayDescription__container">
            <DisplayHeritage
                char={char}
                heritage={heritage}
            />
        </div>
    )
}

export default DisplayDescription