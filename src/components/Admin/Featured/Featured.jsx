import React, { useEffect, useState } from "react";
import "../Featured/featured.scss";
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    id: false,
  });

  const lastCommentedProduct = (reviews, products) => {
    try {
      let lastReview = reviews[reviews.length - 1];
      let product = products.filter((p) => p.id === lastReview.productId);
      product = product[0] ? product[0] : product;
      setData({
        name: product.name ? product.name : "Cargando...",
        image: product.thumbnail ? product.thumbnail : null,
        id: product.id ? product.id : null,
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
    <div className="featured" style={{padding:"0",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div className="top">
        <span className="title">PRODUCTO COMENTADO</span>
          <InfoIcon className="icon" />
      </div>
      <div className="bottom" style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div>
          <span className="titleProduct">
            {data.name ? data.name : "Cargando..."}
          </span>
        </div>
        <img
          style={{maxWidth:"130px",maxHeight:"130px",objectFit:"scale-down"}}
          src={data.image ? data.image : null}
          alt="IMG not found"
          className="img"
        />
      </div>
    </div>
  );
}
