import React, { useEffect, useState } from 'react';
import Search from '../../Search';
import Image from 'next/image'
import { ShoppingBag, Menu, Search as SearchIcon, PhoneCall } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../../redux/actions/cart'
import * as cartGeneral from '../../../redux/actions/general'
import useResponsive from '../../../hooks/responsive.ts';
import Link from 'next/link'

const Header = () => {
    const openMenu = useSelector(state => state.general.toggleMenu)
    const [openSearch, setOpenSearch] = useState(false)
    const dispatch = useDispatch()
    const responsive = useResponsive()
    const isMobile = responsive.md || responsive.sm
	const cart_total = useSelector(state => state.cart.list.reduce((a,b) => {
        return a + b.quantity
    }, 0))

    useEffect(()=>{
        const data = localStorage.getItem("myCart")
        dispatch(cartActions.setCart(JSON.parse(data) || []))
    }, [])

    const renderSearch = () => {
        if(isMobile) {
            if(openSearch) return <Search placeholder="¿Qué productos necesitas?" icon />
        } else {
            return <Search placeholder="¿Qué productos necesitas?" icon />
        }
    }

    return ( <>
        <div className="header-float" style={{ height: isMobile && openSearch ? 135 : null}}>
            <Link href={'/'}>
                <a>
                    <div className="header-branding">
                        <Image
                            alt="GPSHOP logo"
                            src="/static/img/logo.png"
                            width={isMobile ? 80 : 96.85}
                            height={isMobile ? 44.5 : 53.86}
                        />
                    </div>
                </a>
            </Link>
            <div className="header-form">
                {
                    (isMobile) && (<div className="topMobile left">
                            <Menu onClick={() => {{
                                dispatch(cartGeneral.toggleMenu(!openMenu))
                            }}} />
                    </div>)
                }

                {
                    renderSearch()
                }
                
                <div className="header-right topMobile right">
                    {
                         (isMobile) && (
                            <div className="header-right-cart" style={{marginRight: 8}}>
                                <SearchIcon onClick={() => {{
                                    setOpenSearch(!openSearch)
                                }}} />
                            </div>
                         )
                    }
                    {
                        !isMobile && (
                            <div className="header-right-cart" style={{marginRight: 8}}>
                                <PhoneCall style={{marginRight: 5}} /> +51 936275556 
                            </div>
                        )
                    }
                    
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