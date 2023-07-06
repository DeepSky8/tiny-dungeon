

const incrementedScroll = (scroll) => {
    const { sAmount } = scroll;
    const newAmount = sAmount + 1;
    return { ...scroll, sAmount: newAmount }
}


// Accepts a total number of scrolls with a count of zero
// and the number of scrolls to increment by one
// Returns the total array of scrolls, with the specified number incremented
const addScrolls = (scrollArray, numberToAdd) => {
    let updatedScrolls = scrollArray;

    for (let index = 0; index <= numberToAdd; index++) {
        const randomIndex = Math.floor(Math.random() * scrollArray.length)
        const randomScroll = updatedScrolls[randomIndex]
        const newScroll = incrementedScroll(randomScroll)
        const newlyUpdatedScrolls = (updatedScrolls.filter(scroll => scroll.sID !== newScroll.sID)).concat([newScroll])
        updatedScrolls = newlyUpdatedScrolls
    }

    return updatedScrolls
}

export default addScrolls