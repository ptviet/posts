import React from "react";
import { Query } from "react-apollo";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withStyles } from "@material-ui/core/styles";
import SyncIcon from "@material-ui/icons/Sync";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./Post";
import PostModel from "../../models/Post";
import Masonry from "react-responsive-masonry";
import PaginationModel from "../../models/Pagination";
import { INFINITE_SCROLL_POSTS_QUERY } from "../../lib/Queries";
import { pageSize } from "../../config";

const styles = (theme: any) => ({
  root: {
    width: "96%",
    margin: "auto",
    paddingTop: theme.spacing.unit,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const LandingPage = ({ classes }: any) => {
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
        // infiniteScrollPosts.posts
        return (
          <div className={classes.root}>
            {/* <GridList className={classes.gridList} cols={3}>
              {infiniteScrollPosts.posts.map(post => (
                <GridListTile
                  key={post._id}
                  cols={Math.floor(Math.random() * 2 + 1)}
                >
                  <img src={post.imageUrl} alt={post.title} />
                </GridListTile>
              ))}
            </GridList> */}
            <Masonry columnsCount={3} gutter="10px">
              {infiniteScrollPosts.posts.map(post => (
                <img
                  key={post._id}
                  src={post.imageUrl}
                  style={{ width: "100%", display: "block" }}
                />
              ))}
            </Masonry>
            {hasMore && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  marginTop: "10px"
                }}
              >
                <Button
                  color="inherit"
                  onClick={event => fetchMorePosts(event, fetchMore)}
                >
                  <SyncIcon />
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(LandingPage);
