export const takeNextStep = (char) => ({
    type: 'NEXT_STEP_CHECK',
    char
})

export const prevStep = (char) => ({
    type: 'PREV_STEP',
    char
})

export const clearNextError = () => ({
    type: 'CLEAR_ERROR'
})

