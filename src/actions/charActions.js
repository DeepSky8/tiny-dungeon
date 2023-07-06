import { child, push, ref, update } from "firebase/database"
import { db } from "../api/firebase"
import { startUpdateUserAccessDate } from "./userActions"

export const loadChar = (char) => ({
    type: 'LOAD_CHAR',
    char
})

export const updateCharID = (charID) => ({
    type: 'UPDATE_CHARID',
    charID
})

export const updateUserID = (userID) => ({
    type: 'UPDATE_USERID',
    userID
})

export const updateCharName = (charName) => ({
    type: 'UPDATE_CHARNAME',
    charName
})

export const updateHeritageID = (heritageID) => ({
    type: 'UPDATE_HERITAGEID',
    heritageID
})

export const updateTraitIDs = (traitID) => ({
    type: 'UPDATE_TRAITIDS',
    traitID
})

export const clearTraitIDs = () => ({
    type: 'CLEAR_TRAITIDS'
})

export const updateHTraitID = (hTraitID) => ({
    type: 'UPDATE_HTRAITID',
    hTraitID
})

export const setHeritageHP = (hHP) => ({
    type: 'SET_HERITAGEHP',
    hHP
})

export const setTraitHP = (tHP) => ({
    type: 'SET_TRAITHP',
    tHP
})

export const setCurrentHP = (currentHP) => ({
    type: 'SET_CURRENTHP',
    currentHP
})

export const decreaseCurrentHP = () => ({
    type: 'DECREASE_CURRENTHP',
})

export const increaseCurrentHP = () => ({
    type: 'INCREASE_CURRENTHP',
})

export const setMaxArmor = (maxArmor) => ({
    type: 'SET_MAXARMOR',
    maxArmor
})

export const setCurrentArmor = (currentArmor) => ({
    type: 'SET_CURRENTARMOR',
    currentArmor
})

export const decreaseCurrentArmor = () => ({
    type: 'DECREASE_CURRENTARMOR',

})

export const increaseCurrentArmor = () => ({
    type: 'INCREASE_CURRENTARMOR',
})

export const updateTrade = (trade) => ({
    type: 'UPDATE_TRADE',
    trade
})

export const updateBelief = (belief) => ({
    type: 'UPDATE_BELIEF',
    belief
})

export const setDefaultWeaponGroupObjects = (defaultWeaponGroupObjects) => ({
    type: 'SET_WEAPONGROUPOBJECTS',
    defaultWeaponGroupObjects
})

export const addWeaponGroupObject = (weaponGroupObject) => ({
    type: 'ADD_WEAPONGROUPOBJECT',
    weaponGroupObject
})

export const removeWeaponGroupObject = (weaponGroupObject) => ({
    type: 'REMOVE_WEAPONGROUPOBJECT',
    weaponGroupObject
})

export const clearWeaponGroupObjects = () => ({
    type: 'CLEAR_WEAPONGROUPOBJECTS'
})

export const setDefaultWeaponObjects = (defaultWeaponObjects) => ({
    type: 'SET_WEAPONOBJECTS',
    defaultWeaponObjects
})

export const addWeaponObject = (weaponObject) => ({
    type: 'ADD_WEAPONOBJECT',
    weaponObject
})

export const removeWeaponObject = (wgType) => ({
    type: 'REMOVE_WEAPONOBJECT',
    wgType
})


export const updateOutfitIDs = (outfitID) => ({
    type: 'UPDATE_OUTFITIDS',
    outfitID
})

export const updateGold = (gold) => ({
    type: 'UPDATE_GOLD',
    gold
})

export const updateGearID = (gearID) => ({
    type: 'UPDATE_GEARIDS',
    gearID
})

export const updateFamiliar = (familiar) => ({
    type: 'UPDATE_FAMILIAR',
    familiar
})

export const updateXP = (XP) => ({
    type: 'UPDATE_XP',
    XP
})

export const dispatchScrolls = (scrolls) => ({
    type: 'SET_SCROLLS',
    scrolls
})

export const clearScrolls = () => ({
    type: 'CLEAR_SCROLLS'
})

export const addScroll = (scroll) => ({
    type: 'ADD_SCROLL',
    scroll
})

export const minusScroll = (scroll) => ({
    type: 'MINUS_SCROLL',
    scroll
})

export const updateNotes = (charNotes) => ({
    type: "UPDATE_NOTES",
    charNotes
})




// export const update = () => ({
//     type: 'UPDATE_',

// })


export const startUpdateCharID = async ({ uid, currentCharID }) => {
    const updates = {};

    updates[`users/${uid}/currentCharID`] = currentCharID
    updates[`characters/${currentCharID}/currentCharID`] = currentCharID
    updates[`characters/${currentCharID}/userID`] = uid

    update(ref(db), updates)
        .catch((error) => {
            alert('Did not update character ID', error)
        })
}


export const startUpdateCharInfo = async ({ char }) => {
    const updates = {};

    updates[`characters/${char.charID}`] = { ...char, charUpdated: Date.now() }

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startClearCharData = async ({ charID }) => {
    const updates = {};

    updates[`characters/${charID}`] = null

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not clear character', error)
        })
}


export const startNewCharKey = async () => {
    const charID = push(child(ref(db), 'characters')).key
    return charID
}


export const startUpdateHeritageData = async ({ uid, charID, heritage }) => {
    const updates = {};

    // updates[`characters/${charID}/userID`] = uid
    updates[`characters/${charID}/heritageID`] = heritage.hID
    updates[`characters/${charID}/hTraitID`] = heritage.hTraitIDs[0]
    updates[`characters/${charID}/hHP`] = heritage.hHP
    updates[`characters/${charID}/currentHP`] = heritage.hHP


    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update heritage', error)
        })
}

export const startUpdateHeritageTraitID = async ({ uid, charID, hTraitID }) => {
    const updates = {};

    // updates[`characters/${charID}/userID`] = uid
    // updates[`characters/${charID}/heritageID`] = heritage.hID
    updates[`characters/${charID}/hTraitID`] = hTraitID
    // updates[`characters/${charID}/hHP`] = heritage.hHP
    // updates[`characters/${charID}/currentHP`] = heritage.hHP


    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update heritage', error)
        })
}

export const startSetTraitIDs = async ({ uid, charID, traitIDs }) => {
    const updates = {};

    updates[`characters/${charID}/traitIDs`] = traitIDs

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update traitIDs', error)
        })
}

export const startUpdateTraitHP = async ({ uid, charID, tHP }) => {
    const updates = {};

    updates[`characters/${charID}/tHP`] = tHP

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update trait HP', error)
        })
}


export const startUpdateCurrentHP = async ({ uid, charID, currentHP }) => {
    const updates = {};

    updates[`characters/${charID}/currentHP`] = currentHP

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update current HP', error)
        })
}

export const startSetMaxArmor = async ({ uid, charID, maxArmor }) => {
    const updates = {};

    updates[`characters/${charID}/maxArmor`] = maxArmor

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update max armor', error)
        })
}

export const startSetCurrentArmor = async ({ uid, charID, currentArmor }) => {
    const updates = {};

    updates[`characters/${charID}/currentArmor`] = currentArmor

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update current Armor', error)
        })
}

export const startClearScrolls = async ({ uid, charID }) => {
    const updates = {};

    updates[`characters/${charID}/scrolls`] = null

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not clear Scrolls', error)
        })
}

export const startUpdateScrolls = async ({ uid, charID, scrolls }) => {
    const updates = {};

    updates[`characters/${charID}/scrolls`] = scrolls

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update scrolls', error)
        })
}

export const startClearWeaponGroupObjects = async ({ uid, charID }) => {
    const updates = {};

    updates[`characters/${charID}/weaponGroupObjects`] = null

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not clear weapon group objects', error)
        })
}

export const startSetDefaultWeaponGroupObjects = async ({ uid, charID, defaultWGs }) => {
    const updates = {};

    updates[`characters/${charID}/weaponGroupObjects`] = defaultWGs

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not set default Weapon Group Objects', error)
        })
}

export const startSetWeaponGroupObjects = async ({ uid, charID, weaponGroups }) => {
    const updates = {};

    updates[`characters/${charID}/weaponGroupObjects`] = weaponGroups

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not set Weapon Group Objects', error)
        })
}

export const startSaveFamiliar = async ({ uid, charID, familiar }) => {
    const updates = {};

    updates[`characters/${charID}/familiar`] = familiar

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update familiar', error)
        })
}

export const startUpdateBelief = async ({ uid, charID, belief }) => {
    const updates = {};

    updates[`characters/${charID}/belief`] = belief

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update belief / access date', error)
        })
}

export const startUpdateTrade = async ({ uid, charID, trade }) => {
    const updates = {};

    updates[`characters/${charID}/trade`] = trade

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid })
        })
        .catch((error) => {
            console.log('Did not update belief / access date', error)
        })
}

// export const startSetTraitIDs = async ({ uid, charID, traitIDs }) => {
//     const updates = {};

//     updates[`characters/${charID}/traitIDs`] = traitIDs

//     update(ref(db), updates)
//         .then(() => {
//             startUpdateUserAccessDate({ uid })
//         })
//         .catch((error) => {
//             console.log('Did not update traitIDs', error)
//         })
// }