import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import tokenCheck from "../../services/token-check";
import { updateUserState } from "../../redux/action";

const PageRefresh = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    user && tokenCheck(dispatch);
    if (!user) {
      dispatch(
        updateUserState({
          role: "desconocido",
          defaultShippingAddress: "desconocido",
          userName: false,
          logged: false,
        })
      );
    }
  }, [dispatch]);

  return <div></div>;
};

export default PageRefresh;
