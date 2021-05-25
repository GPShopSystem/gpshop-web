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
    const isOffer = data.active_discount !== 0
    const priceToShow = isOffer ? data.original_price : data.price

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
                <div className="itemcart-description">
                    {data.presentation}
                </div>
                <div className={`itemcart-price ${isOffer ? 'offer' : ''}`}>
                    <span className="price">{currency}{priceToShow.toFixed(2)}</span>
                    {
                        isOffer && (
                            <span className="price promo">{currency}{data.price.toFixed(2)}</span>
                        )
                    }
                </div>
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