import React, { useEffect, useReducer } from "react";
import { counterReducer, defaultCounter } from "../../reducers/counterReducer";
import { addCounterItem, clearCounters } from "../../actions/counterActions";
import ClickDescriptionCount from "../display/ClickDescriptionCount";
import alphabetizeKeys from "../../functions/alphabetizeKeys";


const ScrollsOverview = ({ characters, scrolls }) => {
    const [countedScrolls, dispatchCountedScrolls] = useReducer(counterReducer, defaultCounter)

    useEffect(() => {
        dispatchCountedScrolls(clearCounters())

        characters.forEach(character => {
            if (character.scrolls) {
                character.scrolls.forEach(scroll => {
                    if (scroll.sAmount > 0) {
                        for (let index = 1; index <= scroll.sAmount; index++) {
                            dispatchCountedScrolls(addCounterItem({ key: scroll.sID, title: scroll.sTitle }))
                        }
                    }
                })
            }
        });


    }, [characters])

    return (
        <div className="traitsOverview__container">
            {alphabetizeKeys({ objectArray: countedScrolls.pairs, key: 'title' }).map(countedScroll => {
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



// alphabetizeKeys({ objectArray: countedScrolls.pairs, key: 'title' })

// return (
//     <ClickDescriptionCount
//         key={countedScroll.key}
//         title={thisScroll.sTitle}
//         description={thisScroll.sDescription}
//         amount={countedScroll.amount}
//         increase={() => { }}
//         decrease={() => { }}
//     />
// )