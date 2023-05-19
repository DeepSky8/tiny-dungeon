import React from "react";


const NewCharFooter = ({ nextStep, handleClickNext }) => {
    return (
        <div className="newCharFooter__container">
            <button
                onClick={handleClickNext}
            >{nextStep.buttonText}</button>

        </div>
    )
}

export default NewCharFooter