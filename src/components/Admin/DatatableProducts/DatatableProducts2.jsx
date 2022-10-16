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
    },
    {
      label: "Modelo",
      name: "model",
    },
    {
      label: "Stock",
      name: "stock",
    },
    {
      label: "Precio (USD)",
      name: "price",
    },
    {
      name: "id",
      label: "Modificar Producto",
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


  return (
    <div className="datatableProducts">
      {productos.length ?
    <MUIDataTable
      title={"LISTA DE PRODUCTOS"}
      className="datagrid"
      data={productos.length ? productos : []}
      columns={columns}
    />
    :
    <div>Cargando...</div> }
    </div>
  );
}
