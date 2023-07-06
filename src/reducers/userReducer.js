const defaultUserState = {
    uid: '',
    authProvider: '',
    email: '',
    admin: false,
    gm: false,
    lastAccess: Date.now(),
    dateCreated: Date.now(),
    gameSession: 0,
    currentCharID: '',
    charIDs: [],
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USER':
            return {
                ...defaultUserState,
                ...action.userData
            }
        case 'UPDATE_UID':
            return {
                ...defaultUserState,
                ...state,
                uid: action.uid
            }
        case 'CLEAR_USER':
            return {
                ...defaultUserState
            }
        default:
            return state
    }
}

export { defaultUserState, userReducer }