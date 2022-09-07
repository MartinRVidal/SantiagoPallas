import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/login";
import imgLogin from "../../image/cecac76e-7bf3-48e1-bb26-e04c7a7baf53.jpg";
import "./login.css";
import "../shared.css";
import logoweb from "../../image/logo-web.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://pilsendigital.com">
        Pilsen Digital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  btn: {
    margin: "15px 0 15px 0",
    backgroundColor: "var(--primary)",
    "&:hover": {
      background: "var(--hoverPrimary)",
    },
    color: "white",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  subtitle: {
    color: "var(--letterOpacity)",
    fontSize: "1.2em",
  },
}));

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { infoUser, error } = useSelector((store) => store.user);
  console.log("infoUser!:", infoUser);
  console.log("Token!:", infoUser?.token);
  console.log("Error!:", error);

  useEffect(() => {
    window.localStorage.getItem("token") && history.push("/PallasFront");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.localStorage.getItem("token")]);

  const classes = useStyles();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("El email es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(50, "El email es demasiado largo"),
    password: yup
      .string()
      .required("Por favor, ingrese su contraseña")
      .max(50, "La contraseña es demasiado larga"),
  });

  return (
    <div>
      <div className="login_container">
        <div className="login_container-formulario">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ email, password }, { resetForm }) => {
              resetForm();
              try {
                dispatch(loginAction({ email, password }));
              } catch (err) {
                console.log("Error catch:", err);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Container
                component="main"
                maxWidth="xs"
                className={classes.root}
              >
                <div className="logo-web-container">
                  <img className="logo-web-login" src={logoweb}/>
                </div>
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Iniciar sesión
                  </Typography>
                  <p className={classes.subtitle}>Administrá tu cuenta</p>
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="input-error"
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="input-error"
                    />
                    <FormControlLabel
                      control={<Checkbox value="true" color="primary" />}
                      label="Recuerdame"
                    />
                    <Button fullWidth type="submit" className={classes.btn}>
                      Ingresar
                    </Button>
                  </form>
                </div>
                <Box mt={8} mb={8}>
                  <Copyright />
                </Box>
              </Container>
            )}
          </Formik>
        </div>
        <div className="login_container-img">
          <img src={imgLogin} alt="Imagen no encontrada" />
        </div>
      </div>
    </div>
  );
}
