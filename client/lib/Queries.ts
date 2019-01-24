import { gql } from "apollo-boost";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      _id
      username
      email
      permission
      avatar
      joinDate
      favorites {
        _id
        title
      }
    }
  }
`;

export const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      _id
      name
      description
      createdDate
      createdBy {
        _id
        username
        email
        permission
        avatar
      }
    }
  }
`;

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
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
        email
        permission
        avatar
      }
    }
  }
`;
