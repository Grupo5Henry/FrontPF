import React from "react";
import MUIDataTable from "mui-datatables";
import "../Datatable/datatable.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/action";
import axios from "axios";
import { BACK_URL } from "../../../constantes";
import { authHeader } from "../../../services/auth-header";

import swal from "sweetalert";

export default function DatatableUsers() {

      //ESTADOS
  const users = useSelector((state) => state.users);
  const userState = useSelector((state) => state.user);

  const usersFiltered = users.filter((user) => user.userName != userState.userName)

  const dispatch = useDispatch();

    //CONTROL DE BOTONES

  //ADMIN
  const handleAdminButton = (tableMeta) => {
    let userName = tableMeta.rowData[0];
    let role = tableMeta.rowData[4];
    let banned = tableMeta.rowData[5];

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

  const handleBanButton = (tableMeta) => {
    let userName = tableMeta.rowData[0];
    let role = tableMeta.rowData[4];
    let banned = tableMeta.rowData[5];
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

  //CONSTANTE ADMIN

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

    //CONSTANTE BAN

  const toggleBan = async (userName, banned) => {
 
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

  //COLUMNAS


  const columns = [
    {
      label: "Nombre",
      name: "userName",
    },
    {
      label: "Dirección de facturación",
      name: "billingAddress",
    },
    {
      label: "Dirección por defecto",
      name: "defaultShippingAddress",
    },
    {
      label: "Email",
      name: "email",
    },
    {
    label: "Rol",
    name: "role",
    },
    {
    label: "Estado",
    name: "banned",
    options: {
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <div className="cellWithStatus">
                {value ? "Baneado" : "Activo"}
                </div>
            )
        }
    }
    },
    {
      name: "userName",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <div className="cellAction">

                  <button className="banButton" onClick={(e) => {
                e.stopPropagation();
                handleBanButton(tableMeta);
              }}>Ban</button>
                  <button className="adminButton" onClick={(e) => {
                e.stopPropagation();
                handleAdminButton(tableMeta);
              }}>Privilegios</button>

              </div>
          );
        },
      },
    },
  ]


  return (
    <div className="datatable">
      {usersFiltered.length ?
    <MUIDataTable
      title={"LISTA DE USUARIOS"}
      className="datagrid"
      data={usersFiltered.length ? usersFiltered : []}
      columns={columns}
    />
    :
    <div>Cargando...</div> }
    </div>
  );
}