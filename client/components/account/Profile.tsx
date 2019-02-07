import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Auth from '../auth/Auth';

const Profile = () => (
  <Auth>
    {({ data: { currentUser } }) => {
      if (!currentUser) {
        Router.push('/signin');
      }

      return (
        <>
          <Head>
            <title>My Profile</title>
          </Head>
          <p>My Profile</p>
        </>
      );
    }}
  </Auth>
);

export default Profile;
