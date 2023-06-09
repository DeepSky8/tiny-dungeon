const defaultScroll = {
    sID: '',
    sTitle: '',
    sDescription: '',
    sAmount: 1
}

const scrollReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SCROLL':
            return {
                ...action.scroll
            }
        case 'CLEAR_SCROLL':
            return {
                ...defaultScroll
            }
        case 'UPDATE_SID':
            return {
                ...state,
                sID: action.sID
            }
        case 'UPDATE_STITLE':
            return {
                ...state,
                sTitle: action.sTitle
            }
        case 'UPDATE_SDESCRIPTION':
            return {
                ...state,
                sDescription: action.sDescription
            }
        case 'UPDATE_SAMOUNT':
            return {
                ...state,
                sAmount: action.sAmount
            }
        case 'INCREASE_SAMOUNT':
            return {
                ...state,
                sAmount: state.sAmount + 1
            }
        case 'DECREASE_SAMOUNT':
            const decreased = state.sAmount - 1
            const updatedSAmount = decreased >= 0 ? decreased : 0
            return {
                ...state,
                sAmount: updatedSAmount
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultScroll, scrollReducer }