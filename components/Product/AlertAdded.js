import React, { useEffect } from 'react'

const AlertAdded = ({ show, onFinish }) => {
    useEffect(() => {
        if(show) {
            setTimeout(() => {
                onFinish(false)
            }, 1500)
        }
    },[show])
    if(!show) return ''
    return ( <div className="productCard-alert">Producto añadido correctamente al carrito.</div> );
}
 
export default AlertAdded;