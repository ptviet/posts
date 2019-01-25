import { gql } from "apollo-boost";
import { pageSize } from "../config";

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

export const INFINITE_SCROLL_POSTS_QUERY = gql`
  query INFINITE_SCROLL_POSTS_QUERY($pageNumber: Int! = 1, $pageSize: Int! = ${pageSize}) {
    infiniteScrollPosts(pageNumber: $pageNumber, pageSize: $pageSize) {
      hasMore
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
        messages {
          _id
          messageBody
          messageDate
          messageUser {
            _id
            username
            email
            permission
            avatar
          }
        }
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
      messages {
        _id
        messageBody
        messageDate
        messageUser {
          _id
          username
          email
          permission
          avatar
        }
      }
    }
  }
`;
