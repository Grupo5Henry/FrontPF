import * as React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import accounting from "accounting";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../../redux/action";
import axios from "axios";




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
  const products = useSelector(state => state.products)
  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()


  React.useEffect(() => {
    dispatch(getFavorites(localStorage.userName))
  },[])


  const setFavorite = async (userName, id) => {
    try {
      await axios.post("https://backpf-production.up.railway.app/favorite/add",
      { userName: userName, productId: id}
      )
      dispatch(getFavorites(localStorage.userName))
    } catch (err) {
      console.log({error: err.message})
    }
  }

  const unSetFavorite = async (userName, id) => {
    try {
      await axios.delete("https://backpf-production.up.railway.app/favorite/delete",
      {data: { userName: userName, productId: id } }
      )
      dispatch(getFavorites(localStorage.userName))
    } catch (err) {
      console.log({error: err.message})
    }
  }

  const isFavorite = (id) => {
    if (favorites === "Missing Username") return false
    if (favorites.some(favorite => favorite.productId === id)) return true;
    return false
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-40 py-10">
        {products.map((product) => (
          <div key={product.id} className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center">
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
              <IconButton aria-label="Add to cart" onClick={() => {
                if (isFavorite(product.id)) unSetFavorite(localStorage.userName, product.id)
                setFavorite(localStorage.userName, product.id)
              }
              }>
                {isFavorite(product.id) 

                ? <Favorite fontSize="large" 
                // onClick={() => unSetFavorite(localStorage.userName, product.id)}
                /> 

                : <FavoriteBorder fontSize="large"
                // onClick={() => setFavorite(localStorage.userName, product.id)}
                />}
                  
                </IconButton>
                <IconButton aria-label="Add to cart">
                  <AddShoppingCart fontSize="large" />
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
        ))}
      </div>
    </div>
  );
}

export default Products;