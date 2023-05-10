

const defaultHeritage = {
    hID: '',
    hTitle: '',
    hDescription: '',
    hPhysical: '',
    hHP: 0,
    hTraitIDs: [],
}

const heritageReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_HERITAGE':
            return {
                ...defaultHeritage,
                ...action.heritage
            }
        case 'UPDATE_HID':
            return {
                ...state,
                hID: action.hID
            }
        case 'UPDATE_HTITLE':
            return {
                ...state,
                hTitle: action.hTitle
            }
        case 'UPDATE_HDESCRIPTION':
            return {
                ...state,
                hDescription: action.hDescription
            }
        case 'UPDATE_HPHYSICAL':
            return {
                ...state,
                hPhysical: action.hPhysical
            }
        case 'UPDATE_HHP':
            return {
                ...state,
                hHP: action.hHP
            }
        case 'UPDATE_HTRAITIDS':
            const newHTraitIDs = (
                state
                    .hTraitIDs
                    .includes(action.hTraitID)
                    ?
                    state.hTraitIDs
                    :
                    state.hTraitIDs
                        .concat(action.hTraitID)
            )
            return {
                ...state,
                hTraitIDs: newHTraitIDs
            }
        case 'REMOVE_HTRAITID':
            return {
                ...state,
                hTraitIDs: state.hTraitIDs.filter(hTraitID => hTraitID !== action.hTraitID)
            }

        default:
            return {
                ...state
            }
    }
}

// case 'UPDATE_H':
//     return {
//         ...state,

//     }

export { defaultHeritage, heritageReducer }