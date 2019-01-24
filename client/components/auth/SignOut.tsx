import { Mutation } from "react-apollo";
import { withSnackbar } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { withStyles } from "@material-ui/core/styles";
import { SIGN_OUT_MUTATION } from "../../lib/Mutations";
import { CURRENT_USER_QUERY } from "../../lib/Queries";

const styles: any = (theme: any) => ({
  navBtnText: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  }
});

const SignOut = (props: any) => {
  const { classes, nav, enqueueSnackbar } = props;

  const onSignOut = async (event: any, signoutMutation: any) => {
    event.preventDefault();
    await signoutMutation();
    enqueueSnackbar("See you later!", {
      variant: "success"
    });
  };

  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout =>
        nav ? (
          <MenuItem onClick={e => onSignOut(e, signout)}>
            <IconButton color="inherit">
              <span className={classes.navBtnText}>
                <Typography variant="button">SIGN OUT</Typography>
              </span>
              <ExitToApp />
            </IconButton>
            <p>SIGN OUT</p>
          </MenuItem>
        ) : (
          <IconButton color="inherit" onClick={e => onSignOut(e, signout)}>
            <span className={classes.navBtnText}>
              <Typography variant="button">SIGN OUT</Typography>
            </span>
            <ExitToApp />
          </IconButton>
        )
      }
    </Mutation>
  );
};

export default withStyles(styles)(withSnackbar(SignOut));
