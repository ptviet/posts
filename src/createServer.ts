import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const createServer = () => {
  return new ApolloServer({ typeDefs, resolvers });
};

export default createServer;
