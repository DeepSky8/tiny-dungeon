import React, { useReducer } from "react";
import { defaultTrait, traitReducer } from "../../reducers/traitReducer";

const CreateTrait = () => {
    const [trait, dispatchTrait] = useReducer(traitReducer, defaultTrait)

    return (
        <div>

            <div className="field__container">
                <span className={`field__container--description ${theme}`}>
                    <label htmlFor={id}>{label}</label>
                </span>
                <span className="field__container--input">
                    <input
                        id={id}
                        className={`field--input ${theme}`}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                    />
                </span>
            </div>


        </div>
    )
}

export default CreateTrait