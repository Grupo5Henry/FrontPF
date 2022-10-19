import React, { useContext } from "react";
import "../SideBar/sideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import authService from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../../redux/action";
import { BACK_URL } from "../../../constantes";
import { DarkModeContext } from "../context/darkModeContext";

export default function SideBar() {
  const { despachar } = useContext(DarkModeContext);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    authService.logout();
    dispatch(
      updateUserState({
        userName: null,
        defaultShippingAddress: null,
        role: null,
        logged: false,
      })
    );
    window.open(`${BACK_URL}/auth/logout`, "_self");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={"/"}>
          <span className="logo">Techno Admin</span>
        </Link>
      </div>

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
            <Link to={"/"}>
          <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
          </li>
            </Link>
          <p className="title">LISTAS</p>
            <Link to={"/users"}>
          <li>
              <PeopleAltRoundedIcon className="icon" />
              <span>Usuarios</span>
          </li>
            </Link>
            <Link to={"/products"}>
          <li>
              <Inventory2OutlinedIcon className="icon" />
              <span>Productos</span>
          </li>
            </Link>
            <Link to={"/createProduct"}>
          <li>
              <AddCardIcon className="icon" />
              <span>Nuevo Producto</span>
          </li>
            </Link>
            <Link to={"/createBrand-category"}>
          <li>
              <CategoryIcon className="icon" />
              <span>Crear Categorías</span>
          </li>
            </Link>
            <Link to={"/orders"}>
          <li>
              <InventoryOutlinedIcon className="icon" />
              <span>Ordenes</span>
          </li>
            </Link>
            <Link to={"/reviews"}>
          <li>
              <ReportGmailerrorredOutlinedIcon className="icon" />
              <span>Reseñas</span>
          </li>
            </Link>
          <p className="title">USUARIO</p>
          <li onClick={() => {
                handleLogOut();
              }}>
            {/* <IconButton
              
            > */}
              <LogoutOutlinedIcon className="icon" />
              <span className="sesion" >Cerrar Sesión</span>
            {/* </IconButton> */}
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => despachar({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => despachar({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
}
