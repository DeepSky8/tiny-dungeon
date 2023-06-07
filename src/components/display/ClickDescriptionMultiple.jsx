import React, { useState } from "react";


const ClickDescriptionMultiple = (
    {
        title,
        description,
    }
) => {
    const [show, setShow] = useState(false)

    return (
        <div className="clickDescriptionSelect__container">
            <div className="clickDescriptionSelect__heading--container">

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

export default ClickDescriptionMultiple



