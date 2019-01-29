import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Textsms from "@material-ui/icons/Textsms";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { millisecToDate } from "../../lib/formatDate";
import { FRONTEND_URL } from "../../config";

const styles: any = (theme: any) => ({
  card: {
    maxWidth: "100%"
  },
  chip: {
    margin: theme.spacing.unit
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
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

const Post = (props: any) => {
  const { classes, post, returnEnabled } = props;
  const [expanded, setExpanded] = useState(false);
  const [commentAreaOpen, setCommentAreaOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleCommentArea = () => {
    setCommentAreaOpen(!commentAreaOpen);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
    const textField = document.createElement("textarea");
    textField.innerText = `${FRONTEND_URL}/post/${post._id}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setTimeout(() => {
      setTooltipOpen(false);
    }, 1500);
  };

  const handleCategoryClick = (event: any, catId: any) => {
    event.preventDefault();
    Router.push(
      {
        pathname: "/category",
        query: { _id: catId }
      },
      `/category/${catId}`
    );
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Avatar">
            <img src={post.createdBy.avatar} alt={post.createdBy.username} />
          </Avatar>
        }
        action={
          returnEnabled && (
            <IconButton onClick={() => Router.back()}>
              <ArrowBack />
            </IconButton>
          )
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
      {/* <Divider variant="middle" /> */}
      {post.categories.map((cat: any) => (
        <Chip
          key={cat._id}
          color="secondary"
          label={cat.name}
          onClick={event => handleCategoryClick(event, cat._id)}
          className={classes.chip}
        />
      ))}
      {/* <Divider variant="middle" /> */}
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Link Copied"
          >
            <IconButton aria-label="Share" onClick={handleTooltipOpen}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        <IconButton
          aria-label="Comment"
          onClick={returnEnabled && toggleCommentArea}
          aria-expanded={commentAreaOpen}
        >
          <Badge badgeContent={3} color="secondary">
            <Textsms />
          </Badge>
        </IconButton>
        {!returnEnabled && (
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
        )}
        {returnEnabled && (
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      {(expanded || commentAreaOpen) && <Divider variant="middle" />}
      {returnEnabled && (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {post.description
                .split("\n")
                .map((line: string, index: number) => (
                  <Typography paragraph key={index}>
                    {line}
                  </Typography>
                ))}
            </CardContent>
            {commentAreaOpen && <Divider variant="middle" />}
          </Collapse>
          <Collapse in={commentAreaOpen} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography component="p">COMMENTS HERE</Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  returnEnabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(Post);
