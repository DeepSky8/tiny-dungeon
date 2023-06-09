import React from "react";
import DisplayScroll from "./DisplayScroll";

const sortScrolls = (scrolls) => {
    return (scrolls.sort((a, b) => {
        if (a.sTitle < b.sTitle) { return -1 }
        if (a.sTitle > b.sTitle) { return 1 }
        return 0
    }))
}

const DisplayScrolls = ({ scrolls, dispatchChar }) => {
    const ownedScrolls = scrolls.filter(scroll => scroll.sAmount > 0)
    const usedScrolls = scrolls.filter(scroll => scroll.sAmount === 0)

    return (
        <div className="displayScrolls__container">
            {ownedScrolls.length > 0
                &&
                sortScrolls(ownedScrolls).map(scroll => {
                    return (
                        <DisplayScroll
                            key={scroll.sID}
                            scrollData={scroll}
                            dispatchChar={dispatchChar}
                        />
                    )
                })}
            <hr className="hr__brown" />
            {usedScrolls.length > 0
                &&
                sortScrolls(usedScrolls).map(scroll => {
                    return (
                        <DisplayScroll
                            key={scroll.sID}
                            scrollData={scroll}
                            dispatchChar={dispatchChar}
                        />
                    )
                })}
        </div>
    )
}

export default DisplayScrolls

