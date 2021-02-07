import React from 'react';
import { useDispatch } from 'react-redux'
import Input from '../../../components/Input'

const StepOne = () => {
    const renderTypeUser = () => {
        if(true) {
            return (
                <>
                    <Input id="name" placeholder={"Nombres"} />
                    <Input id="apellido" placeholder={"Apellidos"} />
                    <Input id="dni" placeholder={"DNI"} />
                </>
            )
        } else {
            return (
                <>
                    <Input id="razon_social" placeholder={"Razón social"} />
                    <Input id="ruc" placeholder={"Número de RUC"} />
                </>
            )
        }
    }


    return ( <>
        <div className="pageCheckout-information-form">
            <div className="form-group">
                <div className="type-client">
                    <b>Tipo de cliente:</b>
                    <div>
                        <input
                            type={'radio'}
                            name="tipo_cliente"
                            id={'type_natural'}
                        />
                        <label htmlFor='type_natural'>Persona Natural</label>
                    </div>
                    <div>
                        <input
                            type={'radio'}
                            name="tipo_cliente"
                            id={'type_company'}
                        />
                        <label htmlFor='type_company'>Empresa</label>
                    </div>
                </div>
            </div>
            <div className="form-group">
                { renderTypeUser() }
            </div>
            <div className="form-group">
                <Input id="address" placeholder={"Dirección de facturación"} />
            </div>
            <div className="form-group">
                <Input id="phone" placeholder={"Teléfono"} />
            </div>
            <div className="form-group">
                <Input id="email" type="email" placeholder={"Email"} />
            </div>
        </div>

        <div className="button-black" style={{width: 200, float: 'right', marginBottom: 20}}>
                <a>
                    <span className="label">Continuar</span>
                </a>
        </div>
    </> );
}
 
export default StepOne