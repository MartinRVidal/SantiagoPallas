import React from 'react';
import Formpass from './Formpass';
import Header from '../LayoutPublic/Header/Header';
import "./Form.css";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";
import FormEmail from './FormEmail';

const FormularioConfig = () => {
    return (
        <>
            <Header>
                <div className="form_allContainer">
                    <h1 className="dashboard-tituloPrincipal">
                        Configuracion <small className="span-tituloprincipal" >Cuenta de usuario</small>
                    </h1>
                    <ButtonsNavigation label1="Dashboard" label2="Congifuracion usuario" className="botonnavegacion" />
                    <Formpass />
                    <FormEmail />
                </div>
            </Header>
        </>
    )
}

export default FormularioConfig;
