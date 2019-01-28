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
import PersonAdd from "@material-ui/icons/PersonAdd";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION } from "../../lib/Mutations";
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

const initialFormState = { name: "", username: "", email: "", password: "" };

const SignUp = (props: any) => {
  const { classes, enqueueSnackbar } = props;
  const [form, setForm] = useState(initialFormState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const validatePassword = (): boolean => {
    const isValid = form.password === confirmPassword;
    if (!isValid) {
      alert("Passwords need to match.");
    }
    return isValid;
  };

  const validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(form.email).toLowerCase());
    if (!isValid) {
      alert("Invalid email.");
    }
    return isValid;
  };

  const onSubmit = async (event: any, signupMutation: any) => {
    event.preventDefault();
    if (validatePassword() && validateEmail()) {
      setSubmitted(true);
      try {
        await signupMutation();
        setForm(initialFormState);
        setConfirmPassword("");
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
    }
  };

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={form}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAdd />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={e => onSubmit(e, signup)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  onChange={onChange}
                  value={form.name}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  onChange={onChange}
                  value={form.username}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                  value={form.email}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={onChange}
                  value={form.password}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  onChange={event => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
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
                Sign up
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(SignUp));
