import User from "./User";

export default interface Message {
  _id: string;
  messageBody: string;
  messageDate: string;
  messageUser: User;
}
