import nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes();

routes.add("index", "/", "index");
routes.add("signin", "/signin", "signin");
routes.add("signup", "/signup", "signup");
routes.add("profile", "/profile", "profile");
routes.add("myposts", "/myposts", "myposts");
routes.add("posts", "/posts", "posts");
routes.add("post", "/post/:_id", "post");
routes.add("newpost", "/newpost", "newpost");
routes.add("category", "/category/:_id", "category");
routes.add("user", "/user/:_id", "user");
