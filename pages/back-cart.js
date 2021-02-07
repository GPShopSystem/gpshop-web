import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import * as cartActions from '../redux/actions/cart'
import TableOrder from '../components/TableOrder';

export default function Index() {
    const dispatch = useDispatch()
    const router = useRouter();
    useEffect(() => {
        dispatch(cartActions.toggleCart(false))
    }, [])

	return (
        <div className="pageCart">
            <div className="shopping-cart">
                <div className="column-labels">
                    <label className="product-image">Imagen</label>
                    <label className="product-details">Producto</label>
                    <label className="product-price">Precio</label>
                    <label className="product-quantity">Cantidad</label>
                    <label className="product-removal">Eliminar</label>
                    <label className="product-line-price">Total</label>
                </div>

                <div className="product">
                    <div className="product-image">
                        <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
                    </div>
                    <div className="product-details">
                        <div className="product-title">Dingo Dog Bones</div>
                        <p className="product-description">Presentación 12 paquetes de 12 unidades</p>
                    </div>
                    <div className="product-price">12.99</div>
                    <div className="product-quantity">
                        <input type="number" value="2" min="1" />
                    </div>
                    <div className="product-removal">
                        <button className="remove-product">
                            Remove
                        </button>
                    </div>
                    <div className="product-line-price">25.98</div>
                </div>
            </div>
        </div>
	)
}