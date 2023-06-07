import React from "react";


const Field = ({ label, id, type, value, change, blur, theme, placeholder = '' }) => {
    return (
        <div className="field__container">
            <span className={`field__container--description ${theme}`}>
                <label htmlFor={id}>{label}</label>
            </span>
            <span className="field__container--input">

                {type === 'checkbox' &&
                    <input
                        id={id}
                        className={`field--input ${theme}`}
                        type={type}
                        checked={value}
                        onChange={change}
                        onBlur={blur}
                    />
                }


                {type === 'textarea' &&
                    <span>
                        <textarea
                            rows='4'
                            // cols='50'
                            id={id}
                            className={`field--input ${theme}`}
                            placeholder={placeholder}
                            value={value}
                            onChange={change}
                            onBlur={blur}
                        />
                        <span className="material-symbols-outlined pencil">edit</span>
                    </span>
                }

                {type === 'text' &&
                    <input
                        id={id}
                        className={`field--input ${theme}`}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                    />
                }

                {type === 'number' &&
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