import React from "react";


const Field = ({ label, id, type, value, change, blur, theme }) => {
    return (
        <div className="field__container">
            <span className={`field__container--description ${theme}`}>
                <label htmlFor={id}>{label}</label>
            </span>
            <span className="field__container--input">
                {type === 'textarea'
                    ?
                    <textarea
                        rows='6'
                        cols='50'
                        id={id}
                        className={`field--input ${theme}`}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                    />
                    :
                    <input
                        id={id}
                        className={`field--input ${theme}`}
                        type={type}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                    />
                }

            </span>
        </div>

    )
}

export default Field

// <span className="field__container--input">
// <input
//     id={id}
//     className={`field--input ${theme}`}
//     type={type}
//     value={value}
//     onChange={change}
//     onBlur={blur}
// />