import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import SyncIcon from "@material-ui/icons/Sync";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Post from "./Post";
import PostModel from "../../models/Post";
import { POSTS_BY_CATEGORY_INFINITE_SCROLL_QUERY } from "../../lib/Queries";
import { pageSize } from "../../config";

const styles = (theme: any) => ({
  root: {
    width: "96%",
    margin: "auto",
    paddingTop: theme.spacing.unit
  },
  grid: {
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

const ByCategory = (props: any) => {
  const { _id, classes } = props;
  let pageNumber = 1;
  let hasMore = true;

  const fetchMorePosts = async (event: any, fetchMoreFunc: any) => {
    pageNumber += 1;
    event.preventDefault();
    await fetchMoreFunc({
      variables: {
        catId: _id,
        pageNumber,
        pageSize
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        hasMore = fetchMoreResult.postsByCatId.hasMore;
        const updated = {
          postsByCatId: {
            ...prev.postsByCatId,
            posts: [
              ...prev.postsByCatId.posts,
              ...fetchMoreResult.postsByCatId.posts
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
      query={POSTS_BY_CATEGORY_INFINITE_SCROLL_QUERY}
      variables={{ catId: _id, pageNumber, pageSize }}
    >
      {({ data, error, loading, fetchMore }) => {
        hasMore = data.postsByCatId.hasMore;
        if (loading) {
          return <CircularProgress className={classes.root} color="primary" />;
        }
        if (error) {
          return (
            <Typography className={classes.root} variant="body1" color="error">
              No Posts Found.
            </Typography>
          );
        }
        const posts: PostModel[] = data.postsByCatId.posts;
        if (posts.length === 0) {
          return (
            <Typography className={classes.root} variant="body1">
              No Posts Found.
            </Typography>
          );
        }
        return (
          <div className={classes.root}>
            <Grid container spacing={16} style={{ padding: 16 }}>
              {posts.map((post: PostModel) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Post post={post} returnEnabled={false} />
                </Grid>
              ))}
            </Grid>
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

ByCategory.propTypes = {
  _id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(ByCategory);
