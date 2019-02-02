import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Auth from "../auth/Auth";
import ByUser from "../post/ByUser";

const MyPosts = () => (
  <Auth>
    {({ data, error, loading }) => {
      if (loading) {
        return <CircularProgress color="primary" />;
      }
      if (error) {
        return (
          <Typography variant="body1" color="error">
            No Posts Found.
          </Typography>
        );
      }

      const { currentUser } = data;
      if (!currentUser) {
        Router.push("/signin");
      }

      return <ByUser _id={currentUser._id} />;
    }}
  </Auth>
);

export default MyPosts;
