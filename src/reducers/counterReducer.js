const defaultCounter = {
    pairs: [
        // {
        // key: 
        // amount: 
        // }
    ]
}

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_COUNTERS':
            return {
                ...defaultCounter
            }
        case 'ADD_ITEM':
            const itemExists = state.pairs.find(pair => pair.key === action.item)
            const itemToAdd = (
                itemExists
                    ?
                    {
                        key: action.item,
                        amount: itemExists.amount + 1
                    }
                    :
                    {
                        key: action.item,
                        amount: 1
                    }
            )

            const updatedPairs = (
                state.pairs.filter(pair => pair.key !== action.item)
                    .concat([itemToAdd])
            )

            return {
                pairs: updatedPairs
            }

        default:
            return {
                ...state
            }
    }
}

export { counterReducer, defaultCounter }