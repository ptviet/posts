import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Chat from "@material-ui/icons/Chat";
import LockOpen from "@material-ui/icons/LockOpen";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Badge from "@material-ui/core/Badge";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Create from "@material-ui/icons/Create";
import { DesktopMenu, MobileMenu } from "./Nav";
// import SideNav from "./SideNav";
import SignOut from "../auth/SignOut";
import Auth from "../auth/Auth";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles: any = (theme: any) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "block"
  },
  fab: {
    top: 5,
    right: 10,
    position: "fixed"
  },
  navBtnText: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

const Header = ({ classes }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [sideNav, setSideNav] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open: boolean) => {
    setSideNav(open);
  };

  return (
    <Auth>
      {({ data: { currentUser } }) => {
        return (
          <div className={classes.root}>
            {/* <SideNav toggleDrawer={toggleDrawer} isOpen={sideNav} /> */}
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={event => toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton> */}
                <IconButton
                  onClick={() =>
                    Router.push({
                      pathname: "/"
                    })
                  }
                  color="inherit"
                >
                  <Typography variant="h6">POSTS</Typography>
                </IconButton>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    onClick={() =>
                      Router.push({
                        pathname: "/posts"
                      })
                    }
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="secondary">
                      <span className={classes.navBtnText}>
                        <Typography variant="button">ALL POSTS </Typography>
                      </span>
                      <Chat />
                    </Badge>
                  </IconButton>
                  {!currentUser && (
                    <>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: "/signin"
                          })
                        }
                        color="inherit"
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant="button">SIGN IN</Typography>
                        </span>
                        <LockOpen />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: "/signup"
                          })
                        }
                        color="inherit"
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant="button">SIGN UP</Typography>
                        </span>
                        <PersonAdd />
                      </IconButton>
                    </>
                  )}
                  {currentUser && (
                    <>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: "/newpost"
                          })
                        }
                        color="inherit"
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant="button">NEW POST</Typography>
                        </span>
                        <Create />
                      </IconButton>
                      <IconButton
                        aria-owns={isMenuOpen ? "material-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant="button">MY ACCOUNT</Typography>
                        </span>
                        <AccountBalance />
                      </IconButton>
                      <SignOut nav={false} />
                    </>
                  )}
                </div>
                <div className={classes.sectionMobile}>
                  <Fab
                    size="medium"
                    color="primary"
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    aria-label="Add"
                    className={classes.fab}
                  >
                    <MenuIcon />
                  </Fab>
                </div>
              </Toolbar>
            </AppBar>
            <DesktopMenu
              currentUser={currentUser}
              anchorEl={anchorEl}
              isMenuOpen={isMenuOpen}
              handleMenuClose={handleMenuClose}
            />
            <MobileMenu
              currentUser={currentUser}
              mobileMoreAnchorEl={mobileMoreAnchorEl}
              isMobileMenuOpen={isMobileMenuOpen}
              handleMobileMenuClose={handleMobileMenuClose}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          </div>
        );
      }}
    </Auth>
  );
};

export default withStyles(styles)(Header);
