import React, { useEffect, useContext } from "react";
import "../AdminNavBar/adminNavBar.scss";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import EmailIcon from "@mui/icons-material/Email";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { userState } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import axios from "axios";
import { DarkModeContext } from "../context/darkModeContext";

export default function AdminNavBar() {

  const { despachar } = useContext(DarkModeContext);

  return (
    <div className="adminNavBar">
      <div className="wrapper">
{/*         <div className="search">
          <input type="text" placeholder="Buscar..." />
          <SearchSharpIcon className="icon" />
        </div> */}
        <div className="items">
          <div className="item">
            <Link to={"/"}>
              <HomeIcon className="icon" />
            </Link>
          </div>
          <div className="item">
            <EmailIcon className="icon" />
          </div>
          <div className="item" onClick={() => despachar({type:"TOGGLE"})}>
            <ModeNightIcon
              className="icon" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
