import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";
import User from "./models/User";
import Post from "./models/Post";
import Category from "./models/Category";
import Message from "./models/Message";

const typeDefs = "src/schema/schema.graphql";

// Create the GraphQL Yoga Server
const createServer = () => {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, User, Category, Post, Message })
  });

  return server;
};

export default createServer;
