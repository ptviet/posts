import React from "react";
import Router from "next/router";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Chat from "@material-ui/icons/Chat";
import LockOpen from "@material-ui/icons/LockOpen";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Create from "@material-ui/icons/Create";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import SignOut from "../auth/SignOut";

export const DesktopMenu = ({ anchorEl, isMenuOpen, handleMenuClose }: any) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={() => {
        handleMenuClose();
        Router.push({
          pathname: "/profile"
        });
      }}
    >
      My Profile
    </MenuItem>
    <MenuItem
      onClick={() => {
        handleMenuClose();
        Router.push({
          pathname: "/myposts"
        });
      }}
    >
      My Posts
    </MenuItem>
  </Menu>
);

export const MobileMenu = ({
  currentUser,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen
}: any) => (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem
      onClick={() =>
        Router.push({
          pathname: "/posts"
        })
      }
    >
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <Chat />
        </Badge>
      </IconButton>
      <p>ALL POSTS</p>
    </MenuItem>
    {!currentUser && (
      <MenuItem
        onClick={() =>
          Router.push({
            pathname: "/signin"
          })
        }
      >
        <IconButton color="inherit">
          <LockOpen />
        </IconButton>
        <p>SIGN IN</p>
      </MenuItem>
    )}
    {!currentUser && (
      <MenuItem
        onClick={() =>
          Router.push({
            pathname: "/signup"
          })
        }
      >
        <IconButton color="inherit">
          <PersonAdd />
        </IconButton>
        <p>SIGN UP</p>
      </MenuItem>
    )}
    {currentUser && (
      <MenuItem
        onClick={() =>
          Router.push({
            pathname: "/newpost"
          })
        }
      >
        <IconButton color="inherit">
          <Create />
        </IconButton>
        <p>NEW POST</p>
      </MenuItem>
    )}
    {currentUser && (
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountBalance />
        </IconButton>
        <p>MY ACCOUNT</p>
      </MenuItem>
    )}
    {currentUser && <SignOut nav={true} />}
  </Menu>
);
