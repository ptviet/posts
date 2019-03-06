import React from 'react';
// import Link from 'next/link';
import Router from 'next/router';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostModel from '../../models/Post';
// @ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PaginationModel from '../../models/Pagination';
import { INFINITE_SCROLL_POSTS_QUERY } from '../../lib/Queries';
import { pageSize } from '../../config';

const styles = (theme: any) => ({
  root: {
    width: '80%',
    margin: 'auto',
    paddingTop: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  media: {
    objectFit: 'cover'
  }
});

const LandingPage = ({ classes }: any) => {
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
        const infiniteScrollPosts: PaginationModel = data.infiniteScrollPosts;
        if (loading) {
          return <CircularProgress className={classes.root} color='primary' />;
        }
        if (error) {
          return (
            <Typography className={classes.root} variant='body1' color='error'>
              {error.message.replace('GraphQL error: ', '')}
            </Typography>
          );
        }
        const posts: PostModel[] = infiniteScrollPosts.posts;
        if (posts.length === 0) {
          return (
            <Typography className={classes.root} variant='body1'>
              No Posts Found.
            </Typography>
          );
        }
        hasMore = infiniteScrollPosts.hasMore;
        return (
          <div className={classes.root}>
            <ResponsiveMasonry
              // columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              // {xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920}
              columnsCountBreakPoints={{
                0: 1,
                500: 2,
                900: 3,
                1200: 4,
                1900: 5
              }}
            >
              <Masonry gutter='16px'>
                {posts.map((post: PostModel) => (
                  // <Link
                  //   key={post._id}
                  //   // as={`/post/${post._id}`}
                  //   href={`/post?_id=${post._id}`}
                  // >
                  //   <a
                  //     style={{
                  //       textDecoration: 'none',
                  //       color: 'inherit'
                  //     }}
                  //   >
                  <CardActionArea
                    key={post._id}
                    onClick={() =>
                      Router.push({
                        pathname: '/post',
                        query: { _id: post._id }
                      })
                    }
                  >
                    <Card>
                      <CardMedia
                        component='img'
                        className={classes.media}
                        image={post.imageUrl}
                        title={post.title}
                      />
                    </Card>
                  </CardActionArea>
                  //   </a>
                  // </Link>
                ))}
              </Masonry>
            </ResponsiveMasonry>
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

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles as any)(LandingPage);
