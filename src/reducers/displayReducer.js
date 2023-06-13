const defaultDisplay = {
    display1: true,
    display2: false,
    display3: false,
    display4: false,
    display5: false,
    display6: false,
    display7: false,

}

const displayReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_ONE':
            return {
                display1: true,
                display2: false,
                display3: false,
                display4: false,
                display5: false,
                display6: false,
                display7: false,
            }
        case 'CLOSE_ONE':
            return {
                ...state,
                display1: false,
            }
        case 'OPEN_TWO':
            return {
                display1: false,
                display2: true,
                display3: false,
                display4: false,
                display5: false,
                display6: false,
                display7: false,
            }
        case 'CLOSE_TWO':
            return {
                ...state,
                display2: false,
            }
        case 'OPEN_THREE':
            return {
                display1: false,
                display2: false,
                display3: true,
                display4: false,
                display5: false,
                display6: false,
                display7: false,
            }
        case 'CLOSE_THREE':
            return {
                ...state,
                display3: false,
            }
        case 'OPEN_FOUR':
            return {
                display1: false,
                display2: false,
                display3: false,
                display4: true,
                display5: false,
                display6: false,
                display7: false,
            }
        case 'CLOSE_FOUR':
            return {
                ...state,
                display4: false,
            }
        case 'OPEN_FIVE':
            return {
                display1: false,
                display2: false,
                display3: false,
                display4: false,
                display5: true,
                display6: false,
                display7: false,

            }
        case 'CLOSE_FIVE':
            return {
                ...state,
                display5: false,
            }
        case 'OPEN_SIX':
            return {
                display1: false,
                display2: false,
                display3: false,
                display4: false,
                display5: false,
                display6: true,
                display7: false,
            }
        case 'CLOSE_SIX':
            return {
                ...state,
                display6: false,
            }
        case 'OPEN_SEVEN':
            return {
                display1: false,
                display2: false,
                display3: false,
                display4: false,
                display5: false,
                display6: false,
                display7: true,

            }
        case 'CLOSE_SEVEN':
            return {
                ...state,
                display7: false,
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultDisplay, displayReducer }