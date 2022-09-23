import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { rolesAction } from "../../../redux/actionsABM/reducerRoles";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabm from "../../../shared/addABM/addabmrol";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { MdSecurity } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { GiSecurityGate } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

const RolesList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { rolesInfo, loading } = useSelector((store) => store.roles);
  console.log(rolesInfo);

  async function handleRemove(id, name) {
    try {
      await privateDeleteRequest("roles/delete", {
        id,
        name,
      });
      showAlert({ type: "success", title: "Rol eliminado correctamente" });
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
    Math.min(rowsPerPage, rolesInfo?.result?.length - page * rowsPerPage);

  useEffect(() => {
    dispatch(rolesAction(rolesInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Roles</h1>
        </header>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Seguridad"
          label3="Roles"
          icon1={<AiFillDashboard />}
          icon2={<GiSecurityGate />}
          icon3={<MdSecurity />}
          link2="/PallasFront/Seguridad"
          link1="/PallasFront"
        />
        <TableContainer component={Paper} className="container-abm">
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow className="list_titulos">
                <TableCell>Rol</TableCell>
              </TableRow>
              <div className="container-search-add-res">
              <Addabm to="/PallasFront/roles-form" />
              <button className="boton-search"><FaSearch/></button>
              <button className="boton-res"><GrUpdate/></button>
              </div>
            </TableHead>
            <TableBody>
              {!loading ? (
                <Spiner />
              ) : (
                rolesInfo?.result
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className="list_data"
                      >
                        <TableCell component="th" scope="row">
                          {element.name}
                        </TableCell>
                        <TableCell>
                          <div className="list_container-buttons">
                            <Link
                              className="list_options-edit"
                              to={{
                                pathname: "/PallasFront/roles-form",
                                state: element,
                              }}
                            >
                              <MdModeEdit />
                            </Link>
                            <button
                              className="list_options-delete"
                              onClick={() =>
                                handleRemove(element.id, element.name)
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
            count={rolesInfo?.result?.length}
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

export default RolesList;
