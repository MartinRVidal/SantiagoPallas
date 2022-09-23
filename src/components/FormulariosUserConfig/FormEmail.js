import React from 'react';
import { Formik } from 'formik';
import "../../components/Dashboard/dashboard.css";

const FormEmail = () => {
    return (
        <>
            <Formik
            initialValues={{
                name: "",
                placeholder: ""
            }}
            onSubmit={(valores) => {  /* onsubmit funcion al enviar el formulario */
                console.log("enviado");
                console.log(valores);
            }}>
                {({values, errors, handleSubmit, handleChange, handleBlur}) => (
                    <form className='dashboard_container' onSubmit={handleSubmit}>
                        <h3 className='cambiarcontra' >Cambiar Email</h3>
                        <div className='contenedor-label-input'>
                            <label className='label' htmlFor='Email Actual'>Email Actual</label>
                            <input
                                className='input'
                                type="text"
                                id="Email Actual"
                                name="Email Actual"
                                placeholder='Su email actual'
                                value={values.contrasenaactual}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </div>
                        <div className='contenedor-label-input'>
                            <label  className='label' htmlFor=''>Nuevo Email</label>
                            <input
                                className='input'
                                type="text"
                                id="Nuevo Email"
                                name="Nuevo Email"
                                placeholder='Su nuevo Email'
                                value={values.nuevacontrasena}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </div>
                        <div className='contenedor-label-input'>
                            <label  className='label' htmlFor='Nueva Contraseña'>Repita nuevo email</label>
                            <input
                                className='input'
                                type="text"
                                id="repita nuevo email"
                                name="repita nuevo email"
                                placeholder='Repita su nuevo email'
                                value={values.repitanuevacontrasena}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </div>
                        <div className='div-boton'>
                        <button className='boton-enviar' type="submit">Cambiar</button>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default FormEmail;