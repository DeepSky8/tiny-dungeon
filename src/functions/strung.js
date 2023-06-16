const strung = (array, character) => {
    let newString = ''
    array.forEach(element => {
        if (element.length > 0) {
            newString = newString + character + element
        }
    });
    return newString
}

export default strung