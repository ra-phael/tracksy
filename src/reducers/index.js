import { combineReducers } from "redux";
import filters from './filters';
import user from './user'



// const reducers = (state = initialState, action) => {
//     console.log("New action received:", action);
//     switch(action.type) {
//       case 'FILTER_UPDATE': 
//         return { 
//             ...state,
//             filters: Object.assign({}, state.filters, action.payload)
//         }
//       case 'LOGIN_SUCCESS':
//         return {
//           ...state,
//           user: Object.assign({}, action.payload),
//           isUserLoggedIn: true
//         }
//       case 'LOGOUT_SUCCESS':
//         return {
//           ...state,
//           user: {},
//           isUserLoggedIn: false
//         }
//       case 'ITEM_TRACKING_ADD':
//         return {
//           ...state,
//           watchedItems : state.watchedItems.concat(action.payload)
//         } 
//       case 'ITEM_TRACKING_REMOVE':
//         return {
//           ...state,
//           watchedItems : state.watchedItems.filter(item => {
//             item !== action.payload
//           })
//         } 
//       default : return state;
//     }
//   }



export default combineReducers({
  filters,
  user
});