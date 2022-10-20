import React, { useState } from "react";
import Header from "../../LayoutPublic/Header/Header";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { FaBoxes } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaTasks, FaSearch } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io"
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import "../orden.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Addabmorden from "../../../shared/addABM/addabmorden";
import Locale from "date-fns/locale/es";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// cambio de formato en fechas
const localeFormatMap = "MMMM d, yyyy"

// Lista seleccion multiple
const names = [
    'Argentina',
    'Brasil',
    'Alemania',
    'Belgica',
    'Suiza',
    'Croacia',
    'Marruecos',
    'Bulgaria',
    'Vietnam',
    'Kenia',
];

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

// lista para seleccionar X
const currencies = [
    {
        value: 'USD',
        label: 'Santiago pallas',
    },
    {
        value: 'EUR',
        label: 'Pilsen Digital',
    },
    {
        value: 'BTC',
        label: 'Howard Johnson',
    },
    {
        value: 'JPY',
        label: 'San Francisco',
    },
];

export default function Ordendeproduccion() {

    //funcion para elegir fechas
    const [fechaseleccionada, cambiarfechaseleccionada] = useState(new Date());
    const [fechaseleccionada2, cambiarfechaseleccionada2] = useState(new Date());

    //funcion para seleccion multiple
    const [personName, setPersonName] = React.useState([]);
    const [personName2, setPersonName2] = React.useState([]);
    const [personName3, setPersonName3] = React.useState([]);
    const [personName4, setPersonName4] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName2(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChange3 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName3(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChange4 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName4(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    //funcion seleccionar lista X (no multiple)
    const [currency, setCurrency] = React.useState();
    const handleChange5 = (event) => {
        setCurrency(event.target.value);
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
                        <div className="container-abm" >
                            <div>
                                <h4 className="h4-orden">Orden de producción</h4>
                            </div>
                            <Box
                                className="box-orden"
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <div className="divider">
                                    <DatePicker
                                        className="input-fecha titulos-label"
                                        fullWidth
                                        format={localeFormatMap}
                                        label="Fecha entrega"
                                        value={fechaseleccionada}
                                        onChange={cambiarfechaseleccionada}
                                    />
                                </div>
                                <div className="divider">
                                    <DatePicker
                                        fullWidth
                                        format={localeFormatMap}
                                        className="input-fecha titulos-label"
                                        label="Fecha"
                                        value={fechaseleccionada2}
                                        onChange={cambiarfechaseleccionada2}
                                    />
                                </div>
                                <div className="divider">
                                <FormControl className="titulos-label input-label" fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">Clientes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Clientes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
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
                                    />
                                </div>
                                <div className="divider">
                                <FormControl className="titulos-label input-label" fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">Recursos Producción</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName2}
                                        onChange={handleChange2}
                                        input={<OutlinedInput label="none" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName2.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </div>
                                <div className="divider">
                                <FormControl className="titulos-label input-label" fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">Etapa Productiva</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName3}
                                        onChange={handleChange3}
                                        input={<OutlinedInput label="none" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName3.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </div>
                                <div className="divider">
                                <FormControl className="titulos-label input-label" fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label">Maquinas</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={personName4}
                                        onChange={handleChange4}
                                        input={<OutlinedInput label="none" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName4.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </div>
                                <div className="main-divider-bottom">
                                    <div className="divider-bottom input-label">
                                        <TextField
                                            className="column-label titulos-label"
                                            id="fullWidth"
                                            label="Cantidad"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            className="column-label articulo-insumo titulos-label input-label"
                                            id="outlined-search"
                                            label="Articulo/Insumo"
                                            type="search"
                                        />
                                        <FaSearch className="buscar2" />
                                    </div>
                                    <div className="medidas">
                                        <TextField
                                            id="outlined-number"
                                            label="Largo"
                                            type="number"
                                            className="titulos-label"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="medidas">
                                        <TextField
                                            id="outlined-number"
                                            label="Ancho"
                                            type="number"
                                            className="titulos-label"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="divider-bottom">
                                        <TextField
                                            id="outlined-number"
                                            label="Numero de pedido"
                                            type="number"
                                            className="titulos-label"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            className="x titulos-label input-label"
                                            id="outlined-select-currency"
                                            select
                                            label="X"
                                            value={currency}
                                            onChange={handleChange5}
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="button-add">
                                        <Addabmorden />
                                    </div>
                                </div>
                                <div className="main-divider-bottom" >
                                    <TextField
                                        id="outlined-basic"
                                        label="Cantidad"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo de articulo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Descripcion"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo insumo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        className="column-label titulos-label input-label"
                                        id="outlined-basic"
                                        label="Descripcion insumo"
                                        variant="outlined"
                                    />
                                    <button className="list_options-delete">
                                        <IoMdTrash />
                                    </button>
                                </div>
                                <div className="main-divider-bottom" >
                                    <TextField
                                        id="outlined-basic"
                                        label="Cantidad"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo de articulo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Descripcion"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo insumo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        className="column-label titulos-label input-label"
                                        id="outlined-basic"
                                        label="Descripcion insumo"
                                        variant="outlined"
                                    />
                                    <button className="list_options-delete">
                                        <IoMdTrash />
                                    </button>
                                </div>
                                <div className="main-divider-bottom" >
                                    <TextField
                                        id="outlined-basic"
                                        label="Cantidad"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo de articulo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Descripcion"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Codigo insumo"
                                        variant="outlined"
                                        className="column-label titulos-label input-label"
                                    />
                                    <TextField
                                        className="column-label titulos-label input-label"
                                        id="outlined-basic"
                                        label="Descripcion insumo"
                                        variant="outlined"
                                    />
                                    <button className="list_options-delete">
                                        <IoMdTrash />
                                    </button>
                                </div>
                                <div className="div-boton-guardar">
                                    <button className="boton-guardar" type="submit">Guardar</button>
                                </div>
                            </Box >
                        </div>
                    </Header>
                </div>
            </MuiPickersUtilsProvider>
        </>
    );
}

