import * as generalTypes from '../../types/general'

const initialState = {
  cat_loading: true,
  cat_list: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case generalTypes.GENERAL_SET_CATEGORY:
        return {
          ...state,
          cat_loading: false,
          cat_list: action.payload
      }
      default:
        return state
    }
  }

export default reducer