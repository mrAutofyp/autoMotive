import React, { useState } from "react";
import firebase from "../config/firebase";
import { connect } from "react-redux";
import clsx from "clsx";
import logo from "../assets/images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Listitems from "../components/AdminDashboard/Listitems";
import "../assets/css/dashProdForm.css";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ManageProductOpt from "../components/AdminDashboard/products/ManageProductOpt";
import Allusers from "../components/AdminDashboard/home/Allusers";
import Allproducts from "../components/AdminDashboard/home/Allproducts";
import Allorders from "../components/AdminDashboard/home/Allorders";
import UsersManage from "../components/AdminDashboard/users/UsersManage";
import AllUsersSignMethod from "../components/AdminDashboard/home/AllUsersSignMethod";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mrautomotive-dd1f6.web.app/">
        MR AutoMotive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  logo: {
    maxWidth: 100,
    margin: "0 auto",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#2d3436 ",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#000 ",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function AdminDashboard(props) {
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = React.useState(true);
  const [products, setproducts] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var user = firebase.auth().currentUser;

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      {Object.keys(props.currentuser).length !== 0 ? (
        props.currentuser.admin ? (
          <>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
              >
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      open && classes.menuButtonHidden
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Admin Dashboard
                  </Typography>
                  <Button color="inherit">
                    <Typography component="h6" variant="h6" color="inherit">
                      Log out
                    </Typography>
                    <ExitToAppOutlinedIcon style={{ marginLeft: "5px" }} />
                  </Button>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(
                    classes.drawerPaper,
                    !open && classes.drawerPaperClose
                  ),
                }}
                open={open}
              >
                <div className={classes.toolbarIcon}>
                  <img src={logo} alt="Kitty Katty!" className={classes.logo} />
                  {/* <IconButton onClick={handleDrawerClose}> */}
                  <ChevronLeftIcon
                    style={{ textDecoration: "none", color: "#fff" }}
                  />
                  {/* </IconButton> */}
                </div>
                <Divider />

                <Listitems
                  ckopn={open}
                  value={value}
                  handleChange={handleChange}
                />

                <Divider />
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                  <Grid container spacing={3}>
                    <TabPanel value={value} index={0} Dashboard={true} />
                    <TabPanel value={value} index={1} products={true} />
                    <TabPanel value={value} index={2} users={true} />
                  </Grid>
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
            </div>
          </>
        ) : (
          <h1>You are not an admin</h1>
        )
      ) : (
        <>
          <h1>You are not logged in plz login First</h1>
          <Link to={{ pathname: `/` }}>Go to Home</Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  allProducts: store.allProducts,
  currentuser: store.currentuser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(AdminDashboard);

function TabPanel(props) {
  const { value, index, users, Dashboard, products } = props;

  return (
    <Grid hidden={value !== index} item container>
      {Dashboard ? (
        <h1 className="dashboarTabsHeading">DashBoard MR-AUTOMOTIVE</h1>
      ) : (
        ""
      )}
      {products ? (
        <h1 className="dashboarTabsHeading">Manage your Products</h1>
      ) : (
        ""
      )}
      {users ? <h1 className="dashboarTabsHeading">Manage All Users</h1> : ""}

      {value === index && (
        <>
          {Dashboard ? (
            <>
              {" "}
              <Grid container spacing={3}>
                <Allusers />
                <Allproducts />
                <Allorders />
                <AllUsersSignMethod />
              </Grid>
            </>
          ) : null}

          <div
            style={{ width: "100%" }}
            container
            className={useStyles.fixedHeightPaper}
          >
            <Typography>
              {products ? (
                <>
                  <ManageProductOpt />
                </>
              ) : null}
              {users ? (
                <>
                  <UsersManage />
                </>
              ) : null}
            </Typography>
          </div>
        </>
      )}
    </Grid>
  );
}
