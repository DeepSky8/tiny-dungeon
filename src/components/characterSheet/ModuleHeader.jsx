import React from "react";
import {
    closeFour,
    closeOne,
    closeThree,
    closeTwo,
    openFour,
    openOne,
    openThree,
    openTwo
} from "../../actions/displayActions";

const ModuleHeader = ({ titleArray, show, dispatch, theme = '' }) => {
    const openActionArray = [
        openOne,
        openTwo,
        openThree,
        openFour,
    ]

    const closeActionArray = [
        closeOne,
        closeTwo,
        closeThree,
        closeFour,
    ]

    const titleObjects = []

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


    // console.log('titleObjects', titleObjects)
    return (
        <div className="moduleHeader__container">
            {titleObjects.map(object => {
                return (
                    <span
                        key={object.displayKey}
                        className={`${theme} moduleHeader__button ` + show[`${object.displayKey}`]}
                        onClick={() => {
                            console.log('clicked', object)
                            show[object.displayKey] ?
                                dispatch(object.close())
                                :
                                dispatch(object.open())
                        }}>{object.title}</span>
                )
            })}


        </div>
    )
}

export default ModuleHeader

