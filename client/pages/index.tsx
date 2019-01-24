import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Posts from "../components/posts/Posts";

const styles = (theme: any) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const index = ({ classes }: any) => {
  return (
    <div className={classes.root}>
      <Posts />
    </div>
  );
};

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(index);
