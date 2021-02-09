import React, { useState } from 'react'
import Input from '../../../components/Input'
import Select from '../../../components/Select';
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import * as checkoutTypes from '../../../redux/actions/checkout'

const StepTwo = () => {
    const dispatch = useDispatch()
    const ubigeo = useSelector(state => state.general.ubigeo)
    const [info, setInfo] = useState(useSelector(state => state.checkout.stepTwo))
    const { handleSubmit, register, errors } = useForm();

    const submit = handleSubmit((data) => {
        if (Object.keys(errors).length === 0){
            dispatch(checkoutTypes.updateUserData('stepTwo', {...info, ...data}))
            dispatch(checkoutTypes.changeStep(1))
        }
    })

    return ( 
        <div className="pageCheckout-information-form">
            <div className="form-group">
                <Select 
                    options={ubigeo.departamentos} 
                    onChange={(e)=> setInfo({ ...info, departamento: e.target.value, provincia: '', distrito: ''})}
                    idOption={'id_ubigeo'}
                    labelOption={'nombre_ubigeo'}
                    value={info.departamento}
                    placeholder="Departamento" />
            </div>
            <div className="form-group">
                <Select 
                    options={ubigeo.provincias[info.departamento]} 
                    onChange={(e)=> setInfo({ ...info, provincia: e.target.value, distrito: ''})}
                    value={info.provincia}
                    idOption={'id_ubigeo'}
                    labelOption={'nombre_ubigeo'}
                    placeholder="Provincia" />
            </div>
            <div className="form-group">
                <Select 
                    options={ubigeo.distritos[info.provincia]} 
                    onChange={(e)=> setInfo({ ...info, distrito: e.target.value})}
                    idOption={'id_ubigeo'}
                    value={info.distrito}
                    labelOption={'nombre_ubigeo'}
                    placeholder="Distrito" />
            </div>

            <div>
                <Input 
                    id="address" 
                    name="address" 
                    placeholder={"Dirección"}
                    ref={register({
                        required: 'Este campo es requerido'
                    })}
                    error={errors?.address?.message}
                    defaultValue={info.address}
                />
            </div>

            <div 
                className="button-black" 
                onClick={submit}
            >
                <a>
                    <span className="label">Continuar</span>
                </a>
            </div>
            <div 
                className="button-white" 
                style={{ marginBottom: '20px'}} 
                onClick={() => dispatch(checkoutTypes.changeStep(1))}
            >
                <a>
                    <span className="label">Atrás</span>
                </a>
            </div>
        </div>
     );
}
 
export default StepTwo;