import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Post from './Post';
import PostModel from '../../models/Post';
import PaginationModel from '../../models/Pagination';
// import PostCarousel from "./PostCarousel";
import { INFINITE_SCROLL_POSTS_QUERY } from '../../lib/Queries';
import { pageSize } from '../../config';

const styles = (theme: any) => ({
  root: {
    width: '96%',
    margin: 'auto',
    paddingTop: theme.spacing.unit
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    height: 'auto'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

const Posts = ({ classes }: any) => {
  let pageNumber = 1;
  let hasMore = true;

  const fetchMorePosts = async (event: any, fetchMoreFunc: any) => {
    pageNumber += 1;
    event.preventDefault();
    await fetchMoreFunc({
      variables: {
        pageNumber,
        pageSize
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
        const updated = {
          infiniteScrollPosts: {
            ...prev.infiniteScrollPosts,
            posts: [
              ...prev.infiniteScrollPosts.posts,
              ...fetchMoreResult.infiniteScrollPosts.posts
            ],
            hasMore
          }
        };
        return updated;
      }
    });
  };

  return (
    <Query
      query={INFINITE_SCROLL_POSTS_QUERY}
      variables={{ pageNumber, pageSize }}
    >
      {({ data, error, loading, fetchMore }) => {
        if (loading) {
          return <CircularProgress className={classes.root} color='primary' />;
        }
        if (error) {
          return (
            <Typography className={classes.root} variant='body1' color='error'>
              No Posts Found.
            </Typography>
          );
        }
        const infiniteScrollPosts: PaginationModel = data.infiniteScrollPosts;
        if (infiniteScrollPosts.posts.length === 0) {
          return (
            <Typography className={classes.root} variant='body1'>
              No Posts Found.
            </Typography>
          );
        }
        hasMore = infiniteScrollPosts.hasMore;
        return (
          <div className={classes.root}>
            {/* <div
              style={{
                width: "50%",
                margin: "0 auto",
                padding: "15px",
                marginBottom: "20px"
              }}
            >
              <PostCarousel posts={infiniteScrollPosts.posts} />
            </div> */}

            <Grid container spacing={16} style={{ padding: 16 }}>
              {infiniteScrollPosts.posts.map((post: PostModel) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Post post={post} returnEnabled={false} />
                </Grid>
              ))}
            </Grid>

            {hasMore && (
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '10px',
                  marginTop: '10px'
                }}
              >
                <Button
                  color='inherit'
                  onClick={event => fetchMorePosts(event, fetchMore)}
                >
                  <SyncIcon />
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
};

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(Posts);
