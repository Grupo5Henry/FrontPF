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
import { getUserOrders } from "../../../redux/action";

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

export default function OrderDataTableUser(props) {
  const orders = useSelector((state) => state.orders);
  const userState = useSelector((state) => state.user);
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
              {tableMeta.rowData[5] != 1 ? (
                <div class="flex items-center justify-center">
                  <div>
                    <button
                      class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                      onClick={async () => {
                        console.log(tableMeta.rowData[5]);
                        try {
                          const url = await axios.post(
                            `${BACK_URL}/stripe/retrieve`,
                            {
                              id: tableMeta.rowData[5],
                            }
                          );
                          window.location = url.data;
                        } catch (err) {
                          console.log({ error: err });
                        }
                      }}
                    >
                      <span class="mr-2">Pagar</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentcolor"
                          d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="ml-1">
                    <button
                      class="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                      onClick={async () => {
                        swal({
                          title: "Esta seguro que desea cancelar la compra?",
                          icon: "warning",
                          buttons: ["Cancel", "I am sure"],
                        }).then(async (response) => {
                          if (response) {
                            await expireSession(tableMeta.rowData[5]);
                            dispatch(getUserOrders(userState.userName));
                          }
                        });
                      }}
                    >
                      <span class="mr-2">Cancelar</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentcolor"
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
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
        infoFila.push(...orden.splice(0, 5));
        let url = infoFila.pop();
        infoExtra.push(...orden);
        infoFila.push(
          infoExtra
            .map((order) => order.price * order.amount)
            .reduce((a, b) => a + b)
        );
        infoFila.push(url);
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
    onFilterChange: (changedColumn, filterList) => {
      //   console.log(changedColumn, filterList);
    },
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
                <Table
                  sx={{ minWidth: 1000 }}
                  mx="1rem"
                  style={{ minWidth: "200" }}
                  aria-label="simple table"
                >
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
                          <img src={row.thumbnail} alt="" />
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
    <MUIDataTable
      title={"Ordenes"}
      data={data.length ? data : []}
      columns={columns}
      options={options}
    />
  );
}
