import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const signup = user => async dispatch => {
  const emailVerification = () => {
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      if (JSON.parse(localStorage.getItem(keys[i])).email === user.email) {
        return true;
      }
    }
    return false;
  };

  if (localStorage.getItem(user.username) || emailVerification()) {
    alert("User Already Exist");
    dispatch({
      type: REGISTER_FAIL,
      payload: user
    });
  } else {
    const newUser = { ...user, count: 0, time: Date(Date.now()) };
    localStorage.setItem(newUser.username, JSON.stringify(newUser));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: newUser
    });
  }
};

export const login = user => async dispatch => {
  console.log(user);

  const loginVerification = () => {
    let err = "Wrong Username";
    let loginFlag = false;
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
      if (
        JSON.parse(localStorage.getItem(keys[i])).username === user.username
      ) {
        if (
          JSON.parse(localStorage.getItem(keys[i])).password === user.password
        ) {
          let matchUser = JSON.parse(localStorage.getItem(keys[i]));
          let count = matchUser.count || 0;
          const newUser = { ...matchUser, count: count + 1 };
          localStorage.setItem(newUser.username, JSON.stringify(newUser));
          dispatch({
            type: REGISTER_SUCCESS,
            payload: newUser
          });
          loginFlag = true;
        } else err = "Wrong Password";
      }
    }

    loginFlag || alert(err);
  };

  loginVerification();
};
