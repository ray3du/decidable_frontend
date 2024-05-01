import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/login/loginReducer";
import { registrationReducer } from "./reducers/registration/registrationReducer";
import { historyReducer } from "./reducers/history/historyReducer";

const reducer = combineReducers({
  loginReducer,
  registrationReducer,
  historyReducer,
});

export const store = configureStore({
  reducer,
});
