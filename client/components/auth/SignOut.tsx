import { Mutation } from "react-apollo";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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

const SignOut = ({ classes }: any) => {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => (
        <IconButton
          color="inherit"
          onClick={e => {
            e.preventDefault();
            signout();
          }}
        >
          <span className={classes.navBtnText}>
            <Typography variant="button">SIGN OUT</Typography>
          </span>
          <ExitToApp />
        </IconButton>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(SignOut);
