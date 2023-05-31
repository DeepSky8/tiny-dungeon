// Weapon Group Types
//  Light Melee     l
//      1 damage
//      * attacks per turn
//      Close range standard test
//  Heavy Melee     h
//      2 damage
//      1 attack per turn
//      Close range standard test
//      Near range disadvantage
//  Ranged          r
//      1 damage
//      1 attack per turn (requires reload after attack)
//      Close range disadvantage
//      Near, far range standard test


// The following Weapon Groups are only available via trait
//  Improvised      i
//      1 damage
//      * attacks per turn
//      Close range standard test
//  Unarmed         u
//      1 damage
//      * attacks per turn
//      Close range standard test
//      Includes Powerful Claws Karhu Heritage Trait
//  Shield          s
//      0 damage
//      Effect as described by player
//      * attacks per turn
//      Close range standard test

const defaultWeaponGroup = {
    wgID: Math.random(),
    wgType: 'l',
    wgTitle: '',
    wgDescription: '',
    wgDamage: 0,
    wgAttackTurn: 0,
    wgRangeIDs: [],      // c,n,f
    wgDisRangeIDs: [],   // c,n,f
    wgHTrait: false,     // Set by Heritage
    wgTrait: false,      // Set by Trait
}

const defaultWeaponMastered = {
    wID: '',
    wCharID: '',         // Corresponds to charID
    // wGroup: '',         // Select from weapon type array determined by group, identify by ID
    wType: '',          // Corresponds to weaponGroup letter
    wTitle: '',         // User-defined text, if any
    wDescription: '',   // User-defined text, if any
    wDepletion: 6,      // Interact with depletion counters in later update, set initial depletion counters by wType object
    wHTrait: false,     // Set by Heritage
    wTrait: false,      // Set by Trait

}

const rangeSort = (a, b) => {
    if (a === 'c') {
        return -1
    } else if (a === 'f') {
        return 1
    } else if (a === 'n' && b === 'c') {
        return 1
    } else if (a === 'n' && b === 'f') {
        return -1
    }
}


const weaponGroupReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_WG':
            return {
                ...action.weaponGroup
            }
        case 'UPDATE_WGID':
            return {
                ...state,
                wgID: action.wgID
            }
        case 'UPDATE_WCHARID':
            return {
                ...state,
                wCharID: action.wCharID
            }
        case 'UPDATE_WGTYPE':
            return {
                ...state,
                wgType: action.wgType
            }
        case 'UPDATE_WGTITLE':
            return {
                ...state,
                wgTitle: action.wgTitle
            }
        case 'UPDATE_WGDESCRIPTION':
            return {
                ...state,
                wgDescription: action.wgDescription
            }
        case 'UPDATE_WGDAMAGE':
            return {
                ...state,
                wgDamage: action.wgDamage
            }
        case 'UPDATE_WGATTACKTURN':
            return {
                ...state,
                wgAttackTurn: action.wgAttackTurn
            }
        case 'UPDATE_WGRANGEIDS':
            const newWGRangeIDs = (
                state
                    .wgRangeIDs
                    .includes(action.wgRangeID)
                    ?
                    state
                        .wgRangeIDs
                        .sort(rangeSort)
                    :
                    state.
                        wgRangeIDs
                        .concat(action.wgRangeID)
                        .sort(rangeSort)
            )
            return {
                ...state,
                wgRangeIDs: newWGRangeIDs

            }
        case 'REMOVE_WGRANGEID':
            return {
                ...state,
                wgRangeIDs: state
                    .wgRangeIDs
                    .filter(item => item !== action.wgRangeID)
                    .sort(rangeSort)

            }
        case 'UPDATE_WGDISRANGEIDS':
            const newWGDisRangeIDs = (
                state
                    .wgDisRangeIDs
                    .includes(action.wgRangeID)
                    ?
                    state.wgDisRangeIDs
                        .sort(rangeSort)
                    :
                    state.
                        wgDisRangeIDs
                        .concat(action.wgRangeID)
                        .sort(rangeSort)
            )
            return {
                ...state,
                wgDisRangeIDs: newWGDisRangeIDs
            }
        case 'REMOVE_WGDISRANGEID':
            return {
                ...state,
                wgDisRangeIDs: state
                    .wgDisRangeIDs
                    .filter(item => item !== action.wgRangeID)
                    .sort(rangeSort)

            }
        case 'UPDATE_WGHTRAIT':
            return {
                ...state,
                wgHTrait: !state.wgHTrait,
                wgTrait: !state.wgHTrait ? false : state.wgTrait
            }
        case 'UPDATE_WGTRAIT':
            return {
                ...state,
                wgTrait: !state.wgTrait,
                wgHTrait: !state.wgTrait ? false : state.wgHTrait
            }
        default:
            return {
                ...state
            }
    }
}



const weaponsMasteredReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_WEAPON':
            return {
                ...action.weapon
            }
        case 'CLEAR_WEAPON':
            return {
                ...defaultWeaponMastered
            }
        case 'UPDATE_WID':
            return {
                ...state,
                wID: action.wID
            }
        // case 'UPDATE_WGROUP':
        //     return {
        //         ...state,
        //         wGroup: action.wGroup
        //     }
        case 'UPDATE_WTYPE':
            return {
                ...state,
                wType: action.wType
            }
        case 'UPDATE_WTITLE':
            return {
                ...state,
                wTitle: action.wTitle
            }
        case 'UPDATE_WDESC':
            return {
                ...state,
                wDescription: action.wDescription
            }
        case 'UPDATE_WDEPLETE':
            return {
                ...state,
                wDepletion: action.wDepletion
            }
        case 'UPDATE_WHTRAIT':
            return {
                ...state,
                wHTrait: !state.wHTrait
            }
        case 'UPDATE_WTRAIT':
            return {
                ...state,
                wTrait: !state.wTrait
            }
        default:
            return {
                ...state
            }
    }
}


export {
    defaultWeaponGroup,
    defaultWeaponMastered,
    weaponGroupReducer,
    weaponsMasteredReducer
}