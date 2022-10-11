import React, { useEffect } from "react";
import "../Datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/action";
import axios from "axios";
import { BACK_URL } from "../../../constantes";
import { authHeader } from "../../../services/auth-header";

import swal from "sweetalert";

//CONSTANTE PARA SETEAR LAS COLUMNAS

// Evitar que se ponga un borde cuando se hace click en una celda

export default function Datatable() {
  //ESTA FUNCION SE RENDERIZA DENTRO DEL COMPONENTE LIST PARA MOSTRAR LOS USUARIOS

  //ESTADOS
  const users = useSelector((state) => state.users);
  const userState = useSelector((state) => state.user);

  //CONSTANTES
  const dispatch = useDispatch();

  //CONSTANTE PARA SETEAR LAS COLUMNAS

  const columns = [
    { field: "userName", headerName: "Name", width: 150 },
    {
      field: "banned",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithBan ${params.row.banned}`}>
            {" "}
            {params.row.banned ? "Baneado" : "Activo"}{" "}
          </div>
        );
      },
    },
    { field: "email", headerName: "Correo", width: 300 },
    {
      field: "billingAddress",
      headerName: "Dirección de facturación",
      width: 300,
    },
    { field: "defaultShippingAddress", headerName: "Dirección", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.role}`}>
            {" "}
            {params.row.role}{" "}
          </div>
        );
      },
    },
  ];

  const dataTableButton = [
    {
      field: "action",
      headerName: "Acciones",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="adminButton"
              onClick={(e) => {
                e.stopPropagation();
                handleAdminButton(params);
              }}
            >
              Privilegios
            </button>
            <button
              className="banButton"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e);
                handleBanButton(params);
              }}
            >
              Baneo
            </button>
          </div>
        );
      },
    },
  ];

  //USE EFFECTS

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //CONTROL DE BOTONES
  //ADMIN
  const handleAdminButton = (params) => {
    let userName = params.row.userName;
    let role = params.row.role;
    let banned = params.row.banned;
    swal({
      title: banned
        ? "Imposible dar privilegios a un usuario baneado"
        : role === "admin"
        ? "¿Desea quitar el rol de Admin?"
        : "¿Desea otorgar privilegios de Admin?",
      icon: banned ? "error" : "warning",
      buttons: banned ? false : ["Cancel", "I am sure"],
    }).then((response) => {
      if (response) toggleAdmin(userName, role);
    });
  };

  //BAN

  const handleBanButton = (params) => {
    let userName = params.row.userName;
    let role = params.row.role;
    let banned = params.row.banned;
    swal({
      title:
        role === "admin"
          ? "Imposible banear a un admin"
          : banned
          ? "¿Desea quitar ban a usuario?"
          : "¿Desea banear al usuario?",
      icon: role === "admin" ? "error" : "warning",
      buttons: role === "admin" ? false : ["Cancel", "I am sure"],
    }).then((response) => {
      if (response) toggleBan(userName, banned);
    });
  };

  const toggleAdmin = async (userName, role) => {
    role == "user" ? (role = "admin") : (role = "user");
    try {
      await axios.put(
        `${BACK_URL}/user/modify`,
        {
          userName,
          role,
        },
        { headers: authHeader() }
      );
      dispatch(getAllUsers());
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  const toggleBan = async (userName, banned) => {
    // e.preventDefault();
    banned ? (banned = false) : (banned = true);
    try {
      await axios.put(
        `${BACK_URL}/user/modify`,
        {
          userName,
          banned,
        },
        { headers: authHeader() }
      );
      dispatch(getAllUsers());
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  return (
    <div className="datatable">
      {users ? (
        <DataGrid
          rows={users.filter((user) => user.userName != userState.userName)}
          columns={columns.concat(dataTableButton)}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          pageSize={10}
          rowsPerPageOptions={[5]}
          /* checkboxSelection */
          getRowId={(row) => row.userName}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
