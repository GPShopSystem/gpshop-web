import React from 'react';
import { ChevronRight } from 'react-feather'

const Stepper = () => {
    return ( 
        <div className="stepper">
            <span className="active">Información</span>
            <span><ChevronRight size={20} /></span>
            <span>Envío</span>
            <span><ChevronRight size={20} /></span>
            <span>Confirmación</span>
        </div>
     );
}
 
export default Stepper;