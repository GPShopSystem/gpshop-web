import React from 'react';
import { useSelector } from 'react-redux'

const StepFour = () => {
    const stepOneData = useSelector(state => state.checkout.stepOne)
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>Pedido enviado con éxito</h3>
            <p>Hemos recibido tu solicitud de pedido. En el transcurso del día estaremos contactándonos a través de <b>correo electrónico</b> a <b>{stepOneData.email}</b>.</p>
        </div>
    )
}
 
export default StepFour;