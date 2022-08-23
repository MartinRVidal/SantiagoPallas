import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../LayoutPublic/Header/Header";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/register";
import imgRegister from "../../image/img-register.jpg";
import "./register.css";
import "../shared.css";

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
  root: {
    background: "white",
    borderRadius: "5px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle: {
    color: "var(--letterOpacity)",
    fontSize: "1.2em",
  },
  registerSubBtn: {
    color: "var(--secondary)",
    textDecoration: "none",
    textAlign: "center",
  },
}));

export default function SignIn() {
  const dispatch = useDispatch();
  const { infoRegister, error } = useSelector((store) => store.register);
  console.log("infoRegister:", infoRegister);
  console.log("Error!:", error);
  const classes = useStyles();

  const formSchema = yup.object().shape({
    UserName: yup
      .string()
      .required("Por favor, ingrese su nombre")
      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un nombre válido"),
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
      .required("La contraseña es requerida")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "La contraseña debe contener 8 caracteres, uno en mayúscula, uno en minúscula, un número y un carácter especial"
      )
      .max(50, "La contraseña es demasiado larga"),
  });

  return (
    <div>
      <Header>
        <div className="register_container">
          <div className="register_container-formulario">
            <Formik
              initialValues={{
                UserName: "",
                email: "",
                password: "",
              }}
              validationSchema={formSchema}
              onSubmit={async (values, { resetForm }) => {
                resetForm();
                try {
                  try {
                    dispatch(registerAction(values));
                  } catch (err) {
                    console.log("Error catch:", err);
                  }
                  console.log(values);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {({ values, handleSubmit, handleChange, handleBlur }) => (
                <Container
                  component="main"
                  maxWidth="xs"
                  className={classes.root}
                >
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                      Registrate
                    </Typography>
                    <p className={classes.subtitle}>Administrá tu cuenta</p>
                    <form
                      onSubmit={handleSubmit}
                      className={classes.form}
                      Validate
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="UserName"
                        label="Nombre"
                        name="UserName"
                        autoComplete="nombre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.UserName}
                      />
                      <ErrorMessage
                        name="UserName"
                        component="p"
                        className="input-error"
                      />
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
                        value={values.password}
                        id="password"
                        autoComplete="current-password"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="input-error"
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recuerdame"
                      />
                      <Button fullWidth className={classes.btn} type="submit">
                        Acceder
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link
                            href="/PallasFront/login"
                            className={classes.registerSubBtn}
                          >
                            {"Ya tienes cuenta? Inicia sesion"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <Box mt={8} mb={8}>
                    <Copyright />
                  </Box>
                </Container>
              )}
            </Formik>
          </div>
          <div className="register_container-img">
            <img src={imgRegister} alt="Imagen no encontrada" />
          </div>
        </div>
      </Header>
    </div>
  );
}
