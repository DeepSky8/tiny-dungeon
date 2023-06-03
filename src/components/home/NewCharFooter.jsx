import React from "react";


const NewCharFooter = ({ state, handleClickBack, handleClickNext }) => {
    const beginning = (state.currentStep === 'heritage' ? 'beginning' : '');
    return (
        <div className="newCharFooter__container">
            <button
                onClick={handleClickBack}
                className={`newCharFooter__button--back ${beginning}`}
                disabled={beginning}
            >Back</button>
            <button
                className="newCharFooter__button--next"
                onClick={handleClickNext}
            >{state.buttonText}</button>

        </div>
    )
}

export default NewCharFooter