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
import { getAllReviews } from "../../../redux/action";
import { authHeader } from "../../../services/auth-header";
import "../ReviewsDatatable/reviewsDatatable.scss";

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

export default function ReviewDatatable(props) {
  const allReviews = useSelector((state) => state.allReviews);
  const dispatch = useDispatch();

  const columns = [
    {
      label: "Usuario",
      name: "userName",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      label: "Descripcion",
      name: "description",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      label: "Puntaje",
      name: "stars",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <div className="corpse">{value}</div>;
        },
      },
    },
    {
      name: "productId",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="buttonsContainer">
              <button className="aprobarButton"
                onClick={async () => {
                  try {
                    await axios.put(`${BACK_URL}/review/unflagReview`, {
                      userName: tableMeta.rowData[0],
                      productId: tableMeta.rowData[3],
                    });
                    dispatch(getAllReviews());
                  } catch (err) {
                    console.log({ error: err.message });
                  }
                }}
              >
                Aprobar
              </button>
              <button className="esconderButton"
                onClick={async () => {
                  try {
                    await axios.put(`${BACK_URL}/review/hideReview`, {
                      userName: tableMeta.rowData[0],
                      productId: tableMeta.rowData[3],
                    });
                    dispatch(getAllReviews());
                  } catch (err) {
                    console.log({ error: err.message });
                  }
                }}
              >
                Esconder
              </button>
              <button className="bannearButton"
                onClick={async () => {
                  try {
                    await axios.put(`${BACK_URL}/review/hideAllFromUser`, {
                      userName: tableMeta.rowData[0],
                    });
                    await axios.put(
                      `${BACK_URL}/user/modify`,
                      {
                        userName: tableMeta.rowData[0],
                        banned: true,
                      },
                      { headers: authHeader() }
                    );
                    dispatch(getAllReviews());
                  } catch (err) {
                    console.log({ error: err.message });
                  }
                }}
              >
                Bannear usuario
              </button>
            </div>
          );
        },
      },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const flagged = allReviews.filter(
      (review) => review.flagged === true && review.hidden !== true
    );
    setData(flagged);
  }, [dispatch, allReviews]);

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
    expandableRows: false,
    page: 0,
  };

  return (
    <div className="reviewsDatatable">
    <MUIDataTable
      title={"Ordenes"}
      className="datagrid"
      data={data.length ? data : []}
      columns={columns}
      options={options}
    />
    </div>
  );
}
