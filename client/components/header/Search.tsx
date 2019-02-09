import React, { useState } from 'react';
import _ from 'lodash';
import Router from 'next/router';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import PostModel from '../../models/Post';
import { SEARCH_POSTS_QUERY } from '../../lib/Queries';

// @ts-ignore
const SearchDiv = ({ innerRef, ...rest }) => <div ref={innerRef} {...rest} />;

const styles: any = (theme: any) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  dropdown: {
    position: 'absolute',
    width: '65%',
    zIndex: '2',
    marginTop: theme.spacing.unit,
    border: `1px solid ${theme.palette.primary.main}`
  },
  dropdownItem: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: '1rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    borderLeft: `5px solid ${theme.palette.primary.main}`
  },
  highlighted: {
    background: '#b7deb8',
    paddingLeft: '2rem'
  },
  img: {
    marginRight: 10,
    marginLeft: 10
  }
});

const Search = (props: any) => {
  const { classes } = props;

  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = _.debounce(async (e, apolloClient) => {
    const searchTerm = e.target.value;
    if (searchTerm.length >= 3) {
      await setSubmitted(true);
      await setLoading(true);

      const searchResults = await apolloClient.query({
        query: SEARCH_POSTS_QUERY,
        variables: {
          searchTerm
        }
      });
      await setPosts(searchResults.data.search);
      await setLoading(false);
    } else {
      if (searchTerm.length === 0) {
        await setPosts([]);
      }
      await setSubmitted(false);
    }
  }, 500);

  const goToPost = (post: PostModel) => {
    if (post) {
      Router.push(
        {
          pathname: '/post',
          query: { _id: post._id }
        }
        // `/post/${post._id}`
      );
    }
  };

  resetIdCounter();
  return (
    <Downshift onChange={goToPost} itemToString={(post: PostModel) => ''}>
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex
      }) => (
        <SearchDiv {...getRootProps({ refKey: 'innerRef' })}>
          <ApolloConsumer>
            {client => (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  {...getInputProps({
                    placeholder: 'Search…',
                    id: 'search',
                    onChange: (e: any) => {
                      e.persist();
                      onChange(e, client);
                    }
                  })}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            )}
          </ApolloConsumer>
          {isOpen && (
            <Paper className={classes.dropdown} square>
              {posts.map((post: PostModel, index) => (
                <div
                  className={classnames(classes.dropdownItem, {
                    [classes.highlighted]: index === highlightedIndex
                  })}
                  {...getItemProps({ item: post })}
                  key={post._id}
                >
                  <Avatar aria-label={post.title} className={classes.img}>
                    <img src={post.imageUrl} alt={post.title} />
                  </Avatar>

                  <Typography variant='caption'>{post.title}</Typography>
                </div>
              ))}
              {!posts.length && !loading && submitted && (
                <div className={classes.dropdownItem}>
                  <Typography variant='caption'>
                    Nothing found for "{inputValue}"
                  </Typography>
                </div>
              )}
            </Paper>
          )}
        </SearchDiv>
      )}
    </Downshift>
  );
};

export default withStyles(styles as any)(Search);
