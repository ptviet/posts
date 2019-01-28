import React from "react";
import PropTypes from "prop-types";

const Category = (props: any) => {
  return <div>CatId: {props._id}</div>;
};

Category.propTypes = {
  _id: PropTypes.string.isRequired
};

export default Category;
