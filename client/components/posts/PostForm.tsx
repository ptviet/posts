import React, { useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Create from "@material-ui/icons/Create";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import CategoryModel from "../../models/Category";
import { Mutation, Query } from "react-apollo";
import { ADD_POST_MUTATION } from "../../lib/Mutations";
import { ALL_CATEGORIES_QUERY, ALL_POSTS_QUERY } from "../../lib/Queries";
import { styles, MenuProps, getStyles, getCategoryName } from "./PostFormUtils";

const initialFormState = {
  title: "",
  imageUrl: "",
  categories: [],
  description: ""
};

const PostForm = (props: any) => {
  const { classes, enqueueSnackbar } = props;
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event: any, addPostMutation: any) => {
    event.preventDefault();
    setSubmitted(true);
    try {
      await addPostMutation();
      setForm(initialFormState);
      setSubmitted(false);
      enqueueSnackbar("Post created.", {
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
    <Query query={ALL_CATEGORIES_QUERY}>
      {({ data, error, loading }) => {
        if (loading) {
          return <CircularProgress color="primary" />;
        }
        if (error) {
          return (
            <Typography variant="body1" color="error">
              {error.message.replace("GraphQL error: ", "")}
            </Typography>
          );
        }
        if (data.categories.length === 0) {
          return <Typography variant="body1">No Categories Found.</Typography>;
        }
        return (
          <Mutation
            mutation={ADD_POST_MUTATION}
            variables={form}
            refetchQueries={[{ query: ALL_POSTS_QUERY }]}
          >
            {(addPost, { error: err, loading: isLoading }) => (
              <div className={classes.root}>
                <main className={classes.main}>
                  <CssBaseline />
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <Create />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      CREATE A NEW POST
                    </Typography>
                    <form
                      className={classes.form}
                      onSubmit={e => onSubmit(e, addPost)}
                    >
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input
                          id="title"
                          name="title"
                          autoComplete="title"
                          onChange={onChange}
                          value={form.title}
                          autoFocus
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Image URL</InputLabel>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          autoComplete="imageUrl"
                          autoFocus
                          onChange={onChange}
                          value={form.imageUrl}
                        />
                      </FormControl>
                      {form.imageUrl && (
                        <FormControl margin="normal" required fullWidth>
                          <Card className={classes.card} id="imagePreview">
                            <CardMedia
                              className={classes.media}
                              image={form.imageUrl}
                              title="Image Preview"
                            />
                          </Card>
                        </FormControl>
                      )}
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="categories">Categories</InputLabel>
                        <Select
                          multiple
                          name="categories"
                          value={form.categories}
                          onChange={onChange}
                          input={<Input id="categories" />}
                          renderValue={(selected: any) => {
                            return (
                              <div className={classes.chips}>
                                {selected.map((value: any) => (
                                  <Chip
                                    key={value}
                                    label={getCategoryName(
                                      value,
                                      data.categories
                                    )}
                                    className={classes.chip}
                                  />
                                ))}
                              </div>
                            );
                          }}
                          MenuProps={MenuProps}
                        >
                          {data.categories.map((category: CategoryModel) => (
                            <MenuItem
                              key={category._id}
                              value={category._id}
                              style={getStyles(
                                category._id,
                                form.categories,
                                classes
                              )}
                            >
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="description">
                          Description
                        </InputLabel>
                        <Input
                          name="description"
                          type="description"
                          id="description"
                          multiline={true}
                          rowsMax="6"
                          rows="6"
                          onChange={onChange}
                          value={form.description}
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
                        SUBMIT
                      </Button>
                    </form>
                    <br />
                    {(isLoading || submitted) && (
                      <CircularProgress color="primary" />
                    )}
                    {err && (
                      <Typography variant="body1" color="error">
                        {err.message.replace("GraphQL error: ", "")}
                      </Typography>
                    )}
                  </Paper>
                </main>
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(PostForm));
