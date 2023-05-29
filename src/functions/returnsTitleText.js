const returnsTitleText = ({ array, titlePrefix, removeArray = [''] }) => {
    const titles = array.map(element => element[`${titlePrefix}Title`])
    const filteredTitles = titles.filter(title => !removeArray.includes(title))

    const result = (
        filteredTitles.length == 1
            ?
            filteredTitles[0]
            :
            filteredTitles.length > 1
                ?
                [
                    filteredTitles
                        .slice(0, filteredTitles.length - 1)
                        .join(", "),
                    filteredTitles[filteredTitles.length - 1]
                ]
                    .join(" and ")
                :
                'no '
    )

    return result
}

export default returnsTitleText