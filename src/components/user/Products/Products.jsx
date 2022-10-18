import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import accounting from "accounting";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BACK_URL } from "../../../constantes";
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
import {
  getCart,
  getFavorites,
  updateFilter,
  userState,
} from "../../../redux/action";
import "./products.css";
import s from "./products.module.css";

/// demo front-wheat-gamma.vercel.app

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
function Products() {
  const [expanded, setExpanded] = React.useState(false);
  const products = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites);
  const userState = useSelector((state) => state.user);
  const filter = useSelector((state) => state.filter);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getFavorites(userState.userName));
    dispatch(getCart(userState.userName));
  }, [userState]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <div>
      <button
        style={{ margin: "3px" }}
        onClick={() => {
          if (filter.stock == 1) return dispatch(updateFilter({ stock: 0 }));
          dispatch(updateFilter({ stock: 1 }));
        }}
      >
        <div className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-100 px-5 py-2 hover:shadow-lg tracking-wider text-red rounded-full hover:bg-green-50">
          {filter.stock
            ? "Mostrar productos agotados"
            : "No mostrar productos agotados"}
        </div>
      </button>

      {!products.length ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            height: "200px",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "23px", textAlign: "center" }}>
            No se encontraron coincidencias
          </h1>
        </div>
      ) : (
        <div
          id={s.container}
          className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-40 py-10"
        >
          {products.map((product) => (
            <div
              key={`home${product.id}`}
              id={s.card}
              className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center"
            >
              <Link to={`/home/detail/${product.id}`} id={s.link}>
                <img
                  className="group-hover:opacity-60 transition duration-500"
                  id={s.img}
                  src={product.thumbnail}
                  alt="sofa-2"
                />
                <div
                  id={s.noImage}
                  className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2"
                >
                  <div>
                    {product.stock && product.stock > 3 ? null : (
                      <p
                        id={s.pocoStock}
                        className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600"
                        style={{ color: "rgba(255, 0, 0, 0.51)" }}
                      >
                        Cantidad de productos en tienda: {product.stock}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                      {product.name}
                    </p>
                    <p
                      id={s.condicion}
                      className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600"
                    >
                      {product.condition}
                    </p>
                  </div>
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">
                      {accounting.formatMoney(product.price, "$")}
                    </p>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                      {product.brand}
                    </p>
                  </div>
                </div>
              </Link>

              <div
                id={s.divBotones}
                className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"
              >
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => {
                      if (isFavorite(product.id))
                        return unSetFavorite(userState.userName, product.id);
                      setFavorite(userState.userName, product.id);
                    }}
                  >
                    {favorites != "Missing Username" ? (
                      isFavorite(product.id) ? (
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
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => {
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
                    }}
                  >
                    <AddShoppingCart
                      sx={
                        inCart(product.id)
                          ? { color: "green" }
                          : { color: "red" }
                      }
                      fontSize="large"
                    />
                  </IconButton>
                  <ExpandMore
                    id={s.expand}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{product.model}</Typography>

                    <Typography paragraph>{product.description}</Typography>
                  </CardContent>
                </Collapse>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
