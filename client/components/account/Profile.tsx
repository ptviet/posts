import React from "react";
import Router from "next/router";
import Auth from "../auth/Auth";

const Profile = () => (
  <Auth>
    {({ data: { currentUser } }) => {
      if (!currentUser) {
        Router.push("/signin");
      }

      return <p>My Profile</p>;
    }}
  </Auth>
);

export default Profile;
