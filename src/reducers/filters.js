

export default function filters(state = [], action) {
    switch(action.type) {
        case 'FILTER_UPDATE': 
          return { 
              ...state,
              ...action.payload
          }
        default : return state;
    }
}