const Query = {
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
