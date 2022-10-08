import React, {useEffect} from 'react';
import "../Datatable/datatable.scss";
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/action";

import swal from "sweetalert";




/* const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
]; */

//CONSTANTE PARA SETEAR LAS COLUMNAS

/* const columns = [

  { field: 'userName', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Correo', width: 300 },
  { field: 'billingAddress', headerName: 'Dirección de facturación', width: 300 },
  { field: 'defaultShippingAddress', headerName: 'Dirección', width: 300 },
  { field: 'role', headerName: 'Rol', width: 130, 
      renderCell: (params) => {
        return <div className={`cellWithStatus ${params.row.role}`} onClick={handleAdminButton}> {params.row.role} </div>
      } },
      

]; */



export default function Datatable () {

  //ESTA FUNCION SE RENDERIZA DENTRO DEL COMPONENTE LIST PARA MOSTRAR LOS USUARIOS

    //ESTADOS
    const users = useSelector((state) => state.users);

    console.log(users)

    //CONSTANTES
    const dispatch = useDispatch();


    //CONSTANTE PARA SETEAR LAS COLUMNAS

    const columns = [

      { field: 'userName', headerName: 'Name', width: 150 },
      { field: 'banned', headerName: 'Status', width: 130, 
      renderCell: (params) => {
        return <div className={`cellWithBan ${params.row.banned}`} > {params.row.banned ? "Baneado" : "Activo"} </div>
      } },
      { field: 'email', headerName: 'Correo', width: 300 },
      { field: 'billingAddress', headerName: 'Dirección de facturación', width: 300 },
      { field: 'defaultShippingAddress', headerName: 'Dirección', width: 300 },
      { field: 'role', headerName: 'Rol', width: 130, 
          renderCell: (params) => {
            return <div className={`cellWithStatus ${params.row.role}`} > {params.row.role} </div>
          } },
          
    
    ];

    const dataTableButton = [{ field: 'action', headerName: 'Acciones', width: 180, 
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <button className="adminButton" onClick={(e) => handleAdminButton(e, params)}>Privilegios</button>
            <div className="banButton" onClick={(e)=>handleBanButton(e, params)}>Baneo</div>
 
            </div> 
        )} 
      },
    ]

    //USE EFFECTS

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    //CONTROL DE BOTONES
    //ADMIN
    const handleAdminButton = (e, params) => {
      e.preventDefault();
      if(params.row.role === "admin") {
        swal({
          title: "¿Desea quitar el rol de Admin?",
          icon: "warning",
          buttons: ["Cancel", "I am sure"]
      }).then((resp)=>{
        if(resp) {
          //CASO QUITAR ADMIN
          console.log("SE QUITÓ PRIVILEGIOS DE ADMIN", params.row.banned, params.row.role)
        }
      })}
      else if(params.row.role === "user" && params.row.banned === true) {
        swal({
          title: "Imposible dar privilegios a un usuario baneado",
          icon: "error",
          button: "Ok"
      })}
      else if (params.row.role === "user" && params.row.banned === false) {
        swal({
          title: "¿Desea otorgar privilegios de Admin?",
          icon: "warning",
          buttons: ["Cancel", "I am sure"]
      }).then((resp)=>{
        if(resp) {
            //CASO DAR ADMIN
            console.log("SE DIO PRIVILEGIOS DE ADMIN", params.row.banned, params.row.role)
        }
      })
      }
    };

    //BAN

    const handleBanButton = (e, params) => {
      e.preventDefault();
      if(params.row.role === "admin") {
        swal({
          title: "Imposible banear a un admin",
          icon: "error",
          button: "Ok"
      })}
      else if(params.row.role === "user" && params.row.banned === true) {
        swal({
          title: "¿Desea quitar ban a usuario?",
          icon: "warning",
          buttons: ["Cancel", "I am sure"]
      }).then((resp)=>{
        if(resp) {
            //CASO QUITAR BAN
            console.log("SE QUITÓ EL BAN", params.row.banned, params.row.role)
        }
      })}
      else if (params.row.role === "user" && params.row.banned === false) {
        swal({
          title: "¿Desea banear al usuario?",
          icon: "warning",
          buttons: ["Cancel", "I am sure"]
      }).then((resp)=>{
        if(resp) {
            //CASO DAR BAN
            console.log("SE DIO PRIVILEGIOS DE ADMIN", params.row.banned, params.row.role)
        }
      })
      }

    };


    return(
        <div className='datatable'>
            {users ? 
                <DataGrid
                rows={users}
                columns={columns.concat(dataTableButton)}
                pageSize={10}
                rowsPerPageOptions={[5]}
                /* checkboxSelection */
                getRowId={(row) => row.userName}
                />
            :
            <p>Cargando...</p>}
        </div>
    )
};