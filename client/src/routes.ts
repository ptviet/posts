import nextRoutes from 'next-routes';

//@ts-ignore
const routes = nextRoutes();

routes.add('index', '/', 'index');
routes.add('signin', '/signin', 'signin');
routes.add('signup', '/signup', 'signup');
routes.add('profile', '/profile', 'profile');
routes.add('myposts', '/myposts', 'myposts');
routes.add('posts', '/posts', 'posts');
routes.add('newpost', '/post/new', 'newpost');
routes.add('post', '/post/:_id', 'post');
routes.add('newcategory', '/category/new', 'newcategory');
routes.add('category', '/category/:_id', 'category');
routes.add('user', '/user/:_id', 'user');

export default routes;
