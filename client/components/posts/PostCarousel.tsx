import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Slider from "react-slick";
import PostModel from "../../models/Post";
import Typography from "@material-ui/core/Typography";

interface PostProps {
  posts: PostModel[];
}

const settings = {
  dots: true,
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const PostCarousel = (props: PostProps) => {
  const { posts } = props;
  return (
    <Slider {...settings}>
      {posts.map(post => (
        <div key={post._id}>
          <Link href={`/post/${post._id}`}>
            <a
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <Typography variant="overline" gutterBottom>
                {post.title}
              </Typography>
              <img
                src="http://react-responsive-carousel.js.org/assets/1.jpeg"
                style={{
                  height: "auto",
                  width: "100%",
                  display: "block",
                  objectFit: "cover"
                }}
                alt={post.title}
              />
            </a>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

PostCarousel.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostCarousel;
