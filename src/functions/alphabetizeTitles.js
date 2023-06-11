const alphabetizeTitles = ({ objectArray, titlePrefix }) => {
    const sortedTitles = objectArray.sort((a, b) => {
        if (a[`${titlePrefix}Title`] < b[`${titlePrefix}Title`]) { return -1 }
        if (a[`${titlePrefix}Title`] > b[`${titlePrefix}Title`]) { return 1 }
        return 0
    });

    return sortedTitles
}

export default alphabetizeTitles