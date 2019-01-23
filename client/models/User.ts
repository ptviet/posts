import Post from "./Post";

export default interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  joinDate: string;
  favorites: Post[];
}
