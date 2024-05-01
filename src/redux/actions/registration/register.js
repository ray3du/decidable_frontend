import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_LOADING,
} from "../../types";
import request from "../../../helpers/request";
import { REGISTER } from "../../../helpers/api";
import { notification } from "antd";

export const register = (data, hooks) => {
  const { dispatch, navigate } = hooks;
  dispatch({
    type: REGISTER_LOADING,
  });

  request
    .post(REGISTER, data)
    .then((resp) => {
      dispatch({ type: REGISTER_SUCCESS, payload: resp });
      notification.success({ message: resp?.data?.message });
      navigate("/login");
    })
    .catch((err) => {
      dispatch({ type: REGISTER_ERROR, payload: err });
    });
};
