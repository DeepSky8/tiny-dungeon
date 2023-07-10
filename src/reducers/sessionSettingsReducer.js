
const defaultSessionSettings = {
    initialScrolls: 4,
    initialTraits: 3,
}



const sessionSettingsReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SESSION':
            return {
                ...defaultSessionSettings,
                ...state,
                ...action.session
            }
        default:
            return {
                ...state
            }
    }
}

export { sessionSettingsReducer, defaultSessionSettings }