import { HISTORY_ERROR, HISTORY_SUCCESS, HISTORY_LOADING } from "../../types";
import request from "../../../helpers/request";
import { HISTORY } from "../../../helpers/api";
import { notification } from "antd";

export const history = (hooks) => {
  const { dispatch, navigate } = hooks;
  dispatch({
    type: HISTORY_LOADING,
  });

  request
    .get(HISTORY)
    .then((resp) => {
      dispatch({ type: HISTORY_SUCCESS, payload: resp?.data?.history || [] });
      notification.success({ message: resp?.data?.message });
      navigate("/");
    })
    .catch((err) => {
      dispatch({ type: HISTORY_ERROR, payload: err });
    });
};
