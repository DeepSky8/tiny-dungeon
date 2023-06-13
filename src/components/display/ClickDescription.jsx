import React from "react";


const ClickDescription = (
    {
        show,
        dispatch,
        displayKey,
        closeAction,
        openAction,
        headerText,
        bodyText
    }
) => {
    const clickFor = 'Tap for '

    return (
        <div className="clickDescription__container">
            <div
                className="clickDescription__heading"
                onClick={() => {
                    show[displayKey] ?
                        dispatch(closeAction())
                        :
                        dispatch(openAction())
                }}
            >{headerText}
            </div>

            <div className="clickDescription__container--description">
                {show[displayKey] &&
                    <span className="clickDescription__description">
                        {bodyText}
                    </span>
                }
            </div>
        </div>
    )
}

export default ClickDescription

// {show[displayKey] ? "" : clickFor}{headerText}