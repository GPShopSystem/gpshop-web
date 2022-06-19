import React, { useEffect, useState } from 'react';
import { X } from 'react-feather'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import * as generalActions from '../../redux/actions/general'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Buttons from './Buttons'
import AlertAdded from './AlertAdded'
import Link from 'next/link'
const View = dynamic(() => import('./View'));

const ViewSidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch()
	const selectGen = useSelector(state => state.general)
	const products = useSelector(state => state.cart.list)
	const showSidebarProduct = selectGen.toggleProduct
	const product = selectGen.product
    const inCart = products.find(e => e.id === product?.id)
    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        document.body.style.overflow = showSidebarProduct ? 'hidden' : 'auto';
    }, [showSidebarProduct])

    const closeSidebar = () => {
        const { pathname, query } = router
        router.push({ pathname, query }, undefined, { shallow: true })
        dispatch(generalActions.toggleProduct(false))
    }

	const sendOrderWhatsapp = () => {
		const data = localStorage.getItem("myCart")
		const dataParsed = JSON.parse(data) || [];
		const productFound = dataParsed.find(parsed => parsed.id === product.id);

		const text = `Hola, quisiera una cotización de los siguientes productos: \n
		- ${product.sku} | ${product.title}(${productFound.quantity} ${productFound.quantity === 1 ? 'unidad' : 'unidades'})
		`;
		const textEncode = encodeURI(text);
		const url = `https://api.whatsapp.com/send?phone=51940147037&text=${textEncode}`;
		window.open(url);
	}

    return ( <>
        <div className={`sidebarCart-back ${showSidebarProduct ? 'active' : ''}`} onClick={closeSidebar} />
        <div className={`sidebarCart sidebarProduct ${showSidebarProduct ? 'open' : ''}`}>
            <div className="sidebarCart-header">
                <h2>{product.title}</h2>
                <div className="sidebarCart-header-close" onClick={closeSidebar}><X /></div>
            </div>
            <Scrollbars
                universal
                autoHeight
                autoHeightMax={"100vh"}
                style={{height: 'calc(100vh - 85px)'}}
                renderView={(props) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        flexFrow: 2,
                        height: '100%',
                        position: 'initial'
                    }}
                    className="sidebarCart-cart-content-items"
                />
                )}
                >
                { product.title && <View buttons={false} product={product} />}
                <AlertAdded show={showAlert} onFinish={() => setShowAlert(false)}/>
            </Scrollbars>
            <div className='viewProduct-buttons' style={{paddingBottom: 15}}>
                <Buttons openAlert={() => setShowAlert(true)} cart={inCart} data={product} />
            </div>
            <div className='sidebarCart-cart-total' style={{paddingBottom: 20}} onClick={() => sendOrderWhatsapp()}>
                {/*<Link href="/cart"> Ir al carrito</Link>*/}
							<a>
								<span className="label">Enviar pedido</span>
							</a>
            </div>
        </div>
    </>);
}

export default ViewSidebar;
