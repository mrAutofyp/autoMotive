import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/header.css";
import FormModel from "../../components/loginForm/FormModel";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import defaultuserimg from "../../assets/images/no-image.jpg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { withRouter } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasket from "@material-ui/icons/ShoppingBasketOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import { GroupWork } from "@material-ui/icons";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
import OurLogo from "../../assets/images/logo.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Store } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    anchorBtnc: {
      textDecoration: "none",
      color: "#fff !important",
      "&:hover": {
        textDecoration: "none",
      },
    },
    closeIcon: {
      position: "absolute !important",
      right: 0,
      top: 0,
    },
  },
}));

const Header = (props) => {
  var user = firebase.auth().currentUser;

  let match = useRouteMatch();
  const [successMsg, setsuccessMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const handleClickOpen = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const showLoginSucces = () => {
    setsuccessMsg(true);
  };

  const closeLoginSucces = () => {
    setsuccessMsg(false);
  };

  const signOut = () => {
    handleClickOpen();

    console.log("log out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("successfully signout");
        setUserProfile(false);
        handleMenuClose();
        // setAdmin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeInPaths = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <UserprofileDropDown logout={signOut} close={handleMenuClose} />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <HighlightOffIcon
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={() => handleMobileMenuClose()}
      />
      {user ? (
        props.currentuser.admin ? (
          <>
            <MenuItem
              style={{ marginTop: "23px" }}
              component={Link}
              to="/AdminDashboard"
              onClick={handleMobileMenuClose}
            >
              <IconButton aria-label="Home" color="inherit">
                <DashboardIcon />
              </IconButton>
              <p>Dashboard</p>
            </MenuItem>
          </>
        ) : null
      ) : null}

      <MenuItem
        style={{
          marginTop: user ? (props.currentuser.admin ? null : "23px") : "23px",
        }}
        component={Link}
        to="/Home"
        onClick={handleMobileMenuClose}
      >
        <IconButton aria-label="Home" color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>

      <MenuItem component={Link} to="/Shop" onClick={handleMobileMenuClose}>
        <IconButton aria-label="Shop" color="inherit">
          <Store />
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      <MenuItem component={Link} to="/About" onClick={handleMobileMenuClose}>
        <IconButton aria-label="About" color="inherit">
          <GroupWork />
        </IconButton>
        <p>About</p>
      </MenuItem>

      <MenuItem component={Link} to="/Contact" onClick={handleMobileMenuClose}>
        <IconButton aria-label="Contact" color="inherit">
          <PermPhoneMsgIcon />
        </IconButton>
        <p>Contact</p>
      </MenuItem>

      {user ? (
        <>
          <MenuItem
            component={Link}
            to="/MyCart"
            onClick={handleMobileMenuClose}
          >
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <p>Cart</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              style={{ marginRight: "1px" }}
            >
              <AccountCircle />
            </IconButton>
            <p>My Account</p>
          </MenuItem>
        </>
      ) : (
        <FormModel
          name="Login"
          cs="header-show-login-btn"
          showmsg={showLoginSucces}
          closemsg={closeLoginSucces}
        />
      )}
    </Menu>
  );

  // =========================

  return (
    <>
      {props.location.pathname &&
      props.history.location.pathname !== "/AdminDashboard" ? (
        <>
          {console.log(match.path, match.url)}
          <div className={classes.grow}>
            <AppBar position="static" style={{ background: "#2E3B55" }}>
              <Toolbar>
                <Typography variant={"h6"} className={classes.title}>
                  <img src={OurLogo} alt="" className="webLogo" />
                  MR AutoMotive
                </Typography>

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  {user ? (
                    props.currentuser.admin ? (
                      <>
                        <Link className="appBarMenuanchor" to="/AdminDashboard">
                          <IconButton aria-label="Home" color="inherit">
                            <DashboardIcon />
                          </IconButton>
                        </Link>
                      </>
                    ) : null
                  ) : null}

                  <Link className="appBarMenuanchor" to="/Home">
                    <IconButton aria-label="Home" color="inherit">
                      <HomeIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    className="appBarMenuanchor"
                    component={Link}
                    to="/Shop"
                    aria-label="Shop"
                    color="inherit"
                  >
                    <Store />
                  </IconButton>
                  <IconButton
                    className="appBarMenuanchor"
                    component={Link}
                    to="/About"
                    aria-label="About"
                    color="inherit"
                  >
                    <GroupWork />
                  </IconButton>

                  <IconButton
                    className="appBarMenuanchor"
                    aria-label="Contact"
                    color="inherit"
                    component={Link}
                    to="/Contact"
                  >
                    <PermPhoneMsgIcon />
                  </IconButton>

                  {user ? (
                    <>
                      <IconButton
                        className="appBarMenuanchor"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        component={Link}
                        to="/MyCart"
                      >
                        <Badge badgeContent={17} color="secondary">
                          <ShoppingBasket />
                        </Badge>
                      </IconButton>
                      <IconButton
                        className="appBarMenuanchor"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        {props.currentuser.userProfile ? (
                          <img
                            src={props.currentuser.userProfile}
                            alt="USER profile image"
                            className="Menu-profileimg"
                          />
                        ) : (
                          <AccountCircle />
                        )}
                      </IconButton>
                    </>
                  ) : (
                    <FormModel
                      name="Login"
                      cs="header-show-login-btn"
                      showmsg={showLoginSucces}
                      closemsg={closeLoginSucces}
                    />
                  )}
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton
                    className={classes.menuLink}
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
                {successMsg ? (
                  <SuccessfullMsg close={closeLoginSucces} />
                ) : null}
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </div>
        </>
      ) : null}
    </>
  );
};

function SuccessfullMsg(props) {
  return (
    <div className="successmsgbox">
      <p>Login successfully!</p>
      <CloseIcon
        onClick={props.close}
        style={{ marginLeft: "5px", paddingLeft: "5px", cursor: "pointer" }}
      />
    </div>
  );
}

function UserprofileDropDown(props) {
  var user = firebase.auth().currentUser;

  const [userimg, setuserimg] = useState({
    saved: false,
    userimage: "",
    imgname: "",
  });
  const [editForm, setEditForm] = useState(false);
  const [useMetaDetails, setUserMetaDetails] = useState({
    userName: "",
    address: "",
    phone: "",
  });

  useState(() => {
    getPreviousData();
  }, []);

  const getuserimg = () => {
    var ImgName,
      reader,
      files = [];

    var input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      files = e.target.files;
      ImgName = e.target.files[0].name;
      setuserimg({
        saved: true,
        userimage: files[0],
        imgname: ImgName,
      });
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("userimg").src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
    //
  };

  const cancelImgChg = () => {
    document.getElementById("userimg").src = user.photoURL;
    setuserimg({
      saved: false,
      userimage: "",
      imgname: "",
    });
  };

  const saveuserimage = () => {
    var uploadTask = firebase
      .storage()
      .ref("usersImages/" + userimg.imgname)
      .put(userimg.userimage);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        document.getElementById("imgupploadingprogress").innerHTML =
          progress + " %";
      },
      function (error) {
        alert("Error occurred while Saving Images!");
      },
      function () {
        //uploading to Database
        setuserimg({ saved: false, userimage: "", imgname: "" });
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          user
            .updateProfile({ photoURL: url })
            .then(function () {
              document.getElementById("imgupploadingprogress").innerHTML = "";
              alert("Image Changed Successfully!");
              firebase
                .database()
                .ref("users")
                .child(user.uid)
                .update({ userProfile: url });
            })
            .catch(function (error) {
              alert("Image Changed Failed!");
            });
        });
      }
    );
  };

  const setEditUserForm = () => {
    if (editForm) {
      setEditForm(false);
      setUserMetaDetails({
        userName: "",
        address: "",
        phone: "",
      });
    } else {
      setEditForm(true);
      getPreviousData();
    }
  };
  const handleUserFormDetails = (event) => {
    setUserMetaDetails({
      ...useMetaDetails,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
    console.log(event.target.value);
    return true;
  };

  function getPreviousData() {
    let dbRef = firebase.database().ref("users");
    if (user) {
      dbRef
        .child(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserMetaDetails(snapshot.val());
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  }

  const changeUSerData = (e) => {
    e.preventDefault();
    let [na, ad, ph] = [
      useMetaDetails.userName.trim(),
      useMetaDetails.address.trim(),
      useMetaDetails.phone.trim(),
    ];
    let [uName, addr, phone] = [
      na.split(" ").join(""),
      ad.split(" ").join(""),
      ph.split(" ").join(""),
    ];

    if (uName.length >= 3 && addr.length >= 10 && phone.length >= 11) {
      firebase.database().ref("users").child(user.uid).update({
        userName: useMetaDetails.userName,
        address: useMetaDetails.address,
        phone: useMetaDetails.phone,
      });
      user
        .updateProfile({
          displayName: useMetaDetails.userName,
        })
        .then(function () {
          console.log("successfully updated!");
          console.log(user);
        })
        .catch(function (error) {
          alert(error.message);
        });

      var errMsg = document.getElementById("updErrMsg");
      errMsg.innerHTML = "";
      setEditUserForm();
      getPreviousData();
      alert("updated Profile!");
    } else {
      var errMsg = document.getElementById("updErrMsg");
      errMsg.innerHTML =
        "Please Fill the form correctly username length must be above then 3 characters and address 10 and phone 11";
    }
  };

  return (
    <>
      <MenuItem style={{ top: "65px !important" }}>
        <div className="user_about_details_popup">
          <div className="user_about_pop_top">
            <div className="user_about_pop_closeicon">
              <HighlightOffIcon
                onClick={() => {
                  props.close();
                  setEditForm(false);
                }}
              />
            </div>

            <figure>
              {user ? (
                user.photoURL ? (
                  <img
                    onClick={getuserimg}
                    title="Upload image"
                    id="userimg"
                    src={user.photoURL}
                    alt="userimage"
                  />
                ) : (
                  <img
                    onClick={getuserimg}
                    title="Upload image"
                    id="userimg"
                    src={defaultuserimg}
                    alt="avatar"
                  />
                )
              ) : null}
              {userimg.saved === true ? (
                <>
                  <span
                    color={"green"}
                    onClick={saveuserimage}
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "green",
                      cursor: "pointer",
                    }}
                  >
                    save profile
                  </span>
                  <CloseIcon onClick={cancelImgChg} />
                </>
              ) : null}
              <span
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "green",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
                id="imgupploadingprogress"
              ></span>
            </figure>

            <div className="userMeta">
              <span>Hello</span>
              {user ? <h3> {user.displayName} </h3> : <h3>Unkown user</h3>}
              <button onClick={setEditUserForm}>
                <EditOutlinedIcon fontSize="small" />
                {editForm ? "Cancel" : "Edit profile"}
              </button>
            </div>
            <p> MR AUTOMOTIVE is built on trust.</p>
          </div>

          <div
            style={{
              fontSize: "12px",
              lineHeight: "18p",
              padding: "10px 12px",
            }}
          >
            <div>
              {editForm ? (
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Shipping address
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="userName"
                        name="userName"
                        label="userName"
                        fullWidth
                        autoComplete="user-name"
                        value={useMetaDetails.userName}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="Phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        autoComplete="Phone"
                        value={useMetaDetails.phone}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="Address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="shipping address"
                        value={useMetaDetails.address}
                        onChange={handleUserFormDetails}
                      />
                    </Grid>
                  </Grid>
                  <React.Fragment>
                    <p
                      style={{ margin: "5px  0" }}
                      id="updErrMsg"
                      style={{ color: "red" }}
                    ></p>
                    <Button
                      style={{ marginTop: "5px" }}
                      variant="contained"
                      color="primary"
                      onClick={changeUSerData}
                    >
                      Update
                    </Button>
                  </React.Fragment>
                  {/* <form onSubmit={changeUSerData}>
                  <div>
                    <label htmlFor="userName">UserName: </label>
                    <input
                      type="text"
                      value={useMetaDetails.userName}
                      onChange={(e) => handleUserFormDetails(e)}
                      placeholder="userName"
                      name="userName"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="address">Address: </label>
                    <input
                      type="Text"
                      value={useMetaDetails.address}
                      onChange={(e) => handleUserFormDetails(e)}
                      placeholder="Address"
                      name="address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone: </label>
                    <input
                      type="text"
                      value={useMetaDetails.phone}
                      onChange={(e) => handleUserFormDetails(e)}
                      placeholder="Phone"
                      name="phone"
                    />
                  </div>
                  <div>
                    <p id="updErrMsg" style={{ color: "red" }}></p>
                  </div>
                  <div>
                    <input type="submit" value="Update Profile" />
                  </div>
                </form> */}
                </React.Fragment>
              ) : null}
            </div>
            {/* <p>
              MR AUTOMOTIVE is built on trust. Help other people get to know
              you. Tell them about the things you like.
            </p> */}
          </div>
          <div className="logout_btn_sec">
            <button
              onClick={() => {
                props.logout();
                setUserMetaDetails({ userName: "", address: "", phone: "" });
              }}
            >
              <svg
                width="23px"
                height="23px"
                viewBox="0 0 1024 1024"
                fill="#002f34"
              >
                <path d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </MenuItem>
    </>
  );
}

const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
});

export default connect(mapStateToProps, null)(withRouter(Header));
