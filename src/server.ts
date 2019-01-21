import { ApolloServer, gql } from "apollo-server";
import ITodo from "./interface";

const todos: ITodo[] = [
  { task: "Wash car", complete: false },
  { task: "Clean room", complete: true }
];

const typeDefs = gql`
  type Todo {
    task: String
    complete: Boolean
  }
  type Query {
    todos: [Todo]!
  }
`;

const server = new ApolloServer({ typeDefs });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
