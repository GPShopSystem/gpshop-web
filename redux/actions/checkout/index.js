import * as checkoutTypes from '../../types/checkout'

export const updateUserData = (step, property) => async (dispatch) => {
    dispatch({
      type: checkoutTypes.CHECKOUT_UPDATE_STEP,
      payload: {
            step,
            property
      }
    })
}

export const changeStep = (active) => {
  return {
      type: checkoutTypes.CHECKOUT_CHANGE_STEP,
      payload: active
  }
}