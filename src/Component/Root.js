import React, { Fragment } from "react";
import Homepage from "./Homepage";
import MapContainer from "./MapContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./UserList";
import PrivateRoute from "./PrivateRoute";
import { LOGIN_CHECK } from "../Actions/types";
import { login } from "../Actions/auth";
import { useDispatch } from "react-redux";
import Navbar from "../Component/Navbar";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch({
        type: LOGIN_CHECK
      });
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <PrivateRoute exact path="/map" component={MapContainer} />
        <PrivateRoute exact path="/user-list" component={UserList} />
      </Switch>
    </Router>
  );
};

export default Root;
