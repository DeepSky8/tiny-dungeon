
// const playAs = 'Play as a '

import returnsURLStub from "../functions/returnsURLStub"

// // Adaptability - Heritage Trait
// const extraTraitID = '-NV0g1IzDJD22PtG_g-y';
// // Bow Mastery - Heritage Trait
// const bowMasteryID = '-NV0g5_XAfqCb0Y9079M';
// // Powerful Claws - Heritage Trait
// const karhuClawID = '-NV0jYp3gMM1_J07zoU2';

// // Armor Master - trait
// const armorTraitID = '-NV-zX7BrjyyupnP8Zwc';
// // Barfighter - trait
// const improvisedWeaponGroup = '-NV03ETlxlqgMs5vFCrO';
// // Familiar - trait
// const hasFamiliar = '-NV0BAgAYVUBA8OA3_LE';
// // Martial Artist - trait
// const unarmedWeaponGroup = '-NV0Bbp1XgrfyHr7nha-';
// // Shield Bearer
// const shield = '-NV0C_daHy4EQZHergVr';
// // Spell Reader - trait
// const scrolls = '-NV0C_daHy4EQZHergVr';
// // Spell-Touched
// const spells = '-NV0Cozs0xp32U7L7cx8';
// // Tough - trait
// const additionalHP = '-NV0CzfGuKHy24OMUfMN';

const chooseHeritage = 'heritage'
const chooseTraits = 'traits'
const chooseWeaponGroup = 'weaponGroup'
const chooseWeapon = 'weapon'
const chooseFamiliar = 'familiar'
const chooseBackstory = 'backstory'

const pleaseSelectA = 'Please select a '
const pleaseSelect = 'Please select '
const pleaseDesignA = 'Please design a '
const weaponGroup = 'Weapon Group'


const errorSelector = ({ urlStub }) => {
    switch (urlStub) {
        case chooseHeritage:
            return (pleaseSelectA + chooseHeritage)
        case chooseTraits:
            return (pleaseSelect + chooseTraits)
        case chooseWeaponGroup:
            return (pleaseSelectA + weaponGroup)
        case chooseWeapon:
            return (pleaseDesignA + chooseWeapon)
        case chooseFamiliar:
            return (pleaseSelectA + chooseFamiliar)
        case chooseBackstory:
            return (pleaseDesignA + chooseBackstory)
        default:
            return ""
    }

}


const defaultNextStep = {
    pathRoot: '/newCharacter',
    buttonText: 'Next',
    currentStep: 'heritage',
    error: '',
    // completed: {
    //     heritage: false,
    //     traits: false,
    //     familiar: false,
    //     weaponGroup: false,
    //     weapon: false,
    //     trade: false,
    //     belief: false,
    //     charName: false,
    // }
}

const nextStepReducer = (state, action) => {
    // const {
    //     charID,
    //     userID,
    //     charName,
    //     heritageID,         // Select from Heritages array, identify by hID
    //     hTraitID,           // Heritage trait determined by Heritage, identified by htID
    //     traitIDs,           // Select and identify by tID
    //     maxHP,              // HP determined by Heritage and trait: Toughness
    //     currentHP,          // HP current number
    //     maxArmor,           // HP from armor determined by Trait and worn items
    //     currentArmor,       // HP from armor current number
    //     trade,              // Trade is user-defined text
    //     belief,             // Belief is user-defined text

    //     weaponGroupIDs,     // Identified by wgID

    //     weaponIDs,          // Identified by wID

    //     // Wearing select from non-statted descriptions
    //     // Implement array of wearable items, use oID
    //     // Add specialized armor/wearable items in later update
    //     outfitIDs,
    //     gearIDs,

    //     gold,

    //     familiarID,         // Reference by fID
    //     XP,
    //     scrollIDs,          // Identified by sID
    // } = action.char



    switch (action.type) {
        // case 'CHECK_HERITAGE':
        //     const heritageSelected = (heritageID && hTraitID)

        //     return {
        //         ...state,
        //         currentStep: heritageSelected ? chooseTraits : chooseHeritage,
        //         error: heritageSelected ? '' : pleaseSelectA + chooseHeritage,
        //     }

        // case 'CHECK_TRAITS':
        //     // const traitsSelected = traitEval(hTraitID, traitIDs)

        //     return {
        //         ...state,
        //         currentStep: traitsSelected ? "" : 'heritage',
        //         error: heritageSelected ? '' : 'Please select a heritage',
        //     }

        case 'NEXT_STEP_CHECK':

            const urlStub = returnsURLStub({ char: action.char })

            return {
                pathRoot: urlStub === 'end' ? '/displayCharacter' : '/newCharacter',
                buttonText: 'Next',
                currentStep: urlStub === 'end' ? '' : urlStub,
                error: state.currentStep === urlStub ? errorSelector({ urlStub }) : '',
            }

        default:
            return {
                ...state
            }
    }
}

export { defaultNextStep, nextStepReducer }