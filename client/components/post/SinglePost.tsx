import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Post from './Post';
import { GET_SINGLE_POST_QUERY } from '../../lib/Queries';

const styles = (theme: any) => ({
  root: {
    width: '60%',
    margin: 'auto',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  }
});

const SinglePost = (props: any) => {
  const { classes } = props;
  return (
    <Query query={GET_SINGLE_POST_QUERY} variables={{ postId: props._id }}>
      {({ data, error, loading }) => {
        if (loading) {
          return <CircularProgress color='primary' />;
        }
        if (error) {
          return (
            <Typography variant='body1' color='error'>
              {error.message.replace('GraphQL error: ', '')}
            </Typography>
          );
        }

        return (
          <>
            <Head>
              <title>{data.post.title}</title>
            </Head>
            <div className={classes.root}>
              <Post post={data.post} returnEnabled={true} />
            </div>
          </>
        );
      }}
    </Query>
  );
};

SinglePost.propTypes = {
  classes: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired
};

export default withStyles(styles as any)(SinglePost);
