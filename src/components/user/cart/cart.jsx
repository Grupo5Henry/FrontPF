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
import { FRONT_URL } from "../../../constantes";
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
import { BorrarDelCarrito, getCart, getFavorites } from "../../../redux/action";
import Modal from "react-modal";
import EmptyCart from "../alert/emptyCart";
import OutStock from "../alert/outStock";
import Alert from "../alert/alert";

Modal.setAppElement("#root");




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

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openStock, setOpenStock] = React.useState(false);

  var navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
    dispatch(getCart(userState.userName));
  }, [userState]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    !cart.length? (
      <div style={{display:"flex",gap:"12px",flexDirection:"column",width:"100%",justifyContent:"center",height:"200px",alignItems:"center"}}>
          <h1 style={{fontSize:"23px",textAlign:"center"}}>No tienes productos en el carrito</h1>
          <button className="datepicker-footer-btn" onClick={() => navigate("/home")}>Ir a agregar</button>
        </div>
    ) :
    <div className="flex flex-col justify-center items-center max-w-full p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
      
      <IconButton
        onClick={() => {
          clearCart(userState.userName);
        }}
        sx={cart.length > 0 ? { color: "red" } : { color: "lightgray" }}
      >
        <Delete></Delete>
        <p>Limpiar el carrito</p>
      </IconButton>
  

      <ul className="flex flex-col divide-y divide-gray-700">
        {cart !== "Missing Username" &&
          cart.map((product) => {
            let detail = product.product;
            return (

                <li key={`cart${detail.id}`} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                  <div className="flex w-full space-x-2 sm:space-x-4">
                  <img 
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                   src={detail.thumbnail}
                   alt="Polaroid camera"
                   style={{objectFit:"scale-down"}} />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{detail.name}</h3>
                            <p className="text-sm dark:text-gray-400">Modelo: {detail.model}</p>
              <p className="text-sm dark:text-gray-400">Marca: {detail.brand}</p>
                        </div>
                        <div className="text-right w-20">
            <NumberInput
                    size="sm"
                    defaultValue={product.amount}
                    min={1}
                    onChange={(value) => {
                      if (userState.logged) {
                        updateCart(userState.userName, detail.id, value);
                        return;
                      }
                      updateOfflineCart(detail.id, value);
                    }}
                  >
                    <NumberInputField focusBorderColor="red.200" style={{minWidth:"48px"}} />
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
                        </div>
                    </div>
                    <div className="flex text-sm divide-x">
                        <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1"
                            onClick={() => {
                              userState.logged?
                              (
                                dispatch(BorrarDelCarrito(product.productId,userState.userName))
                              ) : (
                                updateOfflineCart(detail.id, 0)
                              )
                              }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect width="32" height="200" x="168" y="216"></rect>
                                <rect width="32" height="200" x="240" y="216"></rect>
                                <rect width="32" height="200" x="312" y="216"></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                            </svg>
                            <span>Remover</span>
                        </button>
                        <button onClick={() => {
                      if(userState.logged) {
                        if (isFavorite(detail.id))
                        return unSetFavorite(userState.userName, detail.id);
                      setFavorite(userState.userName, detail.id);
                      }else{
                        alert("no estas logueado")
                      }
                        
  
                    }} type="button" className="flex items-center px-2 py-1 space-x-1">
            <IconButton
                    aria-label="Add to cart"
                  >
                    {favorites != "Missing Username" ? (
                      isFavorite(detail.id) ? (
                        <Favorite
                      
                          sx={{ color: "red" }}
                         
                          // onClick={() => unSetFavorite(userState.userName, product.id)}
                        />
                      ) : (
                        <FavoriteBorder  />
                      )
                    ) : null}
                  </IconButton>
                            <span style={userState.logged? null : {color:"grey"}}>Agregar a favoritos</span>
                        </button>
                    </div>
                </div>
                {/* <div className="flex flex-col justify-between p-4 leading-normal">
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
                  
                </CardActions> */}
                </div>
                </li>

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
      </ul>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={async () => {
            dispatch(getCart(userState.userName));
            if (!userState.logged) {
              setOpenAlert(true)
              return;
            }
            if (!cart.length) return setOpenCart(true)
            if (
              cart.some((product) => product.product.stock - product.amount < 0)
            ) {
             setOpenStock(true)
              return;
            }
            navigate("/direction");
          }}
          className="datepicker-footer-btn"
          style={{ width: "90%" }}
        >
          Comprar
        </button>


      </div>
      <Modal
        isOpen={openAlert}
        onRequestClose={() => setOpenAlert(false)}
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
        <Alert setOpenAlert={setOpenAlert} openAlert={openAlert}/>
      </Modal>
      <Modal
        isOpen={openCart}
        onRequestClose={() => setOpenCart(false)}
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
        <EmptyCart setOpenCart={setOpenCart}/>
      </Modal>
      <Modal
        isOpen={openStock}
        onRequestClose={() => setOpenStock(false)}
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
        <OutStock setOpenStock={setOpenStock}/>
      </Modal>
    </div>
  );
}

export default Cart;
