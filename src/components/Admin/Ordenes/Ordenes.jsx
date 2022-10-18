import React from "react";
import "../AdminHome/adminHome.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import OrdersDatatable from "../OrdersDataTable/OrdersDatatable2";

export default function Ordenes() {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <AdminNavBar />
        <div>
          <OrdersDatatable />
        </div>
      </div>
    </div>
  );
}
