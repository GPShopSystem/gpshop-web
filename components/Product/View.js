import React from 'react';
import Router from 'next/router';
import Buttons from './Buttons';
// import ActionInput from './ActionInput';
import { XCircle, ArrowLeft } from 'react-feather'

const View = ({ product, showButtonBack, isModal, onClose }) => {
    
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
				<div className="viewProduct-right-price">
					S/.{product.price.toFixed(2)}
				</div>
				<p><b>Presentación: </b> Paquete de 12 unidades</p>
				<p className="viewProduct-right-description">
					{product.description}
				</p>
				<div className="viewProduct-right-action"> 
                    {/* <ActionInput data={product} /> */}
					<Buttons data={product} />
				</div>
			</div>
		</div>
     );
}
 
export default View;