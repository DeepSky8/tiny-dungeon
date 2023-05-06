

const defaultTrait = {
    tID: '',
    hTrait: false,
    tTitle: '',
    tDescription: '',
    tSpecial: false,
    tHP: 0,
    tShield: false,
    tSpell: false,
    tImprovised: false,
    tUnarmed: false,
    tFamiliar: false
}

const traitReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TRAIT':
            return {
                ...action.trait
            }
        case 'UPDATE_TID':
            return {
                ...state,
                tId: action.tID
            }
        case 'UPDATE_HTRAIT':
            return {
                ...state,
                hTrait: !state.hTrait
            }
        case 'UPDATE_TTITLE':
            return {
                ...state,
                tTitle: action.tTitle
            }
        case 'UPDATE_TDESCRIPTION':
            return {
                ...state,
                tDescription: action.tDescription
            }
        case 'UPDATE_TSPECIAL':
            return {
                ...state,
                tSpecial: !state.tSpecial
            }
        case 'UPDATE_THP':
            return {
                ...state,
                tHP: action.tHP
            }
        case 'UPDATE_TSHIELD':
            return {
                ...state,
                tShield: !state.tShield
            }
        case 'UPDATE_TSPELL':
            return {
                ...state,
                tSpell: !state.tSpell
            }
        case 'UPDATE_TIMPROVISED':
            return {
                ...state,
                tImprovised: !state.tImprovised
            }
        case 'UPDATE_TUNARMED':
            return {
                ...state,
                tUnarmed: !state.tUnarmed
            }
        case 'UPDATE_TFAMILIAR':
            return {
                ...state,
                tFamiliar: !state.tFamiliar
            }
        default:
            return {
                ...state
            }
    }
}

// case 'UPDATE_':
//     return {
//         ...state,

//     }

export { defaultTrait, traitReducer }