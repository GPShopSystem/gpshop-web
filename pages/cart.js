import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TableOrder from '../components/TableOrder';
import ItemCard from '../components/Product/ItemCart';
import { userCanOrder as userCanPurchase } from '../hooks/hooks'
import Sticky from 'react-stickynode'
import Link from 'next/link'
import { Tooltip } from 'react-tippy'
import * as checkoutActions from '../redux/actions/checkout'
import { createDataTree } from '../hooks/hooks'
import * as generalActions from '../redux/actions/general'
import useResponsive from '../hooks/responsive.ts';

export default function Index({categories}) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.list)
    const userCanOrder = userCanPurchase()
    const responsive = useResponsive()
    const isMobile = responsive.md || responsive.sm
    console.log(isMobile);
	useEffect(() => {
		dispatch(generalActions.setCategories(categories))
	}, [categories])
    
    const renderButtonConfirm = () => {
        if(userCanOrder) {
            return (
                <Link href="/checkout">
                    <div 
                        className="button-black" 
                        style={{marginTop: 20}} 
                        onClick={() => dispatch(checkoutActions.changeStep(1))}
                    >
                        <span className="label">Confirmar pedido</span>
                    </div>
                </Link>
            )
        } else {
            return (
                <Tooltip style={{display: 'block'}} arrow title="El pedido mínimo es de S/.10">
                    <div 
                        className="button-black disabled" 
                        style={{marginTop: 20}}
                    >
                        <span className="label">Procesar pedido</span>
                    </div>
                </Tooltip>
            )
        }
    }

    const renderProducts = () => {
        if(products.length === 0) return <div className="empty">No se encontraron productos. <Link href="/"><a>Ver productos</a></Link></div>
        return products.map(e => <ItemCard key={e.id} data={e} />)
    }

	return (
        <div className="pageCart">
            <div className="pageCart-item products boxBorder">
                <div className="contentTitle">
                    <h1>Lista de pedidos</h1>
                    <p>Verifica los productos y presiona <b>procesar pedido</b> para continuar.</p>
                </div>
                {
                    renderProducts()
                }
            </div>
            <div className="pageCart-item">
                <Sticky top={120} enabled={!isMobile} innerZ={999}>
                    <div className="widgetOrder boxBorder">
                        <h3>Resúmen del pedido</h3>
                        <TableOrder showTotalProducts />
                        
                        {renderButtonConfirm()}
                    </div>
                </Sticky>
            </div>
        </div>
	)
}

export async function getStaticProps() {
	const resCategory = await fetch(
		process.env.URL_BASE + '/api/category'
	)
	const jsonCategory = await resCategory.json()
		
	return {
		props: {
			categories: createDataTree(jsonCategory.data)
		},
	}
}