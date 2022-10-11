import React, { useEffect } from "react";
import "../Featured/featured.scss";
import BalanceIcon from '@mui/icons-material/Balance';
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteAllReviews, getAllProducts  } from "../../../redux/action";


export default function Featured () {

    //ESTADOS
    const reviews = useSelector((state) => state.allReviews);
    const productos = useSelector((state) => state.adminProducts);

    //CONSTANTES
    const dispatch = useDispatch();
  
  
    const lastComment = reviews[reviews.length - 1];

    const productElegido = productos.filter(p => p.id === lastComment.productId);
    const productoComentado = productElegido[0];




      //USE EFFECTS

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllProducts());
    dispatch(deleteAllReviews());
  }, [dispatch]);


    let data = {
        name: productoComentado ? productoComentado.name : "Cargando...",
        image: productoComentado ? productoComentado.thumbnail : null
    }

    return(
        <div className="featured">
            <div className="top">
                <span className="title">PRODUCTO COMENTADO</span>
                <BalanceIcon className="icon"/>
            </div>
            <div className="bottom">
                <div>
                <span className="titleProduct">{data.name}</span>

                </div>
                <img src={data.image} alt="IMG not found" className="img" />
            </div>
        
        </div>
    )
};