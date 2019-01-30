import React from "react";
import ByUser from "../components/post/ByUser";

const CategoryPage = (props: any) => <ByUser _id={props.query._id} />;

export default CategoryPage;
