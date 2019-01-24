import mongoose from "mongoose";
import md5 from "md5";

// Set default random gravatar
const generateAvatar = () => {
  const random = Date.now()
    .toString()
    .replace(/\s+/g, "");

  return `http://gravatar.com/avatar/${md5(random)}?d=identicon`;
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  permission: {
    type: String,
    default: "USER"
  },
  avatar: {
    type: String,
    default: generateAvatar
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Post"
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
