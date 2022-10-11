import React, { useEffect, useState } from "react";
import "../Widget/widget.scss";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllOrders, getAllReviews, deleteAllReviews } from "../../../redux/action";
import { Link } from "react-router-dom";

export default function Widget({ type }) {
  //ESTADOS
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const reviews = useSelector((state) => state.allReviews);
 



  //CONSTANTES
  const dispatch = useDispatch();

  const totalUsers = users.length;

  // Earnings/Ingresos
  let earnings = 0;

  orders.map((order) => {
    for (let i = 4; i < order.length; i++) {
      let product = order[i];

      earnings += product.amount * product.price;
    }
  });

  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getAllReviews());
    /* dispatch(deleteAllReviews()); */
  }, [dispatch]);

  const lastReview = reviews[reviews.length - 1];


  //FILTROS Y CONTADORES
  // let obj = {};
  // ordersSorted.map((order)=> {
  //     obj[order.orderNumber] = obj[order.orderNumber] ? [... obj[order.orderNumber]] : [];
  //      obj[order.orderNumber].push([order.orderNumber, order.shippingAddress, order.amount, order.productId, order.userName])      })

  // let counterOrder = []
  // for(let element in obj){
  //     counterOrder.push(element)
  // }
  const pendingOrder = orders.filter((order) => order[2] === "Pending");

  let data = {};
  //TEMPORAL

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        isMoney: false,
        content: totalUsers,
        link: "Ver todos los usuarios",
        icon: <PeopleAltRoundedIcon className="icon" />,
        linker: "/users",
      };
      break;
    case "order":
      data = {
        title: "ORDENES PENDIENTES",
        isMoney: false,
        content: pendingOrder.length,
        link: "Ver todos las ordenes",
        icon: <ShoppingCartIcon className="icon" />,
        linker: "/",
      };
      break;
    case "earning":
      data = {
        title: "INGRESOS DEL DÍA",
        isMoney: true,
        content: `\$${earnings}`,

        link: "Ver detalle",
        icon: <MonetizationOnIcon className="icon" />,
        linker: "/",
      };
      break;
    case "comment":
      data = {
        title: "ÚLTIMO COMENTARIO",
        isMoney: true,
        content: `${lastReview.description}`,
        link: "Ver detalles",
        icon: <CommentIcon className="icon" />,
        linker: "/",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {" "}
          {data.content ? data.content : "Cargando..."}{" "}
        </span>
        <Link to={data.linker}>
          <span className="link">{data.link} </span>
        </Link>
      </div>
      <div className="right">
        <div className="icon">{data.icon}</div>
      </div>
    </div>
  );
}
