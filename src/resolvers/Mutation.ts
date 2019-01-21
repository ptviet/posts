import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Mutation = {
  async signup(_, { username, email, password }, { User }) {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username unavailable.");
    }
    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPwd
    }).save();

    return newUser;
  },
  async addPost(
    _,
    { title, imageUrl, categories, description, creatorId },
    { Post }
  ) {
    const newPost = await new Post({
      title,
      imageUrl,
      categories,
      description,
      createdBy: creatorId
    }).save();

    return newPost;
  }
};

export default Mutation;
