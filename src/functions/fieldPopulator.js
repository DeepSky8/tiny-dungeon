const fieldPopulator = ({ state, dispatchState, objectArray }) => {
    const fieldFieldsArray = []
    objectArray.map(({ label, id, type, action, blur }) => {
        const fieldFieldsObject = {
            key: id,
            label,
            id,
            type,
            value: state[`${id}`],
            change: (e) => {
                dispatchState(action(e.target.value))
            },
            blur: () => {
                if (id.replace(/^./,"") === 'Description') {
                    const formatValue = state[`${id}`].replace(/[\n\r]/gm, ' ');
                    dispatchState(action(formatValue))
                }
            },
        }
        fieldFieldsArray.push(fieldFieldsObject)
    })


    return fieldFieldsArray;
}

export default fieldPopulator