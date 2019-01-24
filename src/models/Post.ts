import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message"
  }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
