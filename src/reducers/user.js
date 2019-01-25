

const initialState = {
    isUserLoggedIn: false,
    watchedItems: []
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
        return {
          ...state,
          ...action.payload,
          isUserLoggedIn: true
        }
      case 'LOGOUT_SUCCESS':
        return initialState
      case 'ITEM_TRACKING_CHANGE':
        return {
            ...state,
            watchedItems: action.payload
        }
      default : return state;
    }
}