import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Post from "./Post";
import PostModel from "../../models/Post";
import { POSTS_BY_CATEGORY_QUERY } from "../../lib/Queries";

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

const Category = (props: any) => {
  const { _id, classes } = props;
  return (
    <Query query={POSTS_BY_CATEGORY_QUERY} variables={{ catId: _id }}>
      {({ data, error, loading }) => {
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
        if (data.postsByCatId.length === 0) {
          return (
            <Typography className={classes.root} variant="body1">
              No Posts Found.
            </Typography>
          );
        }
        return (
          <div className={classes.root}>
            <Grid container spacing={16} style={{ padding: 16 }}>
              {data.postsByCatId.map((post: PostModel) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Post post={post} returnEnabled={false} />
                </Grid>
              ))}
            </Grid>
          </div>
        );
      }}
    </Query>
  );
};

Category.propTypes = {
  _id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(Category);
