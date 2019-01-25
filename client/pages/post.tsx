import SinglePost from "../components/posts/SinglePost";
const Singlepost = (props: any) => (
  <div>
    <SinglePost _id={props.query._id} />
  </div>
);

export default Singlepost;
