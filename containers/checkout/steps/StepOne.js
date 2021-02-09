import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as checkoutTypes from '../../../redux/actions/checkout'
import {useForm} from "react-hook-form"
import Input from '../../../components/Input'

const StepOne = () => {
    const [info, setInfo] = useState(useSelector(state => state.checkout.stepOne))
    const dispatch = useDispatch()
    console.log(info)
    const onChangeInput = (e) => {
        setInfo({
            ...info,
            typeDoc: e.target.value
        })
    }
    
    const { handleSubmit, register, errors } = useForm();

    const submit = handleSubmit((data) => {
        if (Object.keys(errors).length === 0){
            dispatch(checkoutTypes.updateUserData('stepOne', {...info, ...data}))
            dispatch(checkoutTypes.changeStep(2))
        }
    })
  
    const renderTypeUser = () => {
        if(info.typeDoc == 1) {
            return (
                <>
                    <Input 
                        defaultValue={info.firstName} 
                        id="firstName" 
                        name="firstName" 
                        placeholder={"Nombres"}
                        ref={register({
                            required: 'Este campo es requerido'
                        })}
                        error={errors?.firstName?.message}
                    />

                    <Input 
                        defaultValue={info.lastName} 
                        id="lastName" 
                        name="lastName" 
                        placeholder={"Apellidos"}
                        ref={register({
                            required: 'Este campo es requerido'
                        })}
                        error={errors?.lastName?.message}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Input 
                        defaultValue={info.firstName} 
                        id="firstName"
                        name="firstName" 
                        placeholder={"Razón social"} 
                        ref={register({
                            required: 'Este campo es requerido'
                        })}
                        error={errors?.firstName?.message}
                    />
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
                            onChange={onChangeInput} 
                            value={1}
                            id="type_natural"
                            type={'radio'}
                            name="typeDoc"
                            checked={1 == info.typeDoc}
                        />
                        <label htmlFor='type_natural'>Persona Natural</label>
                    </div>
                    <div>
                        <input
                            onChange={onChangeInput} 
                            value={2}
                            type={'radio'}
                            id="type_company"
                            name="typeDoc"
                            checked={2 == info.typeDoc}
                        />
                        <label htmlFor='type_company'>Empresa</label>
                    </div>
                </div>
            </div>
            <div className="form-group">
                { renderTypeUser() }
            </div>
            <div className="form-group">
                <Input 
                    defaultValue={info.numDoc} 
                    id="numDoc" 
                    name="numDoc" 
                    placeholder={info.typeDoc == 1 ? "DNI" : "RUC"} 
                    ref={register({
                        required: 'Este campo es requerido',
                        pattern: {
                            value: info.typeDoc == 1 ? /^\d{8,8}$/i : /^\d{12,12}$/i,
                            message: "Ingrese un documento válido."
                        }
                    })}
                    error={errors?.numDoc?.message}
                />
            </div>
            <div className="form-group">
                <Input 
                    defaultValue={info.phone}
                    id="phone" 
                    name="phone" 
                    placeholder={"Teléfono"}
                    ref={register({
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^[0-9\-\+]{1,10}$/i,
                            message: "Ingrese un teléfono válido."
                        }
                    })}
                    error={errors?.phone?.message}
                />
            </div>
            <div className="form-group">
                <Input 
                    defaultValue={info.email}
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder={"Email"}
                    ref={register({
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Ingrese un email válido."
                        }
                    })}
                    error={errors?.email?.message}
                />
            </div>
        </div>

        <div 
            className="button-black" 
            style={{ margin: '20px 0'}} 
            onClick={submit}
        >
            <a>
                <span className="label">Continuar</span>
            </a>
        </div>
    </> );
}
 
export default StepOne