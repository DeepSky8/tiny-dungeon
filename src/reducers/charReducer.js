import defaultGear from "../objectsArrays/defaultGear";


const defaultChar = {
    charID: Math.random(),
    userID: '',
    charName: '',
    heritageID: '',         // Select from Heritages array, identify by hID
    hTraitID: '',           // Heritage trait determined by Heritage, identified by htID
    traitIDs: [],           // Select and identify by tID
    hHP: 0,                 // HP determined by Heritage
    tHP: 0,                 // HP determined by traits: (Toughness)
    currentHP: 0,           // HP current number
    maxArmor: 0,            // HP from armor determined by Trait and worn items
    currentArmor: 0,        // HP from armor current number
    trade: '',              // Trade is user-defined text
    belief: '',             // Belief is user-defined text

    weaponGroupObjects: [
        // {
        //     wgID: Math.random(),
        //     wgType: 'l',
        //     wgTitle: '',
        //     wgDescription: '',
        //     wgDamage: 0,
        //     wgAttackTurn: 0,
        //     wgRangeIDs: [],      // c,n,f
        //     wgDisRangeIDs: [],   // c,n,f
        //     wgHTrait: false,     // Set by Heritage
        //     wgTrait: false,      // Set by Trait
        // }
    ],

    weaponObjects: [
        // {
        // wID: '',
        // wCharID: '',        // Corresponds to charID
        // wType: '',          // Corresponds to weaponGroup letter
        // wTitle: '',         // User-defined text, if any
        // wDescription: '',   // User-defined text, if any
        // wDepletion: 6,      // Interact with depletion counters in later update, set initial depletion counters by wType object
        // wHTrait: false,     // Set by Heritage
        // wTrait: false,      // Set by Trait
        // }
    ],

    // Wearing select from non-statted descriptions
    // Implement array of wearable items, use oID
    // Add specialized armor/wearable items in later update
    outfitIDs: [],
    gearIDs: defaultGear,

    gold: 10,

    familiarID: '',             // Reference by fID
    XP: 0,
    scrolls: [
        // {
        //     sID: '',
        //     sTitle: '',
        //     sDescription: '',
        //     sAmount: 1
        // }
    ],                          // Identified by sID
}

const charReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CHAR':
            return {
                ...action.char
            }
        case 'UPDATE_CHARID':
            return {
                ...state,
                charID: action.charID
            }
        case 'UPDATE_USERID':
            return {
                ...state,
                userID: action.userID
            }
        case 'UPDATE_CHARNAME':
            return {
                ...state,
                charName: action.charName
            }
        case 'UPDATE_HERITAGEID':
            return {
                ...defaultChar,
                heritageID: action.heritageID,
            }
        case 'UPDATE_HTRAITID':
            return {
                ...state,
                hTraitID: action.hTraitID
            }
        case 'UPDATE_TRAITIDS':
            // PLEASE PASS IN action.traitID <--- PLEASE NOTE SINGULAR
            const newTraitIDs = (
                (state.traitIDs.includes(action.traitID))
                    ?
                    (state.traitIDs.filter(tID => tID !== action.traitID))
                    :
                    ([action.traitID].concat(state.traitIDs))
            )

            return {
                ...state,
                traitIDs: newTraitIDs,
                weaponGroupObjects: [],
                weaponObjects: [],
                familiarID: '',
            }
        case 'CLEAR_TRAITIDS':
            return {
                ...state,
                traitIDs: [],
                weaponGroupObjects: [],
                weaponObjects: [],
                familiarID: '',
            }
        case 'SET_HERITAGEHP':
            return {
                ...state,
                hHP: action.hHP
            }
        case 'SET_TRAITHP':
            return {
                ...state,
                tHP: action.tHP
            }
        case 'SET_CURRENTHP':
            return {
                ...state,
                currentHP: action.currentHP
            }
        case 'DECREASE_CURRENTHP':
            return {
                ...state,
                currentHP: state.currentHP - 1
            }
        case 'INCREASE_CURRENTHP':
            return {
                ...state,
                currentHP: state.currentHP + 1
            }
        case 'SET_MAXARMOR':
            return {
                ...state,
                maxArmor: action.maxArmor
            }
        case 'SET_CURRENTARMOR':
            return {
                ...state,
                currentArmor: action.currentArmor
            }
        case 'DECREASE_CURRENTARMOR':
            return {
                ...state,
                currentArmor: state.currentArmor - 1
            }
        case 'INCREASE_CURRENTARMOR':
            return {
                ...state,
                currentArmor: state.currentArmor + 1
            }
        case 'UPDATE_TRADE':
            return {
                ...state,
                trade: action.trade
            }
        case 'UPDATE_BELIEF':
            return {
                ...state,
                belief: action.belief
            }
        case 'SET_WEAPONGROUPOBJECTS':
            return {
                ...state,
                weaponGroupObjects: action.defaultWeaponGroupObjects
            }
        case 'ADD_WEAPONGROUPOBJECT':
            // PLEASE PASS IN action.weaponGroupObject <--- NOTE SINGULAR

            const newWGOs = (
                [action.weaponGroupObject].concat(
                    state.weaponGroupObjects.filter(wgO =>
                        wgO.wgType !== action.weaponGroupObject.wgType))
            )

            return {
                ...state,
                weaponGroupObjects: newWGOs,
            }
        case 'REMOVE_WEAPONGROUPIDOBJECT':
            // PLEASE PASS IN action.weaponGroupObject <--- NOTE SINGULAR

            const filteredWGOs = (
                state
                    .weaponGroupObjects.filter(wgO =>
                        wgO.wgType !== action.weaponGroupObject.wgType)
            )

            return {
                ...state,
                weaponGroupObjects: filteredWGOs,
            }
        case 'CLEAR_WEAPONGROUPOBJECTS':
            return {
                ...state,
                weaponGroupObjects: []
            }
        case 'SET_WEAPONOBJECT':
            return {
                ...state,
                weaponObjects: action.defaultWeaponObjects
            }
        case 'ADD_WEAPONOBJECT':
            // PLEASE PASS IN action.weaponIDObject <--- NOTE SINGULAR

            const newWeaponObjects = (
                state
                    .weaponObjects
                    .filter(weaponObject =>
                        weaponObject.wType !== action.weaponObject.wType
                    )
                    .concat([action.weaponObject])

            )
            return {
                ...state,
                weaponObjects: newWeaponObjects
            }
        case 'REMOVE_WEAPONIDOBJECT':
            // PLEASE PASS IN action.wgType <--- NOTE TYPE ONLY
            const filteredObjects = (
                state
                    .weaponObjects
                    .filter(wO => wO.wType !== action.wgType)
            )
            return {
                ...state,
                weaponObjects: filteredObjects
            }
        case 'UPDATE_OUTFITIDS':
            return {
                ...state,
                // Outfit cannot currently be updated
            }
        case 'UPDATE_GOLD':
            const newGold = parseInt(state.gold) + parseInt(action.gold)
            return {
                ...state,
                gold: parseInt(newGold)
            }
        case 'UPDATE_GEARIDS':
            return {
                ...state,
                // Gear cannot currently be updated
            }
        case 'UPDATE_FAMILIARID':
            return {
                ...state,
                familiarID: action.familiarID
            }
        case 'UPDATE_XP':
            const newXP = parseInt(state.XP) + parseInt(action.XP)
            return {
                ...state,
                XP: parseInt(newXP)
            }
        case 'SET_SCROLLS':
            return {
                ...state,
                scrolls: action.scrolls
            }
        case 'CLEAR_SCROLLS':
            return {
                ...state,
                scrolls: []
            }
        case 'ADD_SCROLL':

            // PLEASE PASS IN action.scroll <--- NOTE SINGULAR

            const incrementedScroll = (scroll) => {
                const { sAmount } = scroll;
                const newAmount = sAmount + 1;
                return { ...scroll, sAmount: newAmount }
            }

            // review scrolls by ID, increment number if IDs match
            const scrollExistsIndex = state.scrolls.findIndex(scroll => scroll.sID === action.scroll.sID)
            const scrollToAdd = (
                scrollExistsIndex > -1
                    ?
                    incrementedScroll(action.scroll)
                    :
                    action.scroll
            )
            const updatedScrollArray = (
                (state.scrolls.filter(scroll => scroll.sID !== action.scroll.sID))
                    .concat([scrollToAdd])
            )
            return {
                ...state,
                scrolls: updatedScrollArray
            }
        case 'MINUS_SCROLL':
            // PLEASE PASS IN action.scroll <--- NOTE SINGULAR

            const decrementedScroll = (scroll) => {
                const { sAmount } = scroll;
                const newAmount = sAmount - 1 > 0 ? sAmount - 1 : 0;
                return { ...scroll, sAmount: newAmount }
            }

            const currentScroll = state.scrolls.find(scroll => scroll.sID === action.scroll.sID)
            const filteredScrolls = (
                state
                    .scrolls
                    .filter(scroll => scroll.sID !== action.scroll.sID)
            )

            const decrementedScrollArray = filteredScrolls.concat([decrementedScroll(currentScroll)])

            return {
                ...state,
                scrolls: decrementedScrollArray
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultChar, charReducer }