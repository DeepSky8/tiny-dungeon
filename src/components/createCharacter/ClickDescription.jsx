import React from "react";


const ClickDescription = (
    {
        show,
        dispatch,
        display,
        closeAction,
        openAction,
        headerText,
        bodyText
    }
) => {
    const clickFor = 'Click for '

    return (
        <div className="clickDescription__container">
            <div
                className="clickDescription__heading"
                onClick={() => {
                    show[display] ?
                        dispatch(closeAction())
                        :
                        dispatch(openAction())
                }}
            >{show[display] ? "" : clickFor}{headerText}</div>
            {show[display] &&
                <span className="clickDescription__description">
                    {bodyText}
                </span>
            }
        </div>
    )
}

export default ClickDescription