import React from "react";
import ByCategory from "../components/post/ByCategory";

const CategoryPage = (props: any) => <ByCategory _id={props.query._id} />;

export default CategoryPage;
