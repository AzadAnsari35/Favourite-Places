import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    function allStorage() {
      let value = [];
      let keys = Object.keys(localStorage);
      let i = keys.length;

      while (i--) {
        if (keys[i] !== "login")
          value.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      console.log(value);
      setUserList(value);
    }

    allStorage();
  }, []);

  useEffect(() => {}, [userList]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User List</h1>
      {userList.map((user, index) => (
        <Paper key={index}>
          <h3>Username: {user.username}</h3>
          <h4>Email: {user.email}</h4>
          <h4>Login Count: {user.count}</h4>
          <h4>Date: {user.time}</h4>
        </Paper>
      ))}
    </div>
  );
};

export default UserList;
