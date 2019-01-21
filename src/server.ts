import createServer from "./createServer";

const server = createServer();
const PORT = process.env.PORT || 5000;

server.listen(PORT).then(({ url }) => console.log(`Server running on ${url}`));
