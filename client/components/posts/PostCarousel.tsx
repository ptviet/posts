import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Slider from "react-slick";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

export const styles: any = (theme: any) => ({
  card: {
    maxWidth: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

const settings = {
  dots: true,
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const PostCarousel = (props: any) => {
  const { posts, classes } = props;
  return (
    <Slider {...settings}>
      {posts.map((post: any) => (
        <div key={post._id}>
          <Link href={`/post/${post._id}`}>
            <a
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >
              {/* <Typography variant="overline" gutterBottom>
                {post.title}
              </Typography> */}
              <Card className={classes.card} id="imagePreview">
                <CardHeader
                  avatar={
                    <Avatar aria-label="Avatar">
                      <img
                        src={post.createdBy.avatar}
                        alt={post.createdBy.username}
                      />
                    </Avatar>
                  }
                  title={post.title}
                  subheader={`Posted by ${post.createdBy.username}`}
                />
                <CardMedia
                  className={classes.media}
                  image={post.imageUrl}
                  title="Image Preview"
                />
              </Card>
            </a>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

PostCarousel.propTypes = {
  posts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostCarousel);
