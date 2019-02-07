import React, { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Create from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from 'react-apollo';
import { ADD_CATEGORY_MUTATION } from '../../lib/Mutations';
import { styles } from './PostFormUtils';
import Auth from '../auth/Auth';

const initialFormState = {
  name: '',
  description: ''
};

const CategoryForm = (props: any) => {
  const { classes, enqueueSnackbar } = props;
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event: any, addCategoryMutation: any) => {
    event.preventDefault();
    setSubmitted(true);
    try {
      await addCategoryMutation();
      setForm(initialFormState);
      setSubmitted(false);
      enqueueSnackbar('Category created.', {
        variant: 'success'
      });
      Router.push({
        pathname: '/'
      });
    } catch (error) {
      setSubmitted(false);
    }
  };

  return (
    <Auth>
      {payload => {
        if (payload.loading) {
          return <CircularProgress color='primary' />;
        }
        if (payload.error) {
          return (
            <Typography variant='body1' color='error'>
              Not Found.
            </Typography>
          );
        }

        const { currentUser } = payload.data;
        if (!currentUser) {
          Router.push('/signin');
        }
        return (
          <>
            <Head>
              <title>New Category</title>
            </Head>
            <Mutation mutation={ADD_CATEGORY_MUTATION} variables={form}>
              {(addCategory, { error, loading }) => (
                <div className={classes.root}>
                  <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                      <Avatar className={classes.avatar}>
                        <Create />
                      </Avatar>
                      <Typography component='h1' variant='h5'>
                        CREATE A NEW CATEGORY
                      </Typography>
                      <form
                        className={classes.form}
                        onSubmit={e => onSubmit(e, addCategory)}
                      >
                        <FormControl margin='normal' required fullWidth>
                          <InputLabel htmlFor='name'>Name</InputLabel>
                          <Input
                            id='name'
                            name='name'
                            autoComplete='name'
                            onChange={onChange}
                            value={form.name}
                            autoFocus
                          />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                          <InputLabel htmlFor='description'>
                            Description
                          </InputLabel>
                          <Input
                            name='description'
                            type='description'
                            id='description'
                            multiline={true}
                            rowsMax='6'
                            rows='6'
                            onChange={onChange}
                            value={form.description}
                          />
                        </FormControl>
                        <Button
                          type='submit'
                          variant='contained'
                          color='secondary'
                          className={classes.submit}
                          disabled={submitted}
                        >
                          SUBMIT
                        </Button>
                      </form>
                      <br />
                      {(loading || submitted) && (
                        <CircularProgress color='primary' />
                      )}
                      {error && (
                        <Typography variant='body1' color='error'>
                          {error.message.replace('GraphQL error: ', '')}
                        </Typography>
                      )}
                    </Paper>
                  </main>
                </div>
              )}
            </Mutation>
          </>
        );
      }}
    </Auth>
  );
};

CategoryForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(CategoryForm));
