import { LocalShipping } from "@mui/icons-material";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../Controllers/Cart";

export const CongratulationsCard = () => {
  const cart = useSelector((state) => state.cart);

  // var orderNumber = ""
  // for (let i = 0; i < cart.length; i++) {
  //   if(!i){
  //           try {
  //               var {data} = await axios.get(`${BACK_URL}/order/largestOrderNumber`)
  //               console.log(data);
  //               orderNumber = data.length? Number(data[0].orderNumber + 1) : 1
  //           } catch (error) {
  //               alert("No se pudo traer el numero de orden mas alto")
  //           }
  //   }
  //   console.log("numero de orden",orderNumber);
  //   console.log("direccion",shippingAddress);
  //   dispatch(CreateOrder({
  //       productId: cart[i].productId,
  //       userName,
  //       orderNumber,
  //       shippingAddress,
  //       amount: cart[i].amount
  //   }))

  // }

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tu orden ya esta en camino
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <a
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Icon>
            <LocalShipping></LocalShipping>
          </Icon>
          Revisar estado
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
