import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../redux/actions/cart'
import TableOrder from '../components/TableOrder';
import ItemCard from '../components/Product/ItemCart';
import Sticky from 'react-stickynode'
import Link from 'next/link'

export default function Index() {
    const dispatch = useDispatch()
	const products = useSelector(state => state.cart.list)

    useEffect(() => {
        dispatch(cartActions.toggleCart(false))
    }, [])

	return (
        <div className="pageCart">
            <div className="pageCart-item products boxBorder">
                <div className="contentTitle">
                    <h1>Lista de pedidos</h1>
                    <p>Verifica los productos y presiona <b>confirmar pedido</b> para continuar.</p>
                </div>
                {
                    products.map(e => <ItemCard key={e.id} data={e} />)
                }
            </div>
            <div className="pageCart-item">
                <Sticky top={120} innerZ={999}>
                    <div className="widgetOrder boxBorder">
                        <h3>Resúmen del pedido</h3>
                        <TableOrder />
                        <div className="button-black">
                            <Link href="/checkout">
                                <a>
                                    <span className="label">Confirmar pedido</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </Sticky>
            </div>
        </div>
	)
}