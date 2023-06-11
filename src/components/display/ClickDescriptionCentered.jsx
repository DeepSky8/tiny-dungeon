import React, { useState } from "react";


const ClickDescriptionCentered = (
    {
        title,
        description,
    }
) => {
    const [show, setShow] = useState(false)

    return (
        <div className="clickDescriptionCentered__container">
            <div className="clickDescriptionCentered__heading--container">

                <div
                    className="clickDescriptionCentered__heading--clickable"
                    onClick={() => {
                        setShow(!show)
                    }}
                >

                    <div
                        className="clickDescriptionCentered__heading--title"
                    >
                        {title}
                    </div>
                </div>
            </div>

            <div className="clickDescriptionCentered__container--description">
                {show &&
                    <div className="clickDescriptionCentered__description">
                        {description}
                    </div>
                }
            </div>
        </div>
    )
}

export default ClickDescriptionCentered



