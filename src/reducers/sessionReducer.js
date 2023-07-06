
const defaultSession = {
    initialScrolls: 4,
    initialTraits: 3,
    initialGold: 10,
}



const sessionReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SESSION':
            return {
                ...defaultSession,
                ...state,
                ...action.session
            }
        default:
            return {
                ...state
            }
    }
}

export { sessionReducer, defaultSession }