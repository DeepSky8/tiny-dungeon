// Weapon Group Types
//  Light Melee     l
//      1 damage
//      * attacks per turn
//      Close range standard test
//      Includes Powerful Claws Karhu Heritage Trait
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
//  Shield          s
//      0 damage
//      Effect as described by player
//      * attacks per turn
//      Close range standard test

const defaultWeaponGroup = {
    wgID: '',
    wgType: '',
    wgName: '',
    wgDescription: '',
    wgDamage: 0,
    wgAttackTurn: 0,
    wgRange: [''],      // c,n,f
    wgDisRange: [''],   // c,n,f
    wgHTrait: false,    // Set by Heritage
}

const defaultWeaponMastered = {
    wID: '',
    wGroup: '',         // Corresponds to weaponGroup letter
    wType: '',          // Select from weapon type array determined by group, identify by ID
    wName: '',          // User-defined text, if any
    wDescription: '',   // User-defined text, if any
    wDepletion: '',     // Interact with depletion counters in later update, set initial depletion counters by wType object
    wHTrait: false,     // Set by Heritage
}

const rangeSort = (a, b) => {
    if (a === 'c') {
        return 1
    } else if (a === 'f') {
        return -1
    } else if (a === 'n' && b === 'c') {
        return -1
    } else if (a === 'n' && b === 'f') {
        return 1
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
        case 'UPDATE_WGTYPE':
            return {
                ...state,
                wgType: action.wgType
            }
        case 'UPDATE_WGNAME':
            return {
                ...state,
                wgName: action.wgName
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
        case 'UPDATE_WGRANGE':
            const wgExists = state.wgRange.contains(action.wgRange)
            const newWGRange = wgExists
                ?
                state.wgRange.filter(element => element !== action.wgRange)
                :
                state.wgRange.push(action.wgRange).sort(rangeSort)
            return {
                ...state,
                wgRange: newWGRange

            }
        case 'UPDATE_WGDISRANGE':
            const wgDisExists = state.wgDisRange.contains(action.wgDisRange)
            const newWGDisRange = wgDisExists
                ?
                state.wgRange.filter(element => element !== action.wgRange)
                :
                state.wgRange.push(action.wgRange).sort(rangeSort)
            return {
                ...state,
                wgDisRange: newWGDisRange
            }
        case 'UPDATE_WGHTRAIT':
            return {
                ...state,
                wgHTrait: action.wgHTrait
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
        case 'UPDATE_WID':
            return {
                ...state,
                wID: action.wID
            }
        case 'UPDATE_WGROUP':
            return {
                ...state,
                wGroup: action.wGroup
            }
        case 'UPDATE_WTYPE':
            return {
                ...state,
                wType: action.wType
            }
        case 'UPDATE_WNAME':
            return {
                ...state,
                wName: action.wName
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
                wHTrait: action.wHTrait
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