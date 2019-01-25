import Post from "./Post";

export default interface Pagination {
  posts: Post[];
  hasMore: boolean;
}
