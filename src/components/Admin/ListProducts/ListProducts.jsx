import React from "react";
import "../ListProducts/listProducts.scss";
import SideBar from "../SideBar/SideBar.jsx"
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import DatatableProducts from "../DatatableProducts/DatatableProducts.jsx";
import DatatableProducts2 from "../DatatableProducts/DatatableProducts2.jsx";

export default function ListProducts () {
    return(
        <div className="listProducts">
            <SideBar/>
            <div className="listContainer">
                <AdminNavBar />
                <div>
                {/* <DatatableProducts/> */}
                    <DatatableProducts2/>
                </div>
            </div>
        </div>
    )
};