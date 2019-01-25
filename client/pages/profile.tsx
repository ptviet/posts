import React from "react";
import Profile from "../components/auth/Profile";
import Signin from "./signin";
import Auth from "../components/auth/Auth";

const ProfilePage = () => {
  return (
    <Auth>
      {({ data: { currentUser } }) => {
        if (!currentUser) {
          return <Signin />;
        }
        return <Profile />;
      }}
    </Auth>
  );
};

export default ProfilePage;
