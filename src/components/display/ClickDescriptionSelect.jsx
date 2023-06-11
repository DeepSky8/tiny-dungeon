import React, { useState } from "react";


const ClickDescriptionSelect = (
    {
        itemID,
        title,
        description,
        changeHandler,
        isSelected,
    }
) => {
    const [show, setShow] = useState(false)

    return (
        <div className="clickDescriptionSelect__container">
            <div className="clickDescriptionSelect__heading--container">
                <input
                    className="clickDescriptionSelect__checkbox"
                    type="checkbox"
                    id={itemID}
                    name={title}
                    checked={isSelected}
                    onChange={() => {
                        changeHandler(itemID)
                    }}
                />
                <div
                    className="clickDescriptionSelect__heading--clickable"
                    onClick={() => {
                        setShow(!show)
                    }}
                >

                    <div
                        className="clickDescriptionSelect__heading--title"
                    >
                        {title}
                    </div>
                </div>
            </div>

            <div className="clickDescriptionSelect__container--description">
                {show &&
                    <div className="clickDescriptionSelect__description">
                        {description}
                    </div>
                }
            </div>
        </div>
    )
}

export default ClickDescriptionSelect

