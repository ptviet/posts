import React, { Component } from 'react';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Header from './header/Header';

export default class Page extends Component {
  render() {
    return (
      <div
        style={{
          // background:
          //   'linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url(/static/bg.jpg) no-repeat center center fixed',
          // '-webkit-background-size': 'cover',
          // '-moz-background-size': 'cover',
          // '-o-background-size': 'cover',
          // 'background-size': 'cover',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Head>
          <title>Posts</title>
        </Head>
        <Header />
        <div style={{ paddingTop: 60 }}>{this.props.children}</div>
        <footer
          id='footer'
          style={{
            left: 0,
            bottom: 0,
            height: 50,
            width: '100%',
            marginTop: 'auto'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              paddingTop: 30,
              marginBottom: 5
            }}
          >
            <Typography variant='caption' gutterBottom>
              Made with ♥ by STEVEN
            </Typography>
          </div>
        </footer>
      </div>
    );
  }
}
