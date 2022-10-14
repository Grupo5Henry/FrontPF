import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavProfile from "./navProfile";
import { getAllOrders } from "../../../redux/action";


export default function Profile() {

  const dispatch = useDispatch()
  const [compras, setCompras] = useState(false);
  const [post, setPost] = useState(false);
  const shopping = useSelector(state => state.cart);
  const user = useSelector(state => state.user)
  const orders = useSelector((state) => state.orders);
  console.log(orders)
  console.log(user)

  useEffect(() => {
    
    dispatch(getAllOrders());
    /*   dispatch(deleteAllReviews()); */
  }, [dispatch]);

  let earnings = [];

  orders.map((order) => {
    for (let i = 5; i < order.length; i++) {
      let product = order[i];

      earnings.push( product.product)
    }
  });
  const filterShopping = orders.filter( e=> e.id);
  console.log(earnings)

  return (
    <div>
        <NavProfile setCompras={setCompras} setPost={setPost}/>
        {
          compras === true ? <dir>Holllllllllllllllaaaaaaaaaaaaaaaa</dir>:
          post === true ? <div>Queeeeeeeeeeeeeeeeeeeeeeeeeee</div>:null
        }
    </div>
  );
}
