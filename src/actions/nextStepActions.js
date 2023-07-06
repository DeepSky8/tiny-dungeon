export const takeNextStep = (char) => ({
    type: 'NEXT_STEP_CHECK',
    char
})

export const prevStep = (char) => ({
    type: 'PREV_STEP',
    char
})

export const setStepCharID = (stepCharID) => ({
    type: 'SET_STEP_CHARID',
    stepCharID
})

export const setStepInitialTraits = (initialTraits) => ({
    type: 'SET_STEP_INITIALTRAITS',
    initialTraits
})

export const clearNextError = () => ({
    type: 'CLEAR_ERROR'
})

