import defaultGear from "../objectsArrays/defaultGear";


const defaultChar = {
    charID: '',
    userID: '',
    charName: '',
    heritageID: '',         // Select from Heritages array, identify by hID
    hTraitID: '',           // Heritage trait determined by Heritage, identified by htID
    traitIDs: [],           // Select and identify by tID
    maxHP: '',              // HP determined by Heritage and trait: Toughness
    currentHP: '',          // HP current number
    maxArmor: '',           // HP from armor determined by Trait and worn items
    currentArmor: '',       // HP from armor current number
    trade: '',              // Trade is user-defined text
    belief: '',             // Belief is user-defined text

    weaponGroupIDs: [],     // Identified by wgID

    weaponIDs: [],          // Identified by wID

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
                ...state,
                heritageID: action.heritageID
            }
        case 'UPDATE_TRAITIDS':
            // Consider adding logic to check hTrait for standard HP
            // and calculating additional HP from trait

            // PLEASE PASS IN action.traitID <--- PLEASE NOTE SINGULAR
            const newTraitIDs = (
                (
                    state
                        .traitIDs
                        .contains(action.traitID)
                )
                    ?
                    (
                        state
                            .traitIDs
                            .filter(tID !== action.traitID)
                    )
                    :
                    (
                        state
                            .traitIDs
                            .push(action.traitID)
                    )
            )

            return {
                ...state,
                traitIDs: newTraitIDs
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
            // PLEASE PASS IN OBJECT action.weaponGroupID <--- NOTE SINGULAR
            const newWGIDs = (
                (
                    // Does the current array of weapon group wgIDs
                    // contain this wgID?
                    state
                        .weaponGroupIDs
                        .contains(action.weaponGroupID)
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
                            .push(action.weaponGroupID)
                    )
            )

            return {
                ...state,
                weaponGroupIDs: newWGIDs

            }
        case 'UPDATE_WEAPONIDS':
            // PLEASE PASS IN action.weaponID <--- NOT WEAPONIDS

            const newWeaponIDs = (
                (
                    // Does the current array of weaponIDs contain this wID?
                    state
                        .weaponIDs
                        .contains(action.weaponID)
                )
                    ?
                    (
                        // If yes, remove that weaponID from the array
                        state
                            .weaponIDs
                            .filter(wID => wID !== action.weaponID)
                    )
                    :
                    (
                        // If no, add weaponID to array
                        state
                            .weaponIDs
                            .push(action.weaponID)
                    )
            )
            return {
                ...state,
                weaponIDs: newWeaponIDs
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

export { defaultChar, charReducer }