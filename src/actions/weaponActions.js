import { child, push, ref, update } from "firebase/database"
import { db } from "../api/firebase"

export const loadWG = (weaponGroup) => ({
    type: 'LOAD_WG',
    weaponGroup
})

export const updateWGID = (wgID) => ({
    type: 'UPDATE_WGID',
    wgID
})

export const updateWGType = (wgType) => ({
    type: 'UPDATE_WGTYPE',
    wgType
})

export const updateWGTitle = (wgTitle) => ({
    type: 'UPDATE_WGTITLE',
    wgTitle
})

export const updateWGDescription = (wgDescription) => ({
    type: 'UPDATE_WGDESCRIPTION',
    wgDescription
})

export const updateWGDamage = (wgDamage) => ({
    type: 'UPDATE_WGDAMAGE',
    wgDamage
})

export const updateWGAttackTurn = (wgAttackTurn) => ({
    type: 'UPDATE_WGATTACKTURN',
    wgAttackTurn
})

export const updateWGRangeIDs = (wgRangeID) => ({
    type: 'UPDATE_WGRANGEIDS',
    wgRangeID
})

export const removeWGRangeID = (wgRangeID) => ({
    type: 'REMOVE_WGRANGEID',
    wgRangeID
})

export const updateWGDisRangeIDs = (wgRangeID) => ({
    type: 'UPDATE_WGDISRANGEIDS',
    wgRangeID
})

export const removeWGDisRangeID = (wgRangeID) => ({
    type: 'REMOVE_WGDISRANGEID',
    wgRangeID
})

export const updateWGHTrait = (wgHTrait) => ({
    type: 'UPDATE_WGHTRAIT',
    wgHTrait
})

export const updateWGTrait = (wgTrait) => ({
    type: 'UPDATE_WGTRAIT',
    wgTrait
})





export const loadWeapon = (weapon) => ({
    type: 'LOAD_WEAPON',
    weapon
})

export const clearWeapon = () => ({
    type: 'CLEAR_WEAPON'
})

export const updateWID = (wID) => ({
    type: 'UPDATE_WID',
    wID
})

export const updateWCharID = (wCharID) => ({
    type: 'UPDATE_WCHARID',
    wCharID
})

export const updateWGroup = (wGroup) => ({
    type: 'UPDATE_WGROUP',
    wGroup
})

export const updateWType = (wType) => ({
    type: 'UPDATE_WTYPE',
    wType
})

export const updateWTitle = (wTitle) => ({
    type: 'UPDATE_WTITLE',
    wTitle
})

export const updateWDescription = (wDescription) => ({
    type: 'UPDATE_WDESC',
    wDescription
})

export const updateWDepletion = (wDepletion) => ({
    type: 'UPDATE_WDEPLETE',
    wDepletion
})

export const updateWHTrait = (wHTrait) => ({
    type: 'UPDATE_WHTRAIT',
    wHTrait
})

export const updateWTrait = (wTrait) => ({
    type: 'UPDATE_WTRAIT',
    wTrait
})

export const startSaveWeaponGroup = async ({
    wgID,
    wgType,
    wgTitle,
    wgDescription,
    wgDamage,
    wgAttackTurn,
    wgRangeIDs,     // c,n,f
    wgDisRangeIDs,  // c,n,f
    wgHTrait,       // Set by Heritage
    wgTrait,        // Set by Trait

}) => {
    const updates = {}

    updates[`weaponGroups/${wgID}/wgID`] = wgID
    updates[`weaponGroups/${wgID}/wgType`] = wgType
    updates[`weaponGroups/${wgID}/wgTitle`] = wgTitle
    updates[`weaponGroups/${wgID}/wgDescription`] = wgDescription
    updates[`weaponGroups/${wgID}/wgDamage`] = wgDamage
    updates[`weaponGroups/${wgID}/wgAttackTurn`] = wgAttackTurn
    updates[`weaponGroups/${wgID}/wgRangeIDs`] = wgRangeIDs
    updates[`weaponGroups/${wgID}/wgDisRangeIDs`] = wgDisRangeIDs
    updates[`weaponGroups/${wgID}/wgHTrait`] = wgHTrait
    updates[`weaponGroups/${wgID}/wgTrait`] = wgTrait


    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save weapon group', error)
        })
}


export const startNewWeaponGroupKey = async ({ wGroupData }) => {
    const wgID = push(child(ref(db), 'weaponGroups')).key
    startSaveWeaponGroup({ ...wGroupData, wgID })
}

// export const startSaveHeritage = async ({
//     hID,
//     hTitle,
//     hDescription,
//     hPhysical,
//     hHP,
//     hTraitIDs
// }) => {
//     const updates = {}

//     updates[`heritages/${hID}/hID`] = hID
//     updates[`heritages/${hID}/hTitle`] = hTitle
//     updates[`heritages/${hID}/hDescription`] = hDescription
//     updates[`heritages/${hID}/hPhysical`] = hPhysical
//     updates[`heritages/${hID}/hHP`] = hHP
//     updates[`heritages/${hID}/hTraitIDs`] = hTraitIDs

//     update(ref(db), updates)
//         .catch((error) => {
//             console.log('Did not save heritage', error)
//         })
// }




// export const startNewHeritageKey = async ({ heritageData }) => {
//     const hID = push(child(ref(db), 'heritages')).key
//     startSaveHeritage({ ...heritageData, hID })
// }

export const startSaveWeapon = async ({
    wID,
    wType,          // Corresponds to weaponGroup letter
    wTitle,         // User-defined text, if any
    wDescription,   // User-defined text, if any
    wDepletion,     // Interact with depletion counters in later update, set initial depletion counters by wType object
    wHTrait,     // Set by Heritage
    wTrait,      // Set by Trait

}) => {
    const updates = {}

    updates[`weapons/${wID}/wID`] = wID
    updates[`weapons/${wID}/wType`] = wType
    updates[`weapons/${wID}/wTitle`] = wTitle
    updates[`weapons/${wID}/wDescription`] = wDescription
    updates[`weapons/${wID}/wDepletion`] = wDepletion
    updates[`weapons/${wID}/wHTrait`] = wHTrait
    updates[`weapons/${wID}/wTrait`] = wTrait

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save weapon', error)
        })
}


export const startNewWeaponKey = async ({ weaponData }) => {
    const wID = push(child(ref(db), 'weapons')).key
    startSaveWeapon({ ...weaponData, wID })
}