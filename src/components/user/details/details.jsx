import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BACK_URL, FRONT_URL } from "../../../constantes";
import {
  addToCart,
  inCart,
  updateCart,
  updateOfflineCart,
} from "../../../Controllers/Cart";
import {
  isFavorite,
  setFavorite,
  unSetFavorite,
} from "../../../Controllers/Favorite";
import { detailProduct, getFavorites } from "../../../redux/action";
import Comment from "../comment/comment";

// Detalle del Producto

const Details = () => {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorites = useSelector((state) => state.favorites);
  const userState = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getFavorites(localStorage.userName));
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  // console.log(details, "Details")

  return (
    <div>
      {
        !detail.id ? 
        <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
        </div>
        </div>: <div>
        <style>
        @import
        url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
      </style>
      <div className="min-w-screen min-h-screen flex  p-5 lg:p-10 overflow-hidden relative">
        <div className="w-screen max-w-7xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src={detail.thumbnail}
                  className="w-full relative z-10"
                  alt=""
                />
                <div className="border-4 border-black-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {detail.name}
                  </h1>
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => {
                      if (isFavorite(id))
                        return unSetFavorite(localStorage.userName, id);
                      setFavorite(localStorage.userName, id);
                    }}
                  >
                    {favorites == "Missing Username" ? null : isFavorite(id) ? (
                      <Favorite
                        sx={{ color: "red" }}
                        fontSize="large"
                        // onClick={() => unSetFavorite(localStorage.userName, product.id)}
                      />
                    ) : (
                      <FavoriteBorder fontSize="large" />
                    )}
                  </IconButton>
                </div>

                <p className="text-sm">{detail.description}</p>
              </div>
              <div>
                <div className="inline-block align-bottom mr-5">
                  <span className="text-2xl leading-none align-baseline">
                    $
                  </span>
                  <span className="font-bold text-3xl leading-none align-baseline">
                    {detail.price}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center mt-5">
                <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                  2
                </div>
                <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-7">
                <div className="inline-block align-bottom">
                  <button
                    className="bg-[#4F46E5] opacity-75 hover:opacity-100 text-gray-400 hover:text-gray-600 rounded-full px-10 py-2 font-semibold"
                    onClick={async () => {
                      if (!userState.logged) {
                        window.location = `${FRONT_URL}/home/log-in`;
                        alert(
                          "Debes estar registrado para realizar una compra"
                        );
                        return;
                      }
                      try {
                        const url = await axios.post(
                          `${BACK_URL}/checkout`,
                          { productId: detail.id },
                          { headers: { "Content-Type": "application/json" } }
                        );
                        // console.log(url)
                        window.location = url.data.url;
                      } catch (err) {
                        console.log({ error: err.message });
                      }
                    }}
                  >
                    Buy Now
                  </button>
                </div>
                <div className="inline-block align-bottom">
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => {
                      if (!inCart(id)) {
                        if (userState.logged) {
                          addToCart(localStorage.userName, id);
                          return;
                        }
                        updateOfflineCart(id, 1);
                        return;
                      }
                      if (userState.logged) {
                        updateCart(localStorage.userName, id, 0);
                        return;
                      }
                      updateOfflineCart(id, 0);
                    }}
                  >
                    <AddShoppingCart
                      sx={inCart(id) ? { color: "green" } : { color: "red" }}
                      fontSize="large"
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block"></span>{" "}
                    Caracteristicas
                  </h2>
                </div>
                <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
                  <div className="max-w-md sm:mx-auto sm:text-center">
                    <h6 className="mb-3 text-xl font-bold leading-5">Modelo</h6>
                    <p className="mb-3 text-sm text-gray-900">
                      {detail.model}
                    </p>
                  </div>
                  <div className="max-w-md sm:mx-auto sm:text-center">
                    <h6 className="mb-3 text-xl font-bold leading-5">Marca</h6>
                    <p className="mb-3 text-sm text-gray-900">
                      {detail.brand}
                    </p>
                  </div>
                </div>
              </div>

          {/* {<------------------ comentarios ------------------------>} */}
          <Comment />
          {/* {<------------------------------------------>} */}
        </div>
        </div>
        </div>
      }
      
    </div>
  );
};

export default Details;
