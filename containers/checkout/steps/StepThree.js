import React, { useState} from 'react';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { useDispatch, useSelector } from 'react-redux'
import * as checkoutTypes from '../../../redux/actions/checkout'
import * as cartTypes from '../../../redux/actions/cart'
import { useTotalCartPrice, userCanOrder as userCanPurchase } from '../../../hooks/hooks'
import { Tooltip } from 'react-tippy';

const StepThree = () => {
    const [isProcess, setProcessing] = useState(false)
    const [isComplete, setComplete] = useState(false)
    const stepOneData = useSelector(state => state.checkout.stepOne)
    const stepTwoData = useSelector(state => state.checkout.stepTwo)
    const listCart = useSelector(state => state.cart.list)
    const info = {...stepOneData, ...stepTwoData }
    const ubigeo = useSelector(state => state.general.ubigeo)
    const dispatch = useDispatch()
    const userCanOrder = userCanPurchase()
    const totalPrice = useTotalCartPrice()
    const submit = async () => {
        setProcessing(true)
        const departamentName = ubigeo.departamentos.find(e => e.id_ubigeo === stepTwoData.departamento)
        const provinciaName = ubigeo.provincias[info.departamento].find(e => e.id_ubigeo === stepTwoData.provincia)
        const districtName = ubigeo.distritos[info.provincia].find(e => e.id_ubigeo === stepTwoData.distrito)

        const body = {
            "name": stepOneData.firstName,
            "last_name": stepOneData.lastName,
            "type_doc": stepOneData.typeDoc,
            "num_doc": stepOneData.numDoc,
            "phone": stepOneData.phone,
            "email": stepOneData.email,
            "departament": departamentName.nombre_ubigeo,
            "province": provinciaName.nombre_ubigeo,
            "district": districtName.nombre_ubigeo,
            "address": stepTwoData.address,
            "total": totalPrice,
            "products": listCart.map(e => ({
                "title": e.title,
                "id": e.id,
                "quantity": e.quantity,
                "price_paid": e.price,
                "discount": e.discount,
                "active_discount": e.active_discount,
                "price_total": e.original_price * e.quantity,
                "original_price": e.original_price,
            }))
        }
        const createService = await fetch(
            process.env.NEXT_PUBLIC_URL_BASE + '/api/order/create',
            {
                method: 'POST',
                body: JSON.stringify(body) // body data type must match "Content-Type" header
            }
        )
        const json = await createService.json()
        if(json.success) {
            setComplete(true)
            dispatch(checkoutTypes.resetStep())
            dispatch(cartTypes.resetCart())
        } else {
            //error
        }
        setProcessing(false)
    }

    const renderTypeUser = () => {
        if(info.typeDoc == 1) {
            return (
                <>
                    <Input 
                        defaultValue={info.firstName} 
                        id="firstName" 
                        name="firstName" 
                        placeholder={"Nombres"}
                        disabled
                    />

                    <Input 
                        defaultValue={info.lastName} 
                        id="lastName" 
                        name="lastName" 
                        placeholder={"Apellidos"}
                        disabled
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
                        disabled
                    />
                </>
            )
        }
    }

    const renderButtonSubmit = () => {
        if(userCanOrder) {
            return (
                <div 
                    className="button-black" 
                    onClick={submit}
                >
                    <span className="label">Realizar pedido</span>
                </div>
            )
        } else {
            return <Tooltip arrow title="El pedido mínimo es de S/.10">
                <div 
                    className="button-black disabled" 
                >
                    <span className="label">Realizar pedido</span>
                </div>
            </Tooltip>
        }
    }

    if(isProcess) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <video src="/static/animations/cart_loader.mp4" autoPlay loop width="450" style={{maxWidth: '100%'}} ></video>
                <h3 style={{position:'absolute', top: 320}}>Estamos procesando el pedido</h3>
            </div>
        )
    }

    if(isComplete) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Pedido enviado con éxito</h3>
                <p>Hemos recibido tu solicitud de pedido. En el transcurso del día estaremos contactándonos a través de <b>correo electrónico</b> a <b>{info.email}</b>.</p>
            </div>
        )
    }
    
    return ( <div className="pageCheckout-information-form">
            <div className="form-group">
                <p>Verifica los <b>datos ingresados</b> para continuar con el pedido:</p>
            </div>
            <div className="form-group">
                <div className="type-client">
                    <b>Tipo de cliente:</b>
                    <div>
                        <input
                            value={1}
                            id="type_natural"
                            type={'radio'}
                            name="typeDoc"
                            checked={1 == info.typeDoc}
                            disabled
                        />
                        <label htmlFor='type_natural'>Persona Natural</label>
                    </div>
                    <div>
                        <input
                            value={2}
                            type={'radio'}
                            id="type_company"
                            name="typeDoc"
                            checked={2 == info.typeDoc}
                            disabled
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
                    disabled
                />
            </div>
            <div className="form-group">
                <Input 
                    defaultValue={info.phone}
                    id="phone" 
                    name="phone" 
                    placeholder={"Teléfono"}
                    disabled
                />
            </div>
            <div className="form-group">
                <Input 
                    defaultValue={info.email}
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder={"Email"}
                    disabled
                />
            </div>
            <div className="form-group">
                <Select 
                    options={ubigeo.departamentos} 
                    onChange={(e)=> setInfo({ ...info, departamento: e.target.value, provincia: '', distrito: ''})}
                    idOption={'id_ubigeo'}
                    labelOption={'nombre_ubigeo'}
                    value={info.departamento}
                    disabled
                    placeholder="Departamento" />
            </div>
            <div className="form-group">
                <Select 
                    options={ubigeo.provincias[info.departamento]} 
                    value={info.provincia}
                    idOption={'id_ubigeo'}
                    labelOption={'nombre_ubigeo'}
                    placeholder="Provincia"
                    disabled />
            </div>
            <div className="form-group">
                <Select 
                    options={ubigeo.distritos[info.provincia]} 
                    idOption={'id_ubigeo'}
                    value={info.distrito}
                    labelOption={'nombre_ubigeo'}
                    placeholder="Distrito"
                    disabled />
            </div>

            <div>
                <Input 
                    id="address" 
                    name="address" 
                    placeholder={"Dirección"}
                    defaultValue={info.address}
                    disabled
                />
            </div>

            {renderButtonSubmit()}

            <div 
                className="button-white" 
                style={{ marginBottom: '20px'}} 
                onClick={() => dispatch(checkoutTypes.changeStep(2))}
            >
                <span className="label">Retroceder</span>
            </div>
    </div> );
}
 
export default StepThree;