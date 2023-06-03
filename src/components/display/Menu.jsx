import React from "react";


const Menu = (
    {
        label,
        aria = label,
        id,
        change,
        blur,
        theme,
        keyID,
        selectObject = {
            default: 'default',
        },
        array,
        displayID
    }
) => {
    const fullArray = (
        selectObject.default === undefined && selectObject[`${keyID}`].slice(0, 11) === 'menuDefault'
            ?
            [selectObject].concat(array)
            :
            array

    )
    return (
        <div className="menu__container">
            <span className={`menu__container--description ${theme}`}>
                <label
                    aria-label={aria}
                    htmlFor={id}>
                    {label}
                </label>
            </span>
            <select
                className="menu__select"
                name={id}
                id={id}
                onChange={change}
                onBlur={blur}
            >
                {array.length > 0 &&
                    (fullArray.map((option) => {
                        return (
                            <option
                                key={option[`${keyID}`]}
                                id={option[`${keyID}`]}
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