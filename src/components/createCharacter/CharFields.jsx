import React from "react";


const CharText = ({ label, id, type, value, placeholder, change, blur, theme, classNameTag }) => {
    return (
        <div className="charField__container">
            <span className={`charField__container--description ${theme}`}>
                <label htmlFor={id}>{label}</label>
            </span>
            <span className="charField__container--input">
                {type == 'text' &&
                    <input
                        id={id}
                        className={`charField--${classNameTag} ${theme}`}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={change}
                        onBlur={blur}
                    />
                }

                {type === 'textarea' &&
                    <textarea
                        rows='6'
                        cols='50'
                        id={id}
                        className={`charField--${classNameTag} ${theme}`}
                        value={value}
                        placeholder={placeholder}
                        onChange={change}
                        onBlur={blur}
                    />
                }

            </span>
        </div>

    )
}

export { CharText }

// <span className="field__container--input">
// <input
//     id={id}
//     className={`field--input ${theme}`}
//     type={type}
//     value={value}
//     onChange={change}
//     onBlur={blur}
// />