import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import users from "./users";
import students from "./students";

export default combineReducers({
  auth,
  settings,
  users,
  students
});