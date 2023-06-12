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
    additionalHPID: '-NV0CzfGuKHy24OMUfMN',

    // Unarmed Weapon Group ID
    unarmedWeaponGroup: '-NV6Yyve_GUxV4OsizI2'

}

const wgTraits = [
    check.bowMasteryID,
    check.karhuClawID,
    check.improvisedWeapon,
    check.unarmedWeapon,
    check.shieldWeapon,
    check.spellsWeapon

]

const returnsURLStub = ({ char, newCharStepOrder, currentStep }) => {
    const {
        // charID,
        // userID,
        charName,
        heritageID,         // Select from Heritages array, identify by hID
        hTraitID,           // Heritage trait determined by Heritage, identified by htID
        traitIDs,           // Select and identify by tID
        // maxHP,              // HP determined by Heritage and trait: Toughness
        // currentHP,          // HP current number
        // maxArmor,           // HP from armor determined by Trait and worn items
        // currentArmor,       // HP from armor current number
        trade,              // Trade is user-defined text
        belief,             // Belief is user-defined text

        weaponGroupObjects,     // Identified by wgID and wgType

        weaponObjects,      // Identified by wID and wType

        // Wearing select from non-statted descriptions
        // Implement array of wearable items, use oID
        // Add specialized armor/wearable items in later update
        // outfitIDs,
        // gearIDs,

        // gold,

        familiarID,         // Reference by fID
        // XP,
        // scrollIDs,          // Identified by sID
    } = char

    // arrays used in evaluations
    const specialTraitArray = Object.values(check)

    const specialTraitsSelected = traitIDs.filter(traitID => specialTraitArray.includes(traitID))

    // functions evaluating character elements
    const selectedHeritage = (heritageID !== "" && hTraitID !== "")

    const selectedTraits = ({ hTraitID, traitIDs, extraTraitID }) => {
        return (
            (hTraitID === extraTraitID && traitIDs.length === 4)
            ||
            (hTraitID !== extraTraitID && traitIDs.length === 3)
        )
    }

    const selectedWeaponGroups = ({ weaponGroupObjects }) => {

        return (weaponGroupObjects.length > 0)
    }

    const selectedWeapons = ({ weaponGroupObjects, weaponObjects }) => {
        const wgTypes = (
            weaponGroupObjects.length > 0
                ?
                weaponGroupObjects.map(wg => wg.wgType)
                :
                [
                    // {
                    //     wgType: '',  // Single-letter l,h,r,u,i,s,m
                    //     wgID: ''     // Identified by wgID
                    // }
                ]
        )
        const wTypes = weaponObjects.map(w => w.wType)
        const foundType = []

        // If weapon groups have been selected
        // for each weapon group
        // has a weapon of that type been selected?
        wgTypes.length > 0
            ?
            wgTypes.forEach(wgType => { foundType.push(wTypes.includes(wgType)) })
            :
            foundType.push(true)


        // Are there any weapon groups without an associated weapon of that type?
        // If there are not falses, this stage is complete

        return (!foundType.includes(false))
    }

    const selectedFamiliar = ({ specialTraitsSelected, familiarID, hasFamiliar }) => {
        const shouldHaveFamiliar = specialTraitsSelected.includes(hasFamiliar)
        if (shouldHaveFamiliar) {
            // If user should have familiar and doesn't, return false
            return (familiarID !== '')
        } else {
            // user shouldn't have familiar, return 'skip' (move along)
            return 'skip'
        }
    }

    const selectedBackstory = ({ trade, belief, charName }) => {
        const enteredTrade = trade.length > 0;
        const enteredBelief = belief.length > 0;
        const enteredName = charName.length > 0;

        return (enteredTrade && enteredBelief && enteredName)

    }

    // Perform tests on char data
    // Each test returns true if complete
    const trueIfComplete = [
        selectedHeritage,
        selectedTraits({ hTraitID, traitIDs, extraTraitID: check.extraTraitID }),
        selectedWeaponGroups({ weaponGroupObjects }),
        selectedWeapons({ weaponGroupObjects, weaponObjects }),
        selectedFamiliar({ specialTraitsSelected, familiarID, hasFamiliar: check.hasFamiliar }), // Returns 'skip' if it shouldn't be accessed
        selectedBackstory({ trade, belief, charName }),
        false
    ]

    const indexOfCurrent = newCharStepOrder.indexOf(currentStep)


    if (trueIfComplete[indexOfCurrent] === true) {
        if (
            trueIfComplete[(indexOfCurrent + 1)] !== 'skip'
        ) {
            return newCharStepOrder[(indexOfCurrent + 1)]
        } else if (
            trueIfComplete[(indexOfCurrent + 1)] === 'skip'
        ) {
            return newCharStepOrder[(indexOfCurrent + 2)]
        }
    } else {
        return currentStep
    }
}




export default returnsURLStub