import * as generalTypes from '../../types/general'
import Departamentos from '../../../libs/ubigeo/departamentos.json'
import Provincias from '../../../libs/ubigeo/provincias.json'
import Distritos from '../../../libs/ubigeo/distritos.json'

const initialState = {
  cat_loading: true,
  toggleMenu: false,
  toggleProduct: false,
  product: {},
  cat_list: [],
  ubigeo: {
    departamentos: Departamentos,
    provincias: Provincias,
    distritos: Distritos
  }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case generalTypes.GENERAL_SET_CATEGORY:
        return {
          ...state,
          cat_loading: false,
          cat_list: action.payload
      }
      case generalTypes.GENERAL_TOGGLE_MENU:
        return {
            ...state,
            toggleMenu: action.payload
      }
      case generalTypes.GENERAL_SET_PRODUCT:
        return {
          ...state,
          product: action.payload
      }
      case generalTypes.GENERAL_TOGGLE_PRODUCT:
        return {
            ...state,
            toggleProduct: action.payload
      }
      default:
        return state
    }
}

export default reducer