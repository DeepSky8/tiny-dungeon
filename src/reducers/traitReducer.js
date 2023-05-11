

const defaultTrait = {
    tID: '',
    tTitle: '',
    tDescription: '',
    tHTrait: false,
    tSpecial: false,
    tHP: 0,
    tShield: false,
    tSpell: false,
    tImprovised: false,
    tUnarmed: false,
    tFamiliar: false,
    tClaws: false,
}

const traitReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TRAIT':
            return {
                ...defaultTrait,
                ...action.trait
            }
        case 'UPDATE_TID':
            return {
                ...state,
                tId: action.tID
            }
        case 'UPDATE_THTRAIT':
            return {
                ...state,
                tHTrait: !state.tHTrait
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
                tSpecial: !state.tSpecial,
                tHP: state.tSpecial ? 0 : state.tHP,
                tShield: state.tSpecial ? false : state.tShield,
                tSpell: state.tSpecial ? false : state.tSpell,
                tImprovised: state.tSpecial ? false : state.tImprovised,
                tUnarmed: state.tSpecial ? false : state.tUnarmed,
                tFamiliar: state.tSpecial ? false : state.tFamiliar,
            }
        case 'UPDATE_THP':
            return {
                ...state,
                tHP: action.tHP,
                tSpecial: action.tHP === 0 ? false : true
            }
        case 'UPDATE_TSHIELD':
            return {
                ...state,
                tShield: !state.tShield,
                tSpecial: state.tShield ? false : true

            }
        case 'UPDATE_TSPELL':
            return {
                ...state,
                tSpell: !state.tSpell,
                tSpecial: state.tSpell ? false : true
            }
        case 'UPDATE_TIMPROVISED':
            return {
                ...state,
                tImprovised: !state.tImprovised,
                tSpecial: state.tImprovised ? false : true
            }
        case 'UPDATE_TUNARMED':
            return {
                ...state,
                tUnarmed: !state.tUnarmed,
                tSpecial: state.tUnarmed ? false : true

            }
        case 'UPDATE_TFAMILIAR':
            return {
                ...state,
                tFamiliar: !state.tFamiliar,
                tSpecial: state.tFamiliar ? false : true
            }
        case 'UPDATE_TCLAWS':
            return {
                ...state,
                tClaws: !state.tClaws,
                tSpecial: state.tClaws ? false : true
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