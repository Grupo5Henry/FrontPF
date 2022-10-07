import React from "react";
import "../SideBar/sideBar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AddCardIcon from '@mui/icons-material/AddCard';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import { Link } from "react-router-dom";

export default function SideBar () {
    return(
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
                            <DashboardIcon className="icon"/>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <p className="title">LISTAS</p>
                    <li>
                        <Link to={"/users"}>
                            <PeopleAltRoundedIcon className="icon"/>
                                <span>Usuarios</span>
                        </Link>
                    </li>
                    <li>
                    <Inventory2OutlinedIcon className="icon"/>
                        <span>Productos</span>
                    </li>
                    <li>
                        <Link to={"/createProduct"}>
                            <AddCardIcon className="icon"/>
                            <span>Nuevo Producto</span>
                        </Link>
                    </li>
                    <li>
                    <CategoryIcon className="icon"/>
                        <span>Crear Categorías</span>
                    </li>
                    <li>
                    <BrandingWatermarkOutlinedIcon className="icon"/>
                        <span>Crear Marcas</span>
                    </li>
                    <li>
                        <Link to={"/orders"}>
                            <InventoryOutlinedIcon className="icon"/>
                                <span>Ordenes</span>
                        </Link>
                    </li>
                    <p className="title">USUARIO</p>
                    <li>
                    <AccountBoxOutlinedIcon className="icon"/>
                        <span>Perfil</span>
                    </li>
                    <li>
                    <LogoutOutlinedIcon className="icon"/>
                        <span>Cerrar Sesión</span>
                    </li>
                </ul>
            </div>
            <div className="bottom"> 
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
};