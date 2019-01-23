

const reducers = (state = {filters: [], user:{}}, action) => {
    switch(action.type) {
      case 'FILTER_UPDATE': 
        return { 
            ...state,
            filters: Object.assign({}, state.filters, action.payload)
        }
      case 'LOGIN_SUCCESS':
        console.log("[reducer] LOGIN_SUCCESS", action.payload);
        return {
          ...state,
          user: Object.assign({}, action.payload),
          isUserLoggedIn: true
        }
      default : return state;
    }
  }

export default reducers;