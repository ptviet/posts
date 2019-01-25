import React from "react";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SyncIcon from "@material-ui/icons/Sync";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./Post";
import PostModel from "../../models/Post";
import PaginationModel from "../../models/Pagination";
import PostCarousel from "./PostCarousel";
import { INFINITE_SCROLL_POSTS_QUERY } from "../../lib/Queries";
import { pageSize } from "../../config";

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
  let pageNumber = 1;
  let hasMore = true;

  const fetchMorePosts = async (event: any, fetchMoreFunc: any) => {
    pageNumber += 1;
    event.preventDefault();
    await fetchMoreFunc({
      variables: {
        pageNumber,
        pageSize
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
        const updated = {
          infiniteScrollPosts: {
            ...prev.infiniteScrollPosts,
            posts: [
              ...prev.infiniteScrollPosts.posts,
              ...fetchMoreResult.infiniteScrollPosts.posts
            ],
            hasMore
          }
        };
        return updated;
      }
    });
  };

  return (
    <Query
      query={INFINITE_SCROLL_POSTS_QUERY}
      variables={{ pageNumber, pageSize }}
    >
      {({ data, error, loading, fetchMore }) => {
        const infiniteScrollPosts: PaginationModel = data.infiniteScrollPosts;
        hasMore = infiniteScrollPosts.hasMore;
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
        if (infiniteScrollPosts.posts.length === 0) {
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
              <PostCarousel posts={infiniteScrollPosts.posts} />
            </div>
            {infiniteScrollPosts.posts.map((post: PostModel) => (
              <Post key={post._id} post={post} />
            ))}
            {hasMore && (
              <Button
                color="inherit"
                onClick={event => fetchMorePosts(event, fetchMore)}
              >
                <SyncIcon />
              </Button>
            )}
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
