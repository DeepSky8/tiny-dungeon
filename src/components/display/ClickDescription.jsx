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
                    <div className="clickDescription__description">
                        {bodyText}
                    </div>
                }
            </div>
        </div>
    )
}

export default ClickDescription