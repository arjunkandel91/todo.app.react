export const countReducer = (state, action) => {
    switch (action.type) {
        case 'increase': {
            return { count: state.count + 1}
        }
        case 'decrease': {
            return { count: state.count - 1}
        }
        case 'reset': {
            return { count: action.value }
        }
        default: {
            return state
        }
    }
};