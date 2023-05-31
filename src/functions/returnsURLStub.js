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

const wgTraits = [
    check.bowMasteryID,
    check.karhuClawID,
    check.improvisedWeapon,
    check.unarmedWeapon,
    check.shieldWeapon,
    check.spellsWeapon

]

const returnsURLStub = ({ char, newCharStepOrder }) => {
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

        weaponGroupIDObjects,     // Identified by wgID and wgType

        weaponIDObjects,    // Identified by wID and wType

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

    const selectedWeaponGroups = ({ wgTraits, hTraitID, weaponGroupIDObjects, specialTraitsSelected }) => {
        // // How many weapon groups currently?
        // const weaponGroupLength = weaponGroupIDs.length;

        // // Does character have a heritage that adds a weapon group?
        // const weaponHeritage = wgTraits.includes(hTraitID) ? 1 : 0;

        // // How many traits add a weapon group capability to the character?
        // const weaponTraits = specialTraitsSelected.filter(traitID => wgTraits.includes(traitID)).length;

        // // All characters should select a weapon group by default,
        // // in addition to heritage weapon groups and trait weapon groups
        // const wgTotalsMatch = weaponGroupLength === (weaponHeritage + weaponTraits + 1)

        // return wgTotalsMatch

        return (weaponGroupIDObjects.length > 0)
    }

    const selectedWeapons = ({ weaponGroupIDObjects, weaponIDObjects }) => {
        const wgTypes = (
            weaponGroupIDObjects.length > 0
                ?
                weaponGroupIDObjects.map(wg => wg.wgType)
                :
                [
                    // {
                    //     wgType: '',  // Single-letter l,h,r,u,i,s
                    //     wgID: ''     // Identified by wgID
                    // }
                ]
        )
        const wTypes = weaponIDObjects.map(w => w.wType)
        const foundType = []


        wgTypes.length > 0
            ?
            wgTypes.forEach(wgType => { foundType.push(wTypes.includes(wgType)) })
            :
            foundType.push(true)


        // if (weaponGroupIDs.includes(check.unarmedWeaponGroup)) {
        //     return ((weaponGroupIDs.length - 1) === weaponIDs.length)
        // } else {
        // }
        // return (weaponGroupIDObjects.length === weaponIDObjects.length)
        return (!foundType.includes(false))
    }

    // const shouldSelectFamiliar = ({ specialTraitsSelected, familiarID, hasFamiliar }) => {
    //     // If user selected the 'Familiar' trait
    //     if (specialTraitsSelected.includes(hasFamiliar)) {
    //         // return false if the familiar hasn't yet been selected 
    //         return (shouldHaveFamiliar && familiarID)
    //     } else {
    //         return true
    //     }
    // }

    const selectedFamiliar = ({ specialTraitsSelected, familiarID, hasFamiliar }) => {
        const shouldHaveFamiliar = specialTraitsSelected.includes(hasFamiliar)
        if (shouldHaveFamiliar) {
            // If user should have familiar and doesn't, return false
            return (familiarID !== '')
        } else {
            // user shouldn't have familiar, return true (move along)
            return true
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
        selectedWeaponGroups({ wgTraits, hTraitID, weaponGroupIDObjects, specialTraitsSelected }),
        selectedWeapons({ weaponGroupIDObjects, weaponIDObjects }),
        selectedFamiliar({ specialTraitsSelected, familiarID, hasFamiliar: check.hasFamiliar }),
        selectedBackstory({ trade, belief, charName }),
        false
    ]

    const indexOfFalse = trueIfComplete.indexOf(false)
    return newCharStepOrder[indexOfFalse]


}




export default returnsURLStub