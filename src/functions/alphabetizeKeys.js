const alphabetizeKeys = ({ objectArray, key }) => {
    const sorted = objectArray.sort((a, b) => {
        if (a[key] < b[key]) { return -1 }
        if (a[key] > b[key]) { return 1 }
        return 0
    });

    return sorted
}

export default alphabetizeKeys