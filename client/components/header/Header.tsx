import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
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
import MoreIcon from "@material-ui/icons/MoreVert";
import Chat from "@material-ui/icons/Chat";
import LockOpen from "@material-ui/icons/LockOpen";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Badge from "@material-ui/core/Badge";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { DesktopMenu, MobileMenu } from "./Nav";
import SideNav from "./SideNav";
import SignOut from "../auth/SignOut";
import CurrentUser from "../auth/CurrentUser";

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
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
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
    marginLeft: 0,
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
    <CurrentUser>
      {({ data: { currentUser } }) => {
        return (
          <div className={classes.root}>
            <SideNav toggleDrawer={toggleDrawer} isOpen={sideNav} />
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={event => toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <Link href="/">
                    <a className={classes.link}>POSTS</a>
                  </Link>
                </Typography>
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
                  <Link href="/">
                    <a className={classes.link}>
                      <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                          <span className={classes.navBtnText}>
                            <Typography variant="button">ALL POSTS </Typography>
                          </span>
                          <Chat />
                        </Badge>
                      </IconButton>
                    </a>
                  </Link>
                  {!currentUser && (
                    <>
                      <Link href="/signin">
                        <a className={classes.link}>
                          <IconButton color="inherit">
                            <span className={classes.navBtnText}>
                              <Typography variant="button">SIGN IN</Typography>
                            </span>
                            <LockOpen />
                          </IconButton>
                        </a>
                      </Link>
                      <Link href="/signup">
                        <a className={classes.link}>
                          <IconButton color="inherit">
                            <span className={classes.navBtnText}>
                              <Typography variant="button">SIGN UP</Typography>
                            </span>
                            <PersonAdd />
                          </IconButton>
                        </a>
                      </Link>
                    </>
                  )}
                  {currentUser && (
                    <>
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
                  <IconButton
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
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
    </CurrentUser>
  );
};

export default withStyles(styles)(Header);
