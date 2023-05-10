import React from "react";


const Menu = ({ label, id, change, blur, theme, array, keyID, displayID }) => {
    return (
        <div className="field__container">
            <span className={`field__container--description ${theme}`}>
                <label htmlFor={id}>{label}</label>
            </span>
            <select
                name={id}
                id={id}
                onChange={change}
                onBlur={blur}
            >
                {array.length > 0 &&
                    (array.map((option) => {

                        return (
                            <option
                                key={option[`${keyID}`]}
                                value={option[`${keyID}`]}
                            >
                                {option[`${displayID}`]}
                            </option>
                        )
                    }))}

            </select>
        </div>
    )
}

export default Menu

// <span className="field__container--input">
// <input
//     id={id}
//     className={`field--input ${theme}`}
//     type={type}
//     value={value}
//     onChange={change}
//     onBlur={blur}
// />


// <span className="field__container--input">

// {type === 'checkbox' &&
//     <input
//         id={id}
//         className={`field--input ${theme}`}
//         type={type}
//         checked={value}
//         onChange={change}
//         onBlur={blur}
//     />
// }


// {type === 'textarea' &&
//     <textarea
//         rows='6'
//         cols='50'
//         id={id}
//         className={`field--input ${theme}`}
//         value={value}
//         onChange={change}
//         onBlur={blur}
//     />
// }

// {type === 'text' &&
//     <input
//         id={id}
//         className={`field--input ${theme}`}
//         type={type}
//         value={value}
//         onChange={change}
//         onBlur={blur}
//     />
// }

// {type === 'number' &&
//     <input
//         id={id}
//         className={`field--input ${theme}`}
//         type={type}
//         value={value}
//         onChange={change}
//         onBlur={blur}
//     />
// }


// </span>