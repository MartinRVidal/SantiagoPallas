import React, { useState, useEffect } from "react";
import Header from "../../LayoutPublic/Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
import { useHistory } from "react-router-dom";
import {
  FormControlLabel,
  TableCell,
  Checkbox,
  TableRow,
  Table,
  TableBody,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import TableHead from "@mui/material/TableHead";
import Spiner from "../../../shared/spiner";
import { useSelector, useDispatch } from "react-redux";
import "../../shared.css";
import {
  articulosAction,
  tipoDeArticulosAction,
} from "../../../redux/actionsABM/reducerArticulos";
import { elementType } from "prop-types";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "2%",
  },
  btn: {
    margin: "15px 0 15px 0",
    backgroundColor: "var(--primary)",
    "&:hover": {
      background: "var(--hoverPrimary)",
    },
    color: "white",
  },
}));

const ArticulosForm = (patchData) => {
  console.log(patchData?.location?.state)
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectInsumo, setSelectInsumo] = useState(patchData?.location?.state?.idTipoArticulo || 9);
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);
  // Estado
  const [id, setId] = useState(patchData?.location?.state?.id || 0);
  const [nombre, setNombre] = useState(patchData?.location?.state?.nombre || "");
  const [codigo, setCodigo] = useState(patchData?.location?.state?.codigo || "");
  const [descripcion, setDescripcion] = useState(patchData?.location?.state?.descripcion || "");
  const [idTipoArticulo, setIdTipoArticulo] = useState(patchData?.location?.state?.idTipoArticulo || 9);
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [detalle, setDetalle] = useState( patchData?.location?.state?.detalle || [] );

  const [luz, setLuz] = useState("");
  const [diametro, setDiametro] = useState("");
  const [paso, setPaso] = useState("");
  const [pasoEstampado, setPasoEstampado] = useState("");
  const [cantidadMl, setCantidadMl] = useState("");
  const [ancho, setAncho] = useState("");
  const [cola, setCola] = useState("");
  const [peso, setPeso] = useState("");
  const [checked, setChecked] = useState("");


  useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeAsignados = (e) => {
    const check = document.querySelectorAll("#checkbox");
    if(e.target.checked == true){
      check.forEach( element => element.checked === false ? 
      element.parentNode.parentNode.parentNode.parentNode.style.display = "none" : "");
    }else{
      check.forEach( element => element.checked === false ? 
        element.parentNode.parentNode.parentNode.parentNode.style.display = "table-row" : "");
    }

  };
  const handleCheck = (element, index, e) => {
    const existe = detalle.some((el) => el.idArticuloDetalle === element.id);
    if (existe) {
      const inputLuz = document.querySelectorAll("#luz")[index];
      inputLuz.value="";
      inputLuz.disabled = true;
      inputLuz.classList.add("Mui-disabled");
      inputLuz.parentNode.classList.add("Mui-disabled");
      const inputPaso = document.querySelectorAll("#paso")[index];
      inputPaso.value="";
      inputPaso.disabled = true;
      inputPaso.classList.add("Mui-disabled");
      inputPaso.parentNode.classList.add("Mui-disabled");
      const inputAncho = document.querySelectorAll("#ancho")[index];
      inputAncho.value="";
      inputAncho.disabled = true;
      inputAncho.classList.add("Mui-disabled");
      inputAncho.parentNode.classList.add("Mui-disabled");
      const inputPasoEstampado = document.querySelectorAll("#pasoEstampado")[index];
      inputPasoEstampado.value="";
      inputPasoEstampado.disabled = true;
      inputPasoEstampado.classList.add("Mui-disabled");
      inputPasoEstampado.parentNode.classList.add("Mui-disabled");
      const inputCola = document.querySelectorAll("#cola")[index];
      inputCola.value="";
      inputCola.disabled = true;
      inputCola.classList.add("Mui-disabled");
      inputCola.parentNode.classList.add("Mui-disabled");
      const inputCantidad = document.querySelectorAll("#cantidadml")[index];
      inputCantidad.value="";
      inputCantidad.disabled = true;
      inputCantidad.classList.add("Mui-disabled");
      inputCantidad.parentNode.classList.add("Mui-disabled");
      const inputPeso = document.querySelectorAll("#peso")[index];
      inputPeso.value="";
      inputPeso.disabled = true;
      inputPeso.classList.add("Mui-disabled");
      inputPeso.parentNode.classList.add("Mui-disabled");
      const inputDiametro = document.querySelectorAll("#diametro")[index];
      inputDiametro.value="";
      inputDiametro.disabled = true;
      inputDiametro.classList.add("Mui-disabled");
      inputDiametro.parentNode.classList.add("Mui-disabled");
      setDetalle(detalle.filter((el) => el.idArticuloDetalle !== element.id));
    } else {
      const inputLuz = document.querySelectorAll("#luz")[index];
      inputLuz.disabled = false;
      inputLuz.classList.remove("Mui-disabled");
      inputLuz.parentNode.classList.remove("Mui-disabled");
      const inputPaso = document.querySelectorAll("#paso")[index];
      inputPaso.disabled = false;
      inputPaso.classList.remove("Mui-disabled");
      inputPaso.parentNode.classList.remove("Mui-disabled");
      const inputAncho = document.querySelectorAll("#ancho")[index];
      inputAncho.disabled = false;
      inputAncho.classList.remove("Mui-disabled");
      inputAncho.parentNode.classList.remove("Mui-disabled");
      const inputPasoEstampado = document.querySelectorAll("#pasoEstampado")[index];
      inputPasoEstampado.disabled = false;
      inputPasoEstampado.classList.remove("Mui-disabled");
      inputPasoEstampado.parentNode.classList.remove("Mui-disabled");
      const inputCola = document.querySelectorAll("#cola")[index];
      inputCola.disabled = false;
      inputCola.classList.remove("Mui-disabled");
      inputCola.parentNode.classList.remove("Mui-disabled");
      const inputCantidad = document.querySelectorAll("#cantidadml")[index];
      inputCantidad.disabled = false;
      inputCantidad.classList.remove("Mui-disabled");
      inputCantidad.parentNode.classList.remove("Mui-disabled");
      const inputPeso = document.querySelectorAll("#peso")[index];
      inputPeso.disabled = false;
      inputPeso.classList.remove("Mui-disabled");
      inputPeso.parentNode.classList.remove("Mui-disabled");
      const inputDiametro = document.querySelectorAll("#diametro")[index];
      inputDiametro.disabled = false;
      inputDiametro.classList.remove("Mui-disabled");
      inputDiametro.parentNode.classList.remove("Mui-disabled");
      setDetalle([
        ...detalle,
        {
          idArticuloDetalle: element.id,
          nomenclatura: element.nombre,
          descripcion: element.descripcion,
          luz: null,
          diametro: null,
          paso: null,
          pasoEstampado: null,
          cantidadMl: null,
          ancho: null,
          cola: null,
          peso: null,
        },
    ]);}
  };
  const sendABM = async (e) => {
    e.preventDefault();
    setStatusForm(true);
    try {
      const response = await privatePostRequest("articulos/save", {
        id,
        nombre,
        codigo,
        descripcion,
        idTipoArticulo,
        tipoArticulo,
        detalle,
        activo:true,
      });
      console.log(response);
      if (response !== undefined){
        showAlert({
          type: "success",
          title: patchData?.location?.state?.id
            ? "Editado correctamente"
            : "Creado correctamente",
        }) && history.push("/PallasFront/articulos");
      }else{
        showAlert({
          type: "error",
          title: patchData?.location?.state?.id
            ? "Error al editar el insumo/articulo"
            : "Error al crear el insumo/articulo",
        }) 
      }
      
    } catch (err) {
      console.log("Error catch:", err);
    } finally {
      setStatusForm(false);
    }
  };
  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Artículos
        </Typography>
        <div className="abm_container">
          <form className="formabm_container" onSubmit={sendABM}>
            <input
              type="hidden"
              fullWidth
              id="id"
              label="id"
              value = {patchData?.location?.state?.id}
            />
            <label htmlFor="titulo">Nombre</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Nombre"
              value = {nombre}
              onChange={(e) =>
                setNombre(e.target.value)}
            />
            <label htmlFor="titulo">Código</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              value = {codigo}
              label="Codigo"
              onChange={(e) => setCodigo(e.target.value)}
            />
            <label htmlFor="titulo">Descripción</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Descripcion"
              value = {descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <label htmlFor="titulo"
              style={{textAlign: "start"}}
            >Tipo Artículo</label>
            <select
              fullWidth
              className="select-field"
              onChange={(e) => {
                setIdTipoArticulo(e.target.value);
                setSelectInsumo(parseInt(e.target.value));
              }}
            >
              
                <optgroup label="">
                  <option 
                    hidden
                    value ={9}
                    onChange={(e) => {{
                      setIdTipoArticulo(e.target.value);
                      setTipoArticulo(e.target.text);
                    }}}
                  >Seleccione un tipo de articulo</option>
                </optgroup> 
              <optgroup>
                {tipoDeArticulosInfo?.result?.map((e) => {
                  return (
                    <option key={e.id}
                    value={e.id}
                    selected={ patchData?.location?.state?.idTipoArticulo == e.id ? true : false }
                    onChange={(e) => {
                      setIdTipoArticulo(e.target.value);
                      setTipoArticulo(e.nombre);
                    }}>
                      {e.nombre}
                    </option>
                  );
                })}
              </optgroup>
            </select>
            <FormControlLabel
              value="start"
              control={<Checkbox />}
              onChange={(e) => handleChangeAsignados(e)}
              label="Solo asignados"
              labelPlacement="start"
            />
            {selectInsumo !== 9 && (
              <Table sx={{ minWidth: 750 }} className="table" aria-label="simple table">
                <TableHead>
                  <TableRow className="list_titulos">
                    <TableCell>✓</TableCell>
                    <TableCell>Nomenclatura</TableCell>
                    <TableCell>Código</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Luz</TableCell>
                    <TableCell>Paso</TableCell>
                    <TableCell>Desp. Ancho</TableCell>
                    <TableCell>Desp. Cola</TableCell>
                    <TableCell>Peso x Mt2</TableCell>
                    <TableCell>Diametro</TableCell>
                    <TableCell>Paso estampado</TableCell>
                    <TableCell>Cantidad Ml</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    <Spiner />
                  ) : (
                    articulosInfo?.result?.filter( element => element.idTipoArticulo === 9).map((element, index) => {
                      return (
                        (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox
                                type="checkbox"
                                id="checkbox"
                                defaultChecked ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? true : false}
                                onChange={(e) => {handleCheck(element, index, e);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.nombre} />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.id} />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.descripcion} />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="luz"
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).luz : ""}
                                type="text"
                                onClick={(e) =>{e.disabled = true}}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).luz = e.target.value;
                                  setLuz(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="paso"
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).paso : ""}
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).paso = e.target.value;
                                  setPaso(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="ancho"
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).ancho : ""}
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).ancho = e.target.value;
                                  setAncho(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="cola"v
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).cola : ""}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).cola = e.target.value;
                                  setCola(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="peso"
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).peso : ""}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).peso = e.target.value;
                                  setPeso(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="diametro"
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).diametro : ""}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).diametro = e.target.value;
                                  setDiametro(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="pasoEstampado"
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).pasoEstampado : ""}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).pasoEstampado = e.target.value;
                                  setPasoEstampado(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="cantidadml"
                                defaultValue = {patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id).cantidadMl : ""}
                                disabled ={patchData?.location?.state?.detalle.find(x => x.idArticuloDetalle === element.id) !== undefined ? false : true}
                                onChange={(e) => {
                                  detalle.find(x => x.idArticuloDetalle === element.id).cantidadMl = e.target.value;
                                  setCantidadMl(e.target.value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      );
                    })
                  )}
                </TableBody>
              </Table>
            )}
            <Button type="submit" className={classes.btn} disabled={statusForm}>
              {patchData?.location?.state?.id ? "Editar" : "Crear"}
            </Button>
            {/* <pre>{JSON.stringify(detalle, null, 2)}</pre> */}
          </form>
        </div>
      </Header>
    </div>
  );
};
export default ArticulosForm;