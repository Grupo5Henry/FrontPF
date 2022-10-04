import * as React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import accounting from "accounting";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../redux/action";
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


function Cart () {
  const [expanded, setExpanded] = React.useState(false);
  const [inCart, setInCart] = React.useState(1)
  const cart = useSelector(state => state.cart);
  const userStatus = useSelector(state => state.loggedIn);
  const dispatch = useDispatch()


  React.useEffect(() => {
    // console.log(userStatus, localStorage.userName)
    dispatch(getCart(localStorage.userName))
  },[])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div>
      <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-40 py-10">
        {cart !=="Missing Username" && cart.map((product) => {
          let detail = product.product 
          return (
          <div key={`cart${detail.id}`} className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center">
            <img
              className="group-hover:opacity-60 transition duration-500"
              src={detail.thumbnail}
              alt="sofa-2"
            />
            <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
              <div>
                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                  {detail.name}
                </p>
                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                  {detail.condition}
                </p>
              </div>
              <div>
                <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">
                {accounting.formatMoney(detail.price, "$")}
                </p>
                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                  {detail.brand}
                </p>
              </div>
            </div>

            <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">
              <CardActions disableSpacing>
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
                <Typography paragraph>{detail.model}</Typography>

                  <Typography paragraph>{detail.description}</Typography>
                </CardContent>
              </Collapse>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}

export default Cart;
