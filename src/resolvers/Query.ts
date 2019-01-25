import { checkAuth } from "./Utils";

const Query = {
  // GET CURRENT USER
  async currentUser(_, args, ctx) {
    // Check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    // Query the current user
    const { User } = ctx;
    const user = await User.findById(ctx.request.userId);
    return user;
  },
  // GET CATEGORIES
  async categories(_, args, { Category }) {
    const cats = await Category.find({})
      .sort({ createdDate: "desc" })
      .populate({
        path: "createdBy",
        model: "User"
      });
    return cats;
  },
  // GET POSTS
  async posts(_, args, { Post }) {
    const posts = await Post.find({})
      .sort({ createdDate: "desc" })
      .populate({
        path: "categories",
        model: "Category"
      })
      .populate({
        path: "createdBy",
        model: "User"
      })
      .populate({
        path: "messages",
        model: "Message",
        populate: { path: "messageUser", model: "User" }
      })
      .exec();
    return posts;
  }
};

export default Query;
