import * as cartTypes from '../../types/cart'

export const toggleCartMode = (active) => {
    return {
        type: cartTypes.TOGGLE_CART_MODE,
        payload: active
    }
}

export const toggleCart = (active) => {
    return {
        type: cartTypes.TOGGLE_CART,
        payload: active
    }
}

export const setCart = (item) => {
  return {
    type: cartTypes.SET_CART,
    payload: item
  }
}

export const addCart = (item) => {
  return {
    type: cartTypes.ADD_CART,
    payload: item
  }
}

export const removeCart = (item) => {
  return {
    type: cartTypes.DELETE_ITEM,
    payload: item
  }
}

export const cleanItemCart = (item) => {
  return {
    type: cartTypes.CLEAR_ITEM,
    payload: item
  }
};