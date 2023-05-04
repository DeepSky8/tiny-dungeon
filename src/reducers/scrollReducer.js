const defaultScroll = {
    sID: '',
    sName: '',
    sText: '',
    sCount: 1,
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
        case 'UPDATE_COUNT':
            return {
                ...state,
                sCount: action.sCount
            }
        case 'INCREMENT_COUNT':
            return {
                ...state,
                sCount: state.sCount + 1
            }
        case 'DECREMENT_COUNT':
            return {
                ...state,
                sCount: state.sCount - 1
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultScroll, scrollReducer}