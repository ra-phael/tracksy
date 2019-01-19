

const reducers = (state = {filters: []}, action) => {
    switch(action.type) {
      case 'FILTER_UPDATE': 
        return { 
            ...state,
            filters: Object.assign({}, state.filters, action.payload)
        }
      default : return state;
    }
  }

export default reducers;