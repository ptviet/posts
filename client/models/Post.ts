import Message from "./Message";
import User from "./User";
import Category from "./Category";

export default interface Post {
  _id: string;
  title: string;
  imageUrl: string;
  categories: Category[];
  description: string;
  createdDate: string;
  likes: number;
  createdBy: User;
  messages: Message[];
}
