import React, {useEffect} from 'react';
import "../DatatableProducts/datatableProducts.scss";
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../../redux/action';
import {Link} from "react-router-dom";


export default function DatatableProducts () {

    const productos = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    console.log(productos)

    useEffect (() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        {
            field: 'thumbnail',
            headerName: 'Imagen',
            width: 150,
            renderCell: (params) => {
              return (
              <div className="cellWithImg">
                  <img className='cellImg' src={params.row.thumbnail} alt="logo" />
              </div>)
            } },
        { field: 'name', headerName: 'Nombre', width: 400 },
        { field: 'model', headerName: 'Modelo', width: 180 },
        { field: 'stock', headerName: 'Stock', width: 130 },
        { field: 'price', headerName: 'Precio', width: 130 },
        { field: 'condition', headerName: 'Condición', width: 130 },
      ];

      const dataTableButton = [{ field: 'action', headerName: 'Acción', width: 180, 
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <Link to={"/modifyProduct"}>
                    <button className="modifyButton" >Modificar</button> 
              </Link>
            </div> 
        )} 
      },
    ]
      

    return(
        <div className="datatableProducts">
                {productos.length?
            <DataGrid
                rows={productos}
                columns={columns.concat(dataTableButton)}
                pageSize={12}
                rowsPerPageOptions={[5]}
                /* checkboxSelection */
            />
            :
            <p>Cargando...</p> }
        </div>
    )
};