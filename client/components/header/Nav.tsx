import React from "react";
import Router from "next/router";
import Create from "@material-ui/icons/Create";
import Chat from "@material-ui/icons/Chat";
import LockOpen from "@material-ui/icons/LockOpen";
import AccountBox from "@material-ui/icons/AccountBox";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

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
          pathname: "/"
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
    <MenuItem
      onClick={() =>
        Router.push({
          pathname: "/signup"
        })
      }
    >
      <IconButton color="inherit">
        <Create />
      </IconButton>
      <p>SIGN UP</p>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton color="inherit">
        <AccountBox />
      </IconButton>
      <p>My ACCOUNT</p>
    </MenuItem>
  </Menu>
);
