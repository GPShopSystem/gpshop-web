import React from 'react';
import StepOne from './steps/StepOne'
import { useSelector } from 'react-redux'
import Stepper from '../../components/Stepper';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';

const Steps = () => {
    const currentStep = useSelector(state => state.checkout.currentStep)

    const steps = [
        {
            step: 1,
            label: 'Información'
        },
        {
            step: 2,
            label: 'Envío'
        },
        {
            step: 3,
            label: 'Confirmación'
        },
    ]


    const content = () => {
        switch (currentStep){
            case 1: 
                return ( <StepOne /> );
            case 2:
                return ( <StepTwo /> );
            case 3:
                return ( <StepThree /> );
            case 4:
                return ( <StepFour /> );
            default: 
                return ( <StepOne /> );
        }
    }

    return (
        <>
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="stepper-content">
                { content() }
            </div>
        </>
    )
    
}
 
export default Steps;