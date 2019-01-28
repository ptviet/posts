import React from "react";
import Category from "../components/post/Category";

const CategoryPage = (props: any) => <Category _id={props.query._id} />;

export default CategoryPage;
