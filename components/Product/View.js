import React from 'react';
import Router from 'next/router';
import Buttons from './Buttons';
import useResponsive from '../../hooks/responsive.ts'
import { useSelector } from 'react-redux'
import { sendWhatsAppOrder } from '../../libs/utils'
// import ActionInput from './ActionInput';
import { XCircle, ArrowLeft, Truck, DollarSign, Shield } from 'react-feather'

const View = ({ product, showButtonBack, isModal, onClose, buttons = true }) => {
	const responsive = useResponsive()
	const products = useSelector(state => state.cart.list)
  const inCart = products.find(e => e.id === product.id)
  const isOffer = product.active_discount !== 0
  const priceToShow = isOffer ? product.original_price : product.price
  const currency = process.env.currency
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
	const isMobile = responsive.md || responsive.sm

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
				<h1 className="title">🌟 {product.title}</h1>
        <div>Última actualización: {mm + '/' + dd + '/' + yyyy}</div>
				<div className={`viewProduct-right-price ${isOffer ? 'offer' : ''}`}>
					{/** <span className="price">{currency}{priceToShow.toFixed(2)}</span> */}
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

				{product.presentation && (<p><b>Presentación: </b> {product.presentation}</p>) } 
				<p className="viewProduct-right-description">
					{product.description}
				</p>

        {
          /**<div className="viewProduct-right-action"> 
                <Buttons cart={inCart} data={product} />
          </div> */
        }
				
				{
					buttons && (
            <>
              <div className='sidebarCart-cart-total' style={{paddingBottom: 20, width:'max-content'}} onClick={() => sendWhatsAppOrder(product)}>
                  {/*<Link href="/cart"> Ir al carrito</Link>*/}
                <a>
                  <span className="label">Solicitar cotización por WhatsApp</span>
                </a>
              </div>
            </>
					)
				}
				
			</div>
		</div>
     );
}
 
export default View;