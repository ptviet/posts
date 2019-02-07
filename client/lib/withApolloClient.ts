import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { GRAPHQL_URI } from '../config';

const createApolloClient = ({ headers }: any) =>
  // @ts-ignore
  new ApolloClient({
    uri: GRAPHQL_URI,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    }
  });

export default withApollo(createApolloClient, {
  getDataFromTree: 'always'
});
