import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import {
  AddShoppingCart,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  inCart,
  updateCart,
  updateOfflineCart,
} from "../../../Controllers/Cart";
import {
  isFavorite,
  setFavorite,
  unSetFavorite,
} from "../../../Controllers/Favorite";
import { getCart, getFavorites } from "../../../redux/action";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Cart() {
  const [expanded, setExpanded] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  var navigate = useNavigate()

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
    dispatch(getCart(userState.userName));
  }, [userState]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          clearCart(userState.userName);
        }}
        sx={cart.length > 0 ? { color: "red" } : { color: "lightgray" }}
      >
        <Delete></Delete>
        <p>Limpiar el carrito</p>
      </IconButton>

      <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-40 py-10">
        {cart !== "Missing Username" &&
          cart.map((product) => {
            let detail = product.product;
            return (
              <a
                key={`cart${detail.id}`}
                href="#"
                className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={detail.thumbnail}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {detail.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Marca: {detail.brand}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Modelo: {detail.model}
                  </p>
                </div>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => {
                      if (isFavorite(detail.id))
                        return unSetFavorite(userState.userName, detail.id);
                      setFavorite(userState.userName, detail.id);
                    }}
                  >
                    {favorites != "Missing Username" ? (
                      isFavorite(detail.id) ? (
                        <Favorite
                          sx={{ color: "red" }}
                          fontSize="large"
                          // onClick={() => unSetFavorite(userState.userName, product.id)}
                        />
                      ) : (
                        <FavoriteBorder fontSize="large" />
                      )
                    ) : null}
                  </IconButton>
                  <NumberInput
                    size="sm"
                    defaultValue={product.amount}
                    min={0}
                    onChange={(value) => {
                      if (userState.logged) {
                        updateCart(userState.userName, detail.id, value);
                        return;
                      }
                      updateOfflineCart(detail.id, value);
                    }}
                  >
                    <NumberInputField focusBorderColor="red.200" />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        bg="green.200"
                        _active={{ bg: "green.300" }}
                        children="+"
                      />
                      <NumberDecrementStepper
                        bg="pink.200"
                        _active={{ bg: "pink.300" }}
                        children="-"
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </CardActions>
              </a>

              // <div key={`cart${detail.id}`} className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center">
              //   <img
              //     className="group-hover:opacity-60 transition duration-500"
              //     src={detail.thumbnail}
              //     alt="sofa-2"
              //   />
              //   <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
              //     <div>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {detail.name}
              //       </p>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {detail.condition}
              //       </p>
              //     </div>
              //     <div>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">
              //       {accounting.formatMoney(detail.price, "$")}
              //       </p>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {detail.brand}
              //       </p>
              //     </div>
              //   </div>

              //   <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">

              //   </div>
              // </div>
            );
          })}
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button onClick={() => navigate("/direction")} className="datepicker-footer-btn" style={{width:"90%"}}>Comprar</button>
      </div>
    </div>
  );
}

export default Cart;