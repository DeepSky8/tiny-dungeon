import {
    closeEight,
    closeFive,
    closeFour,
    closeNine,
    closeOne,
    closeSeven,
    closeSix,
    closeThree,
    closeTwo,
    openEight,
    openFive,
    openFour,
    openNine,
    openOne,
    openSeven,
    openSix,
    openThree,
    openTwo
} from "../actions/displayActions"


const addDisplayActions = (menuObjects) => {

    const openActionArray = [
        openOne,
        openTwo,
        openThree,
        openFour,
        openFive,
        openSix,
        openSeven,
        openEight,
        openNine
    ]

    const closeActionArray = [
        closeOne,
        closeTwo,
        closeThree,
        closeFour,
        closeFive,
        closeSix,
        closeSeven,
        closeEight,
        closeNine
    ]

    const actionableMenuObjects = []

    for (let index = 0; index < menuObjects.length; index++) {
        actionableMenuObjects.push(
            {
                title: menuObjects[index]['title'],
                displayKey: ('display' + (index + 1).toString()),
                open: openActionArray[index],
                close: closeActionArray[index],
                display: menuObjects[index]['display']
            }
        )
    }

    return (actionableMenuObjects)

}

export default addDisplayActions