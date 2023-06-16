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
                    <span className="field__container--textarea">
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
                        <span className="material-symbols-outlined textarea--pencil">edit</span>
                    </span>
                }

                {type === 'text' &&
                    <span className="field__container--text">
                        <input
                            id={id}
                            className={`field--input ${theme}`}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={change}
                            onBlur={blur}
                        />
                        <span className="material-symbols-outlined text--pencil">edit</span>
                    </span>
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