import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
// import { GRAPHQL_URI } from "../config";

const createApolloClient = ({ headers }: any) =>
  // @ts-ignore
  new ApolloClient({
    // uri: GRAPHQL_URI,
    uri: "http://localhost:40001",
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
          // mode: "no-cors"
        },
        headers
      });
    }
  });

export default withApollo(createApolloClient);
