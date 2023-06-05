import defaultGear from "../objectsArrays/defaultGear";


const defaultChar = {
    charID: Math.random(),
    userID: '',
    charName: '',
    heritageID: '',         // Select from Heritages array, identify by hID
    hTraitID: '',           // Heritage trait determined by Heritage, identified by htID
    traitIDs: [],           // Select and identify by tID
    maxHP: 0,               // HP determined by Heritage and trait: Toughness
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

    familiarID: '',         // Reference by fID
    XP: 0,
    scrollIDs: [],          // Identified by sID
}

const charPlaceholders = {
    namePlace: 'Character Name',
    tradePlace: "'s family trade",
    beliefPlace: "'s personal creed"
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
                traitIDs: [],
                weaponGroupObjects: [],
                weaponObjects: [],
            }
        case 'UPDATE_HTRAITID':
            return {
                ...state,
                hTraitID: action.hTraitID
            }
        case 'UPDATE_TRAITIDS':
            // Consider adding logic to check hTrait for standard HP
            // and calculating additional HP from trait

            // PLEASE PASS IN action.traitID <--- PLEASE NOTE SINGULAR
            const newTraitIDs = (
                (
                    state
                        .traitIDs
                        .includes(action.traitID)
                )
                    ?
                    (
                        state
                            .traitIDs
                            .filter(tID => tID !== action.traitID)
                    )
                    :
                    (
                        [
                            action
                                .traitID
                        ]
                            .concat(
                                state
                                    .traitIDs
                            )
                    )
            )

            return {
                ...state,
                traitIDs: newTraitIDs,
                weaponGroupObjects: [],
                weaponObjects: [],
            }
        case 'CLEAR_TRAITIDS':
            return {
                ...state,
                traitIDs: [],
            }

        case 'UPDATE_MAXHP':
            // Keep in mind that both Heritage and Trait impact max HP
            return {
                ...state,
                maxHP: state.maxHP + action.maxHP
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
        case 'UPDATE_MAXARMOR':
            return {
                ...state,
                maxArmor: action.maxArmor
            }
        case 'DECREASE_CURRENTARMOR':
            return {
                ...state,
                currentArmor: state.currentArmor - 1
            }
        case 'INCRASE_CURRENTARMOR':
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
                    state
                        .weaponGroupObjects
                        .filter(wgO =>
                            wgO.wgType !== action.weaponGroupObject.wgType
                        )
                )

            )

            return {
                ...state,
                weaponGroupObjects: newWGOs,
            }
        case 'REMOVE_WEAPONGROUPIDOBJECT':
            // PLEASE PASS IN action.weaponGroupObject <--- NOTE SINGULAR

            const filteredWGOs = (
                state
                    .weaponGroupObjects
                    .filter(wgO =>
                        wgO.wgType !== action.weaponGroupObject.wgType
                    )
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
        case 'SET_SCROLLIDS':
            return {
                ...state,
                scrollIDs: action.scrollIDs
            }
        case 'ADD_SCROLLID':
            // PLEASE PASS IN action.scrollID <--- NOTE SINGULAR
            return {
                ...state,
                scrollIDs: state.scrollIDs.concat([action.scrollID])
            }
        case 'REMOVE_SCROLLID':
            // PLEASE PASS IN action.scrollID <--- NOTE SINGULAR
            const scrollIndex = state.scrollIDs.indexOf(action.scrollID)

            const newScrolIDs = (
                (
                    scrollIndex > -1
                )
                    ?
                    (
                        state.scrollIDs.slice(scrollIndex, 1)
                    )
                    :
                    (
                        state.scrollIDs
                    )
            )
            return {
                ...state,
                scrollIDs: newScrolIDs
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultChar, charReducer, charPlaceholders }