import React, { useEffect } from "react";
import "../Chart/chart.scss";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/action";

const data = [
    {
      name: 'Abril',
      uv: 4000,
      $: 2400,
      amt: 2400,
    },
    {
      name: 'Mayo',
      uv: 3000,
      $: 1398,
      amt: 2210,
    },
    {
      name: 'Junio',
      uv: 2000,
      $: 9800,
      amt: 2290,
    },
    {
      name: 'Julio',
      uv: 2780,
      $: 3908,
      amt: 2000,
    },
    {
      name: 'Agosto',
      uv: 1890,
      $: 4800,
      amt: 2181,
    },
    {
      name: 'Septiembre',
      uv: 2390,
      $: 3800,
      amt: 2500,
    },
  ];


export default function Chart () {

    //ESTADOS
    const orders = useSelector((state) => state.orders);
    const userState = useSelector((state) => state.user);
  
    /* console.log("SOY OREDERS", orders) */
    const ordenado = orders.sort((a, b) => Date(a[3]).getMonth > Date(b[3]).getMonth )
    /* console.log("SOY ORDENADO", ordenado) */
    /* const monto = ordenado */
  /*   const ordenprueba = ordenado[3].getMonth
     console.log("SOY ORDENPRUEBA", ordenprueba) */
  
    //CONSTANTES
    const dispatch = useDispatch();

    
  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  //MANEJO DE FECHAS
/*   let fechas = {
    enero: [],
    febrero: [],
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  }
  for(let i = 0; i < ordenado.length; i++) {
    ordenado[i][3]
  } */


    return(
        <div className="chart">
            <div className="title">Ventas en los últimos 6 meses</div>
            <ResponsiveContainer width="100%" aspect={2 / 1,3}>
                <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient> */}
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                <Area type="monotone" dataKey="$" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
};