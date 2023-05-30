import returnsNewCharError from "../functions/returnsNewCharError"
import returnsURLStub from "../functions/returnsURLStub"
import returnsURLStubBack from "../functions/returnsURLStubBack"

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


// const weaponGroups = {
//     // Light - l
//     light: '-NV6VaDJd7zza5i0UR9z',
//     // Heavy - h
//     heavy: '-NV6XSrebaRiCHw-FfI1',
//     // Ranged - r
//     ranged: '-NV6Xo0B7lwELzzOnYkm',
//     // Improvised - i
//     improvised: '-NV6YTDUDqbxgKFzc47H',
//     // Unarmed - u
//     unarmed: '-NV6Yyve_GUxV4OsizI2',
//     // Shields - s
//     shield: '-NV6ZmJQi2ryBeRC_lv2',
// }


const defaultNextStep = {
    pathRoot: '/newCharacter',
    buttonText: 'Next',
    currentStep: 'heritage',
    error: '',
}

// Used to return URLStub for navigation
const newCharStepOrder = [
    'heritage',
    'traits',
    'weaponGroup',
    'weapon',
    'familiar', // Only fires if Familiar trait is selected
    'backstory',
    'end'
]

const nextStepReducer = (state, action) => {

    switch (action.type) {

        case 'NEXT_STEP_CHECK':

            const urlStub = returnsURLStub({ char: action.char, newCharStepOrder: newCharStepOrder })
            const currentError = returnsNewCharError({ urlStub: urlStub })

            return {
                pathRoot: urlStub === 'end' ? '/displayCharacter' : '/newCharacter',
                buttonText: 'Next',
                currentStep: urlStub === 'end' ? '' : urlStub,
                error: state.currentStep === urlStub ? currentError : '',
            }

        case 'PREV_STEP':
            // const currentStepIndex = newCharStepOrder.findIndex(step => step === state.currentStep)
            const urlStubBack = returnsURLStubBack(
                {
                    char: action.char,
                    newCharStepOrder: newCharStepOrder,
                    currentStep: state.currentStep,
                }
            )

            return {
                ...state,
                pathRoot: '/newCharacter',
                currentStep: urlStubBack,
            }

        case 'CLEAR_ERROR':
            return {
                ...state,
                error: ''
            }


        default:
            return {
                ...state
            }
    }
}

export { defaultNextStep, nextStepReducer }