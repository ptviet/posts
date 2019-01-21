import { gql } from "apollo-server";

const typeDefs = gql`
  type Todo {
    task: String
    complete: Boolean
  }

  type Mutation {
    createTodo(task: String, complete: Boolean): Todo!
  }

  type Query {
    todos: [Todo]!
  }
`;

export default typeDefs;
