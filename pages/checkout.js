import React from 'react';
import TableOrder from '../components/TableOrder';
import Sticky from 'react-stickynode'
import Steps from '../containers/checkout'

export default function Index() {
    return (
        <div className="pageCheckout">
            <div className="pageCheckout-item pageCheckout-information boxBorder">
                <Steps />
            </div>
            
            <div className="pageCheckout-item ">
                <Sticky top={120} innerZ={999}>
                    <div className="widgetOrder boxBorder">
                        <h3>Resúmen del pedido</h3>
                        <TableOrder showTotalProducts/>
                    </div>
                </Sticky>
            </div>
        </div>
	)
}