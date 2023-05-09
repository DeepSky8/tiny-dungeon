const fieldPopulator = ({ state, dispatchState, objectArray }) => {
    const fieldFieldsArray = []
    objectArray.map(({ label, id, type, action, blur }) => {
        const fieldFieldsObject = {
            key: id,
            label,
            id,
            type,
            value: state[`${id}`],
            checked: state[`${id}`],
            change: (e) => {
                dispatchState(action(e.target.value))
            },
            blur
        }
        fieldFieldsArray.push(fieldFieldsObject)
    })


    return fieldFieldsArray;
}

export default fieldPopulator

// : () => {
//     if (id === 'tDescription') {
//         const formatValue = state.tDescription.replace(/[\n\r]/gm, ' ');
//         dispatchState(action(formatValue))
//     }
// },