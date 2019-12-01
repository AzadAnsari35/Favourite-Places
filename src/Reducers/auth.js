import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_CHECK,
  LOGOUT
} from "../Actions/types";

const initialState = {
  isAuthenticated: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("login", payload.username);
      return {
        ...state,
        isAuthenticated: true
      };

    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false
      };

    case LOGIN_CHECK:
      return {
        ...state,
        isAuthenticated: true
      };

    case LOGOUT:
      localStorage.removeItem("login");
      return {
        ...state,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
