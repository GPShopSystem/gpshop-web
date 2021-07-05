import React, { useState, useEffect } from 'react';
import { XCircle, Minus, Plus } from 'react-feather'
import { useDispatch } from 'react-redux'
import * as cartActions from '../../redux/actions/cart'

const ItemCard = ({data}) => {
    const dispatch = useDispatch()
    const cleanItemCart = () => dispatch(cartActions.cleanItemCart(data))
    const [count, setCount] = useState(data.quantity)
    const currency = process.env.currency
    const isOffer = data.active_discount !== 0
    const priceToShow = isOffer ? data.original_price : data.price
    
    const manualDispatchUpdate = (q) => {
        dispatch(cartActions.updateCountItemCart({...data, quantity: q}))
    }
    
    useEffect(() => {
        if(count > 0) manualDispatchUpdate(count)
    },[count]);

    useEffect(() => {
        setCount(data.quantity)
    }, [data.quantity])

    const removeToCart = () => {
        if(count - 1 === 0) {
            manualDispatchUpdate(0)
        }
        setCount(count - 1)
    }

    const onchange = (e) => {
        let value = parseInt(e.target.value.replace(/[^\d]/,''), 10)
        if(isNaN(value)) value = ''
        setCount(value)
    }

    const onBlur = (e) => {
        let value = parseInt(e.target.value.replace(/[^\d]/,''), 10)
        if(isNaN(value)) value = 0
        if(value === 0) {
            manualDispatchUpdate(0)
        }
        setCount(value)
    }

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
                        <span className="itemcart-count-value">
                            <input 
                                className="input"
                                onBlur={onBlur}
                                onChange={onchange}
                                type="text" 
                                value={count}
                                size="4" />
                        </span>
                        <span className="itemcart-count-update increment" onClick={() => setCount(count + 1)}><Plus size={14} /></span>
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