import * as generalTypes from '../../types/general'
import Departamentos from '../../../libs/ubigeo/departamentos.json'
import Provincias from '../../../libs/ubigeo/provincias.json'
import Distritos from '../../../libs/ubigeo/distritos.json'

const initialState = {
  cat_loading: true,
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
      default:
        return state
    }
}

export default reducer