import { gql } from "apollo-boost";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      _id
      username
      email
      avatar
      joinDate
      favorites {
        _id
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
      avatar
      joinDate
      favorites {
        _id
      }
    }
  }
`;

export const ADD_POST_MUTATION = gql`
  mutation ADD_POST_MUTATION {
    addPost {
    }
  }
`;
