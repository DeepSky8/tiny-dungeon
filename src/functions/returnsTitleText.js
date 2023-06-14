const returnsTitleText = ({ array1, type1 = ' weapons', array2, type2 = ' attacks', titlePrefix, removeArray = [''] }) => {
    const no = 'no '

    const titles1 = array1.map(element => element[`${titlePrefix}Title`])
    const filteredTitles1 = titles1.filter(title => !removeArray.includes(title))

    const titles2 = array2.map(element => element[`${titlePrefix}Title`])
    const filteredTitles2 = titles2.filter(title => !removeArray.includes(title))

    const joinedTitles1 = (
        filteredTitles1.length == 1
            ?
            filteredTitles1[0]
            :
            filteredTitles1.length > 1
                ?
                [
                    filteredTitles1
                        .slice(0, filteredTitles1.length - 1)
                        .join(", "),
                    filteredTitles1[filteredTitles1.length - 1]
                ]
                    .join(" and ")
                :
                no
    )

    const joinedTitles2 = (
        filteredTitles2.length == 1
            ?
            filteredTitles2[0]
            :
            filteredTitles2.length > 1
                ?
                [
                    filteredTitles2
                        .slice(0, filteredTitles2.length - 1)
                        .join(", "),
                    filteredTitles2[filteredTitles2.length - 1]
                ]
                    .join(" and ")
                :
                no
    )
    return (
        joinedTitles2 === no
            ?
            joinedTitles1 + type1
            :
            [(joinedTitles1 + type1), (joinedTitles2 + type2)].join(", and ")

    )
}

export default returnsTitleText