import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { tipoDeArticulosAction } from "../../../redux/actionsABM/reducerArticulos";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Addabm from "../../../shared/addABM/addabm";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
//import Paper from "@material-ui/core/Paper";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { MdAddTask } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { FaTasks, FaSearch } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';
import "../Abm.css";
//import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    console.log(stabilizedThis);
    return stabilizedThis.map((el) => el[0]);
  } else {
    return []
  }
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'id',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Articulo',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="list_titulos">
        <TableCell>Articulos</TableCell>
      </TableRow>
      <div className="container-search-add-res">
        <Addabm to="/PallasFront/tipo-de-articulos-form" />
        <button className="boton-search"><FaSearch /></button>
        <button className="boton-res"><GrUpdate /></button>
      </div>
      <TableRow className="list_titulos">
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className="columnas-list"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className="columnas-acciones">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos     
  );
  console.log(tipoDeArticulosInfo);

  const dispatch = useDispatch();

  const [deletedNew, setDeletedNew] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
    console.log(order, orderBy);
  };


  async function handleRemove(id, nombre) {
    try {
      await privateDeleteRequest("tiposarticulo/delete", {
        id,
        nombre,
      });
      showAlert({ type: "success", title: "Eliminado correctamente" });
      setDeletedNew(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    if (deletedNew) {
      setDeletedNew(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedNew, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Tipos de articulos</h1>
        </header>
        <ButtonsNavigation
          label1="Dashboard"
          label2="Configuración"
          label3="Tipo de artículos"
          icon1={<AiFillDashboard />}
          icon2={<FaTasks />}
          icon3={<MdAddTask />}
          link2="/PallasFront/Configuracion"
          link1="/PallasFront"
        />
        <TableContainer className="container-abm" >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tipoDeArticulosInfo?.result?.length}
            />
            <TableBody>
              {stableSort(tipoDeArticulosInfo.result, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {element.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {element.nombre}
                      </TableCell>
                      <TableCell>
                        <div className="list_container-buttons">
                          <Link
                            className="list_options-edit"
                            to={{
                              pathname: "/PallasFront/tipo-de-articulos-form",
                              state: element,
                            }}
                          >
                            <MdModeEdit />
                          </Link>
                          <button
                            className="list_options-delete"
                            onClick={() =>
                              handleRemove(element.id, element.nombre)
                            }
                          >
                            <IoMdTrash />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                }
                )}
            </TableBody>
          </Table>
          <TablePagination
            className="pagination"
            labelRowsPerPage={"Filas por páginas"}
            rowsPerPageOptions={[5, 10, 20, { label: 'Todas', value: -1 }]}
            colSpan={3}
            count={tipoDeArticulosInfo?.result?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'Filas por pagina'
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableContainer>
      </Header>
    </div>
  );
}