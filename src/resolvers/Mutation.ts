import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createToken, checkAuth } from "./Utils";

dotenv.config({ path: "variables.env" });

const Mutation = {
  // SIGN IN
  async signin(_, { username, password }, ctx) {
    const { User } = ctx;

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    // Verify the password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password.");
    }

    // Generate JWT Token
    const token = await createToken(user);

    // Set the cookie with the token
    ctx.response.cookie(process.env.TOKEN, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
    });

    delete user.password;

    // Return the user
    return user;
  },
  // SIGN OUT
  async signout(_, args, ctx) {
    ctx.response.clearCookie(process.env.TOKEN);
    return { message: "See you later!" };
  },

  // SIGN UP
  async signup(_, { username, email, password }, ctx) {
    const { User } = ctx;

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

    // Generate JWT Token
    const token = await createToken(newUser);
    // Set the cookie with the token
    ctx.response.cookie(process.env.TOKEN, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
    });

    delete newUser.password;

    return newUser;
  },
  // ADD POST
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
