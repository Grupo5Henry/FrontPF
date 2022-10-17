import React from "react";
import "../AdminHome/adminHome.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Widget from "../Widget/Widget.jsx";
import Featured from "../Featured/Featured.jsx";
import Chart from "../Chart/Chart.jsx";


export default function AdminHome () {


    return(
        <div className="homeAdmin">
            <SideBar/>
            <div className="homeContainer">
                <AdminNavBar/>
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order"/>
                    <Widget type="earning"/>
                    <Widget type="comment"/>
                </div>
                <div className="charts" style={{display:"flex",flexDirection:"column"}}>
                    <Featured/>
                    <Chart/>
                </div>
            </div>
        </div>
    )
};