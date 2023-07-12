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


export const startUpdateCharID = async ({ uid, charID }) => {
    const updates = {};

    updates[`users/${uid}/charID`] = charID
    updates[`characters/${charID}/charID`] = charID
    updates[`characters/${charID}/userID`] = uid

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}


export const startUpdateChar = async ({ uid, charData }) => {
    const updates = {};

    updates[`characters/${charData.charID}`] = { ...charData, charUpdated: Date.now(), userID: uid }

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateFamiliar = async ({ uid, charData }) => {
    const updates = {};

    updates[`characters/${charData.charID}/familiar`] = charData.familiar
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()


    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateWeapons = async ({ uid, charData }) => {
    const updates = {};

    updates[`characters/${charData.charID}/weaponObjects`] = charData.weaponObjects
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()


    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateBelief = async ({ uid, charData }) => {
    const updates = {};
    updates[`characters/${charData.charID}/userID`] = uid
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()

    updates[`characters/${charData.charID}/belief`] = charData.belief

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateTrade = async ({ uid, charData, trade }) => {
    const updates = {};
    updates[`characters/${charData.charID}/userID`] = uid
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()

    updates[`characters/${charData.charID}/trade`] = trade

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateCurrentArmor = async ({ uid, charData, newArmor }) => {
    const updates = {};
    updates[`characters/${charData.charID}/userID`] = uid
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()

    updates[`characters/${charData.charID}/currentArmor`] = newArmor

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateMaxArmor = async ({ uid, charData, newArmor }) => {
    const updates = {};
    updates[`characters/${charData.charID}/userID`] = uid
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()

    updates[`characters/${charData.charID}/maxArmor`] = newArmor

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

export const startUpdateCurrentHP = async ({ uid, charData, newHP }) => {
    const updates = {};
    updates[`characters/${charData.charID}/userID`] = uid
    updates[`characters/${charData.charID}/charUpdated`] = Date.now()

    updates[`characters/${charData.charID}/currentHP`] = newHP

    update(ref(db), updates)
        .then(() => {
            startUpdateUserAccessDate({ uid: uid })
        })
        .catch((error) => {
            console.log('Did not update character', error)
        })
}

// export const startMarkCharComplete = async ({ charID, charData }) => {
//     const updates = {};

//     updates[`characters/${charID}`] = { ...charData, charID, charCreated: Date.now() }

//     update(ref(db), updates)
//         .catch((error) => {
//             console.log('Did not create character', error)
//         })
// }

export const startClearCharData = async ({ gameCode, charID }) => {
    const updates = {};

    updates[`gameSessions/${gameCode}/${charID}`] = null

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not clear character', error)
        })
}


export const startNewCharKey = async () => {
    const charID = push(child(ref(db), 'characters')).key
    return charID
}