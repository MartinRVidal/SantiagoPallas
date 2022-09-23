import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { maquinasAction } from "../../../redux/actionsABM/reducerMaquinas";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabmmaq from "../../../shared/addABM/addabmmaq";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { MdAddTask } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { FaTasks, FaSearch } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

const MaquinasList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { maquinasInfo, loading } = useSelector((store) => store.maquinas);
  console.log(maquinasInfo);

  async function handleRemove(id, nombre, uso, desperdicio) {
    try {
      await privateDeleteRequest("maquinas/delete", {
        id,
        nombre,
        uso,
        desperdicio,
      });
      showAlert({ type: "success", title: "Eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  //Pages
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, maquinasInfo?.result?.length - page * rowsPerPage);

  useEffect(() => {
    dispatch(maquinasAction(maquinasInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Máquinas</h1>
        </header>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Configuración"
          label3="Máquinas"
          icon1={<AiFillDashboard />}
          icon2={<FaTasks />}
          icon3={<MdAddTask />}
          link2="/PallasFront/Configuracion"
          link1="/PallasFront"
        />
        <TableContainer component={Paper} className="container-abm">
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow className="list_titulos">
                <TableCell>Nombre</TableCell>
                <TableCell>Uso</TableCell>
                <TableCell>Desperdicio</TableCell>
              </TableRow>
              <div className="container-search-add-res">
              <Addabmmaq to="/PallasFront/maquinas-form" />
              <button className="boton-search"><FaSearch/></button>
              <button className="boton-res"><GrUpdate/></button>
              </div>
            </TableHead>
            <TableBody>
              {!loading ? (
                <Spiner />
              ) : (
                maquinasInfo?.result
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {element.nombre}
                        </TableCell>
                        <TableCell>{element.uso}</TableCell>
                        <TableCell>{element.desperdicio}</TableCell>
                        <TableCell>
                          <div className="list_container-buttons">
                            <Link
                              className="list_options-edit"
                              to={{
                                pathname: "/PallasFront/maquinas-form",
                                state: element,
                              }}
                            >
                              <MdModeEdit />
                            </Link>
                            <button
                              className="list_options-delete"
                              onClick={() =>
                                handleRemove(
                                  element.id,
                                  element.nombre,
                                  element.uso,
                                  element.desperdicio
                                )
                              }
                            >
                              <IoMdTrash />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage={"Filas por páginas"}
            className="list_pagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={maquinasInfo?.result?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Header>
    </div>
  );
};

export default MaquinasList;
