import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme: any) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

const index = ({ classes }: any) => {
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        <Link href="/test">
          <a>Go to the test page</a>
        </Link>
      </Button>
    </div>
  );
};

index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(index);
