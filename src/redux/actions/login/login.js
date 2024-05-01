import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../../types";
import request from "../../../helpers/request";
import { LOGIN } from "../../../helpers/api";
import { message } from "antd";

export const login = (data, hooks) => {
  const { dispatch, navigate } = hooks;
  dispatch({
    type: LOGIN_LOADING,
  });

  request
    .post(LOGIN, data)
    .then((resp) => {
      dispatch({ type: LOGIN_SUCCESS, payload: resp });
      message.success(resp?.data?.message ?? "")
      navigate("/");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR, payload: err });
    });
};
