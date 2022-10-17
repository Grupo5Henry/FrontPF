import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllOrders,
  getAllProducts,
  getAllReviews,
  getAllUsers,
  userState,
} from "../../../redux/action";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import "../AdminNavBar/adminNavBar.scss";
import { DarkModeContext } from "../context/darkModeContext";

export default function AdminNavBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllReviews());
  }, [dispatch]);

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
          {/* <div className="item">
            <EmailIcon className="icon" />
          </div> */}
          <div className="item" onClick={() => despachar({ type: "TOGGLE" })}>
            <ModeNightIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
