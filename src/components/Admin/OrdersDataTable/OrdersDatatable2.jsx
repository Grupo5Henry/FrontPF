import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";

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
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <button onClick={() => console.log(value, tableMeta)}>
                Edit
              </button>
              <button onClick={() => console.log(value, tableMeta)}>
                Edit
              </button>
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
        infoExtra.push(...orden);
        infoFila.push(
          infoExtra
            .map((order) => order.price * order.amount)
            .reduce((a, b) => a + b)
        );
        let orderNumber = infoFila[0];
        switch (infoFila[1]) {
          case "PaymentPending":
            infoFila[1] = "Esperando pago";
            break;
          case "PaidPendingDelivery":
            infoFila[1] = "Siendo procesadas";
            break;
          case "Cancelled":
            infoFila[1] = "Canceladas";
            break;
          case "InDelivery":
            infoFila[1] = "En ruta";
            break;
          case "Delivered":
            infoFila[1] = "Entregadas";
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
      console.log(changedColumn, filterList);
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
    <MUIDataTable
      title={"Ordenes"}
      data={data.length ? data : []}
      columns={columns}
      options={options}
    />
  );
}
