import React from "react";
import DisplayScroll from "./DisplayScroll";
import TapOpen from "../TapOpen";
import DisplayRational from "../createCharacter/DisplayRational";

const sortScrolls = (scrolls) => {
    return (scrolls.sort((a, b) => {
        if (a.sTitle < b.sTitle) { return -1 }
        if (a.sTitle > b.sTitle) { return 1 }
        return 0
    }))
}

const DisplayScrolls = ({ char }) => {
    const ownedScrolls = char.scrolls.filter(scroll => scroll.sAmount > 0)
    const usedScrolls = char.scrolls.filter(scroll => scroll.sAmount === 0)

    return (
        <div className="displayScrolls__container">
            <div className="charSheet__display--title centered bold">Scrolls</div>

            <TapOpen />
            {ownedScrolls.length > 0
                &&
                sortScrolls(ownedScrolls).map(scroll => {
                    return (
                        <DisplayScroll
                            key={scroll.sID}
                            char={char}
                            scrollData={scroll}
                        />
                    )
                })}
            <DisplayRational
                stage="scrolls"
            />
            <hr className="hr__brown" />
            {usedScrolls.length > 0
                &&
                sortScrolls(usedScrolls).map(scroll => {
                    return (
                        <DisplayScroll
                            key={scroll.sID}
                            char={char}
                            scrollData={scroll}
                        />
                    )
                })}
        </div>
    )
}

export default DisplayScrolls

