import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
import { useHistory } from "react-router-dom";
import "../../shared.css";

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
const TipoDeArticulos = (patchData) => {
  const history = useHistory();
  const classes = useStyles();
  const [statusForm, setStatusForm] = useState(false);

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
  });
  console.log("PatchData:", patchData);

  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Tipo de Articulo
        </Typography>
        <div className="abm_container">
          <Formik
            initialValues={{
              id: patchData?.location?.state?.id,
              nombre: patchData?.location?.state?.nombre || "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);
              try {
                const response = await privatePostRequest(
                  "tiposarticulo/save",
                  {
                    ...formData,
                  }
                );
                console.log(response);
                if (!response?.data?.status === 200)
                  throw new Error("Algo falló");
                showAlert({
                  type: "success",
                  title: patchData?.location?.state?.id
                    ? "Editado correctamente"
                    : "Creado correctamente",
                }) && history.push("/PallasFront/tipo-de-articulos");
              } catch (err) {
                console.log("Error catch:", err);
              } finally {
                setStatusForm(false);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <form className="formabm_container" onSubmit={handleSubmit}>
                <label htmlFor="titulo">Nombre</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="nombre"
                  id="titulo"
                  label="Nombre del Tipo de Articulo"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nombre}
                />
                <ErrorMessage
                  name="nombre"
                  component="p"
                  className="input-error"
                />
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}>
                  {patchData?.location?.state?.id ? "Editar" : "Crear"}
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Header>
    </div>
  );
};

export default TipoDeArticulos;
