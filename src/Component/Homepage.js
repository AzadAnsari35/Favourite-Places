import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import DialogContent from "@material-ui/core/DialogContent";
import Signup from "./Signup";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  login: {
    color: "white",
    width: 200,
    height: 50,
    backgroundColor: "#FF9E77"
  },
  image: {
    [theme.breakpoints.down(426)]: {
      height: 400
    }
  },
  buttonParent: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "space-between",
    width: "40%",
    [theme.breakpoints.down(426)]: {
      flexDirection: "column"
    }
  },

  loginDialogBox: {
    width: 300,
    height: 400,
    display: "flex",
    justifyContent: "center"
  },
  signupDialogBox: {
    width: 300,
    height: 465,
    display: "flex",
    justifyContent: "center"
  }
}));

const Homepage = ({ isAuthenticated }) => {
  const classes = useStyles();

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  const handleLoginClick = () => {
    setOpenLogin(true);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleSignupClick = () => {
    setOpenSignup(true);
  };
  const handleSignupClose = () => {
    setOpenSignup(false);
  };

  if (isAuthenticated) {
    return <Redirect to="/map" />;
  }

  return (
    <div>
      <img
        src="https://payload.cargocollective.com/1/12/392637/9762679/mountain_flat_rgb_resized_1000.jpg"
        alt="favourtie"
        width="100%"
        className={classes.image}
      />
      <div className={classes.buttonParent}>
        <div>
          <Button
            variant="contained"
            className={classes.login}
            onClick={handleLoginClick}
            style={{ marginBottom: 30 }}
          >
            Login
          </Button>
          <Dialog onClose={handleLoginClose} open={openLogin}>
            <DialogContent className={classes.loginDialogBox}>
              <Login />
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Button
            variant="contained"
            className={classes.login}
            onClick={handleSignupClick}
          >
            SignUp
          </Button>
          <Dialog onClose={handleSignupClose} open={openSignup}>
            <DialogContent className={classes.signupDialogBox}>
              <Signup />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Homepage);
