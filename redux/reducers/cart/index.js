import * as cartTypes from '../../types/cart'

const initialState = {
  toggleCart: false,
  list: []
}

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("myCart", JSON.stringify(cart))
}

const addItemToCart = (state, action) => {
  const existingCartItemIndex = state.list.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    const newState = [...state.list];
    newState[existingCartItemIndex].quantity += 1;
    saveCartToLocalStorage(newState)
    return newState;
  }

  const newCart = [...state.list, action.payload]

  saveCartToLocalStorage(newCart)
  return newCart
};

const removeItemFromCart = (state, action) => {
  const newCart = state.list.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, [])
  
  saveCartToLocalStorage(newCart)
  return newCart
};

const clearItemFromCart = (state, action) => {
  const newCart = state.list.filter((item) => item.id !== action.payload.id);
  saveCartToLocalStorage(newCart)
  return newCart 
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.SET_CART:
      return {
        ...state,
        list: action.payload
      }
    case cartTypes.ADD_CART:
      return {
        ...state,
        list: addItemToCart(state, action)
      }
    case cartTypes.DELETE_ITEM:
      return {
        ...state,
        list: removeItemFromCart(state, action)
      }
    case cartTypes.CLEAR_ITEM:
      console.log("entra")
      return {
        ...state,
        list: clearItemFromCart(state, action)
      }
    case cartTypes.UPDATE_ITEM:
      return action.payload
    case cartTypes.TOGGLE_CART:
      return {
        ...state,
        toggleCart: action.payload
    }
    default:
      return state
  }
}

export default reducer