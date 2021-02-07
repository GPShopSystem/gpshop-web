import { combineReducers } from 'redux'
import cart from './cart'
import general from './general'

const appReducer = combineReducers({
  cart,
  general,
  checkout: {
    shippingOptions: [],
    checkoutTokenObject: {},
  }
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    // state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer