const defaultUserState = {
    authProvider: '',
    email: '',
    uid: false,
    admin: false,
    gm: false,
    session: 0,
    charID:"",
    lastAccess: 0,
    dateCreated: 0,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USER':
            return {
                ...defaultUserState,
                ...action.userData
            }
        case 'UPDATE_ADMIN':
            return {
                ...defaultUserState,
                ...state,
                admin: action.admin
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