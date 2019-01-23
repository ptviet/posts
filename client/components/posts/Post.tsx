import React from "react";
import PropTypes from "prop-types";
import PostModel from "../../models/Post";
import Typography from "@material-ui/core/Typography";

interface PostProps {
  post: PostModel;
}

const Post = (props: PostProps) => {
  const { post } = props;
  return <Typography variant="body1">{post.title}</Typography>;
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
