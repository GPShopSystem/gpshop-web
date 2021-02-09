import { combineReducers } from 'redux'
import cart from './cart'
import general from './general'
import checkout from './checkout'

const appReducer = combineReducers({
  cart,
  general,
  checkout
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    // state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer