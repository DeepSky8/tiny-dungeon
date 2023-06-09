import { child, push, ref, update } from "firebase/database"
import { db } from "../api/firebase"

export const loadScroll = (scroll) => ({
    type: 'LOAD_SCROLL',
    scroll
})

export const clearScroll = () => ({
    type: 'CLEAR_SCROLL'
})

export const updateSID = (sID) => ({
    type: 'UPDATE_SID',
    sID
})

export const updateSTitle = (sTitle) => ({
    type: 'UPDATE_STITLE',
    sTitle
})

export const updateSDescription = (sDescription) => ({
    type: 'UPDATE_SDESCRIPTION',
    sDescription
})

export const updateSAmount = (sAmount) => ({
    type: 'UPDATE_SAMOUNT',
    sAmount
})

export const increaseSAmount = () => ({
    type: 'INCREASE_SAMOUNT'
})

export const decreaseSAmount = () => ({
    type: 'DECREASE_SAMOUNT'
})


export const startSaveScroll = async ({
    sID,
    sTitle,
    sDescription,
    sAmount

}) => {
    const updates = {}

    updates[`scrolls/${sID}/sID`] = sID
    updates[`scrolls/${sID}/sTitle`] = sTitle
    updates[`scrolls/${sID}/sDescription`] = sDescription
    updates[`scrolls/${sID}/sAmount`] = sAmount

    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save scroll', error)
        })
}


export const startNewScrollKey = async ({ scrollData }) => {
    const sID = push(child(ref(db), 'scrolls')).key
    startSaveScroll({ ...scrollData, sID })
}