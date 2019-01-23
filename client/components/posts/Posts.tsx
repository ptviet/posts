import React from "react";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./Post";
import PostModel from "../../models/Post";
import PostCarousel from "./PostCarousel";
import { ALL_POSTS_QUERY } from "../../lib/Queries";

const Posts = () => {
  return (
    <>
      <Query query={ALL_POSTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) {
            return <CircularProgress color="primary" />;
          }
          if (error) {
            return (
              <Typography variant="body1" color="error">
                {error.message.replace("GraphQL error: ", "")}
              </Typography>
            );
          }
          if (data.posts.length === 0) {
            return <Typography variant="body1">No Posts Found.</Typography>;
          }
          return (
            <>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  margin: "0 auto",
                  padding: "15px",
                  marginBottom: "20px"
                }}
              >
                <PostCarousel posts={data.posts} />
              </div>
              {data.posts.map((post: PostModel) => (
                <Post key={post._id} post={post} />
              ))}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Posts;