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

export const updateHPhysical = (hPhysical) => ({
    type: 'UPDATE_HPHYSICAL',
    hPhysical
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

export const updateHImageURL = (hImageURL) => ({
    type: 'UPDATE_HIMAGEURL',
    hImageURL
})

export const updateHAltText = (hAltText) => ({
    type: 'UPDATE_HALTTEXT',
    hAltText
})

export const startSaveHeritage = async ({
    hID,
    hTitle,
    hDescription,
    hPhysical,
    hHP,
    hTraitIDs,
    hImageURL,
    hAltText
}) => {
    const updates = {}

    updates[`heritages/${hID}/hID`] = hID
    updates[`heritages/${hID}/hTitle`] = hTitle
    updates[`heritages/${hID}/hDescription`] = hDescription
    updates[`heritages/${hID}/hPhysical`] = hPhysical
    updates[`heritages/${hID}/hHP`] = hHP
    updates[`heritages/${hID}/hTraitIDs`] = hTraitIDs
    updates[`heritages/${hID}/hImageURL`] = hImageURL
    updates[`heritages/${hID}/hAltText`] = hAltText

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save heritage', error)
        })
}




export const startNewHeritageKey = async ({ heritageData }) => {
    const hID = push(child(ref(db), 'heritages')).key
    startSaveHeritage({ ...heritageData, hID })
}