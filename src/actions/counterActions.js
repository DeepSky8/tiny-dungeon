export const addCounterItem = ({key, title}) => ({
    type: 'ADD_ITEM',
    key,
    title
})

export const clearCounters = () => ({
    type: 'CLEAR_COUNTERS'
})