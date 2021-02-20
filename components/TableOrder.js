import React from 'react';
import { useTotalCartPrice } from '../hooks/hooks'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../redux/actions/cart'
import { Eye } from 'react-feather'

const Item = ({ product }) => {
    const currency = process.env.currency
    return (
        <tr className="cart_item">
            <td className="product-name">
                <span><strong>× {product.quantity}</strong> {product.title}</span>
            </td>
            <td className="product-total">
                <span>
                    {currency}{product.price.toFixed(2)}
                </span>					
            </td>
        </tr>
    )
}

const TableOrder = ({ showTotalProducts, showProducts }) => {
    const currency = process.env.currency
    const totalPrice = useTotalCartPrice()
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.list)
    const cart_total = products.reduce((a,b) => {
        return a + b.quantity
    }, 0)

    const openCart = () => {
        dispatch(cartActions.toggleCart(true))
        dispatch(cartActions.toggleCartMode(2))
    }

    const renderHead = () => {
        return (
            <thead>
                <tr>
                    <th className="product-name">Producto</th>
                    <th className="product-total">Subtotal</th>
                </tr>
            </thead>
        )
    }

    return (
        <table className="tableOrder">
            {
                showTotalProducts && (
                    <>
                        { renderHead() }
                        <tbody>
                            <tr className="cart_item">
                                <td className="product-name">
                                    <span 
                                        style={
                                            {display: 'flex', 
                                            alignItems: 'center',
                                            cursor: 'pointer'}
                                        }
                                    >
                                        {cart_total} productos seleccionados <Eye size={16} onClick={openCart}/>
                                    </span>
                                </td>
                                <td className="product-total">
                                    <span>
                                        {currency}{totalPrice.toFixed(2)}
                                    </span>					
                                </td>
                            </tr>
                        </tbody>
                    </>
                )
            }
            {
                showProducts && (
                    <>
                        { renderHead() }
                        <tbody>
                            {
                                products.map(p => <Item product={p} key={p.id}/>)
                            }
                        </tbody>
                    </>
                )
            }
            
            <tfoot>
                <tr>
                    <th>Subtotal</th>
                    <td><span>{currency}{totalPrice.toFixed(2)}</span></td>
                </tr>
                {<tr>
                    <th>Envío</th>
                    <td>
                        <ul className="shipping">
                            <li>
                                Gratis
                            </li>
                        </ul>
                    </td>
                </tr>}
                <tr>
                    <th>Total</th>
                    <td><strong>{currency}{totalPrice.toFixed(2)}</strong>
                </td>
                </tr>
            </tfoot>
        </table>
    )
}
 
export default TableOrder;