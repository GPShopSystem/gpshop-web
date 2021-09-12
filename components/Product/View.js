import React from 'react';
import Router from 'next/router';
import Buttons from './Buttons';
import { useSelector } from 'react-redux'
// import ActionInput from './ActionInput';
import { XCircle, ArrowLeft, Truck, DollarSign, Shield } from 'react-feather'

const View = ({ product, showButtonBack, isModal, onClose, buttons = true }) => {
	const products = useSelector(state => state.cart.list)
    const inCart = products.find(e => e.id === product.id)
    const isOffer = product.active_discount !== 0
    const priceToShow = isOffer ? product.original_price : product.price
    const currency = process.env.currency
    
	return ( 
        <div className="viewProduct">
            {
                isModal && (
                    <div onClick={onClose} className="viewProduct-close">
                        <XCircle />
                    </div>
                )
            }
			<div className="viewProduct-left">
				{
					showButtonBack && (
						<div className="viewProduct-back" onClick={Router.back}><ArrowLeft size={16} /> volver</div>
					)
				}
				<img src={product.image} className="useImage"/>
			</div>
			<div className="viewProduct-right">
				<h1 className="title">{product.title}</h1>
				<div className={`viewProduct-right-price ${isOffer ? 'offer' : ''}`}>
					<span className="price">{currency}{priceToShow.toFixed(2)}</span>
					{
						isOffer && (
							<span className="price promo">{currency}{product.price.toFixed(2)}</span>
						)
					}
				</div>
				<div>
					<ul className="viewProduct-right-security">
						<li><Truck size={14} /> <span>Envío a domicilio</span></li>
						<li><Shield size={14} /> <span>Seguridad garantizada</span></li>
					</ul>
				</div>

				<p><b>Presentación: </b> Paquete de 12 unidades</p>
				<p className="viewProduct-right-description">
					{product.description}
				</p>
				
				{
					buttons && (
						<div className="viewProduct-right-action"> 
							{/* <ActionInput data={product} /> */}
							<Buttons cart={inCart} data={product} />
						</div>
					)
				}
				
			</div>
		</div>
     );
}
 
export default View;