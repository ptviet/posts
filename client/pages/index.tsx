import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

const styles = (theme: any) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

const index = ({ classes }: any) => {
  return (
    <div className={classes.root}>
      <Link href="/test">
        <a>Go to the test page</a>
      </Link>
    </div>
  );
};

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(index);
