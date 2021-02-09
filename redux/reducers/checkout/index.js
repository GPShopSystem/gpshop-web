import produce from 'immer'
import * as checkoutTypes from '../../types/checkout'

const initialState = {
    currentStep: 2,
    stepOne: {
        typeDoc: 1
    },
    stepTwo: {
        departamento: '',
        provincia: '',
        distrito: '',
        address: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case checkoutTypes.CHECKOUT_UPDATE_STEP:
            return produce(state, (oldState) => {
                const draftState = oldState
                draftState[action.payload.step] = action.payload.property
            })
        case checkoutTypes.CHECKOUT_CHANGE_STEP:
            return {
                ...state,
                currentStep: action.payload
            }
        default:
            return state
    }
}

export default reducer