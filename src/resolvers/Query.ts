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
  // GET POSTS BY CATEGORY ID
  async postsByCatId(_, { catId, pageNumber, pageSize }, { Post }) {
    let posts;
    if (pageNumber === 1) {
      posts = await Post.find({ categories: catId })
        .sort({ createdDate: "desc" })
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    } else {
      const skips = pageSize * (pageNumber - 1);
      posts = await Post.find({ categories: catId })
        .sort({ createdDate: "desc" })
        .skip(skips)
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    }

    const total = await Post.countDocuments({ categories: catId });
    const hasMore = total > pageSize * pageNumber;

    return { posts, hasMore };
  },
  // GET POSTS BY USERNAME
  async postsByUserId(_, { userId, pageNumber, pageSize }, { Post }) {
    let posts;
    if (pageNumber === 1) {
      posts = await Post.find({ createdBy: userId })
        .sort({ createdDate: "desc" })
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    } else {
      const skips = pageSize * (pageNumber - 1);
      posts = await Post.find({ createdBy: userId })
        .sort({ createdDate: "desc" })
        .skip(skips)
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    }

    const total = await Post.countDocuments({ createdBy: userId });
    const hasMore = total > pageSize * pageNumber;

    return { posts, hasMore };
  },
  // GET ONE POST
  async post(_, { postId }, { Post }) {
    const post = await Post.findById(postId)
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

    return post;
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
      .exec();

    return posts;
  },
  // SEARCH POSTS
  async search(_, { searchTerm }, { Post }) {
    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ]
    };
    const posts = await Post.find(query)
      .sort({ createdDate: "desc" })
      .exec();
    return posts;
  },
  // INFINITE SCROLL POSTS
  async infiniteScrollPosts(_, { pageNumber, pageSize }, { Post }) {
    let posts;
    if (pageNumber === 1) {
      posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    } else {
      const skips = pageSize * (pageNumber - 1);
      posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .skip(skips)
        .limit(pageSize)
        .populate({
          path: "categories",
          model: "Category"
        })
        .populate({
          path: "createdBy",
          model: "User"
        })
        .exec();
    }

    const total = await Post.countDocuments();
    const hasMore = total > pageSize * pageNumber;

    return { posts, hasMore };
  }
};

export default Query;
