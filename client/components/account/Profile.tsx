import React from 'react';
import Router from 'next/router';
import Auth from '../auth/Auth';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profile = () => (
  <Auth>
    {({ data, error, loading }) => {
      if (loading) {
        return <CircularProgress color='primary' />;
      }
      if (error) {
        return (
          <Typography variant='body1' color='error'>
            Not Found.
          </Typography>
        );
      }

      const { currentUser } = data;
      if (!currentUser) {
        Router.push('/signin');
      }

      return <p>My Profile</p>;
    }}
  </Auth>
);

export default Profile;
