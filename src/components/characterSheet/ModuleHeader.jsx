import React from "react";
import {
    closeFive,
    closeFour,
    closeOne,
    closeSeven,
    closeSix,
    closeThree,
    closeTwo,
    openFive,
    openFour,
    openOne,
    openSeven,
    openSix,
    openThree,
    openTwo
} from "../../actions/displayActions";

const ModuleHeader = ({ titleArray, fadeArray = [], maxPerRow = 3, show, dispatch, theme = '' }) => {
    const openActionArray = [
        openOne,
        openTwo,
        openThree,
        openFour,
        openFive,
        openSix,
        openSeven
    ]

    const closeActionArray = [
        closeOne,
        closeTwo,
        closeThree,
        closeFour,
        closeFive,
        closeSix,
        closeSeven
    ]

    const titleObjects = []
    const splitTitleObjects = []

    for (let index = 0; index < titleArray.length; index++) {
        titleObjects.push(
            {
                title: titleArray[index],
                displayKey: ('display' + (index + 1).toString()),
                open: openActionArray[index],
                close: closeActionArray[index]
            }
        )
    }

    // const numberOfRows = (titleObjects.length % maxPerRow === 0)
    //     ?
    //     (titleObjects.length / maxPerRow)
    //     :
    //     (Math.floor(titleObjects.length / maxPerRow) + 1);

    if (titleObjects.length > maxPerRow) {
        for (let index = 0; index < titleObjects.length; index += maxPerRow) {
            const row = titleObjects.slice(index, index + maxPerRow)
            splitTitleObjects.push(row)
        }
    } else {
        splitTitleObjects.push(titleObjects)
    }

    const accessible = (object) => {
        return !fadeArray.includes(object.title)
    }

    return (
        <div className="moduleHeader__container">
            {
                splitTitleObjects.map(objectRow => {
                    const spacing = objectRow.length === maxPerRow ? 'space-between' : 'space-around'
                    return (
                        <div
                            key={Math.random()}
                            className={`moduleHeader__row ${spacing}`}
                        >
                            {
                                objectRow.map(object => {
                                    return (
                                        <span
                                            key={object.displayKey}
                                            className={(accessible(object) ? '' : 'fade') + `${theme} moduleHeader__button ` + show[`${object.displayKey}`]}
                                            onClick={() => {
                                                if (accessible(object)) {
                                                    show[object.displayKey] ?
                                                        dispatch(object.close())
                                                        :
                                                        dispatch(object.open())
                                                }
                                            }}>{object.title}</span>
                                    )
                                })
                            }
                        </div>
                    )
                }

                )
            }
            <hr className="hr__brown" />
        </div>
    )
}

export default ModuleHeader


// objectRow.map(object => {
//     return (
//         <span
//             key={object.displayKey}
//             className={(accessible(object) ? '' : 'fade') + `${theme} moduleHeader__button ` + show[`${object.displayKey}`]}
//             onClick={() => {
//                 if (accessible(object)) {
//                     show[object.displayKey] ?
//                         dispatch(object.close())
//                         :
//                         dispatch(object.open())
//                 }
//             }}>{object.title}</span>
//     )
// })