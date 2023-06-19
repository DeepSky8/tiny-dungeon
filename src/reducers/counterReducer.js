const defaultCounter = {
    pairs: [
        // {
        // key: 
        // amount: 
        // title:
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
            const itemExists = state.pairs.find(pair => pair.key === action.key)
            const itemToAdd = (
                itemExists
                    ?
                    {
                        key: action.key,
                        amount: itemExists.amount + 1,
                        title: itemExists.title
                    }
                    :
                    {
                        key: action.key,
                        amount: 1,
                        title: action.title
                    }
            )

            const updatedPairs = (
                state.pairs.filter(pair => pair.key !== action.key)
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