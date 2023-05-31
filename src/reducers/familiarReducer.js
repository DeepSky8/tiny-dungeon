const defaultFamiliar = {
    fID: 'familiar',
    fName: '',
    fCharID: '',
    fDescription: ''
}

const familiarReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FAMILIAR':
            return {
                ...action.familiar
            }
        case 'UPDATE_FID':
            return {
                ...state,
                fID: action.fID
            }
        case 'UPDATE_FNAME':
            return {
                ...state,
                fName: action.fName
            }
        case 'UPDATE_FCHARID':
            return {
                ...state,
                fCharID: action.fCharID
            }
        case 'UPDATE_FDESCRIPTION':
            return {
                ...state,
                fDescription: action.fDescription
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultFamiliar, familiarReducer }