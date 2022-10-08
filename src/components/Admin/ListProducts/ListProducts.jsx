import React from "react";
import "../ListProducts/listProducts.scss";
import SideBar from "../SideBar/SideBar.jsx"
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import DatatableProducts from "../DatatableProducts/DatatableProducts.jsx";

export default function ListProducts () {
    return(
        <div className="listProducts">
            <SideBar/>
            <div className="listContainer">
                <AdminNavBar />
                <div>
                <DatatableProducts/>

                </div>
            </div>
        </div>
    )
};