import React from "react";
import Index from "./index";
import SignUp from "../components/auth/SignUp";
import Auth from "../components/auth/Auth";

const Signup = () => {
  return (
    <Auth>
      {({ data: { currentUser } }) => {
        if (currentUser) {
          return <Index />;
        }
        return <SignUp />;
      }}
    </Auth>
  );
};

export default Signup;
