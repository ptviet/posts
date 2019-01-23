import { gql } from "apollo-boost";

export const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
      _id
      title
      imageUrl
      categories
      description
      createdDate
      likes
      createdBy {
        _id
        username
        email
        avatar
      }
    }
  }
`;
