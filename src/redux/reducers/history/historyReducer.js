import { HISTORY_ERROR, HISTORY_SUCCESS, HISTORY_LOADING } from "../../types";

const initialState = {
  loading: false,
  message: "",
  data: [],
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case HISTORY_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};
