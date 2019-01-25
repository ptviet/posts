import React from "react";
import Signin from "./signin";
import Auth from "../components/auth/Auth";

const Myposts = () => {
  return (
    <Auth>
      {({ data: { currentUser } }) => {
        if (!currentUser) {
          return <Signin />;
        }
        return <div>My Posts</div>;
      }}
    </Auth>
  );
};

export default Myposts;
