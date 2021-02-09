import React, { Fragment } from 'react';
import { ChevronRight } from 'react-feather'

const Stepper = ({currentStep = 1, steps = []}) => {
    return ( 
        <div className="stepper">
            {
                steps.map((e,i) => (
                    <Fragment key={i}>
                        <span  className={e.step === currentStep ? 'active' : ''}>{e.label}</span>
                        <span className="separator"><ChevronRight size={20} /></span>
                    </Fragment>
                ))
            }
        </div>
     );
}
 
export default Stepper;