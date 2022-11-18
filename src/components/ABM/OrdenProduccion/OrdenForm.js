/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState, useRef } from "react";
import Header from "../../LayoutPublic/Header/Header";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { FaBoxes } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import "../orden.css";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Locale from "date-fns/locale/es";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from "react-redux";
import { clientesAction } from "../../../redux/actionsABM/reducerClientes";
import { usuariosAction } from "../../../redux/actionsABM/reducerArticulos";
import Box from '@mui/material/Box';
import { privatePostRequest } from "../../../services/privateApiServices";
import showAlert from "../../../shared/showAlert";
import { useHistory } from "react-router-dom";
import { Autocomplete, TableRow } from '@mui/material';
import { articulosAction } from "../../../redux/actionsABM/reducerArticulos";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import { nanoid } from "nanoid";
import { Button } from 'reactstrap';
import { useReactToPrint } from "react-to-print";


// cambio de formato en fechas
const localeFormatMap = "MMMM d, yyyy"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function Ordendeproduccion(patchData) {

    // Print de documento

    //<button onClick={handlePrint}
    //className="boton-guardar">
    //    Imprimir
    //</button>


    //    const componentRef = useRef();
     //   const handlePrint = useReactToPrint({
    //        content: () => componentRef.current,
     //       documentTitle: "orden-prod",
    //       onAfterPrint: () => alert("Print correcto")
     //   })


    // VALORES PARA INPUT "X"
    const currencies = [
        {
            value: 'D',
            label: 'D',
        },
        {
            value: 'T',
            label: 'T',
        },
        {
            value: 'P',
            label: 'P',
        },
    ];

    //funciones para llenar formulario de detalle 
    const [listado, setListado] = useState([]);
    const [addFormData, setAddFormData] = useState({
        id: '',
        cantidad: '',
        articulo: '',
        largo: '',
        ancho: '',
        numeropedido: '',
        x: ''
    });

    const handleAddFormChange = (event) => {

        const fielName = event.target.getAttribute('name');
        const fielValue = event.target.value;


        const newFormData = { ...addFormData };
        newFormData[fielName] = fielValue;

        setAddFormData(newFormData);
        console.log(setAddFormData);
    };


    const handleAddFormChangeAuto = (event, newValue) => {
        const fielValue = newValue;

        const newFormData = { ...addFormData };
        newFormData["articulo"] = fielValue;

        setAddFormData(newFormData);
        console.log(setAddFormData);
    };

    const handleAddFormChangeSelect = (event, newValue) => {

        const fielValue = event.target.value;


        const newFormData = { ...addFormData };
        newFormData["x"] = fielValue;

        setAddFormData(newFormData);
        console.log(setAddFormData);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const newList = {
            id: nanoid(),
            cantidad: addFormData.cantidad,
            articulo: addFormData.articulo,
            largo: addFormData.largo,
            ancho: addFormData.ancho,
            numeropedido: addFormData.numeropedido,
            x: addFormData.x
        }

        const newContacts = [...listado, newList];
        setListado(newContacts);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...listado];
        const index = listado.findIndex((element) => element.id === contactId);

        newContacts.splice(index, 1);

        setListado(newContacts);
    }

    //funcion para llamar desde api
    const { clientesInfo } = useSelector((store) => store.articulos);
    const { usuariosInfo } = useSelector((store) => store.users);
    const { articulosInfo } = useSelector((store) => store.articulos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clientesAction(clientesInfo));
        dispatch(usuariosAction(usuariosInfo));
        dispatch(articulosAction(articulosInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ENVIAR DATOS (POST) API
    const history = useHistory();
    const [statusForm, setStatusForm] = useState(false);

    const sendABM = async (e) => {
        e.preventDefault();
        setStatusForm(true);
        try {
            const response = await privatePostRequest("OrdenesTrabajo/Save", {
                id,
                idUsuario,
                fechaEntrega,
                fechaOrden,
                direccion,
                compraVenta,
                fechaAlta,
                fechaPrometido,
                razonSocial,
                idDeposito,
                idEstadoOrden,
                idRecurso,
                idVendedor,
                prefijo,
                detalle: [{
                    id,
                    idOrden,
                    idArticuloDetalle,
                    fechaAlta,
                    descripcion,
                    observacion,
                    cantidad,
                    cantidadFacturada,
                    cantidadDevuelta,
                    largo,
                    ancho,
                    numeroPedido,
                    value
                }],
                cuentasCorrientes: arrayClientes,
                activo: true,
            });
            console.log(response);
            if (response !== undefined) {
                showAlert({
                    type: "success",
                    title: patchData?.location?.state?.id
                        ? "Editado correctamente"
                        : "Guardado correctamente",
                }) && history.push("/PallasFront/Ordendeproduccion");
            } else {
                showAlert({
                    type: "error",
                    title: patchData?.location?.state?.id
                        ? "Error al editar Orden de produccion"
                        : "Error al crear Orden de produccion",
                })
            }
        } catch (err) {
            console.log("Error catch:", err);
        } finally {
            setStatusForm(false);
        }
    };


    //constantes para manipular estado de datos
    const [id] = useState(patchData?.location?.state?.id || 0);
    const [idUsuario] = useState(patchData?.location?.state?.idUsuario || "fca00074-54ca-4e8b-9c32-340a716e8713");
    const [idEstadoOrden] = useState(patchData?.location?.state?.idEstadoOrden || 1);
    const [idRecurso] = useState(patchData?.location?.state?.idRecurso || null);
    const [idDeposito] = useState(patchData?.location?.state?.idDeposito || 1003);
    const [idVendedor] = useState(patchData?.location?.state?.idVendedor || null);
    const [fechaAlta] = useState(patchData?.location?.state?.fechaAlta || new Date());
    const [fechaOrden, cambiarFechaOrden] = useState(patchData?.location?.state?.fechaOrden || new Date());
    const [prefijo] = useState(patchData?.location?.state?.prefijo || 1);
    const [razonSocial] = useState(patchData?.location?.state?.razonSocial || "");
    const [direccion, cambiarDireccion] = useState(patchData?.location?.state?.direccion);
    const [compraVenta] = useState(patchData?.location?.state?.OtrCompraVenta || "V");
    const [fechaPrometido] = useState(patchData?.location?.state?.fechaPrometido || new Date());
    const [fechaEntrega, cambiarFechaEntrega] = useState(patchData?.location?.state?.fechaEntrega || new Date());
    const [idOrden] = useState(patchData?.location?.state?.idOrden || 0);
    const [idArticuloDetalle] = useState(addFormData.articulo || 1172)
    const [largo] = useState(addFormData.largo || 0);
    const [cantidad] = useState(addFormData.cantidad || 0);
    const [value] = useState(patchData?.location.state?.value) || "C";
    const [numeroPedido] = useState(addFormData.numeropedido || 2);
    const [idOrdenTrabajo] = useState(patchData?.location.state?.idOrdenTrabajo || 0);
    const [ancho] = useState(addFormData.ancho || 0);
    const [cantidadDevuelta] = useState(patchData?.location.state?.cantidadDevuelta || 0);
    const [cantidadFacturada] = useState(patchData?.location.state?.cantidadFacturada || 0);
    const [observacion] = useState(patchData?.location.state?.observacion || "");
    const [descripcion] = useState(patchData?.location.state?.descripcion || "");
    const [idCuentaCorriente, setIdCuentaCorriente] = useState(patchData?.location?.state?.idCuentaCorriente || []);



    // arreglo para pushear objetos 
    let arrayClientes = [];
    idCuentaCorriente.forEach(element => {
        arrayClientes.push = {
            idOrdenTrabajo,
            idCuentaCorriente: element,
        }
    });
    console.log(arrayClientes);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setIdCuentaCorriente(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={Locale}>
                <div>
                    <Header>
                        <header className="list_header">
                            <h1 className="h1-orden">Orden de produccion</h1>
                        </header>
                        <ButtonsNavigation
                            label1="Dashboard"
                            label2="Procesos"
                            label3="Orden de Produccion"
                            icon1={<AiFillDashboard />}
                            icon2={<FaTasks />}
                            icon3={<FaBoxes />}
                            link2="/PallasFront/Procesos"
                            link1="/PallasFront"
                        />
                        <Box>
                            <form className="container-abm" onSubmit={sendABM}>
                                <div>
                                    <h4 className="h4-orden">Orden de producción</h4>
                                </div>
                                <input
                                    type="hidden"
                                    fullWidth
                                    id="idUsuario"
                                    label="idUsuario"
                                    value={patchData?.location?.state?.id}
                                />
                                <input
                                    type="hidden"
                                    fullWidth
                                    id="idUsuario"
                                    label="idUsuario"
                                    value={patchData?.location?.state?.idUsuario}
                                />
                                <div className="divider">
                                    <DatePicker
                                        className="input-fecha titulos-label"
                                        fullWidth
                                        format={localeFormatMap}
                                        label="Fecha entrega"
                                        value={fechaEntrega}
                                        onChange={cambiarFechaEntrega}
                                    />
                                </div>
                                <div className="divider">
                                    <DatePicker
                                        fullWidth
                                        format={localeFormatMap}
                                        className="input-fecha titulos-label"
                                        label="Fecha"
                                        value={fechaOrden}
                                        onChange={cambiarFechaOrden}
                                    />
                                </div>
                                <div className="divider">
                                    <FormControl className="titulos-label input-label" fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Clientes</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={idCuentaCorriente}
                                            onChange={(e) => setIdCuentaCorriente(e.target.value)}
                                            input={<OutlinedInput label="Clientes" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {clientesInfo?.result?.map((element) => (
                                                <MenuItem key={element.id} value={element.id}>
                                                    <Checkbox checked={idCuentaCorriente.indexOf(element.id) > -1} />
                                                    <ListItemText primary={element.id} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="divider">
                                    <TextField fullWidth
                                        className="column-label titulos-label input-label"
                                        id="fullWidth"
                                        label="Distribucion"
                                        variant="outlined"
                                        value={direccion}
                                        onChange={(e) => cambiarDireccion(e.target.value)}
                                    />
                                </div>
                                <form className="main-divider-bottom">
                                    <input
                                        type="hidden"
                                        fullWidth
                                        id="idDetalle"
                                        label="idDetalle"
                                        value={patchData?.location?.state?.id}
                                    />
                                    <TextField
                                        className="column-label titulos-label"
                                        id="fullWidth"
                                        label="Cantidad"
                                        variant="outlined"
                                        type="number"
                                        name='cantidad'
                                        onChange={handleAddFormChange}
                                    >
                                    </TextField>
                                    <Autocomplete
                                        className="column-label articulo-insumo titulos-label input-label"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={(articulosInfo?.result?.map((element) => (element.id)))}
                                        noOptionsText="No hay articulos"
                                        sx={{ width: 200 }}
                                        onChange={handleAddFormChangeAuto}
                                        name="articulo"
                                        renderInput={(params) => <TextField name="articulo" {...params} label="Articulo" />}
                                    />
                                    <TextField
                                        name='largo'
                                        id="outlined-number"
                                        label="Largo"
                                        type="number"
                                        className="titulos-label"
                                        onChange={handleAddFormChange}
                                    />
                                    <TextField
                                        name='ancho'
                                        id="outlined-number"
                                        label="Ancho"
                                        type="number"
                                        className="titulos-label"
                                        onChange={handleAddFormChange}
                                    />
                                    <TextField
                                        name='numeropedido'
                                        id="outlined-number"
                                        label="Numero de pedido"
                                        type="number"
                                        className="titulos-label"
                                        onChange={handleAddFormChange}
                                    />
                                    <TextField
                                        name='x'
                                        className="x titulos-label input-label"
                                        id="outlined-select-currency"
                                        select
                                        label="X"
                                        value={addFormData.x}
                                        onChange={handleAddFormChangeSelect}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button
                                        type='submit'
                                        onClick={handleSubmit}
                                    >Agregar
                                    </Button>
                                </form>

                                <table className='tablasecunadaria'>
                                    <TableHead>
                                        <TableRow className="list_titulos">
                                            <TableCell className="columnas-list">
                                                Cantidad
                                            </TableCell>
                                            <TableCell className="columnas-list">
                                                Articulo
                                            </TableCell>
                                            <TableCell className="columnas-list">
                                                Largo
                                            </TableCell>
                                            <TableCell className="columnas-list">
                                                Ancho
                                            </TableCell>
                                            <TableCell className="columnas-list">
                                                Numero pedido
                                            </TableCell>
                                            <TableCell className="columnas-list">
                                                X
                                            </TableCell>
                                            <TableCell className="columnas-acciones acciones">
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listado.map((element) =>
                                            <TableRow
                                                key={element.id}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                }}
                                                className="list_data"
                                            >
                                                <TableCell component="th" scope="row" value={element.cantidad} >
                                                    {element.cantidad}
                                                </TableCell>
                                                <TableCell component="th" scope="row" value={element.articulo}>
                                                    {element.articulo}
                                                </TableCell>
                                                <TableCell component="th" scope="row" value={element.largo}>
                                                    {element.largo}
                                                </TableCell>
                                                <TableCell component="th" scope="row" value={element.ancho}>
                                                    {element.ancho}
                                                </TableCell>
                                                <TableCell component="th" scope="row" value={element.numeropedido}>
                                                    {element.numeropedido}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {element.x}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className="row-bot">
                                                    <Button type='button' onClick={() => handleDeleteClick(listado.id)} >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>)}
                                    </TableBody>
                                </table>
                                <button type="submit"
                                    disabled={statusForm}
                                    className="boton-guardar">
                                    {patchData?.location?.state?.id ? "Editar" : "Guardar"}
                                </button>
                            </form>
                        </Box>
                    </Header>
                </div>
            </MuiPickersUtilsProvider>
        </>
    );
}

