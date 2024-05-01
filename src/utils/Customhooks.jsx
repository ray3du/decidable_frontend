import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useDispatchHook = () => {
  const customDispatch = useDispatch();
  const customNavigate = useNavigate();

  const dispatch = (action) => {
    customDispatch(action);
  };

  const navigate = (route, { ...state } = {}) => {
    customNavigate(route, { ...state });
  };

  return { dispatch, navigate };
};

export { useDispatchHook };
