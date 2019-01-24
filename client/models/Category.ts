import User from "./User";

export default interface Category {
  _id: string;
  name: string;
  description: string;
  createdDate: string;
  createdBy: User;
}
