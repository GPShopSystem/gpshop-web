import React, { useEffect } from 'react';
import { X } from 'react-feather'
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import * as generalActions from '../../../redux/actions/general'
import Sidebar from '../Sidebar';

const HeaderMobile = () => {
    const dispatch = useDispatch()
	const showSidebarCart = useSelector(state => state.general.toggleMenu)

    useEffect(() => {
        document.body.style.overflow = showSidebarCart ? 'hidden' : 'auto';
    }, [showSidebarCart])

    const closeCart = () => dispatch(generalActions.toggleMenu(false))

    return ( <>
        <div className={`sidebarCart-back ${showSidebarCart ? 'active' : ''}`} onClick={closeCart} />
        <div className={`sidebarCart sidebarMenu ${showSidebarCart ? 'open' : ''}`}>
            <div className="sidebarCart-header">
                <h2>Opciones</h2>
                <div className="sidebarCart-header-close" onClick={closeCart}><X /></div>
            </div>
            <Sidebar />
        </div>
    </>);
}
 
export default HeaderMobile;