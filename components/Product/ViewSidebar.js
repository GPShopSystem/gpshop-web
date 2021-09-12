import React, { useEffect } from 'react';
import { X } from 'react-feather'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import * as generalActions from '../../redux/actions/general'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Buttons from './Buttons';
const View = dynamic(() => import('./View'));

const ViewSidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch()
	const selectGen = useSelector(state => state.general)
	const products = useSelector(state => state.cart.list)
	const showSidebarProduct = selectGen.toggleProduct
	const product = selectGen.product
    const inCart = products.find(e => e.id === product?.id)

    useEffect(() => {
        document.body.style.overflow = showSidebarProduct ? 'hidden' : 'auto';
    }, [showSidebarProduct])

    const closeCart = () => {
        const { pathname, query } = router
        router.push({ pathname, query }, undefined, { shallow: true })
        dispatch(generalActions.toggleProduct(false))
    }

    return ( <>
        <div className={`sidebarCart-back ${showSidebarProduct ? 'active' : ''}`} onClick={closeCart} />
        <div className={`sidebarCart sidebarProduct ${showSidebarProduct ? 'open' : ''}`}>
            <div className="sidebarCart-header">
                <h2>{product.title}</h2>
                <div className="sidebarCart-header-close" onClick={closeCart}><X /></div>
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
                        height: '100%'
                    }}
                    className="sidebarCart-cart-content-items"
                />
                )}
                >
                { product.title && <View buttons={false} product={product} />} 
            </Scrollbars>
            <div className='viewProduct-buttons'>
                <Buttons cart={inCart} data={product} />
            </div>
        </div>
    </>);
}
 
export default ViewSidebar;