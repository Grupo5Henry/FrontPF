import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACK_URL } from "../../../constantes";
import { clearCart } from "../../../Controllers/Cart";
import Modal from "react-modal";

import {
  CreateOrder,
  reduceStock,
  UpdateUserDefaultAddress,
} from "../../../redux/action";
import Campo from "../alert/Campo";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

export default function DirectionForm() {
  var { user, cart } = useSelector((state) => state);
  const navegate = useNavigate()
  var dispatch = useDispatch();

  var [state, setState] = useState({
    shipping:
      user.defaultShippingAddress === "from google"
        ? false
        : user.defaultShippingAddress,
    billing: user.billing === "from google" ? false : user.billingAddress,
  });

  const [openCampo, setOpenCampo] = React.useState(false);

  var [direction, setDirection] = useState({
    shipping: { provincia_estado: "", calle: "", line1: "" },
    billing: { provincia_estado: "", calle: "", line1: "" },
  });

  var [porDefecto, setPorDefecto] = useState({
    shipping: false,
    billing: false,
  });

  let orderNumber = "";

  const ordenes = async (shipping) => {
    try {
      var { data } = await axios.get(`${BACK_URL}/order/largestOrderNumber`);
      orderNumber = data.length ? Number(data[0].orderNumber + 1) : 1;
    } catch (error) {
      return error;
    }
    for (let i = 0; i < cart.length; i++) {
      if (!i) {
      }
      reduceStock(cart[i].productId, cart[i].product.stock, cart[i].amount);
      CreateOrder({
        productId: cart[i].productId,
        userName: user.userName,
        orderNumber,
        shippingAddress: shipping,
        amount: cart[i].amount,
      });
    }
    clearCart(user.userName);
    return orderNumber;
  };

  async function onSub(e) {
    e.preventDefault();

    var shippingAddress = "";
    var billingAddress = "";

    //Set shipping
    if (state.shipping) {
      shippingAddress = state.shipping; // seria lo mismo que user.defaultShippingAddress
    } else {
      if (!direction.shipping.calle || !direction.shipping.provincia_estado) {
        return setOpenCampo(true);
      } else {
        if (porDefecto.shipping) {
          // console.log("MODIFICO LA DIRECCION POR DEFECTO DEL USUARIO EN LA DB");
          shippingAddress = direction.shipping.line1
            ? `${direction.shipping.provincia_estado}, ${direction.shipping.calle}, ${direction.shipping.line1}`
            : `${direction.shipping.provincia_estado}, ${direction.shipping.calle}`;
          dispatch(
            UpdateUserDefaultAddress({
              userName: user.userName,
              defaultShippingAddress: shippingAddress,
            })
          );
        } else {
          shippingAddress = direction.shipping.line1
            ? `${direction.shipping.provincia_estado}, ${direction.shipping.calle}, ${direction.shipping.line1}`
            : `${direction.shipping.provincia_estado}, ${direction.shipping.calle}`;
        }
      }
    }

    //Set billing
    if (state.billing) {
      billingAddress = state.billing; //seria lo mismo que user.billingAddress
    } else {
      if (!direction.billing.calle || !direction.billing.provincia_estado) {
        return setOpenCampo(true);
      } else {
        if (porDefecto.billing) {
          // console.log("MODIFICO LA DIRECCION POR DEFECTO DEL USUARIO EN LA DB");
          billingAddress = direction.billing.line1
            ? `${direction.billing.provincia_estado}, ${direction.billing.calle}, ${direction.billing.line1}`
            : `${direction.billing.provincia_estado}, ${direction.billing.calle}`;
          dispatch(
            UpdateUserDefaultAddress({
              userName: user.userName,
              billingAddress: billingAddress,
            })
          );
        } else {
          billingAddress = direction.line1
            ? `${direction.billing.provincia_estado}, ${direction.billing.calle}, ${direction.billing.line1}`
            : `${direction.billing.provincia_estado}, ${direction.billing.calle}`;
        }
      }
    }

    // localStorage.setItem("shippingAddress", shippingAddress);
    // console.log(localStorage);

    let orderNumber = await ordenes(shippingAddress);

    try {
      const url = await axios.post(
        `${BACK_URL}/stripe/checkout`,
        { cart: cart, orderNumber: orderNumber, userName: user.userName },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(url)
      window.location = url.data.url;
    } catch (err) {
      console.log({ error: err.message });
    }
  }

  let estados = [
    {
      id: 1,
      name: "Buenos Aires",
    },
    {
      id: 2,
      name: "Catamarca",
    },
    {
      id: 3,
      name: "Chaco",
    },
    {
      id: 4,
      name: "Chubut",
    },
    {
      id: 5,
      name: "Córdoba",
    },
    {
      id: 6,
      name: "Corrientes",
    },
    {
      id: 7,
      name: "Entre Ríos",
    },
    {
      id: 8,
      name: "Formosa",
    },
    {
      id: 9,
      name: "Jujuy",
    },
    {
      id: 10,
      name: "La Pampa",
    },
    {
      id: 11,
      name: "La Rioja",
    },
    {
      id: 12,
      name: "Mendoza",
    },
    {
      id: 13,
      name: "Misiones",
    },
    {
      id: 14,
      name: "Neuquén",
    },
    {
      id: 15,
      name: "Río Negro",
    },
    {
      id: 16,
      name: "Salta",
    },
    {
      id: 17,
      name: "San Juan",
    },
    {
      id: 18,
      name: "San Luis",
    },
    {
      id: 19,
      name: "Santa Cruz",
    },
    {
      id: 20,
      name: "Santa Fe",
    },
    {
      id: 21,
      name: "Santiago del Estero",
    },
    {
      id: 22,
      name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    },
    {
      id: 23,
      name: "Tucumán",
    },
  ];

  return (
    <div class="flex h-screen bg-gray-100">
      <div class="m-auto">
        <div>
          <div class="mt-5 bg-white rounded-lg shadow">
            <div class="flex">
              <div class="flex-1 py-5 pl-5 overflow-hidden">
                <svg
                  class="inline align-text-top"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      id="svg_1"
                      stroke="null"
                    ></path>
                    <path
                      d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                      id="svg_2"
                    ></path>
                    <circle
                      cx="7.04807"
                      cy="6.97256"
                      r="2.5"
                      id="svg_3"
                    ></circle>
                  </g>
                </svg>
                <h1 class="inline text-2xl font-semibold leading-none">
                  Dirección de Envio
                </h1>
              </div>
            </div>
            <div class="col-span-6 px-5 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700"></label>
              <select
                onChange={(e) => {
                  setState({ ...state, shipping: e.target.value });
                  if (e.target.value) {
                    setPorDefecto({ ...porDefecto, shipping: false });
                  }
                }}
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {user.defaultShippingAddress === "from google" ||
                !user.defaultShippingAddress ? null : (
                  <option>{user.defaultShippingAddress}</option>
                )}
                <option value={""}>Otra dirección</option>
              </select>
            </div>
            {!state.shipping ? (
              <form onSubmit={(e) => e.preventDefault}>
                <div class="px-5 pb-5">
                  <input
                    placeholder="Provincia/Estado"
                    value={direction.shipping.provincia_estado}
                    onChange={(e) =>
                      setDirection({
                        ...direction,
                        shipping: {
                          ...direction.shipping,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                    name="provincia_estado"
                    class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                  {direction.shipping.provincia_estado ? null : (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      Complete este campo
                    </span>
                  )}
                  <div class="flex flex-row">
                    <div class="flex flex-col w-2/4 pr-2">
                      <input
                        type="text"
                        placeholder="Calle"
                        value={direction.shipping.calle}
                        onChange={(e) =>
                          setDirection({
                            ...direction,
                            shipping: {
                              ...direction.shipping,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }
                        name="calle"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      {direction.shipping.calle ? null : (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          Complete este campo
                        </span>
                      )}
                    </div>

                    <div class="flex flex-col">
                      <input
                        type="text"
                        placeholder="¿Alguna aclaración?"
                        value={direction.shipping.line1}
                        onChange={(e) =>
                          setDirection({
                            ...direction,
                            shipping: {
                              ...direction.shipping,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }
                        name="line1"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                    </div>
                  </div>
                  <div class="flex items-center pt-3">
                    <input
                      onClick={() =>
                        setPorDefecto({
                          ...porDefecto,
                          shipping: porDefecto.shipping ? false : true,
                        })
                      }
                      type="checkbox"
                      class="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                    />
                    <label
                      for="safeAdress"
                      class="block ml-2 text-sm text-gray-900"
                    >
                      ¿Quieres agregar esta dirección como nueva dirección por
                      defecto?
                    </label>
                  </div>
                </div>
              </form>
            ) : null}

            <div class="flex">
              <div class="flex-1 py-5 pl-5 overflow-hidden">
                <svg
                  class="inline align-text-top"
                  width="21"
                  height="20.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g>
                    <path
                      d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                      fill="none"
                      id="svg_1"
                      stroke="null"
                    ></path>
                    <path
                      d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                      id="svg_2"
                    ></path>
                    <circle
                      cx="7.04807"
                      cy="6.97256"
                      r="2.5"
                      id="svg_3"
                    ></circle>
                  </g>
                </svg>
                <h1 class="inline text-2xl font-semibold leading-none">
                  Dirección de Facturacion
                </h1>
              </div>
              <div class="flex-none pt-2.5 pr-2.5 pl-1"></div>
            </div>
            <div class="col-span-6 px-5 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              ></label>
              <select
                onChange={(e) => {
                  setState({ ...state, billing: e.target.value });
                  if (e.target.value) {
                    setPorDefecto({ ...porDefecto, billing: false });
                  }
                }}
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {user.billingAddress === "from google" ||
                !user.billingAddress ? null : (
                  <option>{user.billingAddress}</option>
                )}
                <option value={""}>Otra dirección</option>
              </select>
            </div>
            {!state.billing ? (
              <form onSubmit={(e) => e.preventDefault}>
                <div class="px-5 pb-5">
                  <input
                    type="text"
                    placeholder="Provincia/Estado"
                    value={direction.billing.provincia_estado}
                    onChange={(e) =>
                      setDirection({
                        ...direction,
                        billing: {
                          ...direction.billing,
                          [e.target.name]: e.target.value,
                        },
                      })
                    }
                    name="provincia_estado"
                    class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                  {direction.billing.provincia_estado ? null : (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      Complete este campo
                    </span>
                  )}
                  <div class="flex flex-row">
                    <div class="flex flex-col w-2/4 pr-2">
                      <input
                        type="text"
                        placeholder="Calle"
                        value={direction.billing.calle}
                        onChange={(e) =>
                          setDirection({
                            ...direction,
                            billing: {
                              ...direction.billing,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }
                        name="calle"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      {direction.billing.calle ? null : (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          Complete este campo
                        </span>
                      )}
                    </div>
                    <div class="flex flex-col">
                      <input
                        type="text"
                        placeholder="¿Alguna aclaración?"
                        value={direction.billing.line1}
                        onChange={(e) =>
                          setDirection({
                            ...direction,
                            billing: {
                              ...direction.billing,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }
                        name="line1"
                        class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                    </div>
                  </div>
                  <div class="flex items-center pt-3">
                    <input
                      onClick={() =>
                        setPorDefecto({
                          ...porDefecto,
                          billing: porDefecto.billing ? false : true,
                        })
                      }
                      type="checkbox"
                      class="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                    />
                    <label
                      for="safeAdress"
                      class="block ml-2 text-sm text-gray-900"
                    >
                      ¿Quieres agregar esta dirección como nueva dirección por
                      defecto?
                    </label>
                  </div>
                </div>
              </form>
            ) : null}

            <div class="flex flex-row-reverse p-3">
              <div class="flex-initial pl-3">
                <button
                  onClick={onSub}
                  type="button"
                  class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span class="pl-2 mx-1">Continuar</span>
                </button>
              </div>
              <div class="flex-initial">
                <button onClick={()=> navegate("/cart")}
                  type="button"
                  class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span class="pl-2 mx-1">Cancelar</span>
                </button>
              </div>
            </div>
            <Modal
              isOpen={openCampo}
              onRequestClose={() => setOpenCampo(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <Campo setOpenCampo={setOpenCampo} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "5px",
    //     alignItems: "center",
    //   }}
    // >
    //   {/* // Shipping  */}
    //   <h1 style={{ color: "black", fontSize: "35px", fontWeight: "bold" }}>
    //     Dirección de Envio
    //   </h1>
    //   <select
    //     onChange={(e) => {
    //       setState({ ...state, shipping: e.target.value });
    //       if (e.target.value) {
    //         setPorDefecto({...porDefecto, shipping: false });
    //       }
    //     }}
    //     style={{ width: "90%" }}
    //   >

    //   {!state.shipping ? (
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         width: "90%",
    //         marginTop: "10px",
    //       }}
    //     >
    //       <form
    //         onSubmit={(e) => e.preventDefault}
    //         style={{ display: "flex", flexDirection: "column", width: "90%" }}
    //       >
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>Provincia/Estado</label>
    //           <input
    //             style={
    //               direction.shipping.provincia_estado
    //                 ? null
    //                 : { border: "solid red 2px" }
    //             }
    //             type="text"
    // placeholder="Ej: Buenos Aires"
    // value={direction.shipping.provincia_estado}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     shipping: {
    //       ...direction.shipping,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    //             name="provincia_estado"
    //           />
    // {direction.shipping.provincia_estado ? null : (
    //   <span style={{ color: "red", fontSize: "13px" }}>
    //     Complete este campo
    //   </span>
    // )}
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>Calle</label>
    //           <input
    //             style={
    //               direction.shipping.calle ? null : { border: "solid red 2px" }
    //             }
    // type="text"
    // placeholder="Ej: San Martin 2900"
    // value={direction.shipping.calle}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     shipping: {
    //       ...direction.shipping,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    // name="calle"
    //           />
    // {direction.shipping.calle ? null : (
    //   <span style={{ color: "red", fontSize: "13px" }}>
    //     Complete este campo
    //   </span>
    // )}
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>¿Alguna aclaración?</label>
    //           <input
    // type="text"
    // placeholder="Ej: Casa roja, entre hospital y restaurante"
    // value={direction.shipping.line1}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     shipping: {
    //       ...direction.shipping,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    // name="line1"
    //           />
    //         </div>
    //       </form>
    //       <div>
    //         <span style={{ margin: "5px" }}>
    //           ¿Quieres agregar esta dirección como nueva dirección por defecto?
    //         </span>
    //         <input
    //           type="checkbox"
    // onClick={() =>
    //   setPorDefecto({...porDefecto, shipping: porDefecto.shipping ? false : true })
    // }
    //         />
    //       </div>
    //     </div>
    //   ) : null}

    //   {/* // Billing */}
    //   <h1 style={{ color: "black", fontSize: "35px", fontWeight: "bold" }}>
    //     Dirección de Facturacion
    //   </h1>
    //   <select
    // onChange={(e) => {
    //   setState({ ...state, billing: e.target.value });
    //   if (e.target.value) {
    //     setPorDefecto({...porDefecto, billing: false });
    //   }
    // }}
    //     style={{ width: "90%" }}
    //   >
    // {user.billingAddress === "from google" ||
    // !user.billingAddress ? null : (
    //   <option>{user.billingAddress}</option>
    // )}
    // <option value={""}>Otra dirección</option>
    //   </select>

    //   {!state.billing ? (
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         width: "90%",
    //         marginTop: "10px",
    //       }}
    //     >
    //       <form
    //         onSubmit={(e) => e.preventDefault}
    //         style={{ display: "flex", flexDirection: "column", width: "90%" }}
    //       >
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>Provincia/Estado</label>
    //           <input
    //             style={
    //               direction.billing.provincia_estado
    //                 ? null
    //                 : { border: "solid red 2px" }
    //             }
    // type="text"
    // placeholder="Ej: Buenos Aires"
    // value={direction.billing.provincia_estado}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     billing: {
    //       ...direction.billing,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    // name="provincia_estado"
    //           />
    // {direction.billing.provincia_estado ? null : (
    //   <span style={{ color: "red", fontSize: "13px" }}>
    //     Complete este campo
    //   </span>
    // )}
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>Calle</label>
    //           <input
    //             style={
    //               direction.billing.calle ? null : { border: "solid red 2px" }
    //             }
    // type="text"
    // placeholder="Ej: San Martin 2900"
    // value={direction.billing.calle}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     billing: {
    //       ...direction.billing,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    // name="calle"
    //           />
    // {direction.billing.calle ? null : (
    //   <span style={{ color: "red", fontSize: "13px" }}>
    //     Complete este campo
    //   </span>
    // )}
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             width: "100%",
    //             margin: "3px",
    //           }}
    //         >
    //           <label>¿Alguna aclaración?</label>
    //           <input
    // type="text"
    // placeholder="Ej: Casa roja, entre hospital y restaurante"
    // value={direction.billing.line1}
    // onChange={(e) =>
    //   setDirection({
    //     ...direction,
    //     billing: {
    //       ...direction.billing,
    //       [e.target.name]: e.target.value,
    //     },
    //   })
    // }
    // name="line1"
    //           />
    //         </div>
    //       </form>
    //       <div>
    //         <span style={{ margin: "5px" }}>
    //           ¿Quieres agregar esta dirección como nueva dirección por defecto?
    //         </span>
    //         <input
    //           type="checkbox"
    // onClick={() =>
    //   setPorDefecto({...porDefecto, billing: porDefecto.billing ? false : true })
    // }
    //         />
    //       </div>
    //     </div>
    //   ) : null}

    //   <button
    //     onClick={onSub}
    //     className="datepicker-footer-btn"
    //     style={{ width: "90%", position: "relative", bottom: "0" }}
    //   >
    //     Continuar
    //   </button>
    // </div>
  );
}
