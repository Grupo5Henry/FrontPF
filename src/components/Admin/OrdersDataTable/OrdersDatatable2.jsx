import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACK_URL } from "../../../constantes";
import swal from "sweetalert";
import { getAllOrders } from "../../../redux/action";
import "../OrdersDataTable/ordersdatatable.scss";

// const Card = () => (
//   <tr>
//     <td className="fullWidth">
//       <h1>
//         lorem ipsum dorel em quol acee, vion, bloolw, wafeo, feiwjfoiew,
//         foiwejifowefjweoi, fewjoewjfowei, fwefwefewfewfewf
//       </h1>
//     </td>
//   </tr>
// );

export default function OrderDataTable2(props) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const expireSession = async (id) => {
    try {
      await axios.post(`${BACK_URL}/stripe/expire`, {
        id: id,
      });
    } catch (err) {
      console.log({ error: err });
    }
  };

  const columns = [
    {
      name: "Numero",
    },
    {
      name: "Estado",
    },
    {
      name: "Nombre",
    },
    {
      name: "Direccion",
    },
    {
      name: "Fecha",
    },
    {
      name: "Total",
    },
    {
      name: "Actions",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {tableMeta.rowData[1] === "Siendo procesada" ? (
                <button
                  className="ordenButton"
                  onClick={async () => {
                    if (tableMeta.rowData[1] === "Siendo procesada") {
                      try {
                        await axios.put(`${BACK_URL}/order/change`, {
                          orderNumber: tableMeta.rowData[0],
                          newStatus: "InDelivery",
                        });
                        dispatch(getAllOrders());
                      } catch (err) {
                        console.log({ error: err });
                      }
                    } else {
                      swal({
                        title:
                          "No se puede despachar sin tener confirmacion de pago",
                        icon: "error",
                        buttons: false,
                      });
                    }
                  }}
                >
                  Despachar
                </button>
              ) : null}
              {tableMeta.rowData[1] === "En ruta" ? (
                <button
                  className="ordenButton"
                  onClick={async () => {
                    if (tableMeta.rowData[1] === "En ruta") {
                      try {
                        await axios.put(`${BACK_URL}/order/change`, {
                          orderNumber: tableMeta.rowData[0],
                          newStatus: "Delivered",
                        });
                        dispatch(getAllOrders());
                      } catch (err) {
                        console.log({ error: err });
                      }
                    } else {
                      swal({
                        title:
                          "No se puedo marcar como entregado sin haberse despacho",
                        icon: "error",
                        buttons: false,
                      });
                    }
                  }}
                >
                  Entregada
                </button>
              ) : null}
              {tableMeta.rowData[1] === "Esperando pago" ? (
                <button
                  className="ordenButtonCancelar"
                  onClick={async () => {
                    if (tableMeta.rowData[1] === "Esperando pago") {
                      swal({
                        title: "Esta seguro que desea cancelar la compra?",
                        icon: "warning",
                        buttons: ["Cancel", "I am sure"],
                      }).then((response) => {
                        if (response) {
                          expireSession(tableMeta.rowData[6]);
                          dispatch(getAllOrders());
                        }
                      });
                    } else {
                      swal({
                        title: "No se puedo cancelar una orden ya pagada",
                        icon: "error",
                        buttons: false,
                      });
                    }
                  }}
                >
                  Cancelar
                </button>
              ) : null}
            </>
          );
        },
      },
    },
  ];

  const [rows, setRows] = useState({});
  const [data, setData] = useState([]);

  const splitOrders = (orders) => {
    let fila = [];
    let extra = [];
    if (orders.length) {
      orders.map((order) => {
        let infoFila = [];
        let infoExtra = [];
        let orden = [...order];
        infoFila.push(...orden.splice(0, 6));
        let sessionId = infoFila.pop();
        infoExtra.push(...orden);
        infoFila.push(
          infoExtra
            .map((order) => order.price * order.amount)
            .reduce((a, b) => a + b)
        );
        infoFila.push(sessionId);
        let orderNumber = infoFila[0];
        switch (infoFila[1]) {
          case "PaymentPending":
            infoFila[1] = "Esperando pago";
            break;
          case "PaidPendingDelivery":
            infoFila[1] = "Siendo procesada";
            break;
          case "Cancelled":
            infoFila[1] = "Cancelada";
            break;
          case "InDelivery":
            infoFila[1] = "En ruta";
            break;
          case "Delivered":
            infoFila[1] = "Entregada";
            break;
          default:
            infoFila[1] = "Cargando...";
            break;
        }
        fila.push(infoFila);
        extra[orderNumber] = infoExtra;
      });
      setRows(extra);
      setData(fila);
    }
  };

  useEffect(() => {
    splitOrders(orders);
  }, [orders]);

  //   useEffect(() => {
  //     return setData([]);
  //   }, []);

  const options = {
    filter: true,
    // onFilterChange: (changedColumn, filterList) => {
    //   console.log(changedColumn, filterList);
    // },
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 10,
    expandableRowsHeader: false,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      //   console.log(rowData, rowMeta);
      //   console.log(data);
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "200" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="left">Nombre</TableCell>
                      <TableCell align="left">Precio</TableCell>
                      <TableCell align="left">Cantidad</TableCell>
                      <TableCell align="left">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows[rowData[0]].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row" size="small">
                          <img src={row.thumbnail}></img>
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.amount}</TableCell>
                        <TableCell align="left">
                          {row.amount * row.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: 0,
  };

  return (
    <div className="datatable">
      <MUIDataTable
        title={"LISTA DE ORDENES"}
        className="datagrid"
        data={data.length ? data : []}
        columns={columns}
        options={options}
      />
    </div>
  );
}
