import React from 'react';
import { useTotalCartPrice } from '../hooks/hooks'
import { useSelector } from 'react-redux'

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

const TableOrder = ({ showProducts }) => {
    const currency = process.env.currency
    const totalPrice = useTotalCartPrice()
	const products = useSelector(state => state.cart.list)
    return (
        <table className="tableOrder">
            {
                showProducts && (
                    <>
                        <thead>
                            <tr>
                                <th className="product-name">Producto</th>
                                <th className="product-total">Subtotal</th>
                            </tr>
                        </thead>
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
                    <td><span>{currency}1212</span></td>
                </tr>
                {/* <tr>
                    <th>Shipping</th>
                    <td>
                        <ul className="shipping">
                            <li>
                                213
                            </li>
                        </ul>
                    </td>
                </tr> */}
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