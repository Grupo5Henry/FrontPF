import React, { useEffect, useState } from "react";
import "../Widget/widget.scss";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllOrders } from "../../../redux/action";
import { Link } from "react-router-dom";

export default function Widget({type} ) {

    //ESTADOS
    const users = useSelector((state) => state.users);
    const orders = useSelector((state) => state.orders);
    
    //CONSTANTES
    const dispatch = useDispatch();

    const totalUsers = users.length;

    const ordersSorted = orders.filter(o => o.status === "Pending");




    //USE EFFECTS

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllOrders());
    }, [dispatch]);

    //FILTROS Y CONTADORES
    let obj = {};   
    ordersSorted.map((order)=> {           
        obj[order.orderNumber] = obj[order.orderNumber] ? [... obj[order.orderNumber]] : [];         
         obj[order.orderNumber].push([order.orderNumber, order.shippingAddress, order.amount, order.productId, order.userName])      })


    let counterOrder = []
    for(let element in obj){
        counterOrder.push(element)
    }







    let data = {}
    //TEMPORAL
    const amount = 100;



    switch (type) {
        case "user":
            data = {
                title: "USUARIOS",
                isMoney: false,
                content: totalUsers,
                link: "Ver todos los usuarios",
                icon: <PeopleAltRoundedIcon className='icon'/>,
                linker: "/users"
            }
            break;
        case "order":
            data = {
                title: "ORDENES PENDIENTES",
                isMoney: false,
                content: counterOrder.length,
                link: "Ver todos las ordenes",
                icon: <ShoppingCartIcon className='icon'/>,
                linker: "/"
            }
        break;
        case "earning":
            data = {
                title: "INGRESOS DEL DÍA",
                isMoney: true,
                content: amount,

                link: "Ver detalle",
                icon: <MonetizationOnIcon className='icon'/>,
                linker: "/"
            }
        break;
        case "comment":
            data = {
                title: "ÚLTIMO COMENTARIO",
                isMoney: true,
                content: "Tardó en despachar el producto",
                link: "Ver detalles",
                icon: <CommentIcon className='icon'/>,
                linker: "/"
            }
        break;
        default:
            break;
    }


    return(
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter"> {data.content? data.content : "Cargando..."} </span>
                <Link to={data.linker}>
                <span className="link">{data.link} </span>
                </Link>
            </div>
            <div className="right">
                <div className="icon">
                    {data.icon}
                </div>
            </div>
        </div>
    )
};