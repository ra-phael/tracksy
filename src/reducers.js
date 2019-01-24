
const initialState = {
    filters: [],
    user: {
      watchedItems: []
    }
  }

const reducers = (state = initialState, action) => {
    console.log("New action received:", action);
    switch(action.type) {
      case 'FILTER_UPDATE': 
        return { 
            ...state,
            filters: Object.assign({}, state.filters, action.payload)
        }
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: Object.assign({}, action.payload),
          isUserLoggedIn: true
        }
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          user: {},
          isUserLoggedIn: false
        }
      case 'ITEM_TRACKING_ADD':
        console.log('watchedItems', state.user.watchedItems);
        return {
          ...state,
          user : {
            ...state.user,
            [state.user.watchedItems]: state.user.watchedItems.concat(action.payload)
          }
        } 
      default : return state;
    }
  }

export default reducers;