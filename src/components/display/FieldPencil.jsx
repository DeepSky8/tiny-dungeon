import React from "react";


const Field = ({ label, aria = label, id, type, value, change, blur, theme, placeholder = '' }) => {
    return (
        <div className="field__container">
            <div className={`field__container--description ${theme}`}>
                <label
                    className={theme}
                    aria-label={aria}
                    htmlFor={id}
                >{label}</label>
            </div>
            <div className="field__container--input">

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
                    <div className="field__container--textarea">
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
                        <div className="material-symbols-outlined textarea--pencil">edit</div>
                    </div>
                }

                {type === 'text' &&
                    <div className="field__container--text">
                        <input
                            id={id}
                            className={`field--input ${theme}`}
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={change}
                            onBlur={blur}
                        />
                        <div className="material-symbols-outlined text--pencil">edit</div>
                    </div>
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

            </div>
        </div>

    )
}

export default Field