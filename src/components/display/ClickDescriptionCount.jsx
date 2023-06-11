import React, { useState } from "react";


const ClickDescriptionCount = (
    {
        title,
        description,
        amount,
        increase,
        decrease
    }
) => {
    const [show, setShow] = useState(false)

    return (
        <div className="clickDescriptionCount__container">
            <div className="clickDescriptionCount__heading--container">
                <span
                    className={`clickDescriptionCount__heading--minus material-symbols-outlined empty medium`}
                    onClick={decrease}
                >
                    bookmark_remove
                </span>
                <span
                    className="clickDescriptionCount__heading--clickable"
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    <span className="clickDescriptionCount__heading--title">
                        {`${amount} ${title}`}
                    </span>
                </span>
                <span
                    className={`clickDescriptionCount__heading--add material-symbols-outlined filled medium`}
                    onClick={increase}
                >
                    bookmark_add
                </span>
            </div>

            <div className="clickDescriptionCount__container--description">
                {show &&
                    <div className="clickDescriptionCount__description">
                        {description}
                    </div>
                }
            </div>
        </div>
    )
}

export default ClickDescriptionCount



