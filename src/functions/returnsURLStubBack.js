const check = {

    // Adaptability - Heritage Trait
    extraTraitID: '-NV0g1IzDJD22PtG_g-y',
    // Bow Mastery - Heritage Trait
    bowMasteryID: '-NV0g5_XAfqCb0Y9079M',
    // Powerful Claws - Heritage Trait
    karhuClawID: '-NV0jYp3gMM1_J07zoU2',

    // Armor Master - trait
    armorTraitID: '-NV-zX7BrjyyupnP8Zwc',
    // Barfighter - trait
    improvisedWeapon: '-NV03ETlxlqgMs5vFCrO',
    // Familiar - trait
    hasFamiliar: '-NV0BAgAYVUBA8OA3_LE',
    // Martial Artist - trait
    unarmedWeapon: '-NV0Bbp1XgrfyHr7nha-',
    // Shield Bearer
    shieldWeapon: '-NV0C_daHy4EQZHergVr',
    // Spell Reader - trait
    scrolls: '-NV0C_daHy4EQZHergVr',
    // Spell-Touched
    spellsWeapon: '-NV0Cozs0xp32U7L7cx8',
    // Tough - trait
    additionalHP: '-NV0CzfGuKHy24OMUfMN',

    // Unarmed Weapon Group ID
    unarmedWeaponGroup: '-NV6Yyve_GUxV4OsizI2'

}


// After finding the first 'false' step, return the previous step
const returnsURLStubBack = ({ char, newCharStepOrder, currentStep }) => {
    const {
        traitIDs,           // Select and identify by tID
    } = char

    // arrays used in evaluations
    const specialTraitArray = Object.values(check)

    const specialTraitsSelected = traitIDs.filter(traitID => specialTraitArray.includes(traitID))

    const selectedFamiliar = ({ specialTraitsSelected, hasFamiliar, currentStep }) => {
        const thisStep = (currentStep !== 'familiar')
        // If character should have familiar, return true 
        // (This is a valid URL Stub to which the back button could return)
        // If character shouldn't have familiar, return false (do not pass this URL Stub)
        return (specialTraitsSelected.includes(hasFamiliar) && thisStep)
    }



    const trueIfComplete = [
        true, // Cannot go further back than Heritage selection
        (currentStep !== 'traits'), // Back will take you to the previous step
        (currentStep !== 'weaponGroup'), // Back will take you to the previous step
        (currentStep !== 'weapon'), // Back will take you to the previous step
        selectedFamiliar({ specialTraitsSelected, hasFamiliar: check.hasFamiliar, currentStep }),
        (currentStep !== 'backstory'), // Back will either go to Familiar or Weapon
        false
    ]

    const trueBeforeFalseIndex = (trueIfComplete) => {
        const firstFalseIndex = trueIfComplete.indexOf(false);
        const previousTrueIndex = firstFalseIndex - 1
        return (
            previousTrueIndex === -1
                ?
                0
                :
                previousTrueIndex
        )
    }

    return newCharStepOrder[trueBeforeFalseIndex(trueIfComplete)]


}




export default returnsURLStubBack