import React from "react";
import "../AdminHome/adminHome.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";



export default function Ordenes () {


    return(
        <div className="homeAdmin">
            <SideBar/>
            <div className="homeContainer">
                <AdminNavBar/>
            <div>Ordenes</div>
                </div>
            </div>
    )
};