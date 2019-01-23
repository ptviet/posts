import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import fs from "fs";
import resolvers from "./resolvers";
import User from "./models/User";
import Post from "./models/Post";

dotenv.config({ path: "variables.env" });

const typeDefs = gql(
  fs.readFileSync(__dirname.concat("/typeDefs.gql"), "utf8")
);

const createServer = () => {
  return new ApolloServer({
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    typeDefs,
    resolvers,
    context: {
      User,
      Post
    }
  });
};

export default createServer;
