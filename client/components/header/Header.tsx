import React, { useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import Chat from '@material-ui/icons/Chat';
import Assignment from '@material-ui/icons/Assignment';
import LockOpen from '@material-ui/icons/LockOpen';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Badge from '@material-ui/core/Badge';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AddBox from '@material-ui/icons/AddBox';
import { DesktopMenu, MobileMenu } from './Nav';
// import SideNav from "./SideNav";
import SignOut from '../auth/SignOut';
import Auth from '../auth/Auth';
import Search from './Search';

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
    textDecoration: 'none',
    color: 'inherit'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'block'
  },
  fab: {
    top: 5,
    right: 10,
    position: 'fixed'
  },
  navBtnText: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
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
          <div
            className={classes.root}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              zIndex: 2
            }}
          >
            {/* <SideNav toggleDrawer={toggleDrawer} isOpen={sideNav} /> */}
            <AppBar position='static'>
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
                      pathname: '/'
                    })
                  }
                  color='inherit'
                >
                  <Typography variant='h6'>POSTS</Typography>
                </IconButton>
                <Search />
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    onClick={() =>
                      Router.push({
                        pathname: '/posts'
                      })
                    }
                    color='inherit'
                  >
                    <Badge badgeContent={4} color='secondary'>
                      <span className={classes.navBtnText}>
                        <Typography variant='button'>ALL POSTS </Typography>
                      </span>
                      <Chat />
                    </Badge>
                  </IconButton>
                  {!currentUser && (
                    <>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: '/signin'
                          })
                        }
                        color='inherit'
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant='button'>SIGN IN</Typography>
                        </span>
                        <LockOpen />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: '/signup'
                          })
                        }
                        color='inherit'
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant='button'>SIGN UP</Typography>
                        </span>
                        <PersonAdd />
                      </IconButton>
                    </>
                  )}
                  {currentUser && currentUser.permission === 'ADMIN' && (
                    <IconButton
                      onClick={() =>
                        Router.push({
                          pathname: '/category/new'
                        })
                      }
                      color='inherit'
                    >
                      <span className={classes.navBtnText}>
                        <Typography variant='button'>NEW CATEGORY</Typography>
                      </span>
                      <Assignment />
                    </IconButton>
                  )}
                  {currentUser && (
                    <>
                      <IconButton
                        onClick={() =>
                          Router.push({
                            pathname: '/post/new'
                          })
                        }
                        color='inherit'
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant='button'>NEW POST</Typography>
                        </span>
                        <AddBox />
                      </IconButton>
                      <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup='true'
                        onClick={handleProfileMenuOpen}
                        color='inherit'
                      >
                        <span className={classes.navBtnText}>
                          <Typography variant='button'>MY ACCOUNT</Typography>
                        </span>
                        <AccountBalance />
                      </IconButton>
                      <SignOut nav={false} />
                    </>
                  )}
                </div>
                <div className={classes.sectionMobile}>
                  <Fab
                    size='medium'
                    color='primary'
                    aria-haspopup='true'
                    onClick={handleMobileMenuOpen}
                    aria-label='Add'
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
