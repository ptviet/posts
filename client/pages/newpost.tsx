import React from "react";
import PostForm from "../components/posts/PostForm";
import Signin from "./signin";
import Auth from "../components/auth/Auth";

const Newpost = () => {
  return (
    <Auth>
      {({ data: { currentUser } }) => {
        if (!currentUser) {
          return <Signin />;
        }
        return <PostForm />;
      }}
    </Auth>
  );
};

export default Newpost;
