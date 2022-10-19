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
          <p className="logo">Techno Admin</p>
        </Link>
      </div>
      <div className="center">
        <ul >
          <p className="title">MAIN</p>
            <Link to={"/"}>
          <li className="sideBar__items">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
          </li>
            </Link>
          <p className="title">LISTAS</p>
            <Link to={"/users"}>
          <li className="sideBar__items">
              <PeopleAltRoundedIcon className="icon" />
              <span>Usuarios</span>
          </li>
            </Link>
            <Link to={"/products"}>
          <li className="sideBar__items">
              <Inventory2OutlinedIcon className="icon" />
              <span>Productos</span>
          </li>
            </Link>
            <Link to={"/createProduct"}>
          <li className="sideBar__items">
              <AddCardIcon className="icon" />
              <span>Nuevo Producto</span>
          </li>
            </Link>
            <Link to={"/createBrand-category"}>
          <li className="sideBar__items">
              <CategoryIcon className="icon" />
              <span>Crear Categorías</span>
          </li >
            </Link>
            <Link to={"/orders"}>
          <li className="sideBar__items">
              <InventoryOutlinedIcon className="icon" />
              <span>Ordenes</span>
          </li>
            </Link>
            <Link to={"/reviews"}>
          <li className="sideBar__items">
              <ReportGmailerrorredOutlinedIcon className="icon" />
              <span>Reseñas</span>
          </li>
            </Link>
          <p className="title">USUARIO</p>
          <li className="sideBar__items" onClick={() => {
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
