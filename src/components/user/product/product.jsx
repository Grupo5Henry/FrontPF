import React from "react";
import { Link } from "react-router-dom";

const Product = ({ name, id }) => {
  return (
    <div>
      <Link to={`/home/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

export default Product;
