import { child, push, ref, update } from "firebase/database"
import { db } from "../api/firebase"

export const loadTrait = (trait) => ({
    type: 'LOAD_TRAIT',
    trait
})

export const updateTID = (tID) => ({
    type: 'UPDATE_TID',
    tID
})

export const updateTTitle = (tTitle) => ({
    type: 'UPDATE_TTITLE',
    tTitle
})

export const updateTDescription = (tDescription) => ({
    type: 'UPDATE_TDESCRIPTION',
    tDescription
})

export const updateTHP = (tHP) => ({
    type: 'UPDATE_THP',
    tHP
})

export const updateTHTrait = (tHTrait) => ({
    type: 'UPDATE_THTRAIT',
    tHTrait
})

export const updateTSpecial = (tSpecial) => ({
    type: 'UPDATE_TSPECIAL',
    tSpecial
})

export const updateTShield = (tShield) => ({
    type: 'UPDATE_TSHIELD',
    tShield
})

export const updateTSpell = (tSpell) => ({
    type: 'UPDATE_TSPELL',
    tSpell
})

export const updateTImprovised = (tImprovised) => ({
    type: 'UPDATE_TIMPROVISED',
    tImprovised
})

export const updateTUnarmed = (tUnarmed) => ({
    type: 'UPDATE_TUNARMED',
    tUnarmed
})

export const updateTFamiliar = (tFamiliar) => ({
    type: 'UPDATE_TFAMILIAR',
    tFamiliar
})

export const updateTClaws = (tClaws) => ({
    type: 'UPDATE_TCLAWS',
    tClaws
})


export const startSaveTrait = async ({
    tID,
    tTitle,
    tDescription,
    tHTrait,
    tSpecial,
    tHP,
    tShield,
    tSpell,
    tImprovised,
    tUnarmed,
    tFamiliar,
    tClaws
}) => {
    const updates = {}

    updates[`traits/${tID}/tTitle`] = tTitle
    updates[`traits/${tID}/tDescription`] = tDescription
    updates[`traits/${tID}/tHTrait`] = tHTrait
    updates[`traits/${tID}/tSpecial`] = tSpecial
    updates[`traits/${tID}/tHP`] = tHP
    updates[`traits/${tID}/tShield`] = tShield
    updates[`traits/${tID}/tSpell`] = tSpell
    updates[`traits/${tID}/tImprovised`] = tImprovised
    updates[`traits/${tID}/tUnarmed`] = tUnarmed
    updates[`traits/${tID}/tFamiliar`] = tFamiliar
    updates[`traits/${tID}/tClaws`] = tClaws


    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save trait', error)
        })
}

// tID: '',
// tTitle: '',
// tDescription: '',
// tHTrait: false,
// tSpecial: false,
// tHP: 0,
// tShield: false,
// tSpell: false,
// tImprovised: false,
// tUnarmed: false,
// tFamiliar: false


export const startNewTraitKey = async ({ traitData }) => {
    const tID = push(child(ref(db), 'traits')).key
    startSaveTrait({ ...traitData, tID })
}