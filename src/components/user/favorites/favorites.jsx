import { AddShoppingCart, Favorite } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACK_URL } from "../../../constantes";
import {
  addToCart,
  inCart,
  updateCart,
  updateOfflineCart,
} from "../../../Controllers/Cart";
import { unSetFavorite } from "../../../Controllers/Favorite";
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
function Favorites() {
  const [expanded, setExpanded] = React.useState(false);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
    dispatch(getCart(userState.userName));
  }, [userState]);
  console.log(favorites)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var navigate = useNavigate()
  return (
    <div className="w-full flex items-center justify-center">
      {
        !favorites.length? (
        <div style={{display:"flex",gap:"12px",flexDirection:"column",width:"100%",justifyContent:"center",height:"200px",alignItems:"center"}}>
          <h1 style={{fontSize:"23px"}}>No tienes productos agregados como favoritos</h1>
          <button className="datepicker-footer-btn" onClick={() => navigate("/home")}>Ir a agregar</button>
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap w-full justify-center items-center">
        {favorites !== "Missing Username" &&
          favorites.map((product) => {
            product = product.product;
            return (
              <div  key={`fav${product.id}`} className="w-60 m-5 bg-white rounded-lg drop-shadow-lg ">
            <div className="relative h-62 w-full mb-3">
              <div className="absolute flex flex-col top-0 right-0 p-3">
              <IconButton
                      aria-label="Toggle Favorite"
                      onClick={() =>
                        unSetFavorite(userState.userName, product.id)
                      }
                    >
                      <Favorite sx={{ color: "red" }} />
                    </IconButton>
              </div>
              <Link to={`/home/detail/${product.id}`}>
              <img src={product.thumbnail} alt="Just a flower" className=" w-full   object-fill h-44  rounded-2xl"/>
              </Link>
            </div>
            <div className="flex-auto justify-evenly p-5">
              <div className="flex flex-wrap ">
                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                  <span className="text-gray-400 whitespace-nowrap mr-3">{accounting.formatMoney(product.price, "$")}</span>
                  
                  {product.stock && product.stock > 3 ? <span className="mr-2 text-gray-800">Disponible</span> : product.stock > 1 ? <span className="mr-2 text-gray-800">{product.stock} Disponible</span> : (
                       <span className="mr-2 text-red-600">{product.stock} Disponible</span>
                     )}
                </div>
                <div className="flex items-center w-full justify-between min-w-0 ">
                  
                  <Link to={`/home/detail/${product.id}`} className="text-lg mr-auto cursor-pointer text-gray-600 hover:text-blue-600 truncate ">{product.name}</Link>
                  
                  <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded">
                  {product.condition}</div>
                </div>
              </div>
              <div className="flex flex-wrap justify-starts items-center py-3 text-xs text-white font-medium">
              <span className="text-gray-400 mr-3">{product.description}</span>
              </div>
              <div className="flex flex-col justify-starts text-xs text-white border-b-2 font-medium">
                <div className="flex flex-wrap justify-starts items-center py-3 text-xs text-white font-medium">
                    <span className=" text-gray-800">Marca:</span>
                    <span className="px-2 py-1 rounded bg-blue-600 ">
                        {product.brand}
                    </span>

                </div>
                <div className="flex flex-wrap justify-starts items-center py-3  text-xs text-white font-medium">
                    <span className="text-gray-800">Modelo:</span>
                    <span className="px-2 py-1 rounded bg-blue-600 ">
                    {product.model}
                    </span>

                </div>
                </div>
              <div className="flex space-x-2 text-sm font-medium justify-end mt-4">
                <button onClick={() => {
                        if (!inCart(product.id)) {
                          if (userState.logged) {
                            addToCart(userState.userName, product.id);
                            return;
                          }
                          updateOfflineCart(product.id, 1);
                          return;
                        }
                        if (userState.logged) {
                          updateCart(userState.userName, product.id, 0);
                          return;
                        }
                        updateOfflineCart(product.id, 0);
                      }} class={!inCart(product.id)?"transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-600 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-blue-400": "transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-400 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-green-200"}>
                  <span>Añadir al carrito</span>
                </button>
              </div>
            </div>
          </div>
              // <div
              //   key={`fav${product.id}`}
              //   className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center"
              // >
              //   <img
              //     className="group-hover:opacity-60 transition duration-500"
              //     src={product.thumbnail}
              //     alt="sofa-2"
              //   />
              //   <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
              //     <div>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {product.name}
              //       </p>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {product.condition}
              //       </p>
              //     </div>
              //     <div>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">
              //         {accounting.formatMoney(product.price, "$")}
              //       </p>
              //       <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
              //         {product.brand}
              //       </p>
              //     </div>
              //   </div>

              //   <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">
              //     <CardActions disableSpacing>
                    
              //       <IconButton
              //         aria-label="Add to cart"
                      
              //       >
              //         <AddShoppingCart
              //           sx={
              //             inCart(product.id)
              //               ? { color: "green" }
              //               : { color: "red" }
              //           }
              //         />
              //       </IconButton>

              //       <ExpandMore
              //         expand={expanded}
              //         onClick={handleExpandClick}
              //         aria-expanded={expanded}
              //         aria-label="show more"
              //       >
              //         <ExpandMoreIcon />
              //       </ExpandMore>
              //     </CardActions>
              //     <Collapse in={expanded} timeout="auto" unmountOnExit>
              //       <CardContent>
              //         <Typography paragraph>{product.model}</Typography>

              //         <Typography paragraph>{product.description}</Typography>
              //       </CardContent>
              //     </Collapse>
              //   </div>
              // </div>
            );
          })}
      </div>
      )
      }
      
    </div>
  );
}

export default Favorites;
