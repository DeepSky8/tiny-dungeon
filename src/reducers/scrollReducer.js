const defaultScroll = {
    sID: '',
    sName: '',
    sText: '',
}

const scrollReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SCROLL':
            return {
                ...action.scroll
            }
        case 'UPDATE_SID':
            return {
                ...state,
                sID: action.sID
            }
        case 'UPDATE_SNAME':
            return {
                ...state,
                sName: action.sName
            }
        case 'UPDATE_TEXT':
            return {
                ...state,
                sText: action.sText
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultScroll, scrollReducer}