import React, { useReducer, useState } from "react";
import { scrollReducer } from "../../reducers/scrollReducer";
import { startUpdateScrolls } from "../../actions/charActions";
import { auth } from "../../api/firebase";

const DisplayScroll = ({ char, scrollData }) => {
    // const [scroll] = useReducer(scrollReducer, scrollData)
    const [scroll, setScroll] = useState(scrollData)
    const [show, setShow] = useState(false)

    const incrementScroll = (scroll) => {
        const { sAmount } = scroll;
        const newAmount = sAmount + 1;
        return { ...scroll, sAmount: newAmount }
    }

    const decrementScroll = (scroll) => {
        const { sAmount } = scroll;
        const newAmount = sAmount - 1 > 0 ? sAmount - 1 : 0;
        return { ...scroll, sAmount: newAmount }
    }

    const increaseScroll = () => {
        const incrementedScroll = incrementScroll(scroll)

        setScroll(incrementedScroll)

        const updatedScrollArray = (
            (char.scrolls.filter(s => s.sID !== scroll.sID))
                .concat([incrementedScroll])
        )
        startUpdateScrolls({ uid: auth.currentUser.uid, charData: { ...char, scrolls: updatedScrollArray } })

    }

    const decreaseScroll = () => {
        const decrementedScroll = decrementScroll(scroll)

        setScroll(decrementedScroll)

        const updatedScrollArray = (
            (char.scrolls.filter(s => s.sID !== scroll.sID))
                .concat([decrementedScroll])
        )

        startUpdateScrolls({ uid: auth.currentUser.uid, charData: { ...char, scrolls: updatedScrollArray } })

    }

    return (
        <div className="displayScroll__container">
            <div className={`displayScroll__heading--container ` + (scroll.sAmount === 0 ? `faded` : '')}>
                <div
                    className={`displayScroll__heading--minus material-symbols-outlined empty medium`}
                    onClick={decreaseScroll}
                >
                    bookmark_remove
                </div>
                <div
                    className="displayScroll__heading--clickable"
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    <div className="displayScroll__heading--title">
                        {`${scroll.sAmount} ${scroll.sTitle}`}
                    </div>
                </div>
                <div
                    className={`displayScroll__heading--add material-symbols-outlined filled medium`}
                    onClick={increaseScroll}
                >
                    bookmark_add
                </div>
            </div>

            <div className="displayScroll__container--description">
                {show &&
                    <div className="displayScroll__description">
                        {scroll.sDescription}
                    </div>
                }
            </div>
        </div>
    )
}

export default DisplayScroll
