import React from "react";
import "../SideBar/sideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCardIcon from "@mui/icons-material/AddCard";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import authService from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../../redux/action";
import { BACK_URL } from "../../../constantes";

export default function SideBar() {
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
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to={"/"}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTAS</p>
          <li>
            <Link to={"/users"}>
              <PeopleAltRoundedIcon className="icon" />
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to={"/products"}>
              <Inventory2OutlinedIcon className="icon" />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to={"/createProduct"}>
              <AddCardIcon className="icon" />
              <span>Nuevo Producto</span>
            </Link>
          </li>
          <li>
            <Link to={"/createBrand-category"}>
              <CategoryIcon className="icon" />
              <span>Categorías/Marcas</span>
            </Link>
          </li>
{/*           <li>
            <Link to={"/createBrand"}>
              <BrandingWatermarkOutlinedIcon className="icon" />
              <span>Crear Marcas</span>
            </Link>
          </li> */}
          <li>
            <Link to={"/orders"}>
              <InventoryOutlinedIcon className="icon" />
              <span>Ordenes</span>
            </Link>
          </li>
          <p className="title">USUARIO</p>
          <li>
            <AccountBoxOutlinedIcon className="icon" />
            <span>Perfil</span>
          </li>
          <li>
            <IconButton
              onClick={() => {
                handleLogOut();
              }}
            >
              <LogoutOutlinedIcon className="icon" />
              <span>Cerrar Sesión</span>
            </IconButton>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
}
