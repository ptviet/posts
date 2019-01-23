import { gql } from "apollo-boost";

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION {
    signup {
    }
  }
`;

export const ADD_POST_MUTATION = gql`
  mutation ADD_POST_MUTATION {
    addPost {
    }
  }
`;
