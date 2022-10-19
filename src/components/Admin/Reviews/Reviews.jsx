import React from "react";
import "./reviews.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import ReviewDatatable from "../ReviewsDatatable/ReviewsDatatable";

export default function Reviews() {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <AdminNavBar />
        <div>
          <ReviewDatatable />
        </div>
      </div>
    </div>
  );
}
