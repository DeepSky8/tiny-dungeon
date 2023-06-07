import React from "react";


const ModuleDisplay = ({ visibleState, jsx, }) => {
    return (
        <span className="moduleDisplay__container">
            {
                visibleState
                &&
                jsx
            }
        </span>

    )
}

export default ModuleDisplay
