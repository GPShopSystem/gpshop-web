import React from 'react';
import { XCircle, Minus, Plus } from 'react-feather'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../redux/actions/cart'

const ItemCard = ({data}) => {
    const dispatch = useDispatch()
    const addToCart = () => dispatch(cartActions.addCart({...data, quantity: 1}))
    const removeToCart = () => dispatch(cartActions.removeCart({...data, quantity: 1}))
    const cleanItemCart = () => dispatch(cartActions.cleanItemCart(data))
    const currency = process.env.currency

    return (
        <div className="itemcart">
            <div className="itemcart-thumb">
                <img 
                    alt={data.title}
                    src={data.image} 
                    />
                <span onClick={cleanItemCart} className="remove" href="#"><XCircle color={"#FFF"} /></span>
            </div>
            <div className="itemcart-info">
                <a className="itemcart-title">
                    {data.title}
                </a>
                <span className="itemcart-price">
                    Precio por unidad {currency}{data.price}  
                </span>
                <div className="itemcart-count">
                    <div className="itemcart-count-wrapper">
                        <span className="itemcart-count-update decrement" onClick={removeToCart}><Minus size={14} /></span>
                        <span className="itemcart-count-value">{data.quantity}</span>
                        <span className="itemcart-count-update increment" onClick={addToCart}><Plus size={14} /></span>
                    </div>
                    <div className="itemcart-count-total">
                        {currency}{(data.price * data.quantity).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default ItemCard;