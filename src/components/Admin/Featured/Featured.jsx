import React, { useEffect, useState } from "react";
import "../Featured/featured.scss";
import BalanceIcon from "@mui/icons-material/Balance";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  deleteAllReviews,
  getAllProducts,
} from "../../../redux/action";

export default function Featured() {
  //ESTADOS
  const reviews = useSelector((state) => state.allReviews);
  const products = useSelector((state) => state.adminProducts);
  const [data, setData] = useState({
    name: false,
    image: false,
  });

  const lastCommentedProduct = (reviews, products) => {
    try {
      let lastReview = reviews[reviews.length - 1];
      let product = products.filter((p) => p.id === lastReview.productId);
      product = product[0] ? product[0] : product;
      setData({
        name: product.name ? product.name : "Cargando...",
        image: product.thumbnail ? product.thumbnail : null,
      });
    } catch (err) {}
  };

  //CONSTANTES
  const dispatch = useDispatch();

  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllProducts());
    dispatch(deleteAllReviews());
  }, []);

  useEffect(() => {
    lastCommentedProduct(reviews, products);
  }, [reviews]);

  return (
    <div className="featured">
      <div className="top">
        <span className="title">PRODUCTO COMENTADO</span>
        <BalanceIcon className="icon" />
      </div>
      <div className="bottom">
        <div>
          <span className="titleProduct">
            {data.name ? data.name : "Cargando..."}
          </span>
        </div>
        <img
          src={data.image ? data.image : null}
          alt="IMG not found"
          className="img"
        />
      </div>
    </div>
  );
}
