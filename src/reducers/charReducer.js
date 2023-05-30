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

    weaponGroupIDs: [],     // Identified by wgID

    weaponIDObjects: [
        // {
        // wType: '',  // Single-letter l,h,r,u,i,s
        // wID: ''     // Identified by wID
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
                weaponGroupIDs: [],
                weaponIDObjects: [],
            }
        case 'CLEAR_TRAITIDS':
            return {
                ...state,
                traitIDs: [],
            }
        case 'UPDATE_HTRAITID':
            return {
                ...state,
                hTraitID: action.hTraitID
            }
        case 'UPDATE_MAXHP':
            // Keep in mind that both Heritage and Trait impact max HP
            return {
                ...state,
                maxHP: action.maxHP
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
        case 'UPDATE_WEAPONGROUPIDS':
            // PLEASE PASS IN action.weaponGroupID <--- NOTE SINGULAR
            const newWGIDs = (
                (
                    // Does the current array of weapon group wgIDs
                    // contain this wgID?
                    state
                        .weaponGroupIDs
                        .includes(action.weaponGroupID)
                )
                    ?
                    (
                        // If yes, remove that weapon group from the list
                        state
                            .weaponGroupIDs
                            .filter(wgID => wgID !== action.weaponGroupID)
                    )
                    :
                    (
                        // If no, add the weapon group to the list
                        state
                            .weaponGroupIDs
                            .concat([action.weaponGroupID])
                    )
            )

            return {
                ...state,
                weaponGroupIDs: newWGIDs,
                weaponIDObjects: [],
            }
        case 'CLEAR_WEAPONGROUPIDS':
            return {
                ...state,
                weaponGroupIDs: []
            }
        case 'ADD_WEAPONIDOBJECT':
            // PLEASE PASS IN action.weaponIDObject <--- NOTE SINGULAR
            // {
            // wType: '',  // Single-letter l,h,r,u,i,s
            // wID: ''     // Identified by wID
            // }

            const newWeaponIDObjects = (
                state
                    .weaponIDObjects
                    .filter(weaponIDObject =>
                        weaponIDObject.wType !== action.weaponIDObject.wType
                    )
                    .concat([action.weaponIDObject])

            )
            return {
                ...state,
                weaponIDObjects: newWeaponIDObjects
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
        case 'ADD_SCROLLID':
            // PLEASE PASS IN action.scrollID <--- NOTE SINGULAR
            return {
                ...state,
                scrollIDs: state.scrollIDs.push(action.scrollID)
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