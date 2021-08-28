import * as generalTypes from '../../types/general'

export const setCategories = (list) => {
    return {
        type: generalTypes.GENERAL_SET_CATEGORY,
        payload: list
    }
}

export const toggleMenu = (active) => {
    return {
        type: generalTypes.GENERAL_TOGGLE_MENU,
        payload: active
    }
}
