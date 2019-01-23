import Message from "./Message";
import User from "./User";

export default interface Post {
  _id: string;
  title: string;
  imageUrl: string;
  categories: string;
  description: string;
  createdDate: string;
  likes: number;
  createdBy: User;
  messages: Message[];
}
