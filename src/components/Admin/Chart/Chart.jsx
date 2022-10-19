import React, { useEffect } from "react";
import "../Chart/chart.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/action";







export default function Chart() {
  //ESTADOS
  const orders = useSelector((state) => state.orders);
  const userState = useSelector((state) => state.user);


  //GANANCIAS
  let earnings = 0;

  orders.map((order) => {
    for (let i = 6; i < order.length; i++) {
      let product = order[i];

      earnings += product.amount * product.price;
    }
  });



  //CONSTANTES
  const dispatch = useDispatch();

  //USE EFFECTS

   useEffect(() => {
     dispatch(getAllOrders());
   }, [dispatch]);

   const data = [
    {
      name: "Mayo",
      uv: 4000,
      $: 0,
      amt: 2400,
    },
    {
      name: "Junio",
      uv: 3000,
      $: 0,
      amt: 2210,
    },
    {
      name: "Julio",
      uv: 2000,
      $: 0,
      amt: 2290,
    },
    {
      name: "Agosto",
      uv: 2780,
      $: 0,
      amt: 2000,
    },
    {
      name: "Septiembre",
      uv: 1890,
      $: 0,
      amt: 2181,
    },
    {
      name: "Octubre",
      uv: 0,
      $: 0,
      amt: 2500,
    },
  ];

  let nameMonth = "Octubre";
  let amount = earnings;
  data.map(function(data) {
    if(data.name === nameMonth) {
      data.$ = amount;
    }
    return data;
  })



  return (
    <div className="chart">
      <div className="title">Ventas en los últimos 6 meses</div>
      <ResponsiveContainer width="100%" className={"grafico"} aspect={2 / 0.8}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient> */}
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" className="Xline"/>
          <YAxis className="Yline"/>
          <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
          <Tooltip />
          {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
          <Area
            type="monotone"
            dataKey="$"
            /* stroke="#82ca9d" */
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
