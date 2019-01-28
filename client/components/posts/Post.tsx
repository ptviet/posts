import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Comment from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import { millisecToDate } from "../../lib/formatDate";

const styles: any = (theme: any) => ({
  card: {
    maxWidth: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  showMore: {
    marginLeft: "auto"
  }
});

const Post = (props: any) => {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Avatar">
            <img src={post.createdBy.avatar} alt={post.createdBy.username} />
          </Avatar>
        }
        subheader={millisecToDate(post.createdDate)}
        title={`Posted by ${post.createdBy.name}`}
      />
      <Link as={`/post/${post._id}`} href={`/post?_id=${post._id}`}>
        <a
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <CardMedia
            className={classes.media}
            image={post.imageUrl}
            title={post.title}
          />
        </a>
      </Link>
      <CardContent>
        <Typography component="p">{post.title}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <Badge badgeContent={3} color="secondary">
            <Comment />
          </Badge>
        </IconButton>
        <IconButton
          className={classes.showMore}
          aria-label="Show more"
          onClick={() =>
            Router.push(
              {
                pathname: "/post",
                query: { _id: post._id }
              },
              `/post/${post._id}`
            )
          }
        >
          <SendIcon className={classes.showMore} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
