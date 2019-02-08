import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App, { Container } from 'next/app';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';
import Page from '../components/Page';
import withApolloClient from '../lib/withApolloClient';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = { query: null };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // Expose the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    // @ts-ignore
    const { Component, apollo, pageProps } = this.props;
    const pageContext = getPageContext();
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={pageContext.theme}
            sheetsManager={pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <SnackbarProvider
              maxSnack={1}
              hideIconVariant={false}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              action={
                <Button color='inherit' size='small'>
                  Dismiss
                </Button>
              }
            >
              <ApolloProvider client={apollo}>
                <Page>
                  <Component pageContext={pageContext} {...pageProps} />
                </Page>
              </ApolloProvider>
            </SnackbarProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
