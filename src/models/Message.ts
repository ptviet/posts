import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  messageBody: {
    type: String,
    required: true
  },
  messageDate: {
    type: Date,
    default: Date.now
  },
  messageUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
