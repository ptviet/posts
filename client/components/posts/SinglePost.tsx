import React from "react";
import Typography from "@material-ui/core/Typography";

const SinglePost = (props: any) => {
  return <Typography variant="body1">{props._id}</Typography>;
};

export default SinglePost;
