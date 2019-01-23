import React from "react";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme: any) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const posts = ({ classes }: any) => {
  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary">
        <Link href="/">
          <a className={classes.link}>Homepage</a>
        </Link>
      </Button>
    </div>
  );
};

export default withStyles(styles as any)(posts);
