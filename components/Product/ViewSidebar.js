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
import useResponsive from '../../hooks/responsive.ts'
import { sendWhatsAppOrders } from '../../libs/utils'
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
            <div className='sidebarCart-cart-total' style={{paddingBottom: 20}} onClick={() => sendWhatsAppOrders()}>
                {/*<Link href="/cart"> Ir al carrito</Link>*/}
							<a>
								<span className="label">Solicitar cotización</span>
							</a>
            </div>
        </div>
    </>);
}

export default ViewSidebar;
