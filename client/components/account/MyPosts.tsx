import React from "react";
import Router from "next/router";
import Auth from "../auth/Auth";

const MyPosts = () => (
  <Auth>
    {({ data: { currentUser } }) => {
      if (!currentUser) {
        Router.push("/signin");
      }

      return <p>My Posts</p>;
    }}
  </Auth>
);

export default MyPosts;
