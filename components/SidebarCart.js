import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'react-feather'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../redux/actions/cart'
import * as checkoutActions from '../redux/actions/checkout'
import { useTotalCartPrice, userCanOrder as userCanPurchase } from '../hooks/hooks'
import Link from 'next/link'
import ItemCard from './Product/ItemCart'
import { Tooltip } from 'react-tippy'

const SidebarCart = () => {
    const dispatch = useDispatch()
		const cleanCart = () => dispatch(cartActions.resetCart())
		const showSidebarCart = useSelector(state => state.cart.toggleCart)
		const modeCart = useSelector(state => state.cart.toggleCartMode)
		const products = useSelector(state => state.cart.list)
    const isEmptyCart = products.length === 0
    const totalPrice = useTotalCartPrice()
    const userCanOrder = userCanPurchase()
    const currency = process.env.currency

		const sendOrderWhatsapp = () => {
			const data = localStorage.getItem("myCart")
			const dataParsed = JSON.parse(data) || [];

			const text = `Hola, quisiera una cotización de los siguientes productos:
				${dataParsed.map(order => `\n - ${order.sku} | ${order.title}(${order.quantity} ${order.quantity === 1 ? 'unidad' : 'unidades'})`)}`;
			const textEncode = encodeURIComponent(text);
			const url = `https://api.whatsapp.com/send?phone=51940147037&text=${textEncode}`;
			window.open(url);
		}

    useEffect(() => {
        document.body.style.overflow = showSidebarCart ? 'hidden' : 'auto';
    }, [showSidebarCart])

    const closeCart = () => dispatch(cartActions.toggleCart(false))

    const renderButtonProccess = () => {
        const amount = (
            <span className="amount">
                <span>{currency}{totalPrice.toFixed(2)}</span>
            </span>
        )

        if(modeCart === 2){
            return (
                <div className="sidebarCart-cart-total" onClick={closeCart}>
                    <a>
                        <span className="label">Cerrar</span>
                        { amount }
                    </a>
                </div>
            )
        }

        if(userCanOrder) {
            return (
                <div className="sidebarCart-cart-total" onClick={() => {
                    // dispatch(checkoutActions.changeStep(1))
                    // closeCart()
										sendOrderWhatsapp()
                }}>
									<a>
										<span className="label">Enviar pedido</span>
									</a>
                    {/*<Link href="/checkout">
                        <a>
                            <span className="label">Enviar pedido</span>
                            { amount }
                        </a>
                    </Link>*/}
                </div>
            )
        } else {
            return <Tooltip arrow title="El pedido mínimo es de S/.10">
                <div className="sidebarCart-cart-total disabled">
                    <a>
                        <span className="label">Procesar pedido</span>
                        { amount }
                    </a>
                </div>
            </Tooltip>
        }
    }

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

                { renderButtonProccess() }
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
                {/*{
                    !isEmptyCart && (
                        <div className="sidebarCart-cart-minimum">
                            Pedido mínimo: S/.10
                        </div>
                    )
                }*/}
							<div className='sidebarCart-clean-cart' onClick={() => {
								cleanCart()
								closeCart()
							}}>
									<span>Limpiar carrito</span>
								</div>
                <div className="sidebarCart-cart-content">
                    { renderContent() }
                </div>
            </div>
        </div>
    </>);
}

export default SidebarCart;
