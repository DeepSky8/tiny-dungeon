import {
    updateTClaws,
    updateTDescription,
    updateTFamiliar,
    updateTHP,
    updateTHTrait,
    updateTImprovised,
    updateTShield,
    updateTSpecial,
    updateTSpell,
    updateTTitle,
    updateTUnarmed
} from "../../actions/traitActions";


const traitObjectArray = [
    {
        label: 'Title ',
        id: 'tTitle',            // Must match the field name on the default object
        type: 'text',
        action: updateTTitle,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Description ',
        id: 'tDescription',            // Must match the field name on the default object
        type: 'textarea',
        action: updateTDescription,
        blur: () => {
            // const formatValue = state.tDescription.replace(/[\n\r]/gm, ' ');
            // dispatchState(updateTDescription(formatValue))
        },
    },
    {
        label: 'Heritage Trait ',
        id: 'tHTrait',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTHTrait,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Impacts Character Creation ',
        id: 'tSpecial',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTSpecial,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Barfighter ',
        id: 'tImprovised',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTImprovised,
        blur: () => {
            // Need to add blur save command
        },
    },

    {
        label: 'Shield Bearer ',
        id: 'tShield',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTShield,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Spell-Touched ',
        id: 'tSpell',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTSpell,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Tough ',
        id: 'tHP',            // Must match the field name on the default object
        type: 'number',
        action: updateTHP,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Martial Artist ',
        id: 'tUnarmed',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTUnarmed,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Familiar ',
        id: 'tFamiliar',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTFamiliar,
        blur: () => {
            // Need to add blur save command
        },
    },
    {
        label: 'Powerful Claws ',
        id: 'tClaws',            // Must match the field name on the default object
        type: 'checkbox',
        action: updateTClaws,
        blur: () => {
            // Need to add blur save command
        },
    },

]

export default traitObjectArray