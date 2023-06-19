import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";


const ScrollsOverview = ({ characters, scrolls }) => {
    const [countedScrolls, dispatchCountedScrolls] = useReducer(counterReducer, defaultCounter)

    useEffect(() => {
        dispatchCountedScrolls(clearCounters())

        characters.forEach(character => {
            character.scrolls.forEach(scroll => {

                if (scroll.sAmount > 0) {
                    for (let index = 1; index <= scroll.sAmount; index++) {
                        dispatchCountedScrolls(addCounterItem(scroll.sID))
                    }
                }
            })
        });
    }, [characters])

    return (
        <div className="traitsOverview__container">
            {countedScrolls.pairs.map(countedScroll => {
                const thisScroll = scrolls.find(scroll => scroll.sID === countedScroll.key)
                return (
                    <ClickDescriptionCount
                        key={countedScroll.key}
                        title={thisScroll.sTitle}
                        description={thisScroll.sDescription}
                        amount={countedScroll.amount}
                        increase={() => { }}
                        decrease={() => { }}
                    />
                )
            })}
        </div>
    )
}

export default ScrollsOverview




