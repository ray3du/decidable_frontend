import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../../types";

const initialState = {
  loading: false,
  token: null,
  message: "",
  success: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("decidable_token", action?.payload?.data?.token);
      localStorage.setItem("user_email", action?.payload?.data?.user?.email);

      return {
        ...state,
        loading: false,
        success: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        // message: action.payload,
      };
    default:
      return { ...state };
  }
};
