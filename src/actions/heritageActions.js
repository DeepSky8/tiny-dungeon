import { child, push, ref, update } from "firebase/database"
import { db } from "../api/firebase"


export const loadHeritage = (heritage) => ({
    type: 'LOAD_HERITAGE',
    heritage
})

export const updateHID = (hID) => ({
    type: 'UPDATE_HID',
    hID
})

export const updateHTitle = (hTitle) => ({
    type: 'UPDATE_HTITLE',
    hTitle
})

export const updateHDescription = (hDescription) => ({
    type: 'UPDATE_HDESCRIPTION',
    hDescription
})

export const updateHHP = (hHP) => ({
    type: 'UPDATE_HHP',
    hHP
})

export const updateHTraitIDs = (hTraitID) => ({
    type: 'UPDATE_HTRAITIDS',
    hTraitID
})

export const removeHTraitID = (hTraitID) => ({
    type: 'REMOVE_HTRAITID',
    hTraitID
})


export const startSaveHeritage = async ({
    hID,
    hName,
    hDescription,
    hHP,
    hTraitID
}) => {
    const updates = {}

    updates[`heritages/${hID}/hID`] = hID
    updates[`heritages/${hID}/hTitle`] = hTitle
    updates[`heritages/${hID}/hDescription`] = hDescription
    updates[`heritages/${hID}/hHP`] = hHP
    updates[`heritages/${hID}/hTraitID`] = hTraitID

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save heritage', error)
        })
}




export const startNewHeritageKey = async ({ heritageData }) => {
    const hID = push(child(ref(db), 'heritages')).key
    startSaveHeritage({ ...heritageData, hID })
}