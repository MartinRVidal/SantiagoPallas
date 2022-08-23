import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { rolesAction } from "../../../redux/actionsABM/reducerRoles";
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
const UsuariosForm = (patchData) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { rolesInfo } = useSelector((store) => store.roles);
  const [statusForm, setStatusForm] = useState(false);
  console.log(rolesInfo);

  const formSchema = yup.object().shape({
    userName: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
    email: yup
      .string()
      .required("El campo es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(50, "El email es demasiado largo"),
    rolName: yup.string().required("El campo es requerido"),
  });
  console.log("PatchData:", patchData);

  useEffect(() => {
    dispatch(rolesAction(rolesInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Usuario
        </Typography>
        <div className="abm_container">
          <Formik
            initialValues={{
              id: patchData?.location?.state?.id,
              userName: patchData?.location?.state?.userName || "",
              email: patchData?.location?.state?.email || "",
              rolName: patchData?.location?.state?.rolName || "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);
              try {
                const response = await privatePostRequest("users/save", {
                  ...formData,
                });
                console.log(response);
                if (!response?.data?.status === 200)
                  throw new Error("Algo falló");
                showAlert({
                  type: "success",
                  title: patchData?.location?.state?.id
                    ? "Usuario editado correctamente"
                    : "Usuario creado correctamente",
                }) && history.push("/PallasFront/usuarios");
              } catch (err) {
                console.log("Error catch:", err);
              } finally {
                setStatusForm(false);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <form className="formabm_container" onSubmit={handleSubmit}>
                <label htmlFor="titulo">Nombre de usuario</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="userName"
                  id="titulo"
                  label="Nombre"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
                <ErrorMessage
                  name="userName"
                  component="p"
                  className="input-error"
                />

                <label htmlFor="titulo">Email de usuario</label>
                <TextField
                  type="email"
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="email"
                  id="titulo"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="input-error"
                />

                <label htmlFor="rolName">Rol</label>
                <select
                  className="select-field"
                  name="rolName"
                  id="rolName"
                  data-testid="rolName"
                  value={values.rolName}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Selecciona un rol
                  </option>
                  {rolesInfo?.result?.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                <ErrorMessage
                  name="rolName"
                  component="p"
                  className="input-error"
                />
                {/* <div className="input__container"> */}

                {/* </div> */}

                {/* <label htmlFor="titulo">Rol de usuario</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="rolName"
                  id="titulo"
                  label="Rol"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rolName}
                />
                <ErrorMessage
                  name="rolName"
                  component="p"
                  className="input-error"
                /> */}
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}
                >
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

export default UsuariosForm;
