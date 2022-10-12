import React from "react";
import "../AdminProductDetail/adminProductDetail.scss";
import SideBar from "../SideBar/SideBar.jsx"
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import Details from "../../user/details/details.jsx"

export default function AdminProductDetail () {



    return(
        <div className="adminProductDetail">
            <SideBar/>
            <div className="adminProductDetailContainer">
                <AdminNavBar />
                <div>
                <Details/>

                </div>
            </div>
        </div>
    )
};