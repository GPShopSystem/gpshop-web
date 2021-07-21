import React, { useEffect } from 'react';
import Search from '../../Search';
import Image from 'next/image'
import { ShoppingBag } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../../redux/actions/cart'
import useResponsive from '../../../hooks/responsive.ts';
import Link from 'next/link'

const Header = () => {
    const dispatch = useDispatch()
    const responsive = useResponsive()
    console.log(responsive)
	const cart_total = useSelector(state => state.cart.list.reduce((a,b) => {
        return a + b.quantity
    }, 0))

    useEffect(()=>{
        const data = localStorage.getItem("myCart")
        dispatch(cartActions.setCart(JSON.parse(data) || []))
    }, [])

    return ( <header>
        <div className="header-float">
            <Link href={'/'}>
                <a>
                    <div className="header-branding">
                        <Image
                            alt="GPSHOP logo"
                            src="/static/img/logo.png"
                            width={responsive.sm ? 60 : 116.85}
                            height={responsive.sm ? 33.38 : 65}
                        />
                    </div>
                </a>
            </Link>
            <div className="header-form">
                <Search placeholder="¿Qué productos necesitas?" icon />
            </div>
            <div className="header-right">
                <div className="header-right-cart">
                    <ShoppingBag onClick={() => {{
                        dispatch(cartActions.toggleCart(true))
                        dispatch(cartActions.toggleCartMode(1))
                    }}} />
                    <span className="header-right-cart-count">{cart_total}</span>
                </div>
            </div>
        </div>
    </header> );
}
 
export default Header;