import React from "react";
import "../List/list.scss";
import SideBar from "../SideBar/SideBar.jsx"
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Datatable from "../Datatable/Datatable";
import DatatableUsers from "../Datatable/DatatableUsers.jsx";

export default function List () {
    return(
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <AdminNavBar />
                <div>
                {/* <Datatable/> */}
                <DatatableUsers/>


                </div>
            </div>
        </div>
    )
};