const alphabetizeNames = ({ objectArray, namePrefix }) => {
    const sortedNames = objectArray.sort((a, b) => {
        if (a[`${namePrefix}Name`] < b[`${namePrefix}Name`]) { return -1 }
        if (a[`${namePrefix}Name`] > b[`${namePrefix}Name`]) { return 1 }
        return 0
    });

    return sortedNames
}

export default alphabetizeNames