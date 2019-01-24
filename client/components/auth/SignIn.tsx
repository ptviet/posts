import React, { useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOpen from "@material-ui/icons/LockOpen";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { SIGNIN_MUTATION } from "../../lib/Mutations";
import { CURRENT_USER_QUERY } from "../../lib/Queries";

const styles: any = (theme: any) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const initialFormState = { username: "", password: "" };

const SignIn = (props: any) => {
  const { classes, enqueueSnackbar } = props;
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event: any, signinMutation: any) => {
    event.preventDefault();
    setSubmitted(true);
    try {
      await signinMutation();
      setForm(initialFormState);
      setSubmitted(false);
      enqueueSnackbar("You are now signed in.", {
        variant: "success"
      });
      Router.push({
        pathname: "/"
      });
    } catch (error) {
      setSubmitted(false);
    }
  };

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={form}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin, { error, loading }) => (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOpen />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={e => onSubmit(e, signin)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  onChange={onChange}
                  value={form.username}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChange}
                  value={form.password}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={submitted}
              >
                Sign in
              </Button>
            </form>
            <br />
            {(loading || submitted) && <CircularProgress color="primary" />}
            {error && (
              <Typography variant="body1" color="error">
                {error.message.replace("GraphQL error: ", "")}
              </Typography>
            )}
          </Paper>
        </main>
      )}
    </Mutation>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(SignIn));
