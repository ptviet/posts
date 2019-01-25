import React from "react";
import Index from "./index";
import SignIn from "../components/auth/SignIn";
import Auth from "../components/auth/Auth";

const Signin = () => {
  return (
    <Auth>
      {({ data: { currentUser } }) => {
        if (currentUser) {
          return <Index />;
        }
        return <SignIn />;
      }}
    </Auth>
  );
};

export default Signin;
