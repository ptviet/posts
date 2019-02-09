export const pageSize = 18;
export const GRAPHQL_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://ezipost-graphql.now.sh/graphql'
    : 'http://localhost:40001/graphql';
