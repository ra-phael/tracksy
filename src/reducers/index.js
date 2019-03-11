import { combineReducers } from "redux";
import filters from './filters';
import user from './user'


export default combineReducers({
  filters,
  user
});