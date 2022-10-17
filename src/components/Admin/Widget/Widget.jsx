import React, { useEffect, useState } from "react";
import "../Widget/widget.scss";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getAllOrders,
  getAllReviews,
  deleteAllReviews,
} from "../../../redux/action";
import { Link } from "react-router-dom";

export default function Widget({ type }) {
  //ESTADOS
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const reviews = useSelector((state) => state.allReviews);

  //CONSTANTES
  const dispatch = useDispatch();

  const totalUsers = users.length;

  const reviewsFiltered = reviews.filter(
    (review) => review.flagged !== true || review.hidden !== true
  );
  const lastComment = reviewsFiltered[reviewsFiltered.length - 1];

  // Earnings/Ingresos
  let earnings = 0;

  orders.map((order) => {
    for (let i = 6; i < order.length; i++) {
      let product = order[i];

      earnings += product.amount * product.price;
    }
  });

  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    /*   dispatch(deleteAllReviews()); */
  }, [dispatch]);

  //FILTROS Y CONTADORES
  const [orderPage, setOrderPage] = useState(1);

  const [pendingOrder, setPendingOrders] = useState({
    title: "Esperando pago",
    content: false,
  });

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
      const toggleOrders = () => {
        const states = [
          {
            title: "Esperando pago",
            content: orders.filter((order) => order[1] === "PaymentPending")
              .length,
          },
          {
            title: "Siendo procesadas",
            content: orders.filter(
              (order) => order[1] === "PaidPendingDelivery"
            ).length,
          },
          {
            title: "Canceladas",
            content: orders.filter((order) => order[1] === "Cancelled").length,
          },
          {
            title: "En ruta",
            content: orders.filter((order) => order[1] === "InDelivery").length,
          },
          {
            title: "Entregadas",
            content: orders.filter((order) => order[1] === "Delivered").length,
          },
        ];

        setPendingOrders(states[orderPage % 5]);
      };

      const initial = orders.filter(
        (order) => order[1] === "PaymentPending"
      ).length;

      data = {
        title: pendingOrder
          ? `ORDENES: \n \n ${pendingOrder.title}`
          : "Cargando...",
        isMoney: false,
        content:
          pendingOrder.content !== false ? pendingOrder.content : initial,
        link: "Ver todos las ordenes",
        icon: (
          <ShoppingCartIcon
            className="icon"
            onClick={() => {
              setOrderPage(orderPage + 1);
              toggleOrders();
            }}
          />
        ),
        linker: "/orders",
      };
      break;
    case "earning":
      data = {
        title: "INGRESOS DEL DÍA",
        isMoney: true,
        content: `\$${earnings}`,

        link: "Ver detalle",
        icon: <MonetizationOnIcon className="icon" />,
        linker: "/orders",
      };
      break;
    case "comment":
      data = {
        title: "ÚLTIMO COMENTARIO",
        isMoney: true,
        content: lastComment ? lastComment.description : "Cargando...",
        link: "Ver detalle",
        icon: <CommentIcon className="icon" />,
        linker: lastComment ? `/products/detail/${lastComment.productId}` : "/",
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
