import { NextContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface INextContextWithApollo extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
