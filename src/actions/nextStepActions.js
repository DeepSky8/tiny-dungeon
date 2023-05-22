export const takeNextStep = (char) => ({
    type: 'NEXT_STEP_CHECK',
    char
})

export const prevStep = () => ({
    type: 'PREV_STEP'
})

export const clearNextError = () => ({
    type: 'CLEAR_ERROR'
})

