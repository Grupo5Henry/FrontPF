import React from "react";
import "../NewProduct/newProduct.scss";
import SideBar from "../SideBar/SideBar.jsx"
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import CreateProduct from "../../user/CreateProduct/CreateProduct.jsx";

export default function NewProduct () {
    return(
        <div className="newProduct">
        <SideBar/>
        <div className="newProductContainer">
            <AdminNavBar/>
            <CreateProduct/>
        </div>
    </div>
        )
};