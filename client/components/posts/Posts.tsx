import React from "react";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./Post";
import PostModel from "../../models/Post";
import PostCarousel from "./PostCarousel";
import { ALL_POSTS_QUERY } from "../../lib/Queries";

const styles = (theme: any) => ({
  root: {
    // textAlign: "center",
    paddingTop: theme.spacing.unit
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const Posts = ({ classes }: any) => {
  return (
    <Query query={ALL_POSTS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) {
          return <CircularProgress className={classes.root} color="primary" />;
        }
        if (error) {
          return (
            <Typography className={classes.root} variant="body1" color="error">
              {error.message.replace("GraphQL error: ", "")}
            </Typography>
          );
        }
        if (data.posts.length === 0) {
          return (
            <Typography className={classes.root} variant="body1">
              No Posts Found.
            </Typography>
          );
        }
        return (
          <div className={classes.root}>
            <div
              style={{
                width: "50%",
                // textAlign: "center",
                margin: "0 auto",
                padding: "15px",
                marginBottom: "20px"
              }}
            >
              <PostCarousel posts={data.posts} />
            </div>
            {data.posts.map((post: PostModel) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(Posts);
