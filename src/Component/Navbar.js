import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Actions/types";
import withWidth from "@material-ui/core/withWidth";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#FF9E77",
    color: "#ffffff",
    width: "100%"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    fontSize: 25,

    "& a": {
      textDecoration: "none",
      color: "#000000"
    },
    "& .active": {
      color: "#fffff"
    },
    [theme.breakpoints.down(426)]: {
      display: "none"
    }
  },
  headerMobile: {
    width: "100%",
    maxWidth: 400,
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",

    "& a": {
      textDecoration: "none",
      color: "#000000"
    },
    "& .active": {
      color: "#FF9E77"
    }
  }
}));

const Navbar = ({ width }) => {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log("working");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.header}>
      <div>
        <h1>Favourite Places</h1>
      </div>
      {width !== "xs" ? (
        <div className={classes.headerRight}>
          <NavLink
            to="/map"
            style={{ marginRight: 20 }}
            activeClassName={"active"}
          >
            Map
          </NavLink>
          <NavLink
            to="/user-list"
            style={{ color: "black" }}
            activeClassName={"active"}
          >
            User List
          </NavLink>
          {isAuthenticated && (
            <a href="#!" onClick={() => dispatch({ type: LOGOUT })}>
              Logout
            </a>
          )}
        </div>
      ) : (
        <Fragment>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classes.sideBar}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <div style={{ width: 200 }}></div>
            <div style={{ padding: 10 }}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />

            <div className={classes.headerMobile}>
              <NavLink to="/map" activeClassName={"active"}>
                Map
              </NavLink>
              <NavLink to="/user-list" activeClassName={"active"}>
                User List
              </NavLink>
              {isAuthenticated && (
                <a href="#!" onClick={() => dispatch({ type: LOGOUT })}>
                  Logout
                </a>
              )}
            </div>
          </Drawer>
        </Fragment>
      )}
    </Paper>
  );
};

export default withWidth()(Navbar);
