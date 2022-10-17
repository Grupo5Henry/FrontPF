import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import "../DatatableProducts/datatableProducts.scss";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function DatatableProducts2() {

  const productos = useSelector((state) => state.adminProducts);

  //SETEO DE COLUMNAS

  const columns = [
    {
      label: "Imagen",
      name: "thumbnail",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <img className="cellImg" src={value} alt="Img not found" />;
        },
      },
    },
    {
      label: "Nombre",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      label: "Modelo",
      name: "model",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      label: "Stock",
      name: "stock",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      label: "Precio (USD)",
      name: "price",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      name: "id",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <div className="cellAction">
                <Link to={`/modifyProduct/${value}`}>
                  <button className="modifyButton">Modificar</button>
                </Link>
              </div>
          );
        },
      },
    },
  ]

  const options = {     
    filter: true,          
      selectableRows: "none",     
      filterType: "dropdown",     
      responsive: "standard",     
      rowsPerPage: 10,     
      expandableRowsHeader: false,     
      expandableRows: false,     
      page: 0,   };

  return (
    <div className="datatableProducts">
      {productos.length ?
    <MUIDataTable
      title={"LISTA DE PRODUCTOS"}
      className="datagrid"
      data={productos.length ? productos : []}
      columns={columns}
      options={options}
    />
    :
    <div>Cargando...</div> }
    </div>
  );
}
