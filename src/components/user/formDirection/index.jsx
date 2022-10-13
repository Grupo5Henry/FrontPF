import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACK_URL } from "../../../constantes";
import { clearCart } from "../../../Controllers/Cart";
import {
  CreateOrder,
  reduceStock,
  UpdateUserDefaultAddress,
} from "../../../redux/action";

export default function DirectionForm() {
  var { user, cart } = useSelector((state) => state);

  var dispatch = useDispatch();

  var [state, setState] = useState({
    shipping: user.defaultShippingAddress,
    billing: false,
  });

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
      shippingAddress = user.defaultShippingAddress;
    } else {
      if (!direction.shipping.calle || !direction.shipping.provincia_estado) {
        return alert("Complete los campos pedidos");
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
      billingAddress = "user.billingAddress";
    } else {
      if (!direction.billing.calle || !direction.billing.provincia_estado) {
        return alert("Complete los campos pedidos");
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {/* // Shipping  */}
      <h1 style={{ color: "black", fontSize: "35px", fontWeight: "bold" }}>
        Dirección de Envio
      </h1>
      <select
        onChange={(e) => {
          setState({ shipping: e.target.value });
          if (e.target.value) {
            setPorDefecto({ shipping: false });
          }
        }}
        style={{ width: "90%" }}
      >
        {user.defaultShippingAddress === "from google" ? null : (
          <option value={true}>{user.defaultShippingAddress}</option>
        )}
        <option value={""}>Otra dirección</option>
      </select>

      {!state.shipping ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            marginTop: "10px",
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault}
            style={{ display: "flex", flexDirection: "column", width: "90%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>Provincia/Estado</label>
              <input
                style={
                  direction.shipping.provincia_estado
                    ? null
                    : { border: "solid red 2px" }
                }
                type="text"
                placeholder="Ej: Buenos Aires"
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
              />
              {direction.shipping.provincia_estado ? null : (
                <span style={{ color: "red", fontSize: "13px" }}>
                  Complete este campo
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>Calle</label>
              <input
                style={
                  direction.shipping.calle ? null : { border: "solid red 2px" }
                }
                type="text"
                placeholder="Ej: San Martin 2900"
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
              />
              {direction.shipping.calle ? null : (
                <span style={{ color: "red", fontSize: "13px" }}>
                  Complete este campo
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>¿Alguna aclaración?</label>
              <input
                type="text"
                placeholder="Ej: Casa roja, entre hospital y restaurante"
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
              />
            </div>
          </form>
          <div>
            <span style={{ margin: "5px" }}>
              ¿Quieres agregar esta dirección como nueva dirección por defecto?
            </span>
            <input
              type="checkbox"
              onClick={() =>
                setPorDefecto({ shipping: porDefecto.shipping ? false : true })
              }
            />
          </div>
        </div>
      ) : null}

      {/* // Billing */}
      <h1 style={{ color: "black", fontSize: "35px", fontWeight: "bold" }}>
        Dirección de Facturacion
      </h1>
      <select
        onChange={(e) => {
          setState({ billing: e.target.value });
          if (e.target.value) {
            setPorDefecto({ billing: false });
          }
        }}
        style={{ width: "90%" }}
      >
        {user.billingAddress === "from google" ||
        !user.billingAddress ? null : (
          <option value={true}>{user.billingAddress}</option>
        )}
        <option value={""}>Otra dirección</option>
      </select>

      {!state.billing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            marginTop: "10px",
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault}
            style={{ display: "flex", flexDirection: "column", width: "90%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>Provincia/Estado</label>
              <input
                style={
                  direction.billing.provincia_estado
                    ? null
                    : { border: "solid red 2px" }
                }
                type="text"
                placeholder="Ej: Buenos Aires"
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
              />
              {direction.billing.provincia_estado ? null : (
                <span style={{ color: "red", fontSize: "13px" }}>
                  Complete este campo
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>Calle</label>
              <input
                style={
                  direction.billing.calle ? null : { border: "solid red 2px" }
                }
                type="text"
                placeholder="Ej: San Martin 2900"
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
              />
              {direction.billing.calle ? null : (
                <span style={{ color: "red", fontSize: "13px" }}>
                  Complete este campo
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "3px",
              }}
            >
              <label>¿Alguna aclaración?</label>
              <input
                type="text"
                placeholder="Ej: Casa roja, entre hospital y restaurante"
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
              />
            </div>
          </form>
          <div>
            <span style={{ margin: "5px" }}>
              ¿Quieres agregar esta dirección como nueva dirección por defecto?
            </span>
            <input
              type="checkbox"
              onClick={() =>
                setPorDefecto({ billing: porDefecto.billing ? false : true })
              }
            />
          </div>
        </div>
      ) : null}

      <button
        onClick={onSub}
        className="datepicker-footer-btn"
        style={{ width: "90%", position: "relative", bottom: "0" }}
      >
        Continuar
      </button>
    </div>
  );
}
