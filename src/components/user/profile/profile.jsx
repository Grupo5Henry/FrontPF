import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderDataTableUser from "../orders/ordersDataTable";
import NavProfile from "./navProfile";

import Shopping from "./shopping";

export default function Profile() {
  return (
    <div>
      <NavProfile />
      <Routes>
        {/* <Route
          exact
          path="/profile/shopping"
          element={<OrderDataTableUser />}
        /> */}
      </Routes>
      <OrderDataTableUser></OrderDataTableUser>
    </div>
  );
}
