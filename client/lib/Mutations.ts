import { gql } from "apollo-boost";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      _id
      username
      permission
      email
      avatar
      joinDate
      favorites {
        _id
      }
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
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
      permission
      email
      avatar
      joinDate
      favorites {
        _id
        title
      }
    }
  }
`;

export const ADD_POST_MUTATION = gql`
  mutation ADD_POST_MUTATION(
    $title: String!
    $imageUrl: String!
    $categories: [String]!
    $description: String!
  ) {
    addPost(
      title: $title
      imageUrl: $imageUrl
      categories: $categories
      description: $description
    ) {
      _id
      title
      imageUrl
      categories {
        _id
        name
      }
      description
      createdDate
      likes
      createdBy {
        _id
        username
        permission
        email
        avatar
      }
      messages {
        _id
        messageBody
        messageDate
        messageUser {
          _id
          username
          permission
          email
          avatar
        }
      }
    }
  }
`;
