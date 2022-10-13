import React, { useEffect } from "react";
import "../OrdersDataTable/ordersdatatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/action";
import axios from "axios";
import { BACK_URL } from "../../../constantes";
import { authHeader } from "../../../services/auth-header";

//CONSTANTE PARA SETEAR LAS COLUMNAS

const columns = [
  {
    field: "OrderNumber",
    headerName: "Number",
    width: 75,
    valueGetter: (params) => {
      return params.row[0];
    },
  },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
    valueGetter: (params) => {
      let status = "";

      switch (params.row[3]) {
        case "PaymentPending":
          status = "Esperando pago";
          break;
        case "PaidPendingDelivery":
          status = "Siendo procesadas";
          break;
        case "Cancelled":
          status = "Canceladas";
          break;
        case "InDelivery":
          status = "En ruta";
          break;
        case "Delivered":
          status = "Entregadas";
          break;
        default:
          status = "Cargando...";
          break;
      }
      return status;
    },
  },
  {
    field: "Users",
    headerName: "Name",
    width: 100,
    valueGetter: (params) => {
      return params.row[1];
    },
  },
  // { field: "Date", headerName: "Dirección", width: 300 },
  {
    field: "Dirección",
    headerName: "Dirección",
    width: 200,
    valueGetter: (params) => {
      return params.row[2];
    },
  },
  {
    type: "Total",
    headerName: "Total",
    width: 130,
    valueGetter: (params) => {
      let earnings = 0;
      for (let i = 5; i < params.row.length; i++) {
        let product = params.row[i];

        earnings += product.amount * product.price;
      }
      return earnings;
    },
  },
  {
    field: "Fecha",
    headerName: "Fecha",
    width: 130,
    valueGetter: (params) => {
      return params.row[4];
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
