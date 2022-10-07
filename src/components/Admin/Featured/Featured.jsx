import React from "react";
import "../Featured/featured.scss";
import BalanceIcon from '@mui/icons-material/Balance';
import { Title } from "@mui/icons-material";

export default function Featured () {

    let data = {
        name: "Notebook Lenovo",
        image: "https://tecnocompro.com/pub/media/catalog/product/cache/f2fda30fa08589bc3d50957538fec3cf/n/o/notebook_lenovo_ip_3_14alc6_r3_4g_256g_windows_10s_2_.png"
    }

    return(
        <div className="featured">
            <div className="top">
                <span className="title">PRODUCTO MÁS VENDIDO</span>
                <BalanceIcon className="icon"/>
            </div>
            <div className="bottom">
                <div>
                <span className="titleProduct">{data.name}</span>

                </div>
                <img src={data.image} alt="IMG not found" className="img" />
            </div>
        
        </div>
    )
};