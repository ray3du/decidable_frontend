import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../../types";
const initialState = {
  loading: false,
  user: {},
  message: "",
  success: false,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        message: action.payload.message,
        success: true,
      };
    case REGISTER_ERROR:
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
