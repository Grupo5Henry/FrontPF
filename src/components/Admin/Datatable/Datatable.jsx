import React, {useEffect} from 'react';
import "../Datatable/datatable.scss";
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/action";

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

const columns = [
  { field: 'password', headerName: 'ID', width: 300 },
  { field: 'userName', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Correo', width: 300 },
  { field: 'billingAddress', headerName: 'Billing Address', width: 300 },
  { field: 'defaultShippingAddress', headerName: 'Default Shipping Address', width: 300 },
  { field: 'role', headerName: 'Rol', width: 130, 
      renderCell: (params) => {
        return <div className={`cellWithStatus ${params.row.role}`}> {params.row.role} </div>
      } },
];



export default function Datatable () {

  //ESTA FUNCION SE RENDERIZA DENTRO DEL COMPONENTE LIST PARA MOSTRAR LOS USUARIOS

    //ESTADOS
    const users = useSelector((state) => state.users);

    console.log(users)

    //CONSTANTES
    const dispatch = useDispatch();

    //USE EFFECTS

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return(
        <div className='datatable'>
            {users.length ? 
                <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={(row) => row.password}
                />
            :
            <p>Cargando...</p>}
        </div>
    )
};