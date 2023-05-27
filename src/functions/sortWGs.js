
// // Bow Mastery - Heritage Trait
// const bowMasteryID = '-NV0g5_XAfqCb0Y9079M';
// // Powerful Claws - Heritage Trait
// const karhuClawID = '-NV0jYp3gMM1_J07zoU2';

// // Barfighter - trait
// const improvisedWeaponGroup = '-NV03ETlxlqgMs5vFCrO';
// // Martial Artist - trait
// const unarmedWeaponGroup = '-NV0Bbp1XgrfyHr7nha-';
// // Shield Bearer
// const shield = '-NV0C_daHy4EQZHergVr';
// // Spell-Touched
// const spells = '-NV0Cozs0xp32U7L7cx8';

// const wgAddTraits = {

//     // Bow Mastery - Heritage Trait
//     bowMasteryID: '-NV0g5_XAfqCb0Y9079M',
//     // Powerful Claws - Heritage Trait
//     karhuClawID: '-NV0jYp3gMM1_J07zoU2',

//     // Barfighter - trait
//     improvisedWeaponGroup: '-NV03ETlxlqgMs5vFCrO',
//     // Martial Artist - trait
//     unarmedWeaponGroup: '-NV0Bbp1XgrfyHr7nha-',obs

//     // Shield Bearer
//     shield: '-NV0C_daHy4EQZHergVr',
//     // Spell-Touched
//     spells: '-NV0Cozs0xp32U7L7cx8',
// }

// const wgAddTraitsArray = Object.values(wgAddTraits)

// Produce an object with two arrays of weapon groups
// one array is locked, the character gains automatically
// the other array is unlocked, and the character can pick one
const sortWGs = ({ allTraits, weaponGroups }) => {
    const defaultWGIDs = []
    const defaultWGs = []
    const availWGs = []

    // If the user selected one or more traits that automatically provide 
    // weapon groups, add those weapon groups (once) to the defaultWGIDs array
    allTraits.forEach(trait => {
        if (trait.tWeaponGroupID && !defaultWGIDs.includes(trait.tWeaponGroupID)) {
            defaultWGIDs.push(trait.tWeaponGroupID)
        }
    });



    // Find the weapon groups associated with the default weapon group IDs
    // and add those weapon groups to the defaultWGs array
    defaultWGIDs.forEach(wgID => {
        const foundWG = weaponGroups.find(wg => wg.wgID === wgID)
        defaultWGs.push(foundWG)
    })

    // Review all weapon groups, and if they are available to be
    // selected by the character 
    // (not already in defaultWGIDs or restricted by heritage trait),
    // add them to the availWGs array
    weaponGroups.forEach(wg => {
        // Please note the negation flags on each check
        if (
            !wg.wgHTrait // Cannot be a weapon group provided by a heritage
            &&
            !wg.wgTrait // Cannot be a weapon group provided by a trait
            &&
            !defaultWGIDs.includes(wg.wgID) // Cannot be a weapon group already gained by character
            &&
            !(
                // If the list of traits includes the 
                // Karhu Powerful Claws trait ID
                allTraits
                    .map(trait => trait.tID)
                    .includes('-NV0jYp3gMM1_J07zoU2')
                &&
                // AND evaluating the Ranged Weapon Group
                wg.wgID === '-NV6Xo0B7lwELzzOnYkm'
                // If both checks are true, negation flag means 
                // don't add this wgID to the list of available-
                // to-pick Weapon Groups for this character
            )
        ) {
            availWGs.push(wg)
        }
    })

    return { defaultWGs, availWGs }
}

export default sortWGs


// weaponGroups.forEach(wg => {
//     if (hTraitID === karhuClawID) {
//         if (wg.wgHTrait) {
//             sortedWGs.default.push(wg)
//         }
//         if (wg.wgType === 'r') { }

//     }

// });
