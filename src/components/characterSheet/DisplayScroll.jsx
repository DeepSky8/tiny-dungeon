import React, { useReducer, useState } from "react";
import { scrollReducer } from "../../reducers/scrollReducer";
// import ClickDescriptionCount from "../display/ClickDescriptionCount";
import { addScroll, minusScroll } from "../../actions/charActions";
import { decreaseSAmount, increaseSAmount } from "../../actions/scrollActions";

const DisplayScroll = ({ scrollData, dispatchChar }) => {
    const [scroll, dispatchScroll] = useReducer(scrollReducer, scrollData)
    const [show, setShow] = useState(false)


    const increaseScroll = () => {
        dispatchChar(addScroll(scroll))
        dispatchScroll(increaseSAmount())

    }

    const decreaseScroll = () => {
        dispatchChar(minusScroll(scroll))
        dispatchScroll(decreaseSAmount())
    }

    return (
        <div className="displayScroll__container">
            <div className="displayScroll__container">
                <div className={`displayScroll__heading--container ` + (scroll.sAmount === 0 ? `faded` : '')}>
                    <span
                        className={`displayScroll__heading--minus material-symbols-outlined empty medium`}
                        onClick={decreaseScroll}
                    >
                        bookmark_remove
                    </span>
                    <span
                        className="displayScroll__heading--clickable"
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        <span className="displayScroll__heading--title">
                            {`${scroll.sAmount} ${scroll.sTitle}`}
                        </span>
                    </span>
                    <span
                        className={`displayScroll__heading--add material-symbols-outlined filled medium`}
                        onClick={increaseScroll}
                    >
                        bookmark_add
                    </span>
                </div>

                <div className="displayScroll__container--description">
                    {show &&
                        <div className="displayScroll__description">
                            {scroll.sDescription}
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default DisplayScroll

// <ClickDescriptionCount
// title={scroll.sTitle}
// description={scroll.sDescription}
// amount={scroll.sAmount}
// increase={increaseScroll}
// decrease={decreaseScroll}
// />