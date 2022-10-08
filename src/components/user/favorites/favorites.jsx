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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-40 py-10">
        {favorites !== "Missing Username" &&
          favorites.map((product) => {
            product = product.product;
            return (
              <div
                key={`fav${product.id}`}
                className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center"
              >
                <img
                  className="group-hover:opacity-60 transition duration-500"
                  src={product.thumbnail}
                  alt="sofa-2"
                />
                <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                      {product.name}
                    </p>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
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

                <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="Toggle Favorite"
                      onClick={() =>
                        unSetFavorite(userState.userName, product.id)
                      }
                    >
                      <Favorite sx={{ color: "red" }} fontSize="large" />
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
            );
          })}
      </div>
    </div>
  );
}

export default Favorites;
