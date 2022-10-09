import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BACK_URL, FRONT_URL } from "../../../constantes";
import { detailProduct, getFavorites } from "../../../redux/action";
import Comment from "../comment/comment";


function RecommendedDetail() {
    const detail = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    const { id } = useParams();
    const userState = useSelector((state) => state.user);
  return (
    <div>
        

    </div>
  )
}

export default RecommendedDetail