import React from 'react';
import TableOrder from '../components/TableOrder';
import Sticky from 'react-stickynode'
import Steps from '../containers/checkout'
import { useSelector } from 'react-redux'

export default function Index() {
    const currentStep = useSelector(state => state.checkout.currentStep)
    return (
        <div className="pageCheckout">
            <div className="pageCheckout-item pageCheckout-information boxBorder">
                <Steps />
            </div>
            
            {
                currentStep !== 4 && ( // ty-page
                    <div className="pageCheckout-item ">
                        <Sticky top={120} innerZ={999}>
                            <div className="widgetOrder boxBorder">
                                <h3>Resúmen del pedido</h3>
                                <TableOrder showTotalProducts/>
                            </div>
                        </Sticky>
                    </div>
                )
            }
            
        </div>
	)
}