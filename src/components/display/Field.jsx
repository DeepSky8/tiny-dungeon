import React from "react";


const Field = ({ label, aria = label, id, type, value, change, blur, theme, placeholder = '' }) => {
    return (
        <div className="field__container">
            <span className={`field__container--description ${theme}`}>
                <label
                    aria-label={aria}
                    htmlFor={id}
                >{label}</label>
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
                    <textarea
                        rows='6'
                        cols='50'
                        id={id}
                        className={`field--input ${theme}`}
                        placeholder={placeholder}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                    />
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
                        className={`field--input--number ${theme}`}
                        type={type}
                        value={value}
                        onChange={change}
                        onBlur={blur}
                        placeholder={placeholder}
                    />
                }


            </span>
        </div>

    )
}

export default Field