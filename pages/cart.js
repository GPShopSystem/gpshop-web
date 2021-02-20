import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TableOrder from '../components/TableOrder';
import ItemCard from '../components/Product/ItemCart';
import { userCanOrder as userCanPurchase } from '../hooks/hooks'
import Sticky from 'react-stickynode'
import Link from 'next/link'
import { Tooltip } from 'react-tippy'
import * as checkoutActions from '../redux/actions/checkout'

export default function Index() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.list)
    const userCanOrder = userCanPurchase()
    
    const renderButtonConfirm = () => {
        if(userCanOrder) {
            return (
                <Link href="/checkout">
                    <div 
                        className="button-black" 
                        style={{marginTop: 20}} 
                        onClick={() => dispatch(checkoutActions.changeStep(1))}
                    >
                        <span className="label">Confirmar pedido</span>
                    </div>
                </Link>
            )
        } else {
            return (
                <Tooltip style={{display: 'block'}} arrow title="El pedido mínimo es de S/.1000">
                    <div 
                        className="button-black disabled" 
                        style={{marginTop: 20}}
                    >
                        <span className="label">Procesar pedido</span>
                    </div>
                </Tooltip>
            )
        }
    }

	return (
        <div className="pageCart">
            <div className="pageCart-item products boxBorder">
                <div className="contentTitle">
                    <h1>Lista de pedidos</h1>
                    <p>Verifica los productos y presiona <b>procesar pedido</b> para continuar.</p>
                </div>
                {
                    products.map(e => <ItemCard key={e.id} data={e} />)
                }
            </div>
            <div className="pageCart-item">
                <Sticky top={120} innerZ={999}>
                    <div className="widgetOrder boxBorder">
                        <h3>Resúmen del pedido</h3>
                        <TableOrder showTotalProducts />
                        
                        {renderButtonConfirm()}
                    </div>
                </Sticky>
            </div>
        </div>
	)
}