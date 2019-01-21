import { ApolloServer, gql } from "apollo-server";
import fs from "fs";
import resolvers from "./resolvers";
import User from "./models/User";
import Post from "./models/Post";

const typeDefs = gql(
  fs.readFileSync(__dirname.concat("/typeDefs.gql"), "utf8")
);

const createServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      User,
      Post
    }
  });
};

export default createServer;
