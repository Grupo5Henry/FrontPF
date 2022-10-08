import React, { useEffect } from "react";
import "../Datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/action";
import axios from "axios";
import { BACK_URL } from "../../../constantes";
import { authHeader } from "../../../services/auth-header";

/* const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
]; */

//CONSTANTE PARA SETEAR LAS COLUMNAS

const columns = [
  {
    field: "Order Number",
    headerName: "Order Number",
    width: 150,
    renderCell: (params) => {
      return <div> {params.row[0]} </div>;
    },
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return <div> {params.row[2]} </div>;
    },
  },
  // { field: "Date", headerName: "Dirección", width: 300 },
  {
    field: "Dirección",
    headerName: "Dirección",
    width: 200,
    renderCell: (params) => {
      return <div> {params.row[1]} </div>;
    },
  },
  {
    field: "Total",
    headerName: "Total",
    width: 130,
    renderCell: (params) => {
      let earnings = 0;
      for (let i = 4; i < params.row.length; i++) {
        let product = params.row[i];

        earnings += product.amount * product.price;
      }
      return <div> {earnings} </div>;
    },
  },
  {
    field: "Date",
    headerName: "Fecha",
    width: 130,
    renderCell: (params) => {
      return <div> {params.row[3]} </div>;
    },
  },
  /* { field: 'createdAt', headerName: 'Creación de usuario', width: 300 }, */
];

// Evitar que se ponga un borde cuando se hace click en una celda

export default function OrdersDatatable() {
  //ESTA FUNCION SE RENDERIZA DENTRO DEL COMPONENTE LIST PARA MOSTRAR LOS USUARIOS

  //ESTADOS
  const orders = useSelector((state) => state.orders);
  const userState = useSelector((state) => state.user);

  // console.log(users)

  //CONSTANTES
  const dispatch = useDispatch();

  const dataTableButton = [
    {
      field: "action",
      headerName: "Acciones",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="adminButton"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Detalle
            </button>
          </div>
        );
      },
    },
  ];

  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  //CONTROL DE BOTONES

  return (
    <div className="datatable">
      {orders.length ? (
        <DataGrid
          rows={orders}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          columns={columns.concat(dataTableButton)}
          pageSize={10}
          rowsPerPageOptions={[5]}
          /* checkboxSelection */
          getRowId={(row) => row[0]}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
