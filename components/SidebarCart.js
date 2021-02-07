import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'react-feather'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../redux/actions/cart'
import { useTotalCartPrice } from '../hooks/hooks'
import Link from 'next/link';
import ItemCard from './Product/ItemCart';

const SidebarCart = () => {
    const dispatch = useDispatch()
	const showSidebarCart = useSelector(state => state.cart.toggleCart)
	const products = useSelector(state => state.cart.list)
    const isEmptyCart = products.length === 0
    const totalPrice = useTotalCartPrice()
    const currency = process.env.currency

    useEffect(() => {
        document.body.style.overflow = showSidebarCart ? 'hidden' : 'auto';
    }, [showSidebarCart])

    const closeCart = () => dispatch(cartActions.toggleCart(false))

    const renderContent = () => {
        if(isEmptyCart) {
            return (
                <span className="iconEmpty"><ShoppingBag /></span>
            )
        }
        return (
            <>
                <Scrollbars 
                    universal
                    autoHeight
                    autoHeightMax={"100vh"}
                    renderView={(props) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            flexFrow: 2,
                            height: '100%'
                        }}
                        className="sidebarCart-cart-content-items"
                    />
                    )}
                    >
                    {
                        products.map(e => <ItemCard key={e.id} data={e} />)
                    }
                </Scrollbars>
                <div className="sidebarCart-cart-total" onClick={() => dispatch(cartActions.toggleCart(false))}>
                    <Link href="/checkout">
                        <a>
                            <span className="label">Procesar pedido</span>
                            <span className="amount">
                                <span>{currency}{totalPrice.toFixed(2)}</span>
                            </span>
                        </a>
                    </Link>
                </div>
            </>
        )
    }

    return ( <>
        <div className={`sidebarCart-back ${showSidebarCart ? 'active' : ''}`} onClick={closeCart} />
        
        <div className={`sidebarCart ${showSidebarCart ? 'open' : ''} ${isEmptyCart ? 'isEmpty' : ''}`}>
            <div className="sidebarCart-header">
                <h2>Lista de pedidos</h2>
                <div className="sidebarCart-header-close" onClick={closeCart}><X /></div>
            </div>
            <div className="sidebarCart-cart">
                <div className="sidebarCart-cart-content">
                    { renderContent() }
                </div>
            </div>
        </div>
    </>);
}
 
export default SidebarCart;