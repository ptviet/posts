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
    const user = await User.findOne({ _id: ctx.request.userId });

    return user;
  },
  // GET POSTS
  async posts(_, args, { Post }) {
    const posts = await Post.find({})
      .sort({ createdDate: "desc" })
      .populate({
        path: "createdBy",
        model: "User"
      });
    return posts;
  }
};

export default Query;
