import React, { useEffect } from 'react';
import Search from '../../Search';
import Image from 'next/image'
import { ShoppingBag, Menu } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../../redux/actions/cart'
import * as cartGeneral from '../../../redux/actions/general'
import useResponsive from '../../../hooks/responsive.ts';
import Link from 'next/link'

const Header = () => {
    const openMenu = useSelector(state => state.general.toggleMenu)
    const dispatch = useDispatch()
    const responsive = useResponsive()
	const cart_total = useSelector(state => state.cart.list.reduce((a,b) => {
        return a + b.quantity
    }, 0))

    useEffect(()=>{
        const data = localStorage.getItem("myCart")
        dispatch(cartActions.setCart(JSON.parse(data) || []))
    }, [])

    return ( <>
        <div className="header-float">
            <Link href={'/'}>
                <a>
                    <div className="header-branding">
                        <Image
                            alt="GPSHOP logo"
                            src="/static/img/logo.png"
                            width={responsive.md || responsive.sm ? 80 : 96.85}
                            height={responsive.md || responsive.sm ? 44.5 : 53.86}
                        />
                    </div>
                </a>
            </Link>
            <div className="header-form">
                {
                    (responsive.md || responsive.sm) && (<div className="topMobile left">
                            <Menu onClick={() => {{
                                dispatch(cartGeneral.toggleMenu(!openMenu))
                            }}} />
                    </div>)
                }
                
                <Search placeholder="¿Qué productos necesitas?" icon />
                
                <div className="header-right topMobile right">
                    <div className="header-right-cart">
                        <ShoppingBag onClick={() => {{
                            dispatch(cartActions.toggleCart(true))
                            dispatch(cartActions.toggleCartMode(1))
                        }}} />
                        <span className="header-right-cart-count">{cart_total}</span>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default Header;