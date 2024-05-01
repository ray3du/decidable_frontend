import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/login/loginReducer";
import { registrationReducer } from "./reducers/registration/registrationReducer";

const reducer = combineReducers({
  loginReducer,
  registrationReducer,
});

export const store = configureStore({
  reducer,
});
