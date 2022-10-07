import React, { useEffect } from "react";
import "../AdminNavBar/adminNavBar.scss";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EmailIcon from '@mui/icons-material/Email';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeIcon from '@mui/icons-material/Home';

import { userState } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import axios from 'axios';

export default function AdminNavBar () {

/*     const dispatch = useDispatch();
    const userStatus = useSelector((state)=> state.loggedIn)

    const handleLogOut = () => {
        AuthService.logout();
        dispatch(userState(false)); 
      };

      useEffect( () => {
        const tokenCheck =async ()=>{
        const tokenStatus  =  await axios.get ('https://backpf-production.up.railway.app/token/tokenCheck', { headers: authHeader() });
        dispatch(userState(tokenStatus.data))
        }
        tokenCheck();
    }, [userStatus,dispatch]); */

    return(
        <div className="adminNavBar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Buscar..."/>
                    <SearchSharpIcon className="icon"/>
                </div>
                <div className="items">
                    <div className="item">
                        <HomeIcon className="icon"/>
                    </div>
                    <div className="item">
                        <EmailIcon className="icon"/>
                    </div>
                    <div className="item">
                        <LogoutOutlinedIcon className="icon" /* onClick={()=>handleLogOut()} *//>
                    </div>
                </div>
            </div>
        </div>
    )
};