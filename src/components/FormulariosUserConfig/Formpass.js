import React from 'react';
import { Formik } from 'formik';
import "../../components/Dashboard/dashboard.css";

const Formpass = () => {
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
                        <h3 className='cambiarcontra' >Cambiar Contraseña</h3>
                        <div className='contenedor-label-input'>
                            <label className='label' htmlFor='Contraseña Actual'>Contraseña Actual</label>
                            <input
                                className='input'
                                type="text"
                                id="contraseña actual"
                                name="contraseña actual"
                                placeholder='Su contraseña actual'
                                value={values.contrasenaactual}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </div>
                        <div className='contenedor-label-input'>
                            <label  className='label' htmlFor='Nueva Contraseña'>Nueva Contraseña</label>
                            <input
                                className='input'
                                type="text"
                                id="nueva contraseña"
                                name="nueva contraseña"
                                placeholder='Su nueva contraseña'
                                value={values.nuevacontrasena}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </div>
                        <div className='contenedor-label-input'>
                            <label  className='label' htmlFor='Nueva Contraseña'>Nueva Contraseña</label>
                            <input
                                className='input'
                                type="text"
                                id="repita nueva contraseña"
                                name="repita nueva contraseña"
                                placeholder='Repita su nueva contraseña'
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

export default Formpass;