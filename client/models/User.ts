import Post from "./Post";

export default interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  permission: string;
  avatar: string;
  joinDate: string;
  isLocked: boolean;
  favorites: Post[];
}
