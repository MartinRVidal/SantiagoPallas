import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    articulosAction,
    tipoDeArticulosAction,
} from "../../../redux/actionsABM/reducerArticulos";
import { element } from 'prop-types';
import {
    TextField,
    TableRow,
} from "@material-ui/core";

const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
);

const dispatch = useDispatch();

useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// constante de buscador
const [search, setSearch] = useState("");

// funcion para buscar filtrar por nombre de articulo

const searcher = (e) => {
    setSearch(e.target.value)
    //console.log(e.target.value)
}

let resultado = []
if (!search) {
    resultado = articulosInfo.result
    //console.log(resultado)
} else {
    resultado = articulosInfo.result.filter((element) => element.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    //console.log(resultados.filter)
}

const columns = [
    { field: 'check', headerName: '✓', width: 90 },
    {
        field: 'nomenclatura',
        headerName: 'Nomenclatura',
        width: 120,
        editable: true,
    },
    {
        field: 'codigo',
        headerName: 'Código',
        width: 100,
        editable: true,
    },
    {
        field: 'descripcion',
        headerName: 'Descripcion',
        width: 110,
        editable: true,
    },
    {
        field: 'luz',
        headerName: 'Luz',
        width: 90,
        editable: true,
    },
    {
        field: 'paso',
        headerName: 'Paso',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'despancho',
        headerName: 'Desp. Ancho',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'descola',
        headerName: 'Desp. Cola',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'pesoxmt2',
        headerName: 'Peso x Mt2',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'diametro',
        headerName: 'Diametro',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'pasoestampado',
        headerName: 'Paso estampado',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'cantidadml',
        headerName: 'Cantidad Ml',
        type: 'number',
        width: 90,
        editable: true,
    },
];

const rows = [
    { 
        nomenclatura: resultado.map((element) => element.nombre), 
        codigo: element.id,
        descripcion: element.descripcion,
        luz: 35,
        paso: "",
        despancho: "",
        descola: "",
        pesoxmt2:"",
        diametro: "",
        pasoestampado: "",
        cantidadml: ""
    },
];

export default function DataGridDemo() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <TableRow className="row-buscador">
                <TextField
                    id="outlined-search"
                    label="Buscador"
                    type="search"
                    className="buscador"
                    margin="normal"
                    value={search}
                    onChange={searcher}
                    variant="outlined"
                />
            </TableRow>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}