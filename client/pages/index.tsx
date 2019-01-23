import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Posts from "../components/posts/Posts";

const styles = (theme: any) => ({
  root: {
    textAlign: "center"
    // paddingTop: theme.spacing.unit * 2
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
      {/* <Button variant="contained" color="secondary">
        <Link href="/newpost">
          <a className={classes.link}>Create a post</a>
        </Link>
      </Button>
      <Button variant="contained" color="secondary">
        Click
      </Button> */}
    </div>
  );
};

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(index);
